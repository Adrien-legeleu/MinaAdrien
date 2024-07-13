"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme | null>(null);

  const getTheme = () => {
    const { themes } = useThemeContext();
    const foundTheme = themes.find((tme) => tme._id === params.id);
    setTheme(foundTheme || null);
  };

  useEffect(() => {
    getTheme();
  }, [params.id]);

  return (
    <div className="py-8">
      <HeaderParams />
    </div>
  );
};
