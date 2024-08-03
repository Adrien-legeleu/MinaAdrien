import { createContext, ReactNode } from "react";

export const GalleryContext = createContext<{
  images: [];
}>({
  images: [],
});

export const GalleryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [images, setImages] = useState([]);
  return (
    <GalleryContext.Provider value={images}>{children}</GalleryContext.Provider>
  );
};
