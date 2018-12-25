const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽离CSS
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack'); //访问内置的插件
const HappyPack = require('happypack');
const path = require('path');
// const pages = require('./pages');

module.exports = {
    mode: process.env.VUE_ENV == 'dev' ? 'development' : 'production', //production  development
    target: 'node',// 'web', // <=== 默认是 'web'，可省略
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
    performance:{ //性能
        hints:'warning', //false | warning | error 当找到提示时，告诉 webpack 抛出一个错误或警告。默认 warning
        //maxEntrypointSize:250000,
        //maxAssetSize:250000
    },
    optimization: { //优化
        minimize: true,  //告诉webpack使用UglifyjsWebpackPlugin最小化捆绑包。
        runtimeChunk:true,
        namedModules: true,
        splitChunks: {
            cacheGroups: { //缓存组 ,可以替换默认的配置
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
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
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'happypack/loader?id=babel',
                        css:ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    },
                }
            }]
        },{
            test: /\.js$/,
            use: 'happypack/loader?id=babel',
            exclude: /node_modules/,
            include: path.resolve(__dirname,'../'),
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader'
                    }
                ]
            })
        }]
    },
    // resolveLoader:{
    //     module:['node_modules']
    // },
    externals:{
        // vue: "Vue",
    },
    plugins:[
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'babel',
            //cache: false,
            threads:8, //开几个线程去处理 
            loaders: [ 'babel-loader?cacheDirectory' ],// 2、babel-loader支持缓存转换出的结果，通过cacheDirectory选项开启
        }),
  
        // 抽取出代码模块的映射关系
        new HtmlWebpackPlugin({
            title:'this index',
            chunks:['index','runtime~index','commons'],
            filename:'index.html',
            template: './template/index.html',
            hash:true,  //开启 hash 则会在文件后面增加 hash 
        }),
        new HtmlWebpackPlugin({
            title:'this about',
            chunks:['about','runtime~about','commons'],
            filename:'about.html',
            template: './template/index.html'
        }),


        //抽离CSS
        new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true}),

        new webpack.NamedModulesPlugin(),  //显示被热更新的模块名称
        new webpack.HotModuleReplacementPlugin({
            options:{},
            multiStep:true, //设置为 true 时，插件会分成两步构建文件。首先编译热加载 chunks，之后再编译剩余的通常的资源。
            fullBuildTimeout:200,   //当 multiStep 启用时，表示两步构建之间的延时。
            requestTimeout:10000
        }),
        // new webpack.optimize.AggressiveSplittingPlugin({
        //     minSize: 30720, // 字节，分割点。默认：30720
        //     maxSize: 51200, // 字节，每个文件最大字节。默认：51200
        //     chunkOverhead: 0, // 默认：0
        //     entryChunkMultiplicator: 1, // 默认：1
        // })

        
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require("./manifest.json"),
        //     name: "./my-dll.js",
        //     scope: "xyz",
        //     sourceType: "commonjs2"
        // }),
        
        // new BundleAnalyzerPlugin({
        //     defaultSizes:'gzip',
        //     logLevel:'warn'
        // })
    ],
    devServer:{
        host:'localhost',
        port:8088,
        compress:true,  //gzip
        hot:true,       //热更新
        //hotOnly:true,
        inline:true,
        watchOptions:{
            aggregateTimeout:500,// 监听到变化后等300ms再去执行动作
            ignored:/node_modules/,// 不监听的文件或文件夹，支持正则匹配
            poll: 1000,// 默认每秒询问1000次
        },
        contentBase:path.join(__dirname,'../public'),     //静态资源目录
        //统计信息
        stats:{
            
        }
    }
};