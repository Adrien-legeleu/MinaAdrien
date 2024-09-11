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
import { IGroup, useGroupContext } from "./GroupContexts";
import { IGroupComplete } from "@/types/group";

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
  const { getAllGroup } = useGroupContext();

  const onLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("groupId");
      setIsAuthentificatedUser(false);
      toast.success("Vous avez bien été déconnectez !");
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

      if (typeof window !== "undefined") {
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("authToken", response?.data?.authToken);
        setIsAuthentificatedUser(true);
      }
      getAllGroup();

      toast.success("Bravo , vous êtes connectez !");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        "Le nom d'utilisateur ou le mot de passe est incorrect. Si vous n'avez pas de compte, veuillez en créer un"
      );
      window.location.href = "https://lovniaa.netlify.app/";
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
    } catch (error: any) {
      console.error("Register error:", error);
      toast.error("Le nom d'utilisateur ou le mot de passe est incorrect");
      window.location.href = "https://lovniaa.netlify.app/";
    }
  };

  const checkToken = async () => {
    try {
      await api.get("/auth/check-token-user");
      setIsAuthentificatedUser(true);
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
