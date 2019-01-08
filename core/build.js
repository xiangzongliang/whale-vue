const BASE = require('./base.js');


const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMerge = require('webpack-merge');




module.exports = (env, args) => {
    let webpackDevConfig = WebpackMerge(BASE,{
        module:{
            rules:[{
                    test: /\.(sa|sc|c)ss$/,
                    //exclude: /node_modules/,
                    //include: path.resolve(__dirname,'../'),
                    use: [ MiniCssExtractPlugin.loader,'css-loader','postcss-loader', 'sass-loader' ],
                },{
                    test: /\.less$/,
                    //exclude: /node_modules/,
                    //include: path.resolve(__dirname,'../'),
                    use: [ MiniCssExtractPlugin.loader ,'css-loader', 'postcss-loader', 'less-loader' ],
                }]
        },
        plugins:[
            //提取公共样式
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
                chunkFilename: 'css/[name].min.css',
            }),
        ]
    });
    return webpackDevConfig
}