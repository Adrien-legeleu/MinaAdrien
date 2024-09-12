import { useEffect, useState } from "react";
import { IconEmoji0, IconEmoji1 } from "../icons";
import { api } from "@/config/api";

export const DailyConnection = () => {
  const [userDailyChallenge, setUserDailyChallenge] = useState<any>(); // Changez 'any' à un type plus spécifique si vous avez une interface pour DailyChallenge

  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (userId) {
      getUserDailyChallenge(userId);
    }
  }, []);

  const getUserDailyChallenge = async (userId: string) => {
    try {
      const response = await api.get(`/dailyChallenge/${userId}`);
      setUserDailyChallenge(response.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-screen p-6 rounded-t-3xl bg-white flex-col gap-5 items-center justify-center ${
        userDailyChallenge && userDailyChallenge.connectedThisDay
          ? "flex"
          : "hidden"
      } `}
    >
      <h2>Donnez un avis sur votre journée !!</h2>
      <div className="flex gap-5 items-center justify-center">
        <span className="h-8 w-8">
          <IconEmoji0 />
        </span>
        <span className="h-8 w-8">
          <IconEmoji0 />
        </span>
        <span className="h-8 w-8">
          <IconEmoji1 />
        </span>
        <span className="h-8 w-8">
          <IconEmoji0 />
        </span>
        <span className="h-8 w-8">
          <IconEmoji1 />
        </span>
      </div>
    </div>
  );
};
