"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { FileImages } from "@/components/File";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";
import { IImage, IImageForm, useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { useState } from "react";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { images, createImage } = useImageContext();
  const { description } = useDescriptionContext();
  const [newImages, setNewImages] = useState<string[]>([]);

  const groupId = localStorage.getItem("groupId");

  const [dataImage, setDataImage] = useState<string[]>([]);

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

  return (
    <div className="py-8 px-12">
      <HeaderParams />
      {
        <div className="w-1/2 mx-auto">
          <p className="text-3xl text-[#d83c3c] text-center  leading-loose tracking-widest">
            {description[0]?.description}
          </p>
        </div>
      }
      <div className="mt-32 grid grid-cols-4 gap-8">
        {images.map((img) => {
          return (
            <div key={img._id}>
              <img className="rounded-3xl" src={img.url} alt="" />
            </div>
          );
        })}
      </div>
      <form onSubmit={submitImage}>
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
  );
};
