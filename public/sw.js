/*
  Enhanced Service Worker for Next.js PWA
  - Installable app (with proper manifest & icons set by app)
  - Cache-first after first visit for pages, images, and static assets
  - Network-first with cache fallback for API
  - Avoids showing offline fallback if a page was visited before
  - Push notification display
*/

const VERSION = 'v2';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`; // Next build assets & JSON
const API_CACHE = `api-${VERSION}`;
const PAGES_CACHE = `pages-${VERSION}`; // HTML navigations
const IMAGES_CACHE = `images-${VERSION}`;

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
          if (![STATIC_CACHE, RUNTIME_CACHE, API_CACHE, PAGES_CACHE, IMAGES_CACHE].includes(key)) {
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
          const cache = await caches.open(PAGES_CACHE);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          // Try the exact page from cache
          const pageCache = await caches.open(PAGES_CACHE);
          const cached = await pageCache.match(request);
          if (cached) return cached;
          // Fallback to previously cached home page if available
          const home = await pageCache.match(new Request('/', { cache: 'reload' }));
          if (home) return home;
          // Last resort: static offline page
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

  // Cache images (cache-first after first load)
  const isImageRequest = request.destination === 'image' || /\.(png|jpg|jpeg|gif|webp|avif|svg)$/.test(url.pathname);
  if (isImageRequest) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(IMAGES_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch {
          // If image not cached and offline, return a tiny transparent PNG
          const transparentPng = new Response(
            Uint8Array.from([
              137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,31,21,196,
              137,0,0,0,10,73,68,65,84,120,156,99,0,1,0,0,5,0,1,13,10,44,10,0,0,0,0,73,69,78,68,174,66,96,130
            ]),
            { status: 200, headers: { 'Content-Type': 'image/png' } }
          );
          return transparentPng;
        }
      })()
    );
    return;
  }

  // Network-first strategy for API requests (Next API routes)
  const isLocalApi = url.hostname === self.location.hostname && url.pathname.startsWith('/api/');
  const isExternalUsersApi = url.hostname === 'dummyjson.com' && url.pathname.startsWith('/users');
  if (isLocalApi || isExternalUsersApi) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
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

  // Default: stale-while-revalidate for other GET requests
  if (request.method === 'GET') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((response) => {
            cache.put(request, response.clone());
            return response;
          })
          .catch(() => null);
        // Return cached if available, else wait for network
        return cached || (await fetchPromise) || new Response('Offline', { status: 503 });
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
  if (event.data && event.data.type === 'CLEAR_CACHES') {
    event.waitUntil(
      (async () => {
        await caches.delete(PAGES_CACHE);
        await caches.delete(API_CACHE);
        await caches.delete(IMAGES_CACHE);
        await caches.delete(RUNTIME_CACHE);
      })()
    );
  }
});