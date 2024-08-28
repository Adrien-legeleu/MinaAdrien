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
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true

  const onLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsAuthentificatedUser(false);
    toast.success("Vous avez bien été déconnectez !");
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

      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthentificatedUser(true);

      toast.success("Bravo , vous êtes connectez !");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Le nom d'utilisateur ou le mot de passe est incorrect");
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

      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthentificatedUser(true);
      toast.success("Félicitations , votre compte a bien été créer !");
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
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsAuthentificatedUser(false);
      setIsLoading(false); // Ensure loading is set to false if no token
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
