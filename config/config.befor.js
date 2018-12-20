const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
    mode:'development', //production  development
    entry: {
        index:'./pages/index.js',
        about:'./pages/about.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build')
    },
    module:{
        rules: [{
            test: /\.vue$/,
            loaders: 'vue-loader',
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
            
        },{
            test: /\.js$/,
            loaders: 'babel-loader',
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../')
        }]
    },
    plugins:[
        new VueLoaderPlugin(), 
        new HtmlWebpackPlugin({
            title:'this index',
            filename:'index.html',
            template: './template/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer:{
        host:'localhost',
        port:8088,
        compress:true,  //gzip
        hot:true,       //热更新
        //hotOnly:true,
        inline:true,
        contentBase:path.join(__dirname,'../public'),     //静态资源目录
    }
};