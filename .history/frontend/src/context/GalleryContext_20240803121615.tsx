import { createContext, ReactNode, useContext, useState } from "react";

export interface IImageForm {
  url: string[];
  legend?: string;
  groupId: string | null;
  photoDate?: Date;
  isLiked: boolean;
}
export interface IImageFormUpdate {
  url?: string;
  legend?: string;
  groupId?: string;
  photoDate?: Date;
  isLiked?: boolean;
  imageId: string;
}

export interface IImage {
  legend?: string;
  dataPhoto?: string;
  url?: string;
  groupId: string | null;
  isLiked: boolean;
}

export const GalleryContext = createContext<{
  images: IImage[];
}>({
  images: [],
});

export const GalleryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [images, setImages] = useState<any>([]);
  return (
    <GalleryContext.Provider value={images}>{children}</GalleryContext.Provider>
  );
};

export const useGalleryContxt = () => {
  return useContext(GalleryContext);
};
