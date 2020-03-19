const rollupPluginSvelte = require('rollup-plugin-svelte');

module.exports = {
    rollup: {
        plugins: [rollupPluginSvelte()],
    },
};
