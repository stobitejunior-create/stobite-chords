// Offline support: network first, fall back to the cached copy.
const CACHE = 'stobite-chords-v35';
const ASSETS = ['./', 'index.html', 'styles.css', 'app.js', 'config.js', 'songs.js', 'manifest.webmanifest', 'icon.svg', 'apple-touch-icon.png', 'icon-512.png', 'digit-model.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Network first, but a slow or half-dead connection (church wifi) falls back to the saved copy after 4 seconds.
const fromCache = (req) => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./'));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const net = fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  });
  const slow = new Promise((resolve) => setTimeout(() => fromCache(e.request).then((r) => r && resolve(r)), 4000));
  e.respondWith(Promise.race([net, slow]).catch(() => fromCache(e.request)));
});
