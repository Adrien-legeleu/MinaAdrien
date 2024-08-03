import { useImageContext } from "@/context/ImageContexts";

export const GalleryContainer = () => {
  const { images } = useImageContext();
  return (
    <div className="grid grid-cols-4 gap-10">
      {images.map((image) => {
        return (
          <div>
            <img className="rounded-3xl object-cover" src={image.url} alt="" />
          </div>
        );
      })}
    </div>
  );
};
