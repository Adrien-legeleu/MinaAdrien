// public/service-worker.js
self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log("Notification reçue", data);

  const options = {
    body: data.body,
    icon: data.icon || "/default-icon.png",
    image: data.image || undefined,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("install", (event) => {
  console.log("Service Worker installé");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker intercepte une requête", event.request.url);
});
