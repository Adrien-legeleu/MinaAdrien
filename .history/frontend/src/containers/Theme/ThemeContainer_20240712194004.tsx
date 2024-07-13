"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import AnimatedGradientText from "@/components/UI/GradientText";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
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
      <div>
     
        <AnimatedGradientText>
          
        <h1 className="">{theme?.title}</h1>
          
        </AnimatedGradientTex>
        <p>{theme?.bio}</p>
      </div>
      
    </div>
  );
};
