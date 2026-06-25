const CACHE = 'politq-v1';
const ASSETS = [
  '/index.html',
  '/feed.html',
  '/chat.html',
  '/messages.html',
  '/compass.html',
  '/profile.html',
  '/friends.html',
  '/settings.html',
  '/support.html',
  '/shared.js',
  '/layout.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  // Always go network first for Firebase calls
  if(e.request.url.includes('firebase') || e.request.url.includes('googleapis')){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached){
      return cached || fetch(e.request).then(function(resp){
        var clone = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        return resp;
      });
    })
  );
});
