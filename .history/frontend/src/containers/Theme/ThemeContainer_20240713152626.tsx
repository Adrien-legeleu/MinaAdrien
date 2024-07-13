"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { CardBody, CardContainer, CardItem } from "@/components/UI/3dCart";
import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ThemeImg, ThemeUpdate } from "@/components/Theme";
import { IImage } from "@/context/ImageContexts";
import { IconDelete, IconEllipsis, IconUpdate } from "@/components/icons";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export const ThemeContainer: React.FC<ThemeContainerDetailsProps> = ({
  params,
}) => {
  const [theme, setTheme] = useState<ITheme | null>(null);
  const [isThemeImgModalOpen, setIsThemeImgModalOpen] = useState(false);
  const [imgId, setImgId] = useState("");
  const [dataUpdate, setDataUpdate] = useState<IImage | null>(null);
  const [isThemeUpdateOpen, setIsThemeUpdateOpen] = useState(false);
  const [updateDeleteOpen, setUpdateDeleteOpen] = useState(false);

  const themeUpdateClose = () => {
    setIsThemeUpdateOpen(false);
  };

  const themeUpdateOpen = (themeImg: IImage) => {
    setIsThemeUpdateOpen(true);
    setDataUpdate(themeImg);
  };

  const themeModalImgClose = () => {
    setIsThemeImgModalOpen(false);
  };
  const themeModalImgOpen = (id: string) => {
    setIsThemeImgModalOpen(true);
    setImgId(id);
  };

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
      <div className="grid-cols-2 grid">
        {theme?.images.map((img: any) => {
          return (
            <>
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card flex flex-col gap-6 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  {isThemeUpdateOpen ? (
                    <ThemeUpdate
                      data={dataUpdate}
                      isThemeUpdateOpen={isThemeUpdateOpen}
                      themeUpdateClose={themeUpdateClose}
                    />
                  ) : (
                    <>
                      <div className="absolute top-5 z-20 right-0 text-black/80 h-10 w-10 ">
                        <IconEllipsis />
                        <div
                          className={`absolute -top-20 z-20 right-0 flex items-end justify-center flex-col gap-4 ${
                            updateDeleteOpen
                              ? "visible opacity-100 "
                              : "invisible opacity-0"
                          } duration-200 ease-in-out`}
                        >
                          <p className="flex gap-4 items-center justify-center px-4 py-2 rounded-full text-black/80 bg-white/95 border-[1px] border-black/20">
                            supprimer{" "}
                            <div className="h-6 w-6">
                              <IconDelete />
                            </div>{" "}
                          </p>
                          <p
                            onClick={() => themeUpdateOpen(img)}
                            className="flex gap-4 items-center justify-center px-4 py-2 rounded-full text-black/80 bg-white/95 border-[1px] border-black/20"
                          >
                            modifier{" "}
                            <div className="h-6 w-6">
                              <IconUpdate />
                            </div>{" "}
                          </p>
                        </div>
                      </div>
                      <CardItem
                        translateZ="120"
                        className="text-xl w-full font-semibold text-center  text-black/80 tracking-wider"
                      >
                        {img.legend ? img.legend : "no legend"}
                      </CardItem>

                      <CardItem translateZ="150" className="w-full mt-2">
                        <img
                          src={img.url}
                          className=" h-full w-full object-contain rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <div className="flex justify-between items-center ">
                        <CardItem
                          translateZ={100}
                          translateX={-30}
                          className="px-4 py-2 rounded-xl cursor-pointer  text-black/80  tracking-wider font-semibold"
                        >
                          {img.dataPhoto ? img.dataPhoto : "../../.."}
                        </CardItem>

                        <CardItem
                          translateZ={100}
                          translateX={30}
                          className="px-4 py-2 hover:scale-110 duration-300 ease-in-out cursor-pointer"
                          onClick={() => themeModalImgOpen(img._id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xwvkumdr.json"
                            trigger="in"
                            delay="500"
                            state="in-reveal"
                            colors="primary:#ebe6ef,secondary:#4bb3fd,tertiary:#915110"
                            className="w-12 h-12 "
                          ></lord-icon>
                        </CardItem>
                      </div>
                    </>
                  )}
                </CardBody>
              </CardContainer>
              <ThemeImg
                themeModalImgClose={themeModalImgClose}
                isThemeImgModalOpen={isThemeImgModalOpen}
                imgId={imgId}
                theme={theme}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
