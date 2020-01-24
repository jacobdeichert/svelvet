module.exports = {
    plugins: [
        // You can override the babel config but you need to at least have this plugin defined.
        [
            'snowpack/assets/babel-plugin.js',
            {
                // Append .js to all src file imports
                optionalExtensions: true,
                addVersion: true,
            },
        ],
    ],
};
