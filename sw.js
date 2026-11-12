// Service worker de Blackcrest Solver.
// Il ne contrôle que les pages de son dossier et ne supprime que ses propres caches.
const VERSION = "1.21";
const CACHE = "blackcrest-solver-" + VERSION;
const PREFIX = "blackcrest-solver-";
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];
const SCOPE = new URL("./", self.location).pathname; // dossier du service worker

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  // ne supprime QUE les anciennes versions de nos propres caches
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // polices Google : cache, puis mise à jour en arrière-plan
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // tout ce qui n'est pas dans /Blackcrest/ : on laisse passer sans y toucher
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;

  // page : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
  if (req.mode === "navigate") {
    event.respondWith(
      // « no-cache » : toujours revérifier auprès du serveur (Nginx n'envoie pas d'en-tête de cache)
      fetch(new Request(req.url, { cache: "no-cache", credentials: "same-origin" })).then(r => { const copy = r.clone(); if (r.ok) caches.open(CACHE).then(c => c.put("./index.html", copy)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // icônes, manifeste : cache d'abord
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
