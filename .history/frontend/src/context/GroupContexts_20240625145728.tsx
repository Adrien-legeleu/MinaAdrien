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
export interface IPseudoFormValues {
  userId: string | undefined;
  groupId: string | undefined;
  pseudoUser: string;
}
export const GroupContext = createContext({
  isAuthenticated: false,
  isHome: false,
  groupId: undefined,
  onLogin: async (values: IGroupFormsValues) => {},
  onRegister: async (values: IGroupFormsValues) => {},
  chosePseudo: async (values: IPseudoFormValues) => {},
  onLogout: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const [groupId, setGroupId] = useState(undefined);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken-group");
    setIsAuthenticated(false);
    console.log("logout");
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
  const chosePseudo = async (values: IPseudoFormValues) => {
    try {
      const response = await api.post("/auth/choose-pseudo", values);
      console.log(response);

      setIsHome(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  const checkToken = () => {
    try {
      await api.get("/check-toke-group");
    } catch (error) {}
  };

  return (
    <GroupContext.Provider
      value={{
        isAuthenticated,
        onLogin,
        onRegister,
        onLogout,
        groupId,
        chosePseudo,
        isHome,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
