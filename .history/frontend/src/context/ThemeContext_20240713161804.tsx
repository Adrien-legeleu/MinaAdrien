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

expot interface IImageTheme {
      legend?: string;
  dataPhoto?: string;
  url?: string;
}
export interface IThemeForm {
  title: string;
  images: IImage[];
  bio: string;
  groupId: string | null;
  isLiked: boolean;
}
export interface IThemeFormUpdate {
  images?: IImage[];
  title?: string;
  groupId?: string | undefined
  bio?: string;
  isLiked?: boolean;
  themeId?: string;
}

export interface ITheme {
  groupId: string;
  _id: string;
  images: IImage[];
  title: string;
  bio?: string;
  isLiked: boolean;
}

interface ThemeContextType {
  themes: ITheme[];
  setThemes: Dispatch<SetStateAction<any>>;
  createTheme: (values: IThemeForm) => Promise<void>;
  updateTheme: (values: IThemeFormUpdate) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  themes: [],
  setThemes: () => {},
  createTheme: async (values: IThemeForm) => {},
  updateTheme: async (values: IThemeFormUpdate) => {},
  deleteTheme: async (themeId: string) => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<any>([]);
  const groupId = localStorage.getItem("groupId");
  const createTheme = async (values: IThemeForm) => {
    try {
      const response = await api.post("/theme", values);

      setThemes((prev: any) => {
        return [...prev, response.data];
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteTheme = async (themeId: string) => {
    try {
      await api.delete(`/theme/${themeId}`, {
        data: { groupId },
      });

      // Après la suppression réussie, mettre à jour l'état des thèmes
      setThemes((prevThemes: any) =>
        prevThemes.filter((theme: any) => theme._id !== themeId)
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateTheme = async (values: any) => {
    const { themeId, ...newValues } = values;
    try {
      await api.patch(`/theme/${themeId}`, newValues);
      setThemes((prev: any) => {
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
      setThemes(response.data);
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
        themes,
        setThemes,
        createTheme,
        updateTheme,
        deleteTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
