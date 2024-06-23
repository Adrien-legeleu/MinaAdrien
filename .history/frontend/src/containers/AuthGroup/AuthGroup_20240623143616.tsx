"use client";

import { DescriptionAuthGroup } from "@/components/Auth";
import { ArrowRight } from "@/components/icons";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { cn } from "@/utils/cn";
import { useState } from "react";

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);

  const isGroupTrue = () => {
    setIsGroup(true);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/[0.96] overflow-y-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      {!isGroup ? (
        <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
      ) : (
        <div className="gap-20 w-2/3 flex">
          <div className="flex flex-col gap-20  items-center flex-1 ">
            <TextGenerateEffect
              words={
                "Connectez-vous 💬 pour accéder à votre groupe et partager vos expériences."
              }
              className="text-[#ffffff60] text-xl text-center  tracking-wider"
            />
            <div
              className={cn(
                "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              onClick={isGroupTrue}
            >
              <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <button>Se connectez</button>
              </AnimatedShinyText>
            </div>
          </div>
          <div className="flex flex-col gap-20  items-center flex-1 ">
            <TextGenerateEffect
              words={
                "Créez un nouveau groupe 🌍 pour démarrer et partager vos passions avec vos amis."
              }
              className="text-[#ffffff60] text-xl text-center  tracking-wider"
            />
            <div
              className={cn(
                "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              onClick={isGroupTrue}
            >
              <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <button>Créer un groupe</button>
              </AnimatedShinyText>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
