//使用 Service Workers实现文件缓存技术
if (navigator.serviceWorker) {
    window.addEventListener('DOMContentLoaded',function(){
        navigator.serviceWorker.register('./sw.js',{scope: '/whale/'}).then(function(registration) {
            console.log('ServiceWorker install success , path:', registration.scope);
        }).catch(function(err) {
            console.log('Service Worker failed: ', err);
        });
    })
}
