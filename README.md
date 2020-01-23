<p align="center">
  <img height="180" width="210" src="https://user-images.githubusercontent.com/1631044/72686362-de3f2200-3ac1-11ea-9b22-695128fe6f8c.png" alt="svelvet logo">
</p>



[![build status](https://github.com/jakedeichert/svelvet/workflows/CI/badge.svg?branch=master)][github_ci]
[![npm version](https://img.shields.io/npm/v/svelvet)][npm]


A cli [svelte][svelte] compiler & watcher that works with [snowpack][snowpack].




## Goals

* No bundler required
* No config required
* Integrate directly with snowpack for an optimal experience
* Instant dev watch & rebuild cycle
* Fast production builds that are optimized & tree-shaken
* Keep your `node_modules` super light
* Only support [browsers that work with esm][browser_esm]
* Only support standard esm imports (no css/image/custom-loader-like imports)




## How it works

The goal of `svelvet` is to make `svelte` play nicely with `snowpack` and `web_modules`.

As of today, svelte depends on a loader for webpack or rollup which compiles your svelte components into individual js files. Since snowpack's goal is to avoid the need for a bundler, we can't use those loaders, but we can use [svelte's internal compiler api][svelte_compiler] to do 95% of the work for us. On top of that, `svelvet` adds automatic file watching to recompile your svelte files just like a loader would, but much faster!

To do this, `svelvet` finds all your `src/**/*.svelte` files and compiles them to `dist/**/*.js`. On the initial build, we run snowpack (**only once**) to find all imported third-party dependencies and generate esm versions of them in `dist/web_modules/`. After the initial build, `svelvet` just watches for new or changed files and recompiles them instantly!




## Getting started

Create a new project and add the required dependencies. An example project is set up [here][basic_example].

~~~sh
# svelte is a peer dep required by svelvet. You get to choose which
# version to use and when to upgrade!
npm install svelte

# Install the svelvet cli (requires node v10 or higher)
npm install svelvet --save-dev
~~~

Add a few simple scripts as seen [here][basic_example_package]:

~~~jsonc
"scripts": {
    // This starts svelvet in watch mode and runs snowpack once to generate dist/web_modules
    "dev": "npm run clean && svelvet",

    // This builds the dist directory optimized for production with snowpack
    "build": "NODE_ENV=production npm run dev",

    // Remove generated files for a clean build
    "clean": "rm -rf dist/*",

    // An example of how to serve dist locally (requires "npm install serve --save-dev")
    "serve": "serve --listen 8080 --single dist"
},
~~~

And finally, add some `svelte` files! All source files must be stored inside the `src` directory so `svelvet` can compile them into the `dist` directory.

To compile in dev mode with file watching, use `npm run dev`. To optimize a build for production, use `npm run build`. Then serve your `dist` directory!

You also must have an [`index.html`][basic_example_html] file that loads your entrypoint or root `svelte` component.

~~~html
<!-- Example: dist/index.html -->
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app"></div>

        <script type="module">
            import App from './App.js';

            new App({
                target: document.querySelector('#app'),
            });
        </script>
    </body>
</html>
~~~




## Known issues

### Imports don't automatically resolve index.ext ([Issue #1](https://github.com/jakedeichert/svelvet/issues/1))

If you have a structure like `src/components/Footer/index.svelte`, you cannot rely on `index.svelte` being auto resolved. Standard esm doesn't auto resolve `index.js` files and at the moment we don't transform the imports for you. So when you import this component, you must use a full path to the index.

**Before (very common)**: `import Footer from './components/Footer';`

**After**: `import Footer from './components/Footer/index';`

Notably, you should leave off the extension. This **is** automatically added during the transform phase.


### Adding a new dependency when running dev mode fails ([Issue #10](https://github.com/jakedeichert/svelvet/issues/10))

So if you start `svelvet` in dev mode and then at any point you add a **new unique node_modules import path**, you'll likely get a runtime error saying that file doesn't exist. The other possibility is that you already had that module installed, but you're referencing a *different path* for the first time.

This happens because `svelvet` runs snowpack **only once** and we don't track your source for new import paths.

The quick workaround is to restart dev mode until this is fixed.

### Svelte's debug warnings are not shown ([Issue #3](https://github.com/jakedeichert/svelvet/issues/3))

Yupp, we need to log those to the console probably! We should check out how the `svelte` webpack and rollup loaders work.




## FAQ

### Why not just use webpack or rollup?

I don't need to support non-esm browsers for most projects and I really like the idea of a super light build process. By removing the complexity of configuration and the overhead of bundling, `svelvet` makes the development process an optimal experience for myself and hopefully others :)

Many of you will not be able to use this if you depend on custom import types or other fancy loaders. This project is just not for you!

But seriously, give [snowpack][snowpack_website] a read to understand the benefits of leaning on standard esm imports, allowing you to avoid a bundling process entirely.

### Can I override the babel config?

Yes! Just create a `babel.config.js` file in the root of your project, and that _should_ be properly picked up by `svelvet` and `snowpack`. If not, please file an issue.

### Can I use the hydratable or immutable svelte options?

Yeah, just run `svelvet` with the `--hydratable` or `--immutable` args to enable those options!




## Possible future features

* Simple `dist` serving in dev mode
* Auto refresh page after compile/transform







[github_ci]: https://github.com/jakedeichert/svelvet/actions?query=workflow%3ACI
[npm]: https://www.npmjs.com/package/svelvet
[svelte]: https://github.com/sveltejs/svelte
[svelte_compiler]: https://svelte.dev/docs#svelte_compile
[snowpack]: https://github.com/pikapkg/snowpack
[snowpack_website]: https://www.snowpack.dev
[browser_esm]: https://caniuse.com/#search=modules
[basic_example]: https://github.com/jakedeichert/svelvet/tree/master/examples/basic
[basic_example_package]: https://github.com/jakedeichert/svelvet/blob/master/examples/basic/package.json
[basic_example_html]: https://github.com/jakedeichert/svelvet/blob/master/examples/basic/public/index.html
[issue_minify]: https://github.com/jakedeichert/svelvet/issues/17
[terser]: https://github.com/terser/terser
