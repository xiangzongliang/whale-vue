const BASE = require('./base.js');


const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
            //复制静态文件
            new CopyWebpackPlugin([{
                  from: path.resolve(__dirname, '../public'),
                  to: path.resolve(__dirname, '../build'),
              }]),
            //提取公共样式
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
                chunkFilename: 'css/[name].min.css',
            }),
        ]
    });
    return webpackDevConfig
}