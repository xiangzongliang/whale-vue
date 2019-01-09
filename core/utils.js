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
        let default_chunks = ['common','vue-vendor','charts','vendor',`${k}`,`whale_${k}`,'vendors_css'],
            chunks = [],
            excludeChunks = [];


        //自定义 chunks
        if(PAGES[k].chunks){
            if(PAGES[k].chunks instanceof Array){
                chunks = PAGES[k].chunks
            }else if(PAGES[k].chunks instanceof Function){
                chunks = PAGES[k].chunks(default_chunks) 
                if(!(chunks instanceof Array && chunks.length >0)){ //如果方法没有返回对应的数组则使用默认值
                    chunks = default_chunks
                }
            }else{
                chunks = default_chunks
            }
            
        }


        //需要自定义排除的 chunks, 也就是 html-webpack-plugin自带的 excludeChunks 功能
        if(PAGES[k].excludeChunks){

        }



        htmlPlugin.push(new HtmlWebpackPlugin({
            title: PAGES[k].title || 'title',
            chunks: chunks,
            filename:`${k}.html`,
            minify: {
                removeComments: true,       //Strip HTML comments
                collapseWhitespace: true,   //折叠有助于文档树中文本节点的空白区域
            },    //对html进行压缩,默认false
            hash: PAGES[k].hash === true ? true : false,      //默认false
            template: PAGES[k].template,
            excludeChunks: excludeChunks
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