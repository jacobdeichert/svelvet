const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs").promises;
const path = require("path");
const svelte = require("svelte/compiler");
const chokidar = require("chokidar");
const babel = require("@babel/core");
const pDebounce = require("p-debounce");

const IS_PRODUCTION_MODE = process.env.NODE_ENV === "production";

async function compile(file) {
  const source = await fs.readFile(file, "utf8");

  const compiled = svelte.compile(source, {
    // Not sure what options we should expose here...
  });

  // Create all ancestor directories for this file
  const destPath = file.replace(/^src\//, "dist/").replace(/.svelte$/, ".js");
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, compiled.js.code);
  console.info(`Svelte compiled ${destPath}`);

  return destPath;
}

// Update the import paths to correctly point to web_modules.
async function transform(destPath) {
  const source = await fs.readFile(destPath, "utf8");
  const transformed = await babel.transformAsync(source, {
    plugins: [
      [
        "snowpack/assets/babel-plugin.js",
        {
          // Append .js to all src file imports
          optionalExtensions: true
        }
      ]
    ]
  });

  await fs.writeFile(destPath, transformed.code);
  console.info(`Babel transformed ${destPath}`);
}

// Only needs to run during the initial compile cycle. If a developer adds a new package dependency,
// they should restart sveltepack.
const snowpackDebounced = pDebounce(async () => {
  const maybeOptimize = IS_PRODUCTION_MODE ? "--optimize" : "";

  console.info(`\nBuilding web_modules with snowpack...`);

  try {
    const { stdout, stderr } = await exec(
      `node_modules/.bin/snowpack --include 'dist/**/*' --dest dist/web_modules ${maybeOptimize}`
    );

    // TODO: hide behind --verbose flag
    // Show any output from snowpack...
    stdout && console.info(stdout);
    stderr && console.info(stderr);
  } catch (error) {
    console.error(error);
  }
}, 50);

function main() {
  IS_PRODUCTION_MODE
    ? console.info(`Building in production mode...`)
    : console.info(`Watching for files...`);

  const srcWatcher = chokidar.watch("src");

  srcWatcher.on("add", async path => {
    const destPath = await compile(path);

    // Need to run (only once) before transforming the import paths, or else it will fail.
    await snowpackDebounced();

    await transform(destPath);

    // Don't continue watching. This is safe if called multiple times.
    IS_PRODUCTION_MODE && srcWatcher.close();
  });

  if (IS_PRODUCTION_MODE) return;

  srcWatcher.on("change", async path => {
    const destPath = await compile(path);
    transform(destPath);
  });
}

main();
