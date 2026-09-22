/**
 * MandiMitra PWA — High-Performance Offline Service Worker
 * Enables instant offline loading for farmers in remote rural APMC mandis.
 */

const CACHE_NAME = 'mandimitra-v2.3.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './static/css/glossy-theme.css',
  './static/css/design-system.css',
  './static/css/farmer.css',
  './static/css/staff.css',
  './static/css/admin.css',
  './static/js/reactApp.jsx',
  './static/icons/icon-192.png',
  './static/icons/icon-512.png',
  './static/icons/icon-192.svg',
  './static/icons/icon-512.svg'
];

// Install Event — Force skip waiting to activate latest version immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching v2.3.0');
      return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' }))).catch(err => {
        console.warn('[ServiceWorker] Pre-cache warning:', err);
      });
    })
  );
});

// Activate Event — Delete ALL stale caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Always fetch from Network FIRST so latest updates reflect immediately
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
        });
      })
  );
});
