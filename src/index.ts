/* eslint-disable no-console */
import * as util from 'util';
import { exec as execSync } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as svelte from 'svelte/compiler';
import * as chokidar from 'chokidar';
import * as babel from '@babel/core';
import * as glob from 'glob';
import pLimit from 'p-limit';

const exec = util.promisify(execSync);

const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';

async function compile(srcPath: string): Promise<string | null> {
    try {
        const source = await fs.readFile(srcPath, 'utf8');
        const isSvelte = srcPath.endsWith('.svelte');

        // Only compile svelte files
        const newSource = isSvelte
            ? svelte.compile(source, {
                  // https://svelte.dev/docs#Compile_time
                  dev: !IS_PRODUCTION_MODE,
                  hydratable: process.argv.includes('--hydratable'),
                  immutable: process.argv.includes('--immutable'),
              }).js.code
            : source;

        const destPath = srcPath
            .replace(/^src\//, 'dist/')
            .replace(/.svelte$/, '.js');
        // Create all ancestor directories for this file
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.writeFile(destPath, newSource);

        console.info(`Svelte compiled ${destPath}`);

        return destPath;
    } catch (err) {
        console.log('');
        console.error(`Failed to compile with svelte: ${srcPath}`);
        console.error(err);
        console.log('');
        return null;
    }
}

async function copyFile(srcPath: string): Promise<void> {
    const destPath = srcPath.replace(/^src\//, 'dist/');
    // Create all ancestor directories for this file
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.copyFile(srcPath, destPath);
    console.info(`Copied asset ${destPath}`);
}

// Update the import paths to correctly point to web_modules.
async function transform(destPath: string): Promise<void> {
    try {
        const source = await fs.readFile(destPath, 'utf8');

        const transformed = (await babel.transformAsync(source, {
            plugins: [
                [
                    'snowpack/assets/babel-plugin.js',
                    {
                        // Append .js to all src file imports
                        optionalExtensions: true,
                    },
                ],
            ],
        })) as babel.BabelFileResult;

        await fs.writeFile(destPath, transformed.code);
        console.info(`Babel transformed ${destPath}`);
    } catch (err) {
        console.log('');
        console.error(`Failed to transform with babel: ${destPath}`);
        console.error(err);
        console.log('');
    }
}

// Only needs to run during the initial compile cycle. If a developer adds a new package dependency,
// they should restart svelvet.
const snowpack = async (): Promise<void> => {
    const maybeOptimize = IS_PRODUCTION_MODE ? '--optimize' : '';

    console.info(`\nBuilding web_modules with snowpack...`);

    try {
        const snowpackLocation = path.resolve(
            require.resolve('snowpack'),
            '../index.bin.js'
        );

        const { stdout, stderr } = await exec(
            `${snowpackLocation} --include 'dist/**/*' --dest dist/web_modules ${maybeOptimize}`
        );

        // TODO: hide behind --verbose flag
        // Show any output from snowpack...
        stdout && console.info(stdout);
        stderr && console.info(stderr);
    } catch (err) {
        console.log('');
        console.error('Failed to build with snowpack');
        console.error(err.stderr || err);
        // Don't continue trying to build if snowpack fails.
        process.exit(1);
    }
};

async function initialBuild(): Promise<void> {
    if (IS_PRODUCTION_MODE) console.info(`Building in production mode...`);

    const concurrencyLimit = pLimit(8);
    const globConfig = { nodir: true };
    const svelteAndJsFiles = glob.sync('src/**/*.+(js|mjs|svelte)', globConfig);
    const otherAssetFiles = glob.sync('src/**/*.!(js|mjs|svelte)', globConfig);

    // Just copy all other asset types, no point in reading them.
    await Promise.all(
        otherAssetFiles.map(srcPath =>
            concurrencyLimit(async () => copyFile(srcPath))
        )
    );

    // Compile all source files with svelte.
    const destFiles = await Promise.all(
        svelteAndJsFiles.map(srcPath =>
            concurrencyLimit(async () => {
                const destPath = await compile(srcPath);
                return destPath;
            })
        )
    );

    // Need to run this (only once) before transforming the import paths, or else it will fail.
    await snowpack();

    // Transform all generated js files with babel.
    await Promise.all(
        destFiles.map(destPath =>
            concurrencyLimit(async () => {
                if (!destPath) return;
                await transform(destPath);
            })
        )
    );
}

function startWatchMode(): void {
    console.info(`Watching for files...`);

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

        const destPath = await compile(srcPath);
        if (!destPath) return;
        transform(destPath);
    };

    const srcWatcher = chokidar.watch('src', {
        ignored: /(^|[/\\])\../, // Ignore dotfiles
        ignoreInitial: true, // Don't fire "add" events when starting the watcher
    });

    srcWatcher.on('add', handleFile);
    srcWatcher.on('change', handleFile);
}

async function main(): Promise<void> {
    await initialBuild();
    if (!IS_PRODUCTION_MODE) startWatchMode();
}

main();
