var CACHE_NAME = 'v1.1.6';
var cacheFileList = [
    '/index.html',
    '/about.html',
    '/js/whale_about.js',
    '/js/whale_index.js',
    '/js/vendors_css.js',
    '/js/vendor.js',
    '/js/vue-vendor.js',
    '/js/index.js',
    '/js/about.js',
    '/img/github.png',
    '/vendors_css.min.css',
    '/index.min.css',
    '/about.min.css',
    '/fonts/calibri.ttf'
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

//当激活事件被触发的时候通过key一个很好的机会去清除过时的缓存
self.addEventListener('activate',event=>{
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                console.log(keys)
                return Promise.all(keys
                    .filter(function (key) {
                        return key !== CACHE_NAME;
                    })
                    .map(function (key) {
                        return caches.delete(key);
                    })
                );
            })
    );
})

self.addEventListener('fetch', event => {
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