"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { api } from "@/config/api";
import { ITheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme>();
  const getTheme = async () => {
    const themeId = params.id;
    const groupId = localStorage.getItem("groupId");
    const response = await api.get(`/theme/${themeId}`);
    console.log(response);
    setTheme(response.data);
  };

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <div className="py-8 ">
      <HeaderParams />
    </div>
  );
};
