"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { api } from "@/config/api";
import { ITheme } from "@/context/ThemeContext";
import { useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme>();
  const getTheme = async () => {
    const response = await api.get(`/theme/${params.id}`);
  };

  return (
    <div className="py-8 ">
      <HeaderParams />
    </div>
  );
};
