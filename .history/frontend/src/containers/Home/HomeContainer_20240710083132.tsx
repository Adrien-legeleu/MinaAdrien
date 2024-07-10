"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { FileImages } from "@/components/File";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";
import { useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { useState } from "react";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { images, createImage } = useImageContext();
  const { description } = useDescriptionContext();
  const [newImages, setNewImages] = useState<string[]>([]);

  const [dataImage, setDataImage] = useState<any>({
    legend: "",
    url: "",
    datePhoto: undefined,
    isLiked: false,
  });

  const handleImageUpload = (key: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(key, uploadedImages);
  };

  const changeImageValue = (key: keyof any | string, value: any) => {
    setDataImage((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    console.log(dataImage);
  };

  const submitImage = () => {
    createImage();
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
