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

export interface IImageForm {
  url: string[];
  legend: string;
  groupId: number;
  datePhoto: Date;
  isLiked: boolean;
}
export interface IImageFormUpdate {
  url?: string;
  legend?: string;
  groupId?: string;
  datePhoto?: Date;
  isLiked?: boolean;
  imageId: string;
}

export interface IImage {
  groupId: string;
  url: string;
  legend: string;
  datePhoto: string;
  isLiked: boolean;
}

interface ImageContextType {
  images: IImage[];
  setImages: Dispatch<SetStateAction<any>>;
  createImage: (values: IImageForm) => Promise<void>;
  updateImage: (values: IImageFormUpdate) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
}

export const ImageContext = createContext<ImageContextType>({
  images: [],
  setImages: () => {},
  createImage: async (values: IImageForm) => {},
  updateImage: async (values: IImageFormUpdate) => {},
  deleteImage: async (imageId: string) => {},
});

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<any>([]);

  const createImage = async (values: IImageForm) => {
    try {
      const response = await api.post("/image", values);
      console.log(response);
      setImages((prev: any) => {
        return [...prev, response.data];
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await api.delete(`/image/${imageId}`);
      setImages((prev: any) => prev.filter((img: any) => img._id !== imageId));
    } catch (error: any) {
      console.log(error);
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
      const response = await api.get("/image");
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
