var CACHE_NAME = '这是一个缓存';
var urlsToCache = [
    '/admin.js'
];
console.log(self)
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    })
  );
});
