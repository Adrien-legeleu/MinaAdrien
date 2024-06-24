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
  userId: string | undefined;
}
export const GroupContext = createContext({
  isAuthenticated: false,
  groupId: undefined,
  onLogin: async (values: IGroupFormsValues) => {},
  onRegister: async (values: IGroupFormsValues) => {},
  onLogout: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [groupId, setGroupId] = useState(undefined);

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
      setGroupId(response.data.group._id);
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };
  const onRegister = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/register", values);
      console.log(response);
      localStorage.setItem("authToken-group", response?.data?.auuthToken);
      setGroupId(response.data.group._id);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  return (
    <GroupContext.Provider
      value={{ isAuthenticated, onLogin, onRegister, onLogout, groupId }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
