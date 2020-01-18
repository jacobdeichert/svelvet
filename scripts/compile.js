// @ts-ignore
const svelte = require("svelte/compiler");
const fs = require("fs");
const path = require("path");

// TODO: find all svelte files in src, write them to dist
function compile(file) {
  const source = fs.readFileSync(file, "utf8");

  const compiled = svelte.compile(source, {
    // options...
  });
  // console.log(result);

  // Create all ancestor directories for this file
  const outputPath = file.replace(/^src\//, "dist/").replace(/.svelte$/, ".js");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, compiled.js.code);
}

// Proof of concept...
compile("src/App.svelte");
compile("src/components/Header.svelte");
compile("src/components/Footer/index.svelte");
compile("src/components/Footer/Links.svelte");

// Need to make a simple directory file watcher to auto compile all src svelte files
// to dist js files.
