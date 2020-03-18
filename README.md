<p align="center">
  <img height="180" width="210" src="https://user-images.githubusercontent.com/1631044/72686362-de3f2200-3ac1-11ea-9b22-695128fe6f8c.png" alt="svelvet logo">
</p>



[![build status](https://github.com/jakedeichert/svelvet/workflows/CI/badge.svg?branch=master)][github_ci]
[![npm version](https://img.shields.io/npm/v/svelvet)][npm]


A cli [svelte][svelte] compiler & watcher that works with [snowpack][snowpack].

![screenshot of a svelvet project](https://user-images.githubusercontent.com/1631044/74686352-43f4fb80-519f-11ea-899b-3dadaa7583a1.png)


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

To do this, `svelvet` finds all your `src/**/*.svelte` files and compiles them to `public/dist/**/*.js`. On the initial build, we run snowpack (**only once**) to find all imported third-party dependencies and generate esm versions of them in `public/dist/web_modules/`. After the initial build, `svelvet` just watches for new or changed files and recompiles them instantly!




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
    // This starts svelvet in watch mode and runs snowpack once to generate public/dist/web_modules.
    // It also starts a live reloading dev server to serve the public directory on localhost:8080.
    "dev": "svelvet",

    // This builds the public/dist directory optimized for production with snowpack
    "build": "NODE_ENV=production svelvet"
},
~~~

And finally, add some `svelte` components to the `src` directory!

> All `svelte` and `js` source files must be stored inside the `src` directory so `svelvet` can compile them into the `public/dist` directory.
>
> All **static assets** must be stored inside the `public` directory which is what you'll deploy.

Use `npm run dev` to compile in dev mode. This watches for file changes, compiles to `dist` and starts a live reloading dev server on `localhost:8080`.

To optimize a build for production, use `npm run build`.

You also must have a [`public/index.html`][basic_example_html] file that loads your entrypoint or root `svelte` component.

~~~html
<!-- Example: public/index.html -->
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app"></div>

        <script type="module">
            import App from './dist/App.js';

            new App({
                target: document.querySelector('#app'),
            });
        </script>
    </body>
</html>
~~~




## Known issues

### Automatically support importing 3rd party svelte files ([Issue #49](https://github.com/jakedeichert/svelvet/issues/49))

Support for referencing svelte components from other packages is [not built-in yet](https://github.com/jakedeichert/svelvet/issues/49). For now, you must run `npm i -D rollup-plugin-svelte` and then create a `snowpack.config.js` file like this:

~~~js
const rollupPluginSvelte = require('rollup-plugin-svelte');

module.exports = {
    rollup: {
        plugins: [rollupPluginSvelte()]
    }
};
~~~

A full example can be found [here][snowpack_config_example].




## FAQ

### Why not just use webpack or rollup?

I don't need to support non-esm browsers for most projects and I really like the idea of a super light build process. By removing the complexity of configuration and the overhead of bundling, `svelvet` makes the development process an optimal experience for myself and hopefully others :)

Many of you will not be able to use this if you depend on custom import types or other fancy loaders. This project is just not for you!

But seriously, give [snowpack][snowpack_website] a read to understand the benefits of leaning on standard esm imports, allowing you to avoid a bundling process entirely.

### Can I override the babel config?

Yes! Just create a `babel.config.js` file in the root of your project, and that should be properly picked up by `svelvet` and `snowpack`. You must copy [this example config][babel_config_example] as a starting point to ensure you have the required plugin set up properly.

### Can I use the hydratable or immutable svelte options?

Yeah, just run `svelvet` with the `--hydratable` or `--immutable` args to enable those options!

### Can I preprocess my svelte components?

Yupp! You can configure one or more preprocessors that will run before your code gets compiled by svelte. This means you can use `typescript`, `pug`, `sass`, `postcss` or whatever else your chosen preprocessor is capable of handling.

When running `svelvet`, you can now pass a `--preprocess my-preprocessors.js` option. The script that you specify just needs to return an array of preprocessors.

Here's an example using [svelte-preprocess][svelte_preprocess]:

~~~js
// my-preprocessors.js
const autoPreprocess = require('svelte-preprocess');

module.exports = [
    autoPreprocess({
        typescript: {
            compilerOptions: {
                target: 'es2019',
                baseUrl: './src',
            },
            transpileOnly: true,
        },
    }),
];
~~~

Check out the full example [here][preprocess_example].

### Why don't imports automatically resolve index.svelte or index.js?

If you have a structure like `src/components/Footer/index.svelte`, you cannot rely on `index.svelte` being auto resolved. Standard esm doesn't auto resolve `index.js` files, so when you import this component, you must use a full path to the index.

**❌ Bad**: `import Footer from './components/Footer';`

**✅ Good**: `import Footer from './components/Footer/index';`

Notably, you should leave off the extension. This is automatically added during the transform phase.

### What happens to the component css?

By default, svelte compiles your component css and inserts style tags into the DOM at runtime. More advanced css bundling techniques are not supported yet.








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
[snowpack_config_example]: https://github.com/jakedeichert/svelvet/tree/master/tests/snapshot-snowpack-config
[preprocess_example]: https://github.com/jakedeichert/svelvet/tree/master/tests/snapshot-preprocessors
[babel_config_example]: https://github.com/jakedeichert/svelvet/blob/master/tests/snapshot-babel-override/babel.config.js
[svelte_preprocess]: https://github.com/kaisermann/svelte-preprocess
[terser]: https://github.com/terser/terser
