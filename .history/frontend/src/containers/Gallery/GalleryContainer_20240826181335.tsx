"use client";
import { HeaderParams } from "@/components/Header";
import { IconDelete, IconDeleteAll } from "@/components/icons";
import { IImage, useImageContext } from "@/context/ImageContexts";
import { IconSelect } from "@tabler/icons-react";
import { useState } from "react";
import { ModalProvider } from "@/components/UI/AnimatedModal";
import { GalleryImage } from "./GalleryImage";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";
import { FileImages } from "@/components/File";
import { Input } from "postcss";
import { BackHome } from "@/components/BackButton";

export const GalleryContainer = () => {
  const { images, deleteImage } = useImageContext();
  const [isParams, setIsParams] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageToGalleryImage, setImageToGalleryImage] = useState<IImage>();

  const modalClose = () => {
    setIsOpenModal(false);
  };
  const modalOpen = (image: IImage) => {
    setImageToGalleryImage(image);
    setIsOpenModal(true);
    console.log(image);
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
    <div className=" py-8 w-full  dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-8 left-8 max-sm:left-4">
        <BackHome />
      </div>
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="columns-4 gap-5 max-sm:px-4 px-7 pt-20">
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
                  className="absolute top-2 right-2 w-6 h-6 z-20 rounded-full bg-transparent border-[1px] border-white/60"
                ></div>
              )}

              <img
                className="rounded-3xl mt-5 block h-auto w-full group-hover:brightness-75 duration-300 ease-in-out cursor-pointer"
                src={image.url}
                alt="LovniaGallery de Lovnia"
                onClick={() => modalOpen(image)}
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
