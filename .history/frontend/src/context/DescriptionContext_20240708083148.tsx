"use client";

import { api } from "@/config/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DescriptionContextType {
  description: any;
  setDescription: () => void;
  createDescription: () => void;
}

export const DescriptionContext = createContext<DescriptionContextType>({
  description: undefined,
  setDescription: () => {},
  createDescription: async () => {},
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState<any>(undefined);

  const createDescription = async () => {
    try {
      const response = await api.post("/description");
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
