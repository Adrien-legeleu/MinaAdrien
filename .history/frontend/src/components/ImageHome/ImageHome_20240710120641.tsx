"use client";
import { useState } from "react";
import { FileImages } from "../File";
import { IImageForm, useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { ParallaxScrollSecond } from "../UI/ParallaxScroll";
import { IconMinus, IconPlus } from "../icons";
import AnimatedShinyText from "../UI/ShinyText";
import { cn } from "@/utils/cn";

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
      photoDate: data.get("date-photo") as string,
      groupId: groupId,
      isLiked: false,
    };
    console.log(values);
    console.log("eze");

    createImage(values);
  };

  const handleCreateModal = () => {
    setIsCreateOpen(!isCreateOpen);
  };
  return (
    <div className="h-full relative w-full">
      <ParallaxScrollSecond images={images} />
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
          }  duration-300 ease-in-out absolute -top-16 right-20 py-8 px-4 rounded-2xl flex items-center justify-center flex-col gap-8`}
        >
          <div className="space-y-4">
            <input type="text" name="legend" placeholder="legend" />
            <input type="text" name="date-photo" placeholder="datePhoto" />

            <FileImages
              handleImageUpload={handleImageUpload}
              imgUrlKey="url"
              initialImages={newImages}
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
      </div>
    </div>
  );
};
