"use client";
import { HeaderParams } from "@/components/Header";
import { IImage, useImageContext } from "@/context/ImageContexts";
import { IconSelect } from "@tabler/icons-react";
import { useState } from "react";

export const GalleryContainer = () => {
  const { images } = useImageContext();
  const [isParams, setIsParams] = useState(false);
  const [isSelectImages, setIsSelectImages] = useState([]);

  const closeParams = () => {
    setIsParams(false);
  };
  const openParams = () => {
    setIsParams(true);
  };

  const selectImage = (id: any) => {
    setIsSelectImages((prev: any) => {
      if (prev.includes(id)) {
        return prev.filter((imageId: any) => imageId !== id);
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
      <div className="grid grid-cols-4 gap-10 ">
        {images.map((image: IImage) => {
          const isSelected = isSelectImages.includes(image.id);
          return (
            <div className="group">
              <div className="group-hover:opacity-100 duration-200 ease-in-out  w-full h-full absolute top-0 left-0 bg-black/10">
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
