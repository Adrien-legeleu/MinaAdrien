"use client";

import { api } from "@/config/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface DescriptionContextType {
  description: any;
  setDescription: Dispatch<SetStateAction<any>>;
  createDescription: () => void;
}

export const DescriptionContext = createContext<DescriptionContextType>({
  description: undefined,
  setDescription: () => {},
  createDescription: async () => {},
});

interface IDescriptionForm {
  description: string;
  images?: [string];
  groupId: string;
}

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState<any>(undefined);

  const createDescription = async ({ values }) => {
    try {
      const response = await api.post("/description", values);
      console.log(response);
      setDescription((prev: any) => {
        return { ...prev, ...response.data };
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDescription = async () => {
    try {
      const response = await api.get("/description");
      setDescription(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDescription();
  }, []);

  return (
    <DescriptionContext.Provider
      value={{ description, setDescription, createDescription }}
    >
      {children}
    </DescriptionContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de description
export const useDescriptionContext = () => {
  return useContext(DescriptionContext);
};
