const UTILS = require('./utils');
const isProd = process.env.APP_ENV === 'dev'



const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const happyThreadPool = HappyPack.ThreadPool({ size: UTILS.open_thread }); //happypack多个实例的时候，共享线程池，以达到资源的最小消耗


module.exports = {
    mode: isProd ? 'development' : 'production',
    target: 'web',// 'web', // <=== 默认是 'web'，可省略
    entry: UTILS.pages(),
    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[name].js',
        path: path.resolve(__dirname, '../build')
    },
    resolve:{
        modules: [path.resolve(__dirname,'../node_modules')],  //指明包模块的加载路径，避免层层查找的消耗（也就是说webpack去那个目录下面查找三方的包模块）
        alias: {
            '@':path.resolve(__dirname, '../'),
            //'vue':path.resolve(__dirname,'../node_modules/vue/dist/vue.min.js'), //直接手动引入，就不会加载package中的main对应的文件，并减少递归操作
        },
        extensions:['.js','.vue','.json'],
        symlinks: false,
        //aliasFields:[ 'jsnext:main' , 'browser' ,'main'],//当模块包有多个版本时，在package.json文件中优先选用的模块
    },
    resolveLoader:{ //webpack 如何去寻找 loader
        modules: [ path.resolve(__dirname,'../node_modules') ],
        extensions: [ '.js', '.json' ],     //默认
        mainFields: [ 'loader', 'main' ]    //默认
    },
    devtool:false,  //直接关闭，使用VUE调试
    cache:{},//缓存生成的 webpack 模块和 chunk，来改善构建速度
    optimization: { //优化
        minimize: !isProd,  //告诉webpack使用UglifyjsWebpackPlugin最小化捆绑包。
        namedModules: true,
        noEmitOnErrors: true,       //在 webpack 编译代码出现错误时并不会退出 webpack 

        runtimeChunk:{  // 仅包含运行时的每个入口点添加一个额外的块  也就是 manifest 文件块
            name: entrypoint => {
                return `whale_${entrypoint.name}`
            }
        }, 
        splitChunks: {
            minSize: 30000,
            cacheGroups: { //缓存组 ,可以替换默认的配置
                //default:false, //将最少重复引用两次的模块放入default中
                charts: {
                    chunks: 'async', // 'initial', 'async', 'all',
                    test: /[\/]node_modules[\/]echarts/, // <- window | mac -> /node_modules/vue/
                    name: "charts",
                    priority: 20,
                },
                vue: {
                    chunks: 'initial', // 'initial', 'async', 'all',
                    test: /[\/]node_modules[\/]vue/, // <- window | mac -> /node_modules/vue/
                    name: 'vue-vendor',
                    priority: -9,
                    enforce: true,
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial', // 'initial', 'async', 'all'
                    //test: /[\\/]node_modules[\\/]/, //匹配过滤  合并了node_modoles的js
                    //chunks: 'all',      //initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'vendor',        //拆分块的名称
                    //minSize: 1024*10,     //表示在压缩前的最小模块大小，默认为0；
                    //minChunks: 1,         //表示被引用次数，默认为1；
                    //maxAsyncRequests:     //最大的按需(异步)加载次数，默认为1；
                    //maxInitialRequests:   //最大的初始化加载次数，默认为1；
                    priority: -10,             // 该配置项是设置处理的优先级，数值越大越优先处理
                    enforce: true,
                },
                common:{
                    test: /[\\/]assets\/js[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    //minChunks: 2,
                    priority: 1,
                    enforce: true,
                    //reuseExistingChunk: true //表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
                },
                styles: {
                    name: 'vendors_css',
                    test: /\.(sc|c|sa|le)ss$/,
                    chunks: 'all',
                    enforce: true,          // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                }
            }
        },

    },
    module:{
        noParse:/^(vue|vue-router|vuex|vuex-router-sync|lodash|echarts|axios)$/, //忽略大型的 library 可以提高构建性能
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
            use: ['cache-loader','thread-loader', 
            {
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'happypack/loader?id=babel',
                        css:{
                            use: [ isProd ? 'style-loader' : MiniCssExtractPlugin.loader,'css-loader','postcss-loader' ],
                            fallback: 'vue-style-loader'
                        }
                    },
                }
            }]
        },{
            test: /\.js$/,
            use: [ {loader: 'cache-loader'}, 'happypack/loader?id=babel' ],
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
        },{
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../assets/'),
            use: [
                {
                    loader: 'url-loader',  //对于一些较小的文件采用base64编码
                    options: {
                        limit: 1024 * 4,   //对 4KB 以下文件进行处理（⚠️ ！ 但是会被打包到JS中）
                        fallback:{
                            loader: "file-loader",
                            options: {
                                name:'[name].[ext]',
                                publicPath:'../img',
                                outputPath:'./img'
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
                    publicPath:'../fonts',
                    outputPath:'./fonts'
                }
            }]
        }]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(path.resolve(__dirname,'../')),
            'process.env.VUE_APP_ENV': JSON.stringify(process.env.VUE_APP_ENV),
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV)
        }),
        new HappyPack({
            id: 'babel',
            cache: true,
            threads: UTILS.open_thread, //开几个线程去处理 
            loaders: [ 'cache-loader','babel-loader?cacheDirectory' ],// 2、babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
            //允许 HappyPack 输出日志 ,默认true
            //verbose: true,
            //threadPool: happyThreadPool,
        }),
        // 生成html页面
        ...UTILS.htmlPlugins()
    ]

}