const CACHE_NAME = 'cache-v1';
const urlsToCache = [
  'dev_mobile_grid_css/',
  'dev_mobile_grid_css/index.html',
  'dev_mobile_grid_css/style.css',
  'dev_mobile_grid_css/script.js',
  'dev_mobile_grid_css/public/images/pizzaBacon.png',
  'dev_mobile_grid_css/public/images/pizzaBanner.jpg',
  'dev_mobile_grid_css/public/images/pizzaBrocolis.png',
  'dev_mobile_grid_css/public/images/pizzaCalabresa.png',
  'dev_mobile_grid_css/public/images/pizzaCarne.png',
  'dev_mobile_grid_css/public/images/pizzaChocolate.png',
  'dev_mobile_grid_css/public/images/pizzaFrango.png',
  'dev_mobile_grid_css/public/images/pizzaLogo.webp',
  'dev_mobile_grid_css/public/images/pizzaPepperoni.png',
  'dev_mobile_grid_css/public/images/pizzaQueijo.png',
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