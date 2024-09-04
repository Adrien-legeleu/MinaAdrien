self.addEventListener("push", function (event: PushEvent) {
  // Typage explicite de `event`
  const data = event.data?.json(); // Utilisation de `?` pour s'assurer que `data` existe
  self.registration.showNotification(data.title, {
    body: data.message,
  });
});
