"use client";
import { useState } from "react";
import { FileImages } from "../File";
import { IImageForm, useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { ParallaxScrollSecond } from "../UI/ParallaxScroll";
import { IconPlusGroup } from "../icons";

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
          className="p-3 flex absolute top-0 right-0 z-10 items-center justify-center shadow-xl shadow-black/60 bg-gray-50 rounded-full h-16 w-16"
          onClick={handleCreateModal}
        >
          <IconPlusGroup />
        </div>
        <form
          onSubmit={submitImage}
          className={`${
            isCreateOpen ? "visible opacity-100" : "invisible  opacity-0"
          }  duration-300 ease-in-out`}
        >
          <input type="text" name="legend" placeholder="legend" />
          <input type="text" name="date-photo" placeholder="datePhoto" />

          <FileImages
            handleImageUpload={handleImageUpload}
            imgUrlKey="url"
            initialImages={newImages}
          />
          <button>Créer image</button>
        </form>
      </div>
    </div>
  );
};
