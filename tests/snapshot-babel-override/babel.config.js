module.exports = {
    plugins: [
        // You can override the babel config but you must have this plugin defined.
        [
            'snowpack/assets/babel-plugin.js',
            {
                // Append .js to all src file imports
                optionalExtensions: true,
                dir: 'dist/web_modules',
                importMap: '../../public/dist/web_modules/import-map.json',
            },
        ],
    ],
};
