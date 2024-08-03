"use client";
import { HeaderParams } from "@/components/Header";
import { IImage, useImageContext } from "@/context/ImageContexts";
import { IconSelect } from "@tabler/icons-react";
import { useState } from "react";

export const GalleryContainer = () => {
  const { images } = useImageContext();
  const [isParams, setIsParams] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const closeParams = () => {
    setIsParams(false);
  };

  const openParams = () => {
    setIsParams(true);
  };

  const selectImage = (id: any) => {
    setSelectedImages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((imageId) => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="py-8">
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="grid grid-cols-4 gap-10">
        {images.map((image: IImage, index) => {
          const isSelected = selectedImages.includes(index);
          return (
            <div
              key={image.url}
              className={`group relative ${
                isSelected ? "border-4 border-blue-500" : ""
              }`}
              onClick={() => selectImage(image.index)}
            >
              <div className="group-hover:opacity-100 duration-200 ease-in-out w-full h-full absolute top-0 left-0 bg-black/10">
                <div className="absolute top-2 right-2">
                  <IconSelect />
                </div>
              </div>
              <img
                className="rounded-3xl object-cover"
                src={image.url}
                alt="LovniaGallery de Lovnia"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

{
  isSelected ? (
    <div className="absolute top-2 right-2 w-8 h-8">
      <IconSelect />
    </div>
  ) : (
    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-transparent border-[1px] border-black/80"></div>
  );
}
