module.exports = {
	index: {
        title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架',
		entry: './pages/introduction.js',
		template: './template/index.html',
        //chunks
        //excludeChunks
    },
    doc:{
        title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架 - 文档',
		entry: './pages/doc.js',
		template: './template/index.html',
    },
    support:{
        title:'whale-vue 基于 webpack4 的 vue 大型多页项目脚手架 - 支持',
        entry: './pages/support.js',
		template: './template/index.html',
    }
}