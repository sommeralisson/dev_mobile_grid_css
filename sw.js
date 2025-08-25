const CACHE_NAME = 'cache-v1';
const urlsToCache = [
  'dev_mobile_grid_css/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/public/images/pizzaBacon.png',
  '/public/images/pizzaBanner.jpg',
  '/public/images/pizzaBrocolis.png',
  '/public/images/pizzaCalabresa.png',
  '/public/images/pizzaCarne.png',
  '/public/images/pizzaChocolate.png',
  '/public/images/pizzaFrango.png',
  '/public/images/pizzaLogo.webp',
  '/public/images/pizzaPepperoni.png',
  '/public/images/pizzaQueijo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta do cache se encontrada
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      })
  );
});

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