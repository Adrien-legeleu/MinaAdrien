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

  const selectImage = (url: any) => {
    setSelectedImages((prev) => {
      if (prev.includes(url)) {
        return prev.filter((imageurl) => imageurl !== url);
      } else {
        return [...prev, url];
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
        {images.map((image: IImage) => {
          const isSelected = selectedImages.includes(image.url);
          return (
            <div
              key={image.url}
              className={`group relative ${
                isSelected ? "border-4 border-blue-500" : ""
              }`}
              onClick={() => selectImage(image.url)}
            >
              <div className="group-hover:opacity-100 duration-200 ease-in-out w-full h-full absolute top-0 left-0 bg-black/10">
                {isSelected ? (
                  <div className="absolute top-2 right-2 w-8 h-8">
                    <IconSelect />
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-transparent border-[1px] border-black/80"></div>
                )}
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
