"use client";
import { HeaderParams } from "@/components/Header";
import { useImageContext } from "@/context/ImageContexts";
import { useState } from "react";

export const GalleryContainer = () => {
  const { images } = useImageContext();
  const [isParams, setIsParams] = useState(false);

  const closeParams = () => {
    setIsParams(false);
  };
  const openParams = () => {
    setIsParams(true);
  };
  return (
    <div className="py-8">
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="grid grid-cols-4 gap-10 ">
        {images.map((image) => {
          return (
            <div className="group">
              <div className="group-hover:opacity-100 duration-200 ease-in-out  w-full h-full absolute top-0 left-0 bg-black/10"></div>
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
