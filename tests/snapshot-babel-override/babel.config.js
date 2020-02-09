module.exports = {
    plugins: [
        // You can override the babel config but you must have this plugin defined.
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
