const BASE = require('./base.js');


const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackMerge = require('webpack-merge');


module.exports = (env, args) => {
    const webpackDevConfig = WebpackMerge(BASE,{
        module:{
            rules:[{
                test: /\.(sa|sc|c)ss$/,
                use: [ MiniCssExtractPlugin.loader,'css-loader','postcss-loader', 'sass-loader' ],
            },{
                test: /\.less$/,
                use: [ MiniCssExtractPlugin.loader ,'css-loader', 'postcss-loader', 'less-loader' ],
            }]
        },
        plugins:[
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../public'),
                to: path.resolve(__dirname, '../build'),
            }]),
            new MiniCssExtractPlugin({
                filename: './[name].min.css',
                chunkFilename: './[name].min.css',
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,  //A regular expression that indicates the names of the assets that should be optimized \ minimized. The regular expression provided is run against the filenames of the files exported by the ExtractTextPlugin instances in your configuration, not the filenames of your source CSS files. Defaults to /\.css$/g
                cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是遵循
                cssProcessorOptions: {}, //传递给的选项cssProcessor，默认为{}
                cssProcessorPluginOptions: {
                  preset: ['default', { discardComments: { removeAll: true } }], //丢弃注释
                },
                canPrint: true //一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true
            }),
            new BundleAnalyzerPlugin({
                defaultSizes:'gzip',
                logLevel:'warn'
            }),
        ]
    });
    return webpackDevConfig
}