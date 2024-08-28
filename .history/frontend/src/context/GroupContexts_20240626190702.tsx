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
  joinPageRedirect: undefined,
  isHome: false,
  onLogin: async (values: IGroupFormsValues) => {},
  onRegister: async (values: IGroupFormsValues) => {},
  chosePseudo: async (values: IPseudoFormValues) => {},
  onLogout: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const [joinPageRedicrect, setJoinPageRedicrect] = useState(undefined);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken-group");
    localStorage.removeItem("groupId");
    setIsAuthenticated(false);
    console.log("logout");
  }, []);

  const onLogin = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/login", values);
      console.log(response);
      localStorage.setItem("groupId", response.data.group._id);
      localStorage.setItem("authToken-group", response?.data?.auuthToken);
      setJoinPageRedicrect(response.data.redirect);
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
      localStorage.setItem("groupId", response?.data.group._id);

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

  const checkToken = async () => {
    try {
      await api.get("/check-toke-group");
      setIsAuthenticated(true);
    } catch (error: any) {
      onLogout();
      console.log(error);
    }
  };

  useEffect(() => {
    const authTokenGroup = localStorage.getItem("authToken-group");

    if (!authTokenGroup) {
      setIsAuthenticated(false);
    } else {
      checkToken();
    }
  }, []);

  return (
    <GroupContext.Provider
      value={{
        isAuthenticated,
        onLogin,
        onRegister,
        onLogout,
        joinPageRedirect,
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
