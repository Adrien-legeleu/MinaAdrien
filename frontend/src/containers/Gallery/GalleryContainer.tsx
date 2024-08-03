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

  const selectImage = (url: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(url)) {
        return prev.filter((imageUrl) => imageUrl !== url);
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
      <div className="grid grid-cols-4 gap-7 px-7 pt-10">
        {images.map((image: IImage) => {
          // Vérifiez que image.url est défini
          if (!image.url) return null;

          const isSelected = selectedImages.includes(image.url);
          return (
            <div
              key={image.url}
              className={`group relative ${
                isSelected ? "border-4 border-blue-500" : ""
              }`}
            >
              <div className="group-hover:opacity-100 opacity-0 duration-200 ease-in-out w-full h-full absolute top-0 left-0 bg-black/30 rounded-3xl z-10">
                {isSelected ? (
                  <div
                    className="absolute top-2 right-2 w-6 h-6 text-black"
                    onClick={() => selectImage(image.url!)}
                  >
                    <IconSelect />
                  </div>
                ) : (
                  <div
                    onClick={() => selectImage(image.url!)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-transparent border-[1px] border-white/60"
                  ></div>
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
