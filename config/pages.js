module.exports = {
	index: {
        title:'龙虎榜首页',
		entry: './pages/index.js',
		template: './template/index.html',
		chunks:(chunks)=>{
            return chunks
        }
    },
    about:{
        title:'this about',
		entry: './pages/about.js',
		template: './template/index.html',
    },
}