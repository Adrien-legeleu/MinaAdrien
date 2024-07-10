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
  };

  const submitImage = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: IImageForm = {
      legend: data.get("legend") as string,
      url: dataImage,
      datePhoto: new Date(data.get("datePhoto") as string),
      isLiked: false,
      groupId: groupId,
    };
    createImage(values);
  };

  return (
    <div className="py-8 px-12">
      <HeaderParams />
      {
        <div className="w-1/2 mx-auto">
          <p className="text-3xl text-[#d83c3c]  leading-loose tracking-wider">
            {description[0]?.description}
          </p>
        </div>
      }
      <div className="w-1/2 mx-auto">
        <p className="text-3xl text-[#e04040] text-center tracking-widest leading-loose">
          {/* You can use other data from images array if needed */}
          {images[0]?.legend}
        </p>
      </div>
      <form onSubmit={submitImage}>
        <input type="text" name="legend" placeholder="legend" />
        <input type="text" name="legend" placeholder="date-photo" />

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
