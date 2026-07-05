const CACHE = 'cardiorec-v19-timer-fix';
// Rutas relativas a este archivo (sw.js) — funcionan tanto si la app está
// en la raíz del dominio como en una subcarpeta (ej: usuario.github.io/repo/).
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      // cache.add() individual en vez de addAll(): si un solo archivo falla
      // (404, ruta incorrecta), no aborta la instalación completa del SW.
      Promise.all(ASSETS.map(url =>
        c.add(new Request(url, { cache: 'reload' })).catch(err => console.warn('SW: no se pudo cachear', url, err))
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.anthropic.com') ||
      e.request.url.includes('api.openai.com') ||
      e.request.url.includes('fonts.googleapis.com') ||
      e.request.url.includes('cdnjs.cloudflare.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
