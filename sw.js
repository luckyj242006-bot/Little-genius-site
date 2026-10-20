const CACHE = 'little-genius-v4';
const FILES = ['./', 'index.html', 'app.js', 'strings.js', 'content-basics.js', 'content-topics.js', 'content-stories.js', 'strings-extra.js', 'content-adv-epics.js', 'content-adv-world.js', 'content-extra.js', 'app-adv.js', 'app-puzzles.js', 'boot.js', 'fonts/Baloo2-VariableFont_wght.ttf', 'fonts/Nunito-VariableFont_wght.ttf', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit ||
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match('index.html'))
    )
  );
});
