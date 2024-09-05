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

export interface IImageForm {
  url: string[];
  legend?: string;
  groupId: string | null;
  photoDate?: string;
  isLiked: boolean;
}
export interface IImageFormUpdate {
  url?: string;
  legend?: string;
  groupId?: string;
  photoDate?: string;
  isLiked?: boolean;
  imageId: string;
}

export interface IImage {
  legend?: string;
  photoDate?: string;
  url?: string;
  groupId?: string;
  isLiked?: boolean;
  _id?: string;
}

interface ImageContextType {
  images: IImage[];
  setImages: Dispatch<SetStateAction<any>>;
  createImage: (values: IImageForm) => Promise<void>;
  getImages: () => Promise<void>;
  updateImage: (values: IImageFormUpdate) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
}

export const ImageContext = createContext<ImageContextType>({
  images: [],
  setImages: () => {},
  createImage: async (values: IImageForm) => {},
  getImages: async () => {},
  updateImage: async (values: IImageFormUpdate) => {},
  deleteImage: async (imageId: string) => {},
});

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<any>([]);
  const { group } = useGroupContext();
  const createImage = async (values: IImageForm) => {
    try {
      const response = await api.post("/image", values);
      console.log(response);
      setImages((prev: any) => {
        return [...prev, response.data];
      });
      toast.success("Votre image a bien été créer !");
    } catch (error: any) {
      console.log(error);
      toast.error("erreur lors de la création de l'image");
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await api.delete(`/image/${imageId}`);
      setImages((prev: any) => prev.filter((img: any) => img._id !== imageId));
      toast.success("image supprimé");
    } catch (error: any) {
      console.log(error);
      toast.error("erreur lors de la suppression de l'image");
    }
  };

  const updateImage = async (values: IImageFormUpdate) => {
    const { imageId, ...newValues } = values;
    try {
      await api.patch(`/image/${imageId}`, newValues);
      setImages((prev: any) => {
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
      const groupId =
        typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
      const response = await api.get(`/image/all/${groupId}`);
      setImages(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        createImage,
        updateImage,
        deleteImage,
        getImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte des images
export const useImageContext = () => {
  return useContext(ImageContext);
};
