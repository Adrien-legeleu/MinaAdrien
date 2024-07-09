"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { FileImages } from "@/components/File";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();
  const [images, setImages] = useState<string[]>([]);

  const [dataProduct, setDataProduct] = useState<any>({
    title: "",
    url: "",
    date: undefined,
  });

  const handleProductImageUpload = (key: string, fileList: []) => {
    const newImages: string[] = fileList.map((file) => file.url || "");
    setImages(newImages);
    changeProductValue(key, newImages);
  };

  const changeProductValue = (key: keyof any | string, value: any) => {
    setDataProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(dataProduct);
  };

  return (
    <div className="py-8 px-12">
      <HeaderParams />
      <div className="w-1/2 mx-auto">
        <p className="text-3xl text-[#e04040] text-center tracking-widest leading-loose">
          {description[0]?.description}
        </p>
      </div>
      <FileProduct
        handleProductImageUpload={handleProductImageUpload}
        imgUrlKey={key as keyof any}
        initialImages={images}
      />
    </div>
  );
};
