"use client";

import { api } from "@/config/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGroupContext } from "./GroupContexts";

export interface IDescriptionForm {
  description: string;
  images?: string[];
  groupId: string;
}
export interface IDescriptionFormUpdate {
  description: string;
  images?: string[];
  groupId: string;
  descriptionId: string;
}

export interface IDescription {
  _id: string;
  description: string;
  images?: string[];
  groupId: string;
}

interface DescriptionContextType {
  description: IDescription[];
  setDescription: Dispatch<SetStateAction<any>>;
  createDescription: (values: IDescriptionForm) => Promise<void>;
  updateDescription: (values: IDescriptionFormUpdate) => Promise<void>;
  deleteDescription: (descriptionId: string) => Promise<void>;
  getDescription: (groupId: string) => Promise<void>;
}

export const DescriptionContext = createContext<DescriptionContextType>({
  description: [],
  setDescription: () => {},
  createDescription: async (values: IDescriptionForm) => {},
  updateDescription: async (values: IDescriptionFormUpdate) => {},
  deleteDescription: async (descriptionId: string) => {},
  getDescription: async (groupId: string) => {},
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState<any>([]);

  const { group } = useGroupContext();

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
      setDescription((prev: any) =>
        prev.filter((desc: any) => desc._id !== descriptionId)
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateDescription = async (values: IDescriptionFormUpdate) => {
    const { descriptionId, ...newValues } = values;
    try {
      await api.patch(`/description/${descriptionId}`, newValues);
      setDescription((prev: any) => {
        return prev.map((desc: any) => {
          if (desc._id === descriptionId) {
            return { ...desc, ...newValues };
          }
          return desc;
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const getDescription = async (groupId: string) => {
    try {
      const response = await api.get(`/description/all/${groupId}`);
      console.log(
        "eizoeizoeizoeioziozeiozieozieozieozieoziezoieozieozieozieozieozi"
      );
      console.log(response);
      setDescription(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DescriptionContext.Provider
      value={{
        description,
        setDescription,
        createDescription,
        updateDescription,
        deleteDescription,
        getDescription,
      }}
    >
      {children}
    </DescriptionContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de description
export const useDescriptionContext = () => {
  return useContext(DescriptionContext);
};
