const BASE = require('./base.js');


const path = require('path');
const webpack = require('webpack'); 
const Jarvis = require("webpack-jarvis");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackMerge = require('webpack-merge');


/**
 * thread-loader 可以将非常消耗资源的 loaders 转存到 worker pool 中。
 */
const threadLoader = require('thread-loader');
threadLoader.warmup({
        workers:2
    },[
        'babel-loader',
        'style-loader',
        'vue-loader',
        'css-loader',
        'url-loader',
        'less-loader',
]);


module.exports = (env, args) => {
    let webpackDevConfig = WebpackMerge(BASE,{
        module:{
            rules:[{
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                },{
                    test: /\.(sa|sc|c)ss$/,
                    use: [ 'style-loader' ,'css-loader', 'sass-loader' ],
                },{
                    test: /\.less$/,
                    use: [ 'style-loader', 'css-loader', 'less-loader' ],
                }]
        },

        plugins:[
            new webpack.NamedModulesPlugin(),  //显示被热更新的模块名称
            new webpack.HotModuleReplacementPlugin(),   //HMR
            // new BundleAnalyzerPlugin({
            //     defaultSizes:'gzip',
            //     logLevel:'warn'
            // }),
            // new webpack.DllReferencePlugin({
            //     manifest: require('../vendor-manifest.json')
            // }),

            new Jarvis({
                port: 1337,
                host:'0.0.0.0',
                open:true
            })
        ],
        devServer:{
            host:'localhost',
            port:8088,
            compress:true,  // gzip
            hot:true,
            //hotOnly:true,
            //lazy:false,     //  惰性模式
            inline: true,
            watchOptions:{
                ignored:/node_modules/,// 不监听的文件或文件夹，支持正则匹配
            },
            overlay: {      //当存在编译器错误或警告时，在浏览器中显示全屏覆
                warnings: true,
                errors: true
            },
            open:true,
            //openPage:'',
    
            progress:false, //将运行进度输出到控制台。
            contentBase:path.join(__dirname,'../public'),
            stats:'errors-only',//统计信息
        },
    });
    return webpackDevConfig
}