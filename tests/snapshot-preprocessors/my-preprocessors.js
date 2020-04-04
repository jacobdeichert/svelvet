const autoPreprocess = require('svelte-preprocess');

module.exports = [
    autoPreprocess({
        typescript: {
            compilerOptions: {
                target: 'es2020',
                module: 'es2020',
                baseUrl: './src',
            },
            transpileOnly: true,
        },
    }),
];
