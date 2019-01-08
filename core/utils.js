const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const open_thread = os.cpus().length;  //计划开启几个线程处理


const PAGES = require('../config/pages');

//页面的计算
const w_pages = () => {
    let callback_pages = {}
    for(k in PAGES){
        callback_pages[k] = PAGES[k].entry
    }
    return callback_pages
}

//插件的使用
const w_plugins = (env) =>{

}

//html-webpack-plugin
const w_htmlPlugin = () =>{
    let htmlPlugin = []
    for(k in PAGES){
        htmlPlugin.push(new HtmlWebpackPlugin({
            title: PAGES[k].title || '',
            chunks:[`${k}`,'common','vue-vendor','charts','vendor',`whale_${k}`,'vendors_css'],
            filename:`${k}.html`,
            minify:true,    //对html进行压缩,默认false
            //hash:false,      //默认false
            template: PAGES[k].template || '',
            // chunksSortMode:"dependency"
            /**
             * 'dependency' 按照不同文件的依赖关系来排序。
             * 'auto' 默认值，插件的内置的排序方式，具体顺序我也不太清楚...
             * 'none' 无序？ 不太清楚...
             * 'function' 提供一个函数！！复杂...
             */
        }))
    }
    return htmlPlugin
}


module.exports = {
    open_thread,
    pages: w_pages,
    plugins: w_plugins,
    htmlPlugins: w_htmlPlugin
}