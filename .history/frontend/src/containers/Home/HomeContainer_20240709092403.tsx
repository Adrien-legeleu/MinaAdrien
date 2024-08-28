"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();

  return (
    <div className="py-8 px-12">
      <HeaderParams />
      <div className="w-1/2 mx-auto">
        <p className="text-3xl text-[#e47171F] text-center tracking-widest leading-loose">
          {description[0]?.description}
        </p>
      </div>
    </div>
  );
};
