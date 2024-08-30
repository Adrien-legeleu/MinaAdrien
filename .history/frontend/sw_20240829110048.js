self.addEventListener("push", (event: PushEvent) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notification", {
    body: data.message || "Vous avez une nouvelle notification.",
    icon: data.icon || "/default-icon.png", // Remplace avec un icône par défaut ou spécifie l'icône
  });
});
