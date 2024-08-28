import { api } from "@/config/api";
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
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
  onLogin: async (values: ISignInFormValues) => {},
  onRegister: async (values: ISignUpFormValues) => {},
  onLogout: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log("logout");
  }, []);

  const onLogin = async (values: ISignInFormValues) => {
    try {
      const response = await api.post("/auth/login-user", values);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const onRegister = async (values: ISignUpFormValues) => {
    try {
      const response = await api.post("/auth/register-user", values);
      localStorage.setItem("authToken", response?.data?.authToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Register error", error);
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

export const useUserContext = () => {
  return useContext(UserContext);
};
