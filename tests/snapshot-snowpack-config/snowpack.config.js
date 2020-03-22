const rollupPluginSvelte = require('rollup-plugin-svelte');

module.exports = {
    rollup: {
        plugins: [
            rollupPluginSvelte({
                dev: process.env.NODE_ENV !== 'production',
            }),
        ],
    },
};
