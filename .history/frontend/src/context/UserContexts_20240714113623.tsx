"use client";

import { api } from "@/config/api";
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
  isLoading: false,
  onLogin: async (values: ISignInFormValues) => {},
  onRegister: async (values: ISignUpFormValues) => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true

  const onLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    console.log("logout");
  };

  const onLogin = async (values: ISignInFormValues) => {
    setIsLoading(true);
    try {
      console.log("Sending login request with values:", values);
      const response = await api.post("/auth/login-user", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response from login request:", response);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      console.log("login successful");
    } catch (error: any) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    setIsLoading(true);
    try {
      console.log("Sending register request with values:", values);
      const response = await api.post("/auth/register-user", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response from register request:", response);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      console.log("register successful");
    } catch (error: any) {
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkToken = async () => {
    try {
      await api.get("/auth/check-token-user");
      setIsAuthenticated(true);
      console.log("Token valid");
    } catch (error: any) {
      // onLogout();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setIsAuthenticated(false);
      setIsLoading(false); // Ensure loading is set to false if no token
    } else {
      checkToken();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ isLoading, isAuthenticated, onLogout, onLogin, onRegister }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
