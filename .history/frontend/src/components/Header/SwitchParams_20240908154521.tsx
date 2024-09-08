import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { api } from "@/config/api"; // Assurez-vous que le chemin est correct
import { IconNotifications } from "../icons";

// Fonction utilitaire pour convertir une clé de serveur en Uint8Array
const urlBase64ToUint8Array = (base64String: string) => {
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
const subscribeToNotifications = async (userId: string, groupId: string[]) => {
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

      const registration = await navigator.serviceWorker.ready;

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

      await api.post("/api/save-subscription", values, {
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
const unsubscribeFromNotifications = async (
  userId: string,
  groupId: string[]
) => {
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

        await api.delete(`/api/remove-subscription/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
    if (!userId || !groupId) {
      console.log("userId ou groupId manquant");
      return;
    }
    const checkSubscriptionStatus = async () => {
      try {
        const response = await api.get(`/api/check-subscription/${userId}`);
        console.log(response.data);

        setIsSubscribed(response.data);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);
      }
    };

    checkSubscriptionStatus();
  }, [userId, groupId]);

  const handleSwitchChange = async (checked: boolean) => {
    if (checked) {
      await subscribeToNotifications(userId, groupId);
    } else {
      await unsubscribeFromNotifications(userId, groupId);
    }
    setIsSubscribed(checked);
  };

  return (
    <div className="text-black flex gap-3 items-center justify-center ">
      <div className="text-black w-6 h-6 flex items-center justify-center">
        <IconNotifications />
      </div>
      <Switch
        className="bg-black text-red-500"
        checked={isSubscribed}
        onChange={handleSwitchChange}
      />
    </div>
  );
};

export default SwitchParams;
