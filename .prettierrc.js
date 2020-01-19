module.exports = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'es5',
    overrides: [
        {
            files: ['*.json', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
