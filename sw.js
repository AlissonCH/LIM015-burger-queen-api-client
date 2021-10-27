/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'v1_cache_programador_fitness';
const urlsToCache = [
  './static/css/main.c54c1807.chunk.css',
  './static/css/main.c54c1807.chunk.css.map',
  './static/js/2.0b4e5958.chunk.js',
  './static/js/2.0b4e5958.chunk.js.LICENSE.txt',
  './static/js/2.0b4e5958.chunk.js.map',
  './static/js/main.aa2c8223.chunk.js',
  './static/js/main.aa2c8223.chunk.js.map',
  './static/js/runtime-main.8f1c5824.js',
  './static/js/runtime-main.8f1c5824.js.map',
  './static/media/background.7ff1a916.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting());
      })
      .catch((err) => console.log('Falló registro de cache', err)),
  );
});

// una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión

self.addEventListener('activate', (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim()),
  );
});

// cuando el navegador recupera una url
self.addEventListener('fetch', (e) => {
  // Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then((res) => {
        if (res) {
          // recuperar del cache
          return res;
        }
        // recuperar de la petición a la url
        return fetch(e.request);
      }),
  );
});
