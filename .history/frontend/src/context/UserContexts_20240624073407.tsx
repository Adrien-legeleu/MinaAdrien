"use client";
import { api } from "@/config/api";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  isAuthenticated: false,
  userId: undefined,
  onLogin: async (values: ISignInFormValues) => {},
  onRegister: async (values: ISignUpFormValues) => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log("logout");
  }, []);

  const onLogin = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/login-user", values);
      setUserId(response.data.user._id);
      console.log(response);
      localStorage.setItem("authToken", response?.data?.auuthToken);
      setIsAuthenticated(true);
      redirect("/group");
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    try {
      const response = await api.post("/auth/register-user", values);
      console.log(response);
      setUserId(response.data.user._id);
      localStorage.setItem("authToken", response?.data?.auuthToken);
      setIsAuthenticated(true);
      redirect("/group");
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, onLogin, onRegister, onLogout, userId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
