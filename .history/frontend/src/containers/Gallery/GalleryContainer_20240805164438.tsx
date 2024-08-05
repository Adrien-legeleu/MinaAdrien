"use client";
import { HeaderParams } from "@/components/Header";
import { IconDelete, IconDeleteAll } from "@/components/icons";
import { IImage, useImageContext } from "@/context/ImageContexts";
import { IconSelect } from "@tabler/icons-react";
import { useState } from "react";
import { ModalProvider } from "@/components/UI/AnimatedModal";
import { GalleryImage } from "./GalleryImage";

export const GalleryContainer = () => {
  const { images, deleteImage } = useImageContext();
  const [isParams, setIsParams] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageToGalleryImage, setImageToGalleryImage] = useState<
    IImage | undefined
  >();

  const modalClose = () => {
    setIsOpenModal(false);
  };
  const modalOpen = () => {
    setIsOpenModal(true);
  };

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

  const deleteOneImage = (imagesId: any) => {
    imagesId.map((imageId: any) => {
      deleteImage(imageId);
    });
    cancel();
  };
  const deleteAll = (imagesId: any) => {
    imagesId.map((imageId: any) => {
      deleteImage(imageId);
    });
    cancel();
  };
  const cancel = () => {
    setSelectedImages([]);
  };

  return (
    <div className="py-8">
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="grid grid-cols-4 gap-7 px-7 pt-20">
        {images.map((image: IImage) => {
          if (!image._id) return null;

          const isSelected = selectedImages.includes(image._id);
          return (
            <div key={image._id} className="group relative">
              {isSelected && (
                <div
                  className="absolute z-20 top-2 right-2  w-7 h-7 text-white/80 rounded-full"
                  onClick={() => selectImage(image._id!)}
                >
                  <IconSelect />
                </div>
              )}

              {!isSelected && (
                <div
                  onClick={() => selectImage(image._id!)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-transparent border-[1px] border-white/60"
                ></div>
              )}

              <img
                className="rounded-3xl object-cover group-hover:brightness-90 duration-300 ease-in-out"
                src={image.url}
                alt="LovniaGallery de Lovnia"
              />
            </div>
          );
        })}
      </div>
      {selectedImages[0] && (
        <div className="fixed z-20 bottom-10 right-7 flex items-center justify-center gap-4 ">
          <button
            className="p-2  bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => deleteOneImage(selectedImages)}
          >
            <IconDelete />
          </button>
          <button
            className="p-2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"
            onClick={() => deleteAll(images)}
          >
            <IconDeleteAll />
          </button>

          <button
            className="bg-black text-white rounded-full py-3 px-5"
            onClick={cancel}
          >
            annuler
          </button>
        </div>
      )}
      <GalleryImage
        isOpenModal={isOpenModal}
        modalClose={modalClose}
        image={imageToGalleryImage}
      />
    </div>
  );
};
