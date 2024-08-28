"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { CardBody, CardContainer, div } from "@/components/UI/3dCart";
import {
  ITheme,
  IThemeFormUpdate,
  useThemeContext,
} from "@/context/ThemeContext";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ThemeCreate, ThemeImg, ThemeUpdate } from "@/components/Theme";
import { IImage } from "@/context/ImageContexts";
import { IconDelete, IconEllipsis, IconUpdate } from "@/components/icons";
import { BackHome } from "@/components/BackButton";

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
  const [createThemeImgOpen, setCreateThemeImgOpen] = useState(false);

  const themeCreateClose = () => {
    setCreateThemeImgOpen(false);
  };
  const themeCreateOpen = () => {
    setCreateThemeImgOpen(true);
  };
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

  const handleUpdateDeleteModal = (id: string) => {
    setUpdateDeleteOpen(!updateDeleteOpen);
    setImgId(id);
  };

  const { themes, updateTheme } = useThemeContext();
  const getTheme = () => {
    const foundTheme = themes.find((tme) => tme._id === params.id);
    console.log(themes);

    setTheme(foundTheme || null);
  };

  useEffect(() => {
    getTheme();
  }, [themes]);

  const groupId = localStorage.getItem("groupId") || "";

  const onDeleteImage = (imgId: string) => {
    const updatedImages = theme?.images.filter((img) => img._id !== imgId);

    const values: IThemeFormUpdate = {
      images: updatedImages,
      groupId: groupId,
      themeId: theme?._id || "",
      title: theme?.title,
    };
    console.log("ezeze");

    console.log(values);

    updateTheme(values);
  };

  const [isParams, setIsParams] = useState(false);

  const closeParams = () => {
    setIsParams(false);
  };
  const openParams = () => {
    setIsParams(true);
  };

  return (
    <div className=" py-4 w-full  dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-8 left-8">
        <BackHome />
      </div>
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="py-12 flex items-center justify-center flex-col gap-5">
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
              <div className="bg-gray-50 relative group/card flex flex-col gap-6 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                {isThemeUpdateOpen && img._id === imgId ? (
                  <ThemeUpdate
                    data={dataUpdate}
                    themeId={theme._id}
                    themeUpdateClose={themeUpdateClose}
                    imgId={imgId}
                  />
                ) : (
                  <>
                    <div
                      translateZ="120"
                      translateX={-5}
                      className="absolute top-6 z-20 right-0 text-black/80 h-10 w-10 "
                    >
                      <div
                        onClick={() => handleUpdateDeleteModal(img._id)}
                        className="cursor-pointer"
                      >
                        <IconEllipsis />
                      </div>
                      <div
                        className={`absolute -top-24 z-20 right-0 flex items-end justify-center flex-col gap-2 ${
                          updateDeleteOpen && img._id === imgId
                            ? "visible opacity-100 "
                            : "invisible opacity-0"
                        } duration-200 ease-in-out`}
                      >
                        <p
                          onClick={() => onDeleteImage(img._id)}
                          className="flex cursor-pointer gap-4 items-center justify-center text-sm px-4 py-2 rounded-full text-black/80 bg-white/95 border-[1px] border-black/20"
                        >
                          supprimer{" "}
                          <div className="h-4 w-4">
                            <IconDelete />
                          </div>{" "}
                        </p>
                        <p
                          onClick={() => themeUpdateOpen(img)}
                          className="flex gap-4 cursor-pointer text-sm items-center justify-center px-4 py-2 rounded-full text-black/80 bg-white/95 border-[1px] border-black/20"
                        >
                          modifier{" "}
                          <div className="h-4 w-4">
                            <IconUpdate />
                          </div>{" "}
                        </p>
                      </div>
                    </div>
                    <div
                      translateZ="110"
                      className="text-xl w-full font-semibold text-center px-2 text-black/80 tracking-wider"
                    >
                      {img.legend ? img.legend : "no legend"}
                    </div>

                    <div translateZ="150" className="w-full mt-2">
                      <img
                        src={img.url}
                        className=" h-full w-full object-contain rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                    </div>
                    <div className="flex justify-between items-center ">
                      <div
                        translateZ={100}
                        translateX={-30}
                        className="px-4 py-2 rounded-xl   text-black/80  tracking-wider font-semibold"
                      >
                        {img.photoDate ? img.photoDate : "../../.."}
                      </div>

                      <div
                        translateZ={100}
                        translateX={30}
                        className="px-4 py-2 hover:scale-110 duration-300 ease-in-out cursor-pointer"
                        onClick={() => themeModalImgOpen(img._id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/xwvkumdr.json"
                          trigger="in"
                          delay="100"
                          state="in-reveal"
                          colors="primary:#ebe6ef,secondary:#4bb3fd,tertiary:#915110"
                          className="w-12 h-12 "
                        ></lord-icon>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <ThemeImg
                themeModalImgClose={themeModalImgClose}
                isThemeImgModalOpen={isThemeImgModalOpen}
                imgId={imgId}
                theme={theme}
              />
            </>
          );
        })}
        {createThemeImgOpen ? (
          <ThemeCreate
            themeCreateClose={themeCreateClose}
            themeId={theme?._id}
          />
        ) : (
          <div className="items-center justify-center flex">
            <button
              className="py-2 px-4 rounded-xl bg-black/90 text-white tracking-wider "
              onClick={themeCreateOpen}
            >
              Complétez votre Theme !
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
