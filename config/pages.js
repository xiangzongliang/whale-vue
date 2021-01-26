module.exports = {
    index: {
        title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架',
	    entry: './pages/index/index.js',
	    template: './template/index.html',
        //chunks  //function(...list) | array    手动注入 chunks 支持
        //favicon
        //excludeChunks  //function(...list) | array | RegExp  手动排除不需要的 chunks 
        //htmlOutputPath // string  将 ***.html 文件输出到指定的路径,相对路径,必须以 / 结尾,例: '../newPage/'
    },
    about: {
        title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架',
	    entry: './pages/about/about.js',
	    template: './template/index.html',
    }
}