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
import { toast } from "sonner";
import { useGroupContext } from "./GroupContexts";

export interface IImageTheme {
  url: string;
  legend?: string;
  dataPhoto?: string;
  _id?: string;
}
export interface IThemeForm {
  title?: string;
  images: IImageTheme[];
  bio: string;
  groupId: string | undefined;
  isLiked: boolean;
}
export interface IThemeFormUpdate {
  images?: IImageTheme[];
  title?: string;
  groupId?: string | null;
  bio?: string;
  isLiked?: boolean;
  themeId?: string;
}

export interface ITheme {
  groupId: string;
  _id: string;
  images: IImageTheme[];
  title?: string;
  bio?: string;
  isLiked: boolean;
}

interface ThemeContextType {
  themes: ITheme[];
  setThemes: Dispatch<SetStateAction<any>>;
  createTheme: (values: IThemeForm) => Promise<void>;
  getTheme: () => Promise<void>;
  updateTheme: (values: IThemeFormUpdate) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  themes: [],
  setThemes: () => {},
  createTheme: async (values: IThemeForm) => {},
  getTheme: async () => {},
  updateTheme: async (values: IThemeFormUpdate) => {},
  deleteTheme: async (themeId: string) => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<any>([]);
  const { group } = useGroupContext();
  const createTheme = async (values: IThemeForm) => {
    try {
      const response = await api.post("/theme", values);

      setThemes((prev: any) => {
        return [...prev, response.data];
      });
      toast.success("Votre thème a bien été créer !");
    } catch (error: any) {
      toast.error("erreur lors de la création du thème");
      console.log(error);
    }
  };

  const deleteTheme = async (themeId: string) => {
    const groupId =
      typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
    try {
      await api.delete(`/theme/${themeId}`, {
        data: { groupId },
      });

      // Après la suppression réussie, mettre à jour l'état des thèmes
      setThemes((prevThemes: any) =>
        prevThemes.filter((theme: any) => theme._id !== themeId)
      );
      toast.success("Votre thème a bien été supprimé!");
    } catch (error: any) {
      console.log(error);
      toast.error("erreur lors de la suppression du thème");
    }
  };

  const updateTheme = async (values: any) => {
    const { themeId, ...newValues } = values;
    try {
      console.log("ezeyzueyu");
      console.log(newValues);
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
      const groupId =
        typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
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
        getTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
