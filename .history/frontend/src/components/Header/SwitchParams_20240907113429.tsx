import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import {
  subscribeToNotifications,
  unsubscribeFromNotifications,
} from "./notificationService"; // Assurez-vous de définir cette fonction ou importez-la correctement

const SwitchParams = ({ userId, groupId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur est déjà abonné lors du chargement du composant
    const checkSubscriptionStatus = async () => {
      // Implémentez la logique pour vérifier l'état de l'abonnement depuis votre API
      // Exemple simplifié, à adapter selon votre logique
      const response = await fetch(
        `/api/check-subscription/${userId}?groupId=${groupId}`
      );
      const data = await response.json();
      setIsSubscribed(data.isSubscribed);
    };

    checkSubscriptionStatus();
  }, [userId, groupId]);

  const handleSwitchChange = async (isChecked) => {
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
