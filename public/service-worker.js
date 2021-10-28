const FILES_TO_CACHE = [
    "/",
    "./index.html",
    "./css/styles.css",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png",
    "./js/idb.js",
    "./js/index.js"
]

const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', function(i) {
    i.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function (a) {
    a.waitUntil(
        caches.keys().then(keyList => {
            let cacheKeeplist = keyList.filter(key => {
                return key.indexOf(APP_PREFIX)
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map((key, i) => {
                    if(cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function (f) {
    f.respondWith(
        caches.match(f.request).then(request => {
            return request || fetch(f.request)
        })
    )
})