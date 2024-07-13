"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { CardBody, CardContainer, CardItem } from "@/components/UI/3dCart";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";
import Image from "next/image";
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
      <div className="pt-12 flex items-center justify-center flex-col gap-5">
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
      <div>
        {theme?.images.map((img: any) => {
          return (
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="150"
                  className="text-2xl mb-5 w-full font-semibold text-center  text-black/80 tracking-wider"
                >
                  {img.legend ? img.legend : "no legend"}
                </CardItem>

                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={img.url}
                    className=" h-full w-full object-contain rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-end items-center mt-20">
                  <CardItem
                    translateZ={20}
                    translateX={40}
                    as="button"
                    className="px-4 py-2 rounded-xl text-black/80 t tracking-wider xt-xl font-semibold"
                  >
                    {img.dataPhoto ? img.dataPhoto : "../../.."}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          );
        })}
      </div>
    </div>
  );
};
