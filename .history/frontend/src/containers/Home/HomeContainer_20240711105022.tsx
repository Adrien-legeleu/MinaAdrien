"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { HeaderParams } from "@/components/Header";
import { ImageHome } from "@/components/ImageHome";
import { ThemeHome } from "@/components/Theme";
import { useDescriptionContext } from "@/context/DescriptionContext";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();

  return (
    <div className="py-8 ">
      <HeaderParams />
      {
        <div className="w-1/2 mx-auto">
          <p className="text-3xl text-[#d83c3c] text-center  leading-loose tracking-widest">
            {description[0]?.description}
          </p>
        </div>
      }
      <ImageHome />
      <div className="shadow-2xl shadow-black  z-50 h-12 bg-red-600 w-full"></div>
      <ThemeHome />
    </div>
  );
};
