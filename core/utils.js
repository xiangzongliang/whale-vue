const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const open_thread = os.cpus().length;  //计划开启几个线程处理

const PAGES = require('../config/pages');


//页面的计算
const w_pages = (env) => {
    let callback_pages = {}
    for(k in PAGES){
        callback_pages[k] = PAGES[k].entry
    }
    return callback_pages
}



const isTypeof = agu =>{
    //let isobj = /^(number|string|undefined)$/
    if(agu instanceof Array){
        return 'arr'
    }else if(agu instanceof Function){
        return 'fun'
    }else if(agu instanceof RegExp){
        return 'reg'
    }else{
        return 'nono'
    }
}


//html-webpack-plugin
const w_htmlPlugin = () =>{
    let htmlPlugin = []
    for(k in PAGES){
        let default_chunks = ['common','vue-vendor','charts','vendor',`${k}`,`whale_${k}`,'vendors_css'],
            chunks = [],
            excludeChunks = [];

        /**
         * 自定义 chunks
         * type : array | function
         */
        if(PAGES[k].chunks){
            let chunksType = isTypeof(PAGES[k].chunks);

            if(chunksType === 'arr'){
                chunks = PAGES[k].chunks
            }else if(chunksType === 'fun'){
                chunks = PAGES[k].chunks(default_chunks) 
                if(!(isTypeof(chunks) === 'arr' && chunks.length >0)){ //如果方法没有返回对应的数组则使用默认值
                    chunks = default_chunks
                }
            }else{
                chunks = default_chunks
            } 
        }else{
            chunks = default_chunks
        }


        /**
         * html-webpack-plugin ==> excludeChunks
         * type : array | function | RegExp 
         */
        if(PAGES[k].excludeChunks){
            let ecType = isTypeof(PAGES[k].excludeChunks);
            if(ecType === 'arr'){
                excludeChunks = PAGES[k].excludeChunks
            }else if(ecType === 'fun'){
                excludeChunks = PAGES[k].excludeChunks(default_chunks)
                if(!(isTypeof(excludeChunks) === 'arr' && excludeChunks.length>0)){ //如果方法没有返回值
                    excludeChunks = []
                }
            }else if(ecType === 'reg'){ //如果是正则表达式
                default_chunks.map((val,key)=>{
                    if(PAGES[k].excludeChunks.test(val)){
                        excludeChunks.push(val)
                    }
                })
            }
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
            excludeChunks: excludeChunks,
            favicon:PAGES[k].favicon || ''
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
    htmlPlugins: w_htmlPlugin
}