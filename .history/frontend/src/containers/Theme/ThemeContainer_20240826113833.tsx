"use client";

import { IThemeDetailsProps } from "@/app/theme/[id]/page";
import { HeaderParams } from "@/components/Header";
import { CardBody, CardContainer, CardItem } from "@/components/UI/3dCart";
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
import DotPattern from "@/components/magicui/dot-pattern";

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
    <div className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
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
    </div>
  );
};
