/* eslint-disable no-console */
import { spawn } from 'child_process';
import { promises as fs, existsSync } from 'fs';
import * as path from 'path';
import * as svelte from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import * as chokidar from 'chokidar';
import * as babel from '@babel/core';
import * as glob from 'glob';
import * as terser from 'terser';
import pLimit from 'p-limit';
import servor from 'servor';
import rimraf from 'rimraf';
import { init as initEsModuleLexer, parse } from 'es-module-lexer';
import throttle from 'lodash.throttle';

const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';
const BABEL_CONFIG = loadBabelConfig();
const SVELTE_PREPROCESSOR_CONFIG = loadSveltePreprocessors();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadBabelConfig(): any {
    if (existsSync('./babel.config.js')) {
        return require(path.join(process.cwd(), 'babel.config.js'));
    }

    return {
        plugins: [
            [
                'snowpack/assets/babel-plugin.js',
                {
                    // Append .js to all src file imports
                    optionalExtensions: true,
                    importMap: '../dist/web_modules/import-map.json',
                },
            ],
        ],
    };
}

function loadSveltePreprocessors(): PreprocessorGroup[] {
    if (!process.argv.includes('--preprocess')) return [];

    // Find the referenced preprocessor script
    const preprocessConfigPath =
        process.argv[process.argv.indexOf('--preprocess') + 1];

    if (!existsSync(preprocessConfigPath)) {
        console.error(`Cannot find preprocessor: ${preprocessConfigPath}`);
        process.exit(1);
    }

    return require(path.join(process.cwd(), preprocessConfigPath));
}

async function cleanDist(): Promise<void> {
    if (process.argv.includes('--no-clean')) return;
    await new Promise(resolve => rimraf('dist', resolve));
}

async function compile(
    srcPath: string
): Promise<{
    destPath: string | null;
    logSvelteWarnings: () => void;
}> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let logSvelteWarnings = (): void => {};

    try {
        let source = await fs.readFile(srcPath, 'utf8');
        const isSvelte = srcPath.endsWith('.svelte');

        // Only compile svelte files
        if (isSvelte) {
            // Run any preprocessors
            if (SVELTE_PREPROCESSOR_CONFIG.length) {
                const preprocessed = await svelte.preprocess(
                    source,
                    SVELTE_PREPROCESSOR_CONFIG,
                    {
                        filename: srcPath,
                    }
                );
                source = preprocessed.code;
            }

            const result = svelte.compile(source, {
                // https://svelte.dev/docs#Compile_time
                filename: srcPath,
                dev: !IS_PRODUCTION_MODE,
                hydratable: process.argv.includes('--hydratable'),
                immutable: process.argv.includes('--immutable'),
            });

            logSvelteWarnings = (): void => {
                result.warnings.forEach(warning => {
                    console.log('');
                    console.warn(
                        '\x1b[33m%s\x1b[0m',
                        `SVELTE WARNING (${warning.filename}) -> ${warning.message}`
                    );
                    console.warn(warning.frame);
                });
            };

            source = result.js.code;
        }

        const destPath = getDestPath(srcPath).replace(/.svelte$/, '.js');
        // Create all ancestor directories for this file
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.writeFile(destPath, source);

        console.info(`Svelte compiled ${destPath}`);

        return {
            destPath,
            logSvelteWarnings,
        };
    } catch (err) {
        console.log('');
        console.error(`Failed to compile with svelte: ${srcPath}`);
        console.error(err);
        console.log('');
        return {
            destPath: null,
            logSvelteWarnings,
        };
    }
}

async function copyFile(srcPath: string): Promise<void> {
    const destPath = getDestPath(srcPath);
    // Create all ancestor directories for this file
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.copyFile(srcPath, destPath);
    console.info(`Copied asset ${destPath}`);
}

function getDestPath(srcPath: string): string {
    return srcPath.replace(new RegExp(`^src\\${path.sep}`), `dist${path.sep}`);
}

// Update the import paths to correctly point to web_modules.
async function transform(
    destPath: string,
    checkModules: boolean
): Promise<void> {
    try {
        const source = await fs.readFile(destPath, 'utf8');

        let transformed = (await babel.transformAsync(
            source,
            BABEL_CONFIG
        )) as babel.BabelFileResult;

        if (checkModules) {
            const foundMissingWebModule = await checkForNewWebModules(
                transformed.code || ''
            );

            if (foundMissingWebModule) {
                try {
                    // Only check this specific file for new imports
                    await snowpack(destPath);
                } catch (err) {
                    console.error('\n\nFailed to build with snowpack');
                    err && console.error(err.stderr || err);
                    // Don't continue building...
                    return;
                }

                // Transform again so the paths are updated with the new web_modules...
                transformed = (await babel.transformAsync(
                    source,
                    BABEL_CONFIG
                )) as babel.BabelFileResult;
            }
        }

        await fs.writeFile(destPath, transformed.code);
        console.info(`Babel transformed ${destPath}`);
    } catch (err) {
        console.log('');
        console.error(`Failed to transform with babel: ${destPath}`);
        console.error(err);
        console.log('');
    }
}

// Minify file with terser.
async function minify(destPath: string): Promise<void> {
    try {
        const source = await fs.readFile(destPath, 'utf8');

        const result = terser.minify(source, {
            module: true,
        });

        await fs.writeFile(destPath, result.code);
        console.info(`Terser minified ${destPath}`);
    } catch (err) {
        console.log('');
        console.error(`Failed to minify with terser: ${destPath}`);
        console.error(err);
        console.log('');
    }
}

// Check if we should run snowpack again by looking for new import paths
// that have not been generated into web_modules yet.
async function checkForNewWebModules(
    transformedSource: string
): Promise<boolean> {
    await initEsModuleLexer;
    const [esImports] = parse(transformedSource);

    // Search for new import paths that snowpack hasn't generated yet
    const foundMissingWebModule = esImports.some(meta => {
        const importPath = transformedSource.substring(meta.s, meta.e);
        const notRelative = !importPath.startsWith('.');
        const notAbsolute = !importPath.startsWith('/');
        const notHttp = !importPath.startsWith('http://');
        const notHttps = !importPath.startsWith('https://');
        // Must be a node_module that snowpack didn't see before
        return notRelative && notAbsolute && notHttp && notHttps;
    });

    return foundMissingWebModule;
}

// Only needs to run once during the initial compile cycle. However, if a new import is found
// in dev mode, snowpack will be ran again.
async function snowpack(includeFiles: string): Promise<void> {
    const maybeOptimize = IS_PRODUCTION_MODE ? '--optimize' : '';
    const maybeStats = IS_PRODUCTION_MODE ? '--stat' : '';

    console.info(`\n\nBuilding web_modules with snowpack...`);

    const snowpackLocation = path.resolve(
        require.resolve('snowpack'),
        '../index.bin.js'
    );

    await new Promise((resolve, reject) => {
        const proc = spawn(
            'node',
            [
                snowpackLocation,
                '--include',
                includeFiles,
                '--dest',
                'dist/web_modules',
                maybeOptimize,
                maybeStats,
            ],
            {
                // Inherit so snowpack's log coloring is passed through
                stdio: 'inherit',
            }
        );
        proc.on('exit', (code: number) => {
            if (code > 0) return reject();
            resolve();
        });
    });
    console.log('\n'); // Just add some spacing...
}

async function initialBuild(): Promise<void> {
    if (IS_PRODUCTION_MODE) console.info(`Building in production mode...`);

    const concurrencyLimit = pLimit(8);
    const globConfig = { nodir: true };
    const svelteAndJsFiles = glob.sync(
        'src/**/!(*+(spec|test)).+(js|mjs|svelte)',
        globConfig
    );
    const otherAssetFiles = glob.sync(
        'src/**/*.!(spec.[tj]s|test.[tj]s|[tj]s|mjs|svelte)',
        globConfig
    );

    // Just copy all other asset types, no point in reading them.
    await Promise.all(
        otherAssetFiles.map(srcPath =>
            concurrencyLimit(async () => copyFile(srcPath))
        )
    );

    // Compile all source files with svelte.
    const svelteWarnings: Array<() => void> = [];
    const destFiles = await Promise.all(
        svelteAndJsFiles.map(srcPath =>
            concurrencyLimit(async () => {
                const { destPath, logSvelteWarnings } = await compile(srcPath);
                svelteWarnings.push(logSvelteWarnings);
                return destPath;
            })
        )
    );

    try {
        // Need to run this (only once) before transforming the import paths, or else it will fail.
        await snowpack('dist/**/*');
    } catch (err) {
        console.error('\n\nFailed to build with snowpack');
        err && console.error(err.stderr || err);
        // Don't continue building...
        process.exit(1);
    }

    // Transform all generated js files with babel.
    await Promise.all(
        destFiles.map(destPath =>
            concurrencyLimit(async () => {
                if (!destPath) return;
                await transform(destPath, false);
            })
        )
    );

    // Minify js files with terser if in production.
    if (IS_PRODUCTION_MODE && !process.argv.includes('--no-minify')) {
        await Promise.all(
            destFiles.map(destPath =>
                concurrencyLimit(async () => {
                    if (!destPath) return;
                    await minify(destPath);
                })
            )
        );
    }

    // Log all svelte warnings
    svelteWarnings.forEach(f => f());
}

function startWatchMode(): void {
    console.info(`\nWatching for files...`);

    const handleFile = async (srcPath: string): Promise<void> => {
        // Copy updated non-js/svelte files
        if (
            !srcPath.endsWith('.svelte') &&
            !srcPath.endsWith('.js') &&
            !srcPath.endsWith('.mjs')
        ) {
            copyFile(srcPath);
            return;
        }

        const { destPath, logSvelteWarnings } = await compile(srcPath);
        if (!destPath) return;
        await transform(destPath, true);
        logSvelteWarnings();
    };

    const srcWatcher = chokidar.watch('src', {
        ignored: /(^|[/\\])\../, // Ignore dotfiles
        ignoreInitial: true, // Don't fire "add" events when starting the watcher
    });

    srcWatcher.on('add', handleFile);
    // Throttle duplicate change events to prevent unnecessary recompiles
    srcWatcher.on('change', throttle(handleFile, 500, { trailing: false }));
}

async function startDevServer(): Promise<void> {
    if (process.argv.includes('--no-serve')) return;
    const { url } = await servor({
        root: './dist',
        fallback: 'index.html',
        port: 8080,
        reload: true,
    });
    console.info(`Server running on ${url}`);
}

async function main(): Promise<void> {
    await cleanDist();
    await initialBuild();
    if (IS_PRODUCTION_MODE) return;
    startWatchMode();
    startDevServer();
}

main();
