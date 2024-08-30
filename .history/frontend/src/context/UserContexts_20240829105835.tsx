import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "@/config/api";
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

interface UserContextProps {
  isAuthentificatedUser: boolean;
  isLoading: boolean;
  onLogin: (values: ISignInFormValues) => Promise<void>;
  onRegister: (values: ISignUpFormValues) => Promise<void>;
  onLogout: () => void;
}

const UserContext = createContext<UserContextProps>({
  isAuthentificatedUser: false,
  isLoading: false,
  onLogin: async () => {},
  onRegister: async () => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthentificatedUser, setIsAuthentificatedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const subscribeToNotifications = async (
    userId: string,
    groupId: string[]
  ) => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("Permission de notification refusée");
          return;
        }

        const registration = await navigator.serviceWorker.register("/sw.js");
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: new Uint8Array(
            atob("YOUR_PUBLIC_VAPID_KEY")
              .split("")
              .map((c) => c.charCodeAt(0))
          ),
        });

        await fetch("/api/save-subscription", {
          method: "POST",
          body: JSON.stringify({ userId, groupId, subscription }),
          headers: {
            "Content-Type": "application/json",
          },
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
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthentificatedUser(true);

      toast.success("Bravo, vous êtes connecté !");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Le nom d'utilisateur ou le mot de passe est incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register-user", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthentificatedUser(true);

      toast.success("Félicitations, votre compte a été créé !");

      // Demander l'autorisation pour les notifications push
      await subscribeToNotifications(response.data.user._id, []); // Passer les IDs de groupe réels ici
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Une erreur est survenue lors de la création du compte.");
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsAuthentificatedUser(false);
    toast.success("Vous avez bien été déconnecté !");
  };

  const checkToken = async () => {
    try {
      await api.get("/auth/check-token-user");
      setIsAuthentificatedUser(true);
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
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

export const useUserContext = () => useContext(UserContext);
