/* eslint-disable no-console */
import { promises as fs, existsSync } from 'fs';
import * as path from 'path';
import * as svelte from 'svelte/compiler';
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import * as chokidar from 'chokidar';
import * as glob from 'glob';
import pLimit from 'p-limit';
import servor from 'servor';
import rimraf from 'rimraf';
import * as rollup from 'rollup';
import { init as initEsModuleLexer, parse } from 'es-module-lexer';
import throttle from 'lodash.throttle';
import resolveRollupPlugin from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import svelteRollupPlugin from 'rollup-plugin-svelte';

const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';
const SVELTE_PREPROCESSOR_CONFIG = loadSveltePreprocessors();

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
    await new Promise((resolve) => rimraf('public/dist', resolve));
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
                result.warnings.forEach((warning) => {
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

function getDestPath(srcPath: string): string {
    return path
        .normalize(srcPath)
        .replace(
            new RegExp(`^src\\${path.sep}`),
            `public${path.sep}dist${path.sep}`
        );
}

// Update the import paths to correctly point to web_modules.
async function transform(destPath: string): Promise<void> {
    try {
        let source = await fs.readFile(destPath, 'utf8');
        source = await fixImports(destPath, source);
        await fs.writeFile(destPath, source);
        console.info(`Transformed ${destPath}`);
    } catch (err) {
        console.log('');
        console.error(`Failed to transform: ${destPath}`);
        console.error(err);
        console.log('');
    }
}

async function fixImports(destPath: string, source: string): Promise<string> {
    await initEsModuleLexer;
    const [esImports] = parse(source);
    const destPathDir = path.dirname(destPath);
    let transformedSource = source;
    let offset = 0;

    const getRelativePath = (importPath: string): string =>
        path.relative(destPathDir, `./public/dist/${importPath}`);

    esImports.forEach((meta) => {
        const importPathOriginal = source.substring(meta.s, meta.e);
        // Replace quotes due to issue with dynamic imports starting with them.
        const importPath = importPathOriginal.replace(/['"]/g, '');
        if (
            importPath.startsWith('http://') ||
            importPath.startsWith('https://')
        ) {
            return;
        }

        const isRelative = importPath.startsWith('.');
        const isAbsolute = importPath.startsWith('/');
        const isNodeModule = !isRelative && !isAbsolute;

        let newImportPath = importPath;
        // Use relative path to ensure deployed code doesn't care what subdirectory it lives in.
        if (isNodeModule) {
            const nodeModulesImportPath = `node_modules/${importPath}`;
            newImportPath = getRelativePath(nodeModulesImportPath);
            const distPath = `./public/dist/${nodeModulesImportPath}`;

            // Assume the path is correct, but test it exists...
            if (!existsSync(`${distPath}.js`)) {
                // Maybe it's implicitly an index.js...
                if (existsSync(`${distPath}/index.js`)) {
                    newImportPath += '/index';
                } else {
                    // Possibly the first time we've encountered this module.
                    // TODO: Need to rerun rollup
                    throw new Error(`cannot find node_module: ${distPath}`);
                }
            }
        } else if (isAbsolute) {
            newImportPath = getRelativePath(importPath);
        }

        // Fix case where import path is to a file in the same directory
        if (!newImportPath.startsWith('.') && !newImportPath.startsWith('/')) {
            newImportPath = `./${newImportPath}`;
        }

        // Add the extension if it's not already defined
        if (!newImportPath.endsWith('.mjs') && !newImportPath.endsWith('.js')) {
            newImportPath += '.js';
        }

        const beforeImport = transformedSource.slice(0, meta.s + offset);
        const afterImport = transformedSource.slice(meta.e + offset);
        transformedSource = `${beforeImport}${newImportPath}${afterImport}`;

        // Track the offset since we are mutating the source and losing the meta positions.
        offset += newImportPath.length - importPathOriginal.length;
    });

    return transformedSource;
}

async function buildDepsWithRollup(): Promise<void> {
    const resolveRootImports = (
        root: string,
        extensions: string[]
    ): rollup.Plugin => {
        const cache: { [key: string]: string } = {};
        return {
            name: 'resolveRootImports',

            generateBundle(
                _options: rollup.OutputOptions,
                bundle: rollup.OutputBundle
            ): void {
                // Only generate node_modules with rollup.
                Object.keys(bundle).forEach((key) => {
                    if (!key.startsWith('node_modules/')) {
                        delete bundle[key];
                    }
                });
            },

            resolveId(importee: string): string | null {
                // Already checked
                if (cache[importee]) return cache[importee];

                if (importee.startsWith('/')) {
                    // TODO: handle case where extension is already specified?
                    for (const ext of extensions) {
                        const rootPath = `${root}${importee}${ext}`;
                        const fullPath = path.resolve(rootPath);

                        // Otherwise check if it exists
                        if (existsSync(fullPath)) {
                            cache[importee] = fullPath;
                            return fullPath;
                        }
                    }
                }
                return null;
            },
        };
    };

    const extensions = ['.js', '.svelte'];

    const bundle = await rollup.rollup({
        input: 'src/App.svelte',
        preserveModules: true,
        preserveEntrySignatures: 'allow-extension',
        plugins: [
            resolveRootImports('src', extensions),
            svelteRollupPlugin({ include: 'src/**/*.svelte' }),
            resolveRollupPlugin({ extensions }),
            // commonjs(), // Converts third-party modules to ESM
        ],
    });

    await bundle.write({
        dir: 'public/dist',
        format: 'es',
        // Prevent rollup from naming node_modules `.mjs.js`
        entryFileNames: '[name].js',
        // sourcemap: true
    });
}

async function initialBuild(): Promise<void> {
    if (IS_PRODUCTION_MODE) console.info(`Building in production mode...`);
    try {
        await buildDepsWithRollup();
    } catch (err) {
        console.error('\n\nFailed to build dependencies with rollup');
        err && console.error(err.stderr || err);
        // Don't continue building...
        process.exit(1);
    }

    const concurrencyLimit = pLimit(8);
    const globConfig = { nodir: true };
    const svelteAndJsFiles = glob.sync(
        'src/**/!(*+(spec|test)).+(js|mjs|svelte)',
        globConfig
    );

    // Compile all source files with svelte.
    const svelteWarnings: Array<() => void> = [];
    const destFiles = await Promise.all(
        svelteAndJsFiles.map((srcPath) =>
            concurrencyLimit(async () => {
                const { destPath, logSvelteWarnings } = await compile(srcPath);
                svelteWarnings.push(logSvelteWarnings);
                return destPath;
            })
        )
    );

    // Transform all generated js files with babel.
    await Promise.all(
        destFiles.map((destPath) =>
            concurrencyLimit(async () => {
                if (!destPath) return;
                await transform(destPath);
            })
        )
    );

    // Log all svelte warnings
    svelteWarnings.forEach((f) => f());
}

function startWatchMode(): void {
    console.info(`\nWatching for files...`);

    const handleFile = async (srcPath: string): Promise<void> => {
        // Ignore non-js/svelte files
        // TODO: allow custom extensions to be processed by the svelte compiler
        // https://github.com/jakedeichert/svelvet/issues/63
        if (
            !srcPath.endsWith('.svelte') &&
            !srcPath.endsWith('.js') &&
            !srcPath.endsWith('.mjs')
        ) {
            return;
        }

        const { destPath, logSvelteWarnings } = await compile(srcPath);
        if (!destPath) return;
        await transform(destPath);
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

    let port = 8080; // This is the default value
    if (process.argv.includes('--port')) {
        port = parseInt(process.argv[process.argv.indexOf('--port') + 1], 10);
    }

    const { url } = await servor({
        root: './public',
        fallback: 'index.html',
        port,
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
