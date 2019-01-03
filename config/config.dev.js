const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");    //抽离并提取公共样式
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');      //分离出webpack编译运行时的代码，也就是我们先前称为manifest的代码块
const StatsPlugin = require('stats-webpack-plugin');    //生成 analyse 分析文件
const webpack = require('webpack'); //访问内置的插件
const HappyPack = require('happypack');
const path = require('path');
const os = require('os');

const OPEN_THREAD = os.cpus().length * 2;  //计划开启几个线程处理
console.log(`开启了${OPEN_THREAD}个线程处理项目`);

let isProd = process.env.APP_ENV === 'dev'



module.exports = {
    mode: process.env.APP_ENV == 'dev' ? 'development' : 'production', //production  development
    target: 'web',// 'web', // <=== 默认是 'web'，可省略
    entry: {
        index:'./pages/index.js',
        about:'./pages/about.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, '../build')
    },
    resolve:{
        modules: [path.resolve(__dirname,'../node_modules')],  //指明包模块的加载路径，避免层层查找的消耗
        alias: {
            '@':path.resolve(__dirname, '../'),
            //'vue':path.resolve(__dirname,'../node_modules/vue/dist/vue.min.js'), //直接手动引入，就不会加载package中的main对应的文件，并减少递归操作
        },
        extensions:['.js','.vue','.json'],
        //noParse:(content)=> { 
            // 返回true或false 
            //return /jquery|chartjs/.test(content); 
        //}
    },
    optimization: { //优化
        minimize: true,  //告诉webpack使用UglifyjsWebpackPlugin最小化捆绑包。
        runtimeChunk:true,
        namedModules: true,
        noEmitOnErrors: true,       //在 webpack 编译代码出现错误时并不会退出 webpack 
        runtimeChunk:{  // 仅包含运行时的每个入口点添加一个额外的块  也就是 manifest 文件块
            name: entrypoint => {
                return `whale_${entrypoint.name}`
            }
        }, 
        splitChunks: {
            cacheGroups: { //缓存组 ,可以替换默认的配置
                //default:false, //将最少重复引用两次的模块放入default中
                vendors: {
                    test: /[\\/]node_modules[\\/]/, //匹配过滤  合并了node_modoles的js
                    chunks: 'initial',      //initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: 'vendors',        //拆分块的名称
                    //minSize: 1024*10,     //表示在压缩前的最小模块大小，默认为0；
                    //minChunks: 1,         //表示被引用次数，默认为1；
                    //maxAsyncRequests:     //最大的按需(异步)加载次数，默认为1；
                    //maxInitialRequests:   //最大的初始化加载次数，默认为1；
                    priority: 10             // 该配置项是设置处理的优先级，数值越大越优先处理
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
        }
    },
    module:{
        noParse:/^(vue|vue-router|vuex|vuex-router-sync|lodash)$/, //忽略大型的 library 可以提高构建性能
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
            use: [{
                    loader: 'cache-loader',
                },{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'happypack/loader?id=babel',
                        css:{
                            use: [ MiniCssExtractPlugin.loader,'css-loader','postcss-loader' ],
                            fallback: 'vue-style-loader'
                        }
                    },
                }
            }]
        },{
            test: /\.js$/,
            use: [ {loader: 'cache-loader'},'happypack/loader?id=babel' ],
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
        },{
            test: /\.(sa|sc|c)ss$/,
            use: [ MiniCssExtractPlugin.loader,'css-loader','postcss-loader', 'sass-loader' ],
        },{
            test: /\.less$/,
            use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'less-loader' ],
        },{
            test: /\.(png|jpg|jpeg|gif|)$/,
            use: [
                {
                    loader: 'url-loader',  //对于一些较小的文件采用base64编码
                    options: {
                        limit: 1024 * 4,   //对 4KB 以下文件进行处理（⚠️ ！ 但是会被打包到JS中）
                        fallback:{
                            loader: "file-loader",
                            options: {
                                name:'[name].[ext]',
                                publicPath:'./img',
                                outputPath:'./img'
                            }
                        },
                        
                    }
                }
            ]
        }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'babel',
            //cache: false,
            threads:OPEN_THREAD, //开几个线程去处理 
            loaders: [ 'cache-loader','babel-loader?cacheDirectory' ],// 2、babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
        }),

  
        // 抽取出代码模块的映射关系
        new HtmlWebpackPlugin({
            title:'this index',
            chunks:['index','common','vendors','whale_index','vendors_css'],
            filename:'index.html',
            minify:true,    //对html进行压缩,默认false
            hash:true,      //默认false
            template: './template/index.html',
            chunksSortMode:"dependency"
            /**
             * 'dependency' 按照不同文件的依赖关系来排序。
             * 'auto' 默认值，插件的内置的排序方式，具体顺序我也不太清楚...
             * 'none' 无序？ 不太清楚...
             * 'function' 提供一个函数！！复杂...
             */
            //hash:true,  //开启 hash 则会在文件后面增加 hash 
        }),
        new HtmlWebpackPlugin({
            title:'this about',
            chunks:['about','common','vendors','whale_about','vendors_css'],
            filename:'about.html',
            template: './template/index.html'
        }),

        //new InlineManifestWebpackPlugin(['whale_index','whale_about']),     //将 manifest 代码块直接插入到html中,也就是 runtime ~ xxx.js 来减少一次请求
 


        //提取公共样式
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].css' : '[name].css',
            chunkFilename: isProd ? '[name].css' : '[name].css',
        }),

        new webpack.NamedModulesPlugin(),  //显示被热更新的模块名称
        new webpack.HotModuleReplacementPlugin({
            options:{},
            multiStep:undefined, //设置为 true 时(不要随意改成true)，插件会分成两步构建文件。首先编译热加载 chunks，之后再编译剩余的通常的资源。
            fullBuildTimeout:200,   //当 multiStep 启用时，表示两步构建之间的延时。
            requestTimeout:10000
        }),

        //生成 https://webpack.github.io/analyse/ 分析文件
        new StatsPlugin('../analyse.json', {
            chunkModules: true,
            exclude: [/node_modules[\\\/]vue/]
        }),
        // new BundleAnalyzerPlugin({
        //     defaultSizes:'gzip',
        //     logLevel:'warn'
        // })
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
            aggregateTimeout:500,// 监听到变化后等300ms再去执行动作
            ignored:/node_modules/,// 不监听的文件或文件夹，支持正则匹配
            poll: 1000,// 默认每秒询问1000次
        },
        overlay: {      //当存在编译器错误或警告时，在浏览器中显示全屏覆
            warnings: true,
            errors: true
        },
        open:true,      //启动服务时自动打开页面
        //openPage:'',  //指定在打开浏览器时导航到的页面。

        progress:true, //将运行进度输出到控制台。

        // https: {
        //     key: fs.readFileSync("/path/to/server.key"),
        //     cert: fs.readFileSync("/path/to/server.crt"),
        //     ca: fs.readFileSync("/path/to/ca.pem"),
        // },
        contentBase:path.join(__dirname,'../public'),     //静态资源目录
        //统计信息
        stats:{
            
        },
        //代理
        proxy:{

        },
        setup:(app)=>{
            //接受 express应用程序对象
        },
        after:(app)=>{

        },
    },
};