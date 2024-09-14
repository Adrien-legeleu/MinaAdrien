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
import { useEffect, useState, useCallback } from "react";

type ThemeContainerDetailsProps = IThemeDetailsProps;

import { ThemeCreate, ThemeImg, ThemeUpdate } from "@/components/Theme";
import { IImage } from "@/context/ImageContexts";
import {
  IconDelete,
  IconEllipsis,
  IconLoop,
  IconUpdate,
} from "@/components/icons";
import { BackHome } from "@/components/BackButton";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import { useGroupContext } from "@/context/GroupContexts";

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
  const getTheme = useCallback(() => {
    const foundTheme = themes.find((tme) => tme._id === params.id);

    setTheme(foundTheme || null);
  }, [params.id, themes]);

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const { group } = useGroupContext();

  const onDeleteImage = (imgId: string) => {
    const updatedImages = theme?.images.filter((img) => img._id !== imgId);

    const values: IThemeFormUpdate = {
      images: updatedImages,
      groupId:
        typeof window !== "undefined" ? localStorage.getItem("groupId") : null,
      themeId: theme?._id || "",
      title: theme?.title,
    };

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
    <div className="py-4 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
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
            "group inline-block relative mx-auto max-w-fit flex-row items-center  justify-center rounded-2xl bg-white/55 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40"
          )}
        >
          <div
            className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
          />
          <span
            className={cn(
              `text-5xl max-lg:text-4xl tracking-widest max-md:text-3xl  animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            {theme?.title} !
          </span>
        </div>
        <TextGenerateEffect
          words={theme?.bio || ""}
          delay={0.3}
          className="text-[#000000cb] z-50 text-4xl px-4 max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
        />
      </div>
      <div className="grid-cols-2 grid max-sm:grid-cols-1 max-xl:gap-6 max-lg:gap-5 gap-16 px-16 max-xl:px-6 max-lg:px-5 max-md:gap-4 max-md:px-4 max-sm:px-5 items-center justify-center">
        {theme?.images.map((img: any, index) => (
          <div key={index}>
            <div className="bg-gray-50 relative flex flex-col gap-6 /[0.2] border-black/[0.1] rounded-xl p-6 border">
              {isThemeUpdateOpen && img._id === imgId ? (
                <ThemeUpdate
                  data={dataUpdate}
                  themeId={theme._id}
                  themeUpdateClose={themeUpdateClose}
                  imgId={imgId}
                />
              ) : (
                <>
                  <div className="absolute top-6 z-20 right-0 text-black/80 h-10 w-10">
                    <div
                      onClick={() => handleUpdateDeleteModal(img._id)}
                      className="cursor-pointer"
                    >
                      <IconEllipsis />
                    </div>
                    <div
                      className={`absolute -top-24 z-20 right-0 flex items-end justify-center flex-col gap-2 ${
                        updateDeleteOpen && img._id === imgId
                          ? "visible opacity-100"
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
                  <div className="text-xl font-semibold text-center px-2 text-black/80 tracking-wider">
                    {img.legend ? img.legend : "no legend"}
                  </div>
                  <div className="mt-2">
                    <Image
                      src={img.url[0]} // L'URL semble correcte
                      alt={img.legend || "thumbnail"} // Alternative text
                      width={400} // Ajoutez une largeur appropriée
                      height={400} // Ajoutez une hauteur appropriée
                      className="object-contain rounded-xl group-hover/card:shadow-xl max-h-[400px] mx-auto"
                      unoptimized={true}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="px-4 py-2 rounded-xl text-black/80 tracking-wider font-semibold">
                      {img.photoDate ? img.photoDate : "../../.."}
                    </div>
                    <div
                      className="px-4 py-2 h-10 w-10 hover:scale-110 duration-300 ease-in-out cursor-pointer"
                      onClick={() => themeModalImgOpen(img._id)}
                    >
                      <IconLoop />
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
          </div>
        ))}
      </div>
      {createThemeImgOpen ? (
        <ThemeCreate themeCreateClose={themeCreateClose} themeId={theme?._id} />
      ) : (
        <div className="items-center z-20 py-20 justify-center flex">
          <button
            className="py-2 px-4 rounded-xl bg-black/90 text-white tracking-wider"
            onClick={themeCreateOpen}
          >
            Complétez votre Theme !
          </button>
        </div>
      )}
    </div>
  );
};
