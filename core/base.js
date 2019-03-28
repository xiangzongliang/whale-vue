const UTILS = require('./utils');
const isProd = process.env.APP_ENV === 'dev'

//===================================

const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: UTILS.open_thread }); //happypack多个实例的时候，共享线程池，以达到资源的最小消耗

module.exports = {
    mode: isProd ? 'development' : 'production',
    target: 'web', // 'web', // <=== 默认是 'web'，可省略
    entry: UTILS.pages(isProd),

    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[name].js',
        path: path.resolve(__dirname, '../build/')
    },

    // webpack 如何查找包
    resolve:{
        modules: [path.resolve(__dirname,'../node_modules')],  //指明包模块的加载路径，避免层层查找的消耗（也就是说webpack去那个目录下面查找三方的包模块）
        alias: {
            '@':path.resolve(__dirname, '../'),
        },
        extensions:['.js','.vue','.json','.ts','.tsx'],
        symlinks: false,
    },

    //webpack 如何去寻找 loader
    resolveLoader:{
        modules: [ path.resolve(__dirname,'../node_modules') ], // 模块的查找路径
        extensions: [ '.js', '.json' ],                         //对导入的没有后缀名的文件，按照查找后缀的顺序
        mainFields: [ 'jsnext:main', 'browser', 'main' ]        //查找模块的 package.json 文件之后 入口加载的优先顺序
    },

    devtool:false,  //直接关闭，使用VUE插件在浏览器端调试
    cache:{},//缓存生成的 webpack 模块和 chunk，来改善构建速度

    //性能
    performance:{
        hints: isProd ? false : 'warning',       //false | "error" | "warning"  默认 warning
        maxEntrypointSize: 1024 * 500,  //整体资源值超过会警告
        maxAssetSize: 1024 * 250,       //单个资源体积超过值时会警告
    },

    //优化
    optimization: {
        minimize: !isProd,          //告诉webpack使用UglifyjsWebpackPlugin最小化捆绑包。
        //namedModules: true,       //Tells webpack to use readable module identifiers for better debugging. When optimization.namedModules is not set in webpack config, webpack will enable it by default for mode development and disable for mode production.
        noEmitOnErrors: true,       //在 webpack 编译代码出现错误时并不会退出 webpack 
        runtimeChunk:{              // 仅包含运行时的每个入口点添加一个额外的块  也就是 manifest 文件块
            name: entrypoint => {
                return `whale_${entrypoint.name}`
            }
        },
        splitChunks: {
            minSize: 30000,
            //缓存组
            cacheGroups: {
                //default:false, //将最少重复引用两次的模块放入default中
                vue: {
                    test: /([\/]node_modules[\/]vue)/,  // <- window | mac -> /node_modules/vue/
                    name: 'vue-vendor',                 //拆分块的名称
                    chunks: 'initial',                  //initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    priority: 100,                      // 该配置项是设置处理的优先级，数值越大越优先处理
                    enforce: true,                      // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                    //minSize: 1024*10,                 //表示在压缩前的最小模块大小，默认为0；
                    //minChunks: 1,                     //表示被引用次数，默认为1；
                    //maxAsyncRequests:                 //最大的按需(异步)加载次数，默认为1；
                    //maxInitialRequests:               //最大的初始化加载次数，默认为1；
                    //reuseExistingChunk: true          //表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
                },
                charts: {
                    test: /[\/]node_modules[\/]echarts/,
                    name: "charts",
                    chunks: 'initial',
                    priority: 90,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial', 
                    name: 'vendor',
                    priority: 80,
                    enforce: true,
                },
                common:{
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 3,
                    priority: 70,
                    enforce: true,   
                },
                styles: {
                    name: 'vendors_css',
                    test: /\.(sc|c|sa|le)ss$/,
                    chunks: 'initial',
                    priority: 0,
                    enforce: true,
                }
            }
        },

    },
    module:{
        noParse:/^(vue|vue-router|vuex|vuex-router-sync|lodash|echarts|axios)$/, //忽略大型的 library 可以提高构建性能
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname,'../'),
            ],
            use: ['cache-loader','thread-loader',
                {
                    loader: 'vue-loader',
                    options: {
                        //hotReload: false, // false 关闭热重载 默认 true (服务端渲染的时候需要关闭热重载)
                        loaders: {
                            js: 'happypack/loader?id=babel',
                            css:{
                                use: [ isProd ? 'style-loader' : MiniCssExtractPlugin.loader,'vue-style-loader', 'css-loader' ,'postcss-loader'],
                                fallback: 'vue-style-loader'
                            }
                        },
                    }
                }]
        },{
            test: /\.ts?$/,
            exclude: /node_modules/,
            use: [{
                loader: "ts-loader",
                options: { 
                    appendTsxSuffixTo: [/\.vue$/] ,
                    happyPackMode:true,
                    //禁用类型检查器 - 我们将在fork插件中使用它：  
                    // transpileOnly:true,
                }
            }]
        },{
            test: /\.tsx$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [
                {
                    loader: 'tslint-loader',
                    //options: { /* Loader options go here */ }
                }
            ]
        },{
            test: /\.js$/,
            use: [ {loader: 'cache-loader'}, 'happypack/loader?id=babel' ],
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname,'../'),
            ],
        },{
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
            use: [
                {
                    loader: 'url-loader',  //对于一些较小的文件采用base64编码
                    options: {
                        limit: 1024 * 5,   //对 5KB 以下文件进行处理（⚠️ ！ 但是会被打包到JS中）
                        fallback:{
                            loader: "file-loader",
                            options: {
                                name:'[name].[ext]',
                                publicPath: './img',
                                outputPath: './img'
                            }
                        },
                        
                    }
                }
            ]
        },{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name:'[name].[ext]',
                    publicPath: '../fonts',
                    outputPath: './fonts'
                }
            }]
        }]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(path.join(__dirname,'../')),
            'process.env.VUE_APP_ENV': JSON.stringify(process.env.VUE_APP_ENV),
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'development' : 'production'),
        }),
        new HappyPack({
            id: 'babel',
            cache: true,
            threads: UTILS.open_thread, //开几个线程去处理 
            loaders: [ 'cache-loader','babel-loader?cacheDirectory' ],// 2、babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
            verbose: true,         //允许 HappyPack 输出日志 ,默认true
            threadPool: happyThreadPool,
        }),
        // new ForkTsCheckerWebpackPlugin({
        //     tsconfig:path.resolve(path.join(__dirname,'../tsconfig.json')), //配置文件的路径
        //     tslint:true,
        //     tslintAutoFix:true,//自动修复Ts错误
        // }),
        ...UTILS.htmlPlugins()
    ]
}