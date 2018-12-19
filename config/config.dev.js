const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack'); //访问内置的插件
const HappyPack = require('happypack');
const path = require('path');

module.exports = {
    //mode:'production', //production  development
    entry: {
        index:'./pages/index.js',
        about:'./pages/about.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build')
    },
    resolve:{
        modules: [path.resolve(__dirname,'../node_modules')],  //指明包模块的加载路径，避免层层查找的消耗
        alias: {
            'vue':path.resolve(__dirname,'../node_modules/vue/dist/vue.min.js'), //直接手动引入，就不会加载package中的main对应的文件，并减少递归操作
        },
        extensions:['.js','.vue','.json'],
    },
    optimization: { //优化
        minimize: true,  //告诉webpack使用UglifyjsWebpackPlugin最小化捆绑包。
        runtimeChunk:true,
        namedModules: true
    },
    module:{
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'happypack/loader?id=babel'
                    },
                }
            }]
        },{
            test: /\.js$/,
            use: 'happypack/loader?id=babel',
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../')
        }]
    },
    externals:{
        // vue: "Vue",
    },
    plugins:[
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'babel',
            //cache: false,
            threads:8, //开几个线程去处理
            loaders: [ 'babel-loader' ],
        }), 
        new HtmlWebpackPlugin({
            title:'this index',
            filename:'index.html',
            template: './template/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin({
            defaultSizes:'gzip',
            logLevel:'warn'
        })
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