// src/pages/_app.tsx

import "../styles/globals.css"; // Assure-toi que tes styles globaux sont importés ici
import { useEffect } from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  useEffect(() => {
    // Vérifie si les Service Workers sont supportés par le navigateur
    if ("serviceWorker" in navigator) {
      // Enregistre le service worker
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès:", registration);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'enregistrement du Service Worker:",
            error
          );
        });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
