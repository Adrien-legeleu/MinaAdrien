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
  console.log("suscribeeee");

  if (typeof window !== "undefined") {
    console.log("suscribeeezez eze eze ");

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Permission de notification non accordée");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      console.log("Service Worker prêt", registration);

      const applicationServerKey = urlBase64ToUint8Array(
        "BPGBMl5l1FpyfndWdUX71M0bgEd0yBv6ollSofR9ygAn0YRGdtiWUBHyafQzYboH_uFCVsC-YbIMhItpNsBYg1Q"
      );

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      console.log("Inscription aux notifications réussie", subscription);

      const values = {
        userId,
        groupId,
        subscription,
      };

      const response = await api.post("/api/save-subscription", values);
      console.log("Abonnement sauvegardé avec succès" + response.data);
    } catch (error) {
      console.error("Erreur lors de l'inscription aux notifications:", error);
    }
  }
};

// Fonction pour se désabonner des notifications
const unsubscribeFromNotifications = async (userId: string) => {
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
        console.log("Désinscription aux notifications réussie");

        await api.delete(`/api/remove-subscription/${userId}`);
        console.log("Abonnement supprimé du backend avec succès");
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
    if (!userId) {
      console.log("Switch: userId non trouvé");
      return;
    }
    console.log("Switch: userId trouvé");

    const checkSubscriptionStatus = async () => {
      try {
        const response = await api.get(`/api/check-subscription/${userId}`);
        console.log("Status de l'abonnement:", response.data);

        setIsSubscribed(response.data);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);
      }
    };

    checkSubscriptionStatus();
  }, [userId, groupId]);

  const handleSwitchChange = async (checked: boolean) => {
    console.log("Switch toggle:", checked);

    try {
      if (checked) {
        console.log("S'abonner aux notifications...");
        await subscribeToNotifications(userId, groupId);
      } else {
        console.log("Se désabonner des notifications...");
        await unsubscribeFromNotifications(userId);
      }

      setIsSubscribed(checked); // Met à jour l'état du switch
    } catch (error) {
      console.error("Erreur lors du changement de l'état du switch:", error);
    }
  };

  return (
    <div className="text-black flex gap-3 items-center justify-center">
      <div className="text-black w-6 h-6 flex items-center justify-center">
        <IconNotifications />
      </div>
      <Switch checked={isSubscribed} onChange={handleSwitchChange} />
    </div>
  );
};

export default SwitchParams;
