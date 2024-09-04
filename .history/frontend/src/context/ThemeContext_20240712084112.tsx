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

export interface IThemeForm {
  url: string[];
  legend?: string;
  groupId: string | null;
  photoDate?: Date;
  isLiked: boolean;
}
export interface IThemeFormUpdate {
  url?: string;
  legend?: string;
  groupId?: string;
  photoDate?: Date;
  isLiked?: boolean;
  imageId: string;
}

export interface ITheme {
  groupId: string;
  _id: string;
  url: string;
  legend?: string;
  photoDate?: Date;
  isLiked: boolean;
}

interface ThemeContextType {
  theme: ITheme[];
  setTheme: Dispatch<SetStateAction<any>>;
  createTheme: (values: IThemeForm) => Promise<void>;
  updateImage: (values: IThemeFormUpdate) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: [],
  setTheme: () => {},
  createTheme: async (values: IThemeForm) => {},
  updateImage: async (values: IThemeFormUpdate) => {},
  deleteImage: async (imageId: string) => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<any>([]);
  const groupId = localStorage.getItem("groupId");
  const createTheme = async (values: IThemeForm) => {
    try {
      const response = await api.post("/image", values);
      console.log(response);
      setTheme((prev: any) => {
        return [...prev, response.data];
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await api.delete(`/image/${imageId}`);
      setTheme((prev: any) => prev.filter((img: any) => img._id !== imageId));
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateImage = async (values: IThemeFormUpdate) => {
    const { imageId, ...newValues } = values;
    try {
      await api.patch(`/image/${imageId}`, newValues);
      setTheme((prev: any) => {
        return prev.map((img: any) => {
          if (img._id === imageId) {
            return { ...img, ...newValues };
          }
          return img;
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const getImages = async () => {
    try {
      const response = await api.get(`/image/all/${groupId}`);
      setTheme(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        createTheme,
        updateImage,
        deleteImage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte des images
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
