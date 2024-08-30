"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";

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
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";

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
      <div className="absolute z-10 top-8 left-8">
        <BackHome />
      </div>
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />
      <div className="pt-12 pb-28 flex items-center justify-center flex-col gap-10">
        <div
          className={cn(
            "group inline-block relative mx-auto  max-w-fit flex-row items-center justify-center rounded-2xl bg-white/55 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40"
          )}
        >
          <div
            className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
          />

          <span
            className={cn(
              `text-5xl max-lg:text-4xl tracking-widest max-md:text-3xl animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            {theme?.title} !
          </span>
        </div>

        {/* <p className="text-[#000000cb] text-4xl max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider">
          {theme?.bio}
        </p> */}
        <TextGenerateEffect
          words={theme?.bio || ""}
          delay={0.3}
          className="text-[#000000cb] z-50 text-4xl max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
        />
      </div>
      <div className="grid-cols-2 grid max-sm:grid-cols-1 max-xl:gap-6 max-lg:gap-5 gap-16 px-16 max-xl:px-6  max-lg:px-5 max-md:gap-4 max-md:px-4 max-sm:px-5  items-center justify-center">
        {theme?.images.map((img: any) => {
          return <>zazaz</>;
        })}
        {createThemeImgOpen ? (
          <ThemeCreate
            themeCreateClose={themeCreateClose}
            themeId={theme?._id}
          />
        ) : (
          <div className="items-center z-20 py-20 justify-center flex">
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
