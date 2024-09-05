"use client";

import { api } from "@/config/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export interface ISignUpFormValues {
  email: string;
  password: string;
  username: string;
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export const UserContext = createContext({
  isAuthentificatedUser: false,
  isLoading: false,
  onLogin: async (values: ISignInFormValues) => {},
  onRegister: async (values: ISignUpFormValues) => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthentificatedUser, setIsAuthentificatedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("groupId");
      setIsAuthentificatedUser(false);
      toast.success("Vous avez bien été déconnectez !");
    }
  };

  const urlBase64ToUint8Array = (base64url: string) => {
    if (typeof window !== "undefined") {
      const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
      const padding = "=".repeat((4 - (base64.length % 4)) % 4);
      const base64WithPadding = base64 + padding;
      const rawData = window.atob(base64WithPadding);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
    return new Uint8Array(); // Default value if not in browser
  };

  const subscribeToNotifications = async (
    userId: string,
    groupId: string[]
  ) => {
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

  const onLogin = async (values: ISignInFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login-user", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response);

      if (typeof window !== "undefined") {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("authToken", response?.data?.authToken);
        setIsAuthentificatedUser(true);
      }

      toast.success("Bravo , vous êtes connectez !");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        "Le nom d'utilisateur ou le mot de passe est incorrect. Si vous n'avez pas de compte, veuillez en créer un"
      );
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register-user", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("authToken", response?.data?.authToken);
        setIsAuthentificatedUser(true);
      }
      toast.success("Félicitations , votre compte a bien été créer !");

      subscribeToNotifications(response.data.user._id, []);
    } catch (error: any) {
      console.error("Register error:", error);
      toast.error("Le nom d'utilisateur ou le mot de passe est incorrect");
    }
  };

  const checkToken = async () => {
    try {
      await api.get("/auth/check-token-user");
      setIsAuthentificatedUser(true);
      console.log("Token valid");
    } catch (error: any) {
      console.error(error);
      onLogout();
    }
  };

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!authToken) {
      setIsAuthentificatedUser(false);
      setIsLoading(false);
    } else {
      checkToken();
    }
  }, [isAuthentificatedUser]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isAuthentificatedUser,
        onLogout,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
