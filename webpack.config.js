const path = require('path')

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: '8080',
        static: path.resolve(__dirname, 'dist'),
        hot: true
    },
}