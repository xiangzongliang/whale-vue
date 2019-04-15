const BASE = require('./base.js');


const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackMerge = require('webpack-merge');


module.exports = (env, args) => {
    let webpackDevConfig = WebpackMerge(BASE,{
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
            // new BundleAnalyzerPlugin({
            //     defaultSizes:'gzip',
            //     logLevel:'warn'
            // }),
        ]
    });
    return webpackDevConfig
}