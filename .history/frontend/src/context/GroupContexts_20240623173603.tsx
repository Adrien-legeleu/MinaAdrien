"use client";
import { api } from "@/config/api";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export interface IGroupFormsValues {
  groupname: string;
  password: string;
  userId: string;
}
export const UserContext = createContext({
  isAuthenticated: false,
  onLogin: async (values: IGroupFormsValues) => {},
  onRegister: async (values: IGroupFormsValues) => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken-group");
    setIsAuthenticated(false);
    console.log("login");
  }, []);

  const onLogin = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/login", values);
      console.log(response);
      localStorage.setItem("authToken-group", response?.data?.auuthToken);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };
  const onRegister = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/register", values);
      console.log(response);
      localStorage.setItem("authToken-group", response?.data?.auuthToken);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, onLogin, onRegister, onLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(UserContext);
};
// 6676d644681734853720d5bb
