var cacheName = 'v1';
var cacheFiles = [
    '../CourseWork2/',
    '../CourseWork2/login.html',
    '../CourseWork2/app.js ',
    '../CourseWork2/node.js ',
    '../CourseWork2/search.html ',
    '../CourseWork2/serviceworker.js',
    '../CourseWork2/manifest.json', 
    '../CourseWork2/user_success.html',
    '../CourseWork2/signup.html'

]


self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed")

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[Service] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(cachesNames.map(function(thisCacheName){
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    );
    // console.log("[ServiceWorker] Fetching", e.request.url);

    // e.respondWith(
    //     caches.match(e.request).then(function(response) {
    //         if ( response) {
    //             console.log("[ServiceWorker] Found in cache", e.request.url);
    //             return response;
    //         }

    //         return fetch(e.request);
    //     })
    // )
});