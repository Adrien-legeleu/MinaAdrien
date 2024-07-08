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

export interface IDescriptionForm {
  description: string;
  images?: string[];
  groupId: string;
}

interface DescriptionContextType {
  description: [];
  setDescription: Dispatch<SetStateAction<any>>;
  createDescription: (values: IDescriptionForm) => Promise<void>;
  deleteDescription: (descriptionId: string) => Promise<void>;
}

export const DescriptionContext = createContext<DescriptionContextType>({
  description: [],
  setDescription: () => {},
  createDescription: async (values: IDescriptionForm) => {},
  deleteDescription: async (descriptionId: string) => {},
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState<any>([]);

  const createDescription = async (values: IDescriptionForm) => {
    try {
      const response = await api.post("/description", values);
      console.log(response);
      setDescription((prev: any) => {
        return [...prev, response.data];
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteDescription = async (descriptionId: string) => {
    try {
      await api.delete(`/description/${descriptionId}`);

      setDescription((prev: any) => {
        prev.filter((desc: any) => desc._id !== descriptionId);
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
