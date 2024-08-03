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
    <div>
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="grid grid-cols-4 gap-10">
        {images.map((image) => {
          return (
            <div>
              <img
                className="rounded-3xl object-cover"
                src={image.url}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
