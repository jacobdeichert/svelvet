/* eslint-disable no-console */
import * as util from 'util';
import { exec as execSync } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as svelte from 'svelte/compiler';
import * as chokidar from 'chokidar';
import * as babel from '@babel/core';
import pDebounce from 'p-debounce';

const exec = util.promisify(execSync);

const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production';

async function compile(file: string): Promise<string> {
    const source = await fs.readFile(file, 'utf8');

    const compiled = svelte.compile(source, {
        // Not sure what options we should expose here...
    });

    // Create all ancestor directories for this file
    const destPath = file.replace(/^src\//, 'dist/').replace(/.svelte$/, '.js');
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.writeFile(destPath, compiled.js.code);
    console.info(`Svelte compiled ${destPath}`);

    return destPath;
}

// Update the import paths to correctly point to web_modules.
async function transform(destPath: string): Promise<void> {
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
}

// Only needs to run during the initial compile cycle. If a developer adds a new package dependency,
// they should restart svelvet.
const snowpackDebounced = pDebounce(async () => {
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
        console.error(err);
        throw err;
    }
}, 50);

function main(): void {
    IS_PRODUCTION_MODE
        ? console.info(`Building in production mode...`)
        : console.info(`Watching for files...`);

    const srcWatcher = chokidar.watch('src');

    srcWatcher.on('add', async (path: string) => {
        const destPath = await compile(path);

        // Need to run (only once) before transforming the import paths, or else it will fail.
        await snowpackDebounced();

        await transform(destPath);

        // Don't continue watching. This is safe if called multiple times.
        IS_PRODUCTION_MODE && srcWatcher.close();
    });

    if (IS_PRODUCTION_MODE) return;

    srcWatcher.on('change', async (path: string) => {
        const destPath = await compile(path);
        transform(destPath);
    });
}

main();
