var CACHE_NAME = '这是一个缓存';
var urlsToCache = [
    '/admin.js'
];
self.addEventListener('install', function(event) {
	console.log('被安装之后触发事件')
	  

    event.waitUntil( // event.waitUtil 用于在安装成功之前执行一些预装逻辑
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('waiting',event=>{
	console.log('进入了等待状态')
})


self.addEventListener('activate',event=>{
	console.log('进入了激活状态')
})

self.addEventListener('fetch', event => {
	console.log('浏览器发起请求了')
})
