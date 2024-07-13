"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { api } from "@/config/api";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme>();

  const getTheme = async () => {
    const { theme } = useThemeContext();
    setTheme(theme.filter((tme) => tme._id === params.id));
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
