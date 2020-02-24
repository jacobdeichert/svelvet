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
