"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { FileImages } from "@/components/File";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";
import { IImage, useImageContext } from "@/context/ImageContexts";
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

  const [dataImage, setDataImage] = useState<any>([]);

  const handleImageUpload = (fileList: UploadFile[]) => {
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
    const values = {
      legend: data.get("date-photo"),
      url: dataImage,
      datePhoto: data.get("date-photo"),
      isLiked: false,
      groupId,
    };
    createImage(values as IImage);
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
