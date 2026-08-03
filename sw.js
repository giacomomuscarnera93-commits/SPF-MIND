// Minimal service worker — its only job is to exist and respond to fetch,
// which is what Chrome/Android require before offering "Install app"
// instead of the plain "Add to Home screen" shortcut.
//
// It deliberately does NOT cache anything, and forces every request to go
// to the network with cache-busting, so the installed app always shows the
// latest deployed version instead of a stale cached copy.
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.map(function(n){ return caches.delete(n); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(function(){
      return fetch(event.request);
    })
  );
});
