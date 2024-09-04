declare var self: ServiceWorkerGlobalScope;

self.addEventListener("push", function (event: any) {
  const data = event.data?.json();
  self.registration.showNotification(data.title, {
    body: data.message,
  });
});
