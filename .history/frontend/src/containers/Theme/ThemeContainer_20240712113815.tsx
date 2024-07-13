"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const HomeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  return (
    <div className="py-8 ">
      <HeaderParams />
    </div>
  );
};
