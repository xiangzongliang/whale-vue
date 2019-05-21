const path    = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['vue','vue-router','vuex']
    },
    output: {
        path: path.resolve(__dirname,'../public/'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../public/[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};