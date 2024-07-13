"use client";
import { useState } from "react";
import { FileImages } from "../File";
import { IImageForm, useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { ParallaxScrollSecond } from "../UI/ParallaxScroll";
import { IconMinus, IconPlus } from "../icons";
import AnimatedShinyText from "../UI/ShinyText";
import { cn } from "@/utils/cn";
import { Input } from "../UI";

export const ImageHome = () => {
  const [newImages, setNewImages] = useState<string[]>([]);
  const { images, createImage } = useImageContext();

  const groupId = localStorage.getItem("groupId");

  const [dataImage, setDataImage] = useState<string[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(uploadedImages);
  };

  const changeImageValue = (values: string[]) => {
    setDataImage(values);
    console.log(values);
  };

  const submitImage = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: IImageForm = {
      legend: data.get("legend") as string,
      url: dataImage,
      photoDate: data.get("date-photo")
        ? new Date(data.get("date-photo") as string)
        : undefined,
      groupId: groupId,
      isLiked: false,
    };
    console.log(values);
    createImage(values);
  };

  const handleCreateModal = () => {
    setIsCreateOpen(!isCreateOpen);
  };
  return (
    <div className="h-full relative w-full">
      {images[0] ? (
        <ParallaxScrollSecond images={images} />
      ) : (
        <p
          className={cn(
            `text-4xl w-1/2 mx-auto tracking-widest text-center leading-loose font-semibold  animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Ajoutez des photos pour donner plus de vie à votre groupe ! 📸
        </p>
      )}
      <div className="absolute top-1/2 right-10">
        <div
          className="p-3 flex absolute cursor-pointer top-0 right-0 z-10 items-center justify-center shadow-xl shadow-black/60 bg-gray-50 rounded-full h-16 w-16"
          onClick={handleCreateModal}
        >
          {isCreateOpen ? <IconMinus /> : <IconPlus />}
        </div>
        <form
          onSubmit={submitImage}
          className={`${
            isCreateOpen ? "visible opacity-100" : "invisible  opacity-0"
          }  duration-300 ease-in-out absolute -top-16 right-20 py-8 px-4 rounded-2xl w-96 z-10 flex items-center justify-center flex-col bg-white gap-8`}
        >
          <div className="space-y-4">
            <Input type="text" name="legend" placeholder="legend" />
            <Input type="date" name="date-photo" />

            <FileImages
              handleImageUpload={handleImageUpload}
              imgUrlKey="url"
              initialImages={newImages}
              multipleImage={false}
            />
          </div>
          <div
            className={cn(
              "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <button
                className="flex items-center justify-center gap-3 "
                type="submit"
              >
                <span>Créer votre image</span>
              </button>
            </AnimatedShinyText>
          </div>
        </form>
        <div
          className={`${
            isCreateOpen ? "visible " : "hidden"
          } fixed top-0 left-0 w-screen h-screen`}
        ></div>
      </div>
    </div>
  );
};
