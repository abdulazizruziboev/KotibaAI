const CACHE_NAME = 'kotiba-cache-v5';

const INITIAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(INITIAL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper to determine if a request is for an asset (JS, CSS, Font, Image)
function isAsset(url) {
  const ext = url.pathname.split('.').pop();
  return ['js', 'jsx', 'css', 'png', 'jpg', 'svg', 'woff2', 'json'].includes(ext) || 
         url.pathname.includes('/src/') || 
         url.pathname.includes('/node_modules/');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // SPA Navigation: Always try network first (to get latest App shell), fallback to cached index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // Asset Caching (Scripts, Components, Styles)
  // Skip Vite HMR
  if (url.pathname.includes('hmr') || url.pathname.includes('socket')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If found in cache, return it immediately (Cache First)
      // but also update it in the background (Stale-While-Revalidate pattern)
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy);
          });
        }
        return networkResponse;
      }).catch(() => {
        // network failure, return cached (even if null, let it fail gracefully)
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
