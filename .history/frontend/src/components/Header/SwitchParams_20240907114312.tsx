import React, { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { api } from "@/config/api";

// Fonction utilitaire pour convertir une clé de serveur en Uint8Array
const urlBase64ToUint8Array = (base64String: any) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

// Fonction pour s'abonner aux notifications
const subscribeToNotifications = async (userId: any, groupId: any) => {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  ) {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Permission de notification refusée");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");

      const applicationServerKey = urlBase64ToUint8Array(
        "BPGBMl5l1FpyfndWdUX71M0bgEd0yBv6ollSofR9ygAn0YRGdtiWUBHyafQzYboH_uFCVsC-YbIMhItpNsBYg1Q"
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      const values = {
        userId,
        groupId,
        subscription,
      };
      console.log(values);

      await api.post("/api/save-subscription", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Inscription réussie:", subscription);
    } catch (error) {
      console.error("Erreur lors de l'inscription aux notifications:", error);
    }
  }
};

// Fonction pour se désabonner des notifications
const unsubscribeFromNotifications = async (userId: any, groupId: any) => {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  ) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        const values = {
          userId,
          groupId,
        };

        await fetch("/api/remove-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });

        console.log("Désinscription réussie");
      } else {
        console.log("Aucune souscription trouvée");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la désinscription des notifications:",
        error
      );
    }
  }
};

const SwitchParams = ({ userId, groupId }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Vérifiez l'état d'abonnement lors du chargement du composant
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await fetch(
          `/api/check-subscription/${userId}?groupId=${groupId}`
        );
        const data = await response.json();
        setIsSubscribed(data.isSubscribed);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);
      }
    };

    checkSubscriptionStatus();
  }, [userId, groupId]);

  const handleSwitchChange = async (isChecked: any) => {
    if (isChecked) {
      await subscribeToNotifications(userId, groupId);
    } else {
      await unsubscribeFromNotifications(userId, groupId);
    }
    setIsSubscribed(isChecked);
  };

  return (
    <div>
      <Switch
        checked={isSubscribed}
        onChange={(e) => handleSwitchChange(e.target.checked)}
      >
        Notifications
      </Switch>
    </div>
  );
};

export default SwitchParams;
