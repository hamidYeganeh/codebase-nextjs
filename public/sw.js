/*
  Basic Service Worker for Next.js PWA
  - Offline support for navigation with fallback
  - Cache-first for static assets
  - Stale-while-revalidate for Next build assets
  - Network-first for API requests with cache fallback
  - Push notification display
*/

const VERSION = 'v1';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const API_CACHE = `api-${VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons/icon.svg',
  '/icons/maskable-icon.svg',
  '/next.svg',
  '/vercel.svg',
  '/globe.svg',
  '/file.svg',
  '/window.svg',
  '/scrum-process.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (![STATIC_CACHE, RUNTIME_CACHE, API_CACHE].includes(key)) {
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

function urlStartsWith(url, prefix) {
  try {
    return new URL(url).pathname.startsWith(prefix);
  } catch {
    return false;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match('/offline.html');
          return offline || new Response('Offline', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  const url = new URL(request.url);

  // Cache Next.js build assets with cache-first
  if (urlStartsWith(request.url, '/_next/') || url.hostname === self.location.hostname && url.pathname.startsWith('/_next/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      })()
    );
    return;
  }

  // Cache static assets from public with cache-first
  if (url.hostname === self.location.hostname && STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      })()
    );
    return;
  }

  // Network-first strategy for API requests (Next API routes)
  if (url.hostname === self.location.hostname && url.pathname.startsWith('/api/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);
        try {
          const networkResponse = await fetch(request);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await cache.match(request);
          if (cached) return cached;
          return new Response(JSON.stringify({ error: 'Offline' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
        }
      })()
    );
    return;
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const dataText = event.data ? event.data.text() : '';
  let payload = {};
  try {
    payload = JSON.parse(dataText);
  } catch {
    payload = { title: dataText || 'Notification', body: '' };
  }

  const title = payload.title || 'Notification';
  const body = payload.body || '';
  const badge = payload.badge || '/icons/maskable-icon.svg';
  const icon = payload.icon || '/icons/icon.svg';
  const url = payload.url || '/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge,
      data: { url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/';
  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const client = allClients.find((c) => c.url === url);
      if (client) {
        return client.focus();
      }
      return self.clients.openWindow(url);
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});