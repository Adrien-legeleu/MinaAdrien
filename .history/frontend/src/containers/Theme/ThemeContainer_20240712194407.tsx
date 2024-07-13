"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme | null>(null);

  const { themes } = useThemeContext();
  const getTheme = () => {
    const foundTheme = themes.find((tme) => tme._id === params.id);
    console.log(themes);

    setTheme(foundTheme || null);
  };

  useEffect(() => {
    getTheme();
  }, [themes]);

  return (
    <div className="py-8">
      <HeaderParams />
      <div className="pt-20 flex items-center justify-center flex-col gap-5">
        <h1
          className={cn(
            `text-4xl tracking-wider font-semibold inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          {theme?.title}
        </h1>

        <p className="text-xl text-center tracking-wider leading-relaxed">
          {theme?.bio}
        </p>
      </div>
    </div>
  );
};
