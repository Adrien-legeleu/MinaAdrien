"use client";

import { ArrowRight } from "@/components/icons";
import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { cn } from "@/utils/cn";

export const Join = () => {
  return (
    <div className="h-screen bg-black/[0.96] w-full flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col gap-12">
        <TextGenerateEffect
          words="Rejoingez votre groupe maintenant !"
          delay={0.2}
          className="text-[#ffffff60] text-3xl text-center  tracking-wider mb-12"
        />
        <div className="flex flex-col gap-4 text-lg items-center justify-center">
          <Input
            placeholder="groupname"
            id="groupname"
            name="groupname"
            type="text"
          />
          <Input
            placeholder="password"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className=" text-xl flex items-center justify-center gap-3  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <button>
                <span>Rejoindre</span> <ArrowRight />
              </button>
            </AnimatedShinyText>
          </div>
        </div>
      </div>
    </div>
  );
};
