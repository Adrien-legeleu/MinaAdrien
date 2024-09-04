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
import { IImage } from "./ImageContexts";

export interface IThemeForm {
  images: IImage[];
  bio: string;
  groupId: string | null;
  title?: string;
  isLiked: boolean;
}
export interface IThemeFormUpdate {
  url?: string;
  legend?: string;
  groupId?: string;
  photoDate?: Date;
  isLiked?: boolean;
  themeId: string;
}

export interface ITheme {
  groupId: string;
  _id: string;
  imags: IImage[];
  title: string;
  bio?: string;
  isLiked: boolean;
}

interface ThemeContextType {
  theme: ITheme[];
  setTheme: Dispatch<SetStateAction<any>>;
  createTheme: (values: IThemeForm) => Promise<void>;
  updateImage: (values: IThemeFormUpdate) => Promise<void>;
  deleteImage: (themeId: string) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: [],
  setTheme: () => {},
  createTheme: async (values: IThemeForm) => {},
  updateImage: async (values: IThemeFormUpdate) => {},
  deleteImage: async (themeId: string) => {},
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

  const deleteImage = async (themeId: string) => {
    try {
      await api.delete(`/image/${themeId}`);
      setTheme((prev: any) => prev.filter((img: any) => img._id !== themeId));
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateImage = async (values: IThemeFormUpdate) => {
    const { themeId, ...newValues } = values;
    try {
      await api.patch(`/theme/${themeId}`, newValues);
      setTheme((prev: any) => {
        return prev.map((img: any) => {
          if (img._id === themeId) {
            return { ...img, ...newValues };
          }
          return img;
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const response = await api.get(`/theme/all/${groupId}`);
      setTheme(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheme();
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

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
