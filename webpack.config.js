const path = require('path');

module.exports = {
    target: "node",
    mode: "development",
    entry: './src/js/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: [".ts", ".js"],
        modules: ['node_modules'],
    },

    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader'
        }],
    },

};