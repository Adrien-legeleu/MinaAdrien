import React, { useEffect, useState } from "react";
import { IconEmoji0, IconEmoji1 } from "../icons";
import { api } from "@/config/api";

export const DailyConnection = () => {
  const [userDailyChallenge, setUserDailyChallenge] = useState<any>(); // Changez 'any' à un type plus spécifique si vous avez une interface pour DailyChallenge
  const [isChoised, setIsChoised] = useState(false);

  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (userId) {
      getUserDailyChallenge(userId);
      console.log("daily Connectionnnnn");
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

  const chooseEmoji = async (emoji: number) => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    try {
      const response = await api.patch(
        `/dailyChallenge/choose/${userId}}`,
        emoji
      );
      setIsChoised(true);
      setUserDailyChallenge(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const emojies = [IconEmoji0, IconEmoji1, IconEmoji0, IconEmoji1, IconEmoji0];

  return (
    <div
      className={`fixed bottom-0 left-0 w-screen p-6 rounded-t-3xl bg-white flex-col gap-5 items-center justify-center ${
        userDailyChallenge && userDailyChallenge.connectedThisDay && !isChoised
          ? "flex"
          : "hidden"
      } `}
    >
      <h2>Donnez un avis sur votre journée !!</h2>
      <div className="flex gap-5 items-center justify-center">
        {emojies.map((emoji, index) => {
          return (
            <span
              className="h-8 w-8"
              onClick={() => chooseEmoji(index)}
              key={index}
            >
              {React.createElement(emoji)}
            </span>
          );
        })}
      </div>
    </div>
  );
};
