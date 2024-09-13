// public/service-worker.js

self.addEventListener("install", (event) => {
  console.log("Service Worker installé");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker intercepte une requête", event.request.url);
});
