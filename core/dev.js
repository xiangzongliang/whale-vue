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
            new webpack.HotModuleReplacementPlugin({
                options:{},
                multiStep:undefined, //设置为 true 时(不要随意改成true)，插件会分成两步构建文件。首先编译热加载 chunks，之后再编译剩余的通常的资源。
                fullBuildTimeout:200,   //当 multiStep 启用时，表示两步构建之间的延时。
                requestTimeout:10000
            }),
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
            compress:true,  //一切服务启用 gzip
            hot:true,       //热更新
            //hotOnly:true,
            //lazy:false,     //  惰性模式
            inline:true,
            watchOptions:{
                //aggregateTimeout:500,// 监听到变化后等300ms再去执行动作
                ignored:/node_modules/,// 不监听的文件或文件夹，支持正则匹配
                //poll: 1000,// 默认每秒询问1000次
            },
            overlay: {      //当存在编译器错误或警告时，在浏览器中显示全屏覆
                warnings: true,
                errors: true
            },
            open:true,      //启动服务时自动打开页面
            //openPage:'',  //指定在打开浏览器时导航到的页面。
    
            progress:true, //将运行进度输出到控制台。
            contentBase:path.join(__dirname,'../public'),     //静态资源目录
            //统计信息
            //stats:'errors-only',
        },
    });
    // console.log(webpackDevConfig)
    //  fs.writeFile('./config.dev.json',JSON.stringify(webpackDevConfig),function(err){
    //     if(err) console.log('写文件操作失败');
    //     else console.log('写文件操作成功');
    // });
    return webpackDevConfig
}