/**
 * Service Worker
 * Handles offline caching for PWA
 */

const CACHE_NAME = 'aportes-periodicos-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/components.css',
    '/css/responsive.css',
    '/js/i18n.js',
    '/js/formatter.js',
    '/js/storage.js',
    '/js/calculator.js',
    '/js/app.js',
    '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
