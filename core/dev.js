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
threadLoader.warmup({ workers:2 },[
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
                //enforce: 'pre',
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                // options:{
                //     fix:true,   // This option will enable ESLint autofix feature. 启用
                //     cache:true, 
                //     //This option will enable caching of the linting results into a file. This is particularly useful in reducing linting time when doing a full build.
                //     //开启缓存以提高检测速度，默认缓存路径为./node_modules/.cache
                //     //eslintPath: path.join(__dirname, "../"),
                // }
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

            // new Jarvis({
            //     port: 1337,
            //     host:'0.0.0.0',
            //     open:true
            // })
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
    
            progress:true, //将运行进度输出到控制台。
            contentBase:path.join(__dirname,'../public'),
            //统计信息
            stats:{
                // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
                all: undefined,
                // 添加资源信息
                assets: true,
                // 对资源按指定的字段进行排序
                // 你可以使用 `!field` 来反转排序。
                //assetsSort: "field",
                // 添加构建日期和构建时间信息
                builtAt: true,
                // 添加缓存（但未构建）模块的信息
                cached: false,
                // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
                cachedAssets: false,
                // 添加 children 信息
                children: false,
                // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
                chunks: false,
                // 添加 namedChunkGroups 信息
                chunkGroups: false,
                // 将构建模块信息添加到 chunk 信息
                chunkModules: false,
                // 添加 chunk 和 chunk merge 来源的信息
                chunkOrigins: false,
                // 按指定的字段，对 chunk 进行排序
                // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
                //chunksSort: "field",
                // 用于缩短 request 的上下文目录
                context: "./",
                // `webpack --colors` 等同于
                colors: true,
                // 显示每个模块到入口起点的距离(distance)
                depth: false,
                // 通过对应的 bundle 显示入口起点
                entrypoints: false,
                // 添加 --env information
                env: false,
                // 添加错误信息
                errors: true,
                // 添加错误的详细信息（就像解析日志一样）
                errorDetails: true,            
                // 添加 compilation 的哈希值
                hash: true,
                // 设置要显示的模块的最大数量
                maxModules: 15,
                // 添加构建模块信息
                modules: false,
                // 按指定的字段，对模块进行排序
                // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
                //modulesSort: "field",
                // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
                moduleTrace: true,
                // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
                performance: true,
                // 显示模块的导出
                providedExports: false,
                // 添加 public path 的信息
                publicPath: false,
                // 添加模块被引入的原因
                reasons: false,
                // 添加模块的源码
                source: false,
                // 添加时间信息
                timings: true,
                // 显示哪个模块导出被用到
                usedExports: false,
                // 添加 webpack 版本信息
                version: true,
                // 添加警告
                warnings: true,
            },
        },
    });
    return webpackDevConfig
}