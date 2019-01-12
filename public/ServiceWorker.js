//使用 Service Workers实现文件缓存技术
if (navigator.serviceWorker) {
    // window.addEventListener('DOMContentLoaded',function(){
    //     navigator.serviceWorker.register('./ServiceWorker.js',{scope: '/'}).then(function(registration) {
    //         console.log('ServiceWorker 注册成功 ', registration.scope);
    //     }).catch(function(err) {
    //         console.log('Service Worker 注册失败 failed: ', err);
    //     });
    // })
}




var CACHE_NAME = 'geiwugaf32giu3gru';
var cacheFileList = [
    '/index.html',
    '/js/index.chunk.js',
    '/js/vendor.chunk.js',
    '/js/common.chunk.js',
    '/js/vendors_css.chunk.js',
    '/js/whale_index.bundle.js',
    '/img/big_icon.png',
]
self.addEventListener('install', function(event) {
    console.log('被安装之后触发事件')
    // caches.delete(cacheFileList)
    event.waitUntil( // event.waitUtil 用于在安装成功之前执行一些预装逻辑
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(cacheFileList);
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
    event.respondWith(
        //去缓存中查询对应的请求
        caches.match(event.request).then(response=>{
            if(response){
                return response
            }
            //否则就用fetch下载资源
            return fetch(event.request)
        })
    )
})
