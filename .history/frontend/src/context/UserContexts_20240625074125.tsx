"use client";
import { api } from "@/config/api";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
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
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      console.log("login");
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    try {
      const response = await api.post("/auth/register-user", values);
      console.log(response);
      setUserId(response.data.user._id);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
      console.log("register");
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  const checkTokn = async () => {
    try {
      await api.get("/auth/check-token");
      setIsAuthenticated(true);
    } catch (error: any) {
      onLogout();
      console.log(error?.response?.data?.error);
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
