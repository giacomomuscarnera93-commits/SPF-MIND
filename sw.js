// Minimal service worker — its only job is to exist and respond to fetch,
// which is what Chrome/Android require before offering "Install app"
// instead of the plain "Add to Home screen" shortcut.
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
