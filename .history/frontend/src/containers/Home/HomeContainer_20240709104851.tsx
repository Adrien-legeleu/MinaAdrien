"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { FileImages } from "@/components/File";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";
import Dragger from "antd/es/upload/Dragger";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();
  const [images, setImages] = useState<string[]>([]);

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
        imgUrlKey={key as keyof IProduct}
        initialImages={images}
      />
    </div>
  );
};
