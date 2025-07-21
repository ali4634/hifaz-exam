 const CACHE_NAME = 'hifaz-exam-cache-v2'; // ورژن تبدیل کیا تاکہ پرانا کیش اپڈیٹ ہو
const REPO_NAME = '/hifaz-exam/'; // <-- اپنی ریپوزٹری کا نام یہاں لکھیں

const URLS_TO_CACHE = [
  REPO_NAME,
  REPO_NAME + 'index.html',
  REPO_NAME + 'manifest.json',
  REPO_NAME + 'icon-192x192.png',
  REPO_NAME + 'icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf-autotable.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
