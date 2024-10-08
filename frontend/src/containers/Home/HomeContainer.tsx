"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { BackGroup } from "@/components/BackButton";
import { HeaderParams } from "@/components/Header";
import { ImageHome } from "@/components/ImageHome";
import { Logout } from "@/components/Logout";
import { ThemeHome } from "@/components/Theme";
import { ModalProvider } from "@/components/UI/AnimatedModal";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { useDescriptionContext } from "@/context/DescriptionContext";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { LovniaGame } from "../Game";
import { AuroraBackground } from "@/components/UI/AuroraBackground";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();

  const [isParams, setIsParams] = useState(false);
  const [descIndex, setDescIndex] = useState(0);

  const closeParams = () => {
    setIsParams(false);
  };
  const openParams = () => {
    setIsParams(true);
  };
  const randomDescIndex = () => {
    const index = Math.floor(Math.random() * description.length);
    setDescIndex(index);
  };
  useEffect(() => {
    randomDescIndex();
  }, []);

  return (
    <div>
      <div className="absolute top-8 left-8 z-10  max-sm:left-4">
        <BackGroup />
      </div>
      <HeaderParams
        isParams={isParams}
        closeParams={closeParams}
        openParams={openParams}
      />

      {
        <AuroraBackground>
          <div className="w-1/2 mx-auto pt-10  pb-48 max-sm:pt-16  max-sm:w-full max-sm:px-3 font-montserrat ">
            {description[0] ? (
              <TextGenerateEffect
                words={description[descIndex]?.description}
                delay={0.1}
                className="text-4xl max-sm:text-3xl max-[400px]:text-2xl  text-[#d83c3c] text-center leading-loose  tracking-widest"
              />
            ) : (
              <div className="flex items-center justify-center flex-col gap-8">
                <p
                  className={cn(
                    `text-4xl max-md:text-3xl max-sm:text-xl tracking-widest text-center leading-loose font-semibold  animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Décrivez votre groupe en ajoutant plusieurs descriptions !✨
                </p>
                <div
                  className={cn(
                    "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  )}
                  onClick={() => setIsParams(true)}
                >
                  <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <button
                      className="flex items-center justify-center gap-3"
                      type="submit"
                    >
                      <span>Ajouter maintenant🎉 !</span>
                    </button>
                  </AnimatedShinyText>
                </div>
              </div>
            )}
          </div>
        </AuroraBackground>
      }
      <ImageHome />
      <ModalProvider>
        <ThemeHome />
      </ModalProvider>
      <LovniaGame />
    </div>
  );
};
