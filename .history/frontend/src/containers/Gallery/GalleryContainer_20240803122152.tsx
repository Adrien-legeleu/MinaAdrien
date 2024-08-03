import { useImageContext } from "@/context/ImageContexts";

export const GalleryContainer = () => {
  const { images } = useImageContext();
  return (
    <div>
      {images.map((image) => {
        return (
          <div>
            <img src={image.url} alt="" />
          </div>
        );
      })}
    </div>
  );
};
