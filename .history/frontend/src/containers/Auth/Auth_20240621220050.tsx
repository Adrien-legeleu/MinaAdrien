"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";

export const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Découvrez Lovna maintenant !
        </h1>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                placeholder="Username"
                className="border-none rounded-full py-4 px-5  text-lg bg-white text-gray-500 outline-none"
              />
            </div>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                placeholder="Password"
                type="password"
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-[#cccbcbaf] focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              />
              <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-[#e0e0e0] transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#cccbcbaf] peer-focus:after:scale-x-100 peer-focus:after:border-[#cccbcbaf] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex text-xl items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Login</span>
              </AnimatedShinyText>
            </div>
          </div>
        </div>

        <div
          className={cn(
            " absolute right-5 bottom-5  group rounded-full p-1 border border-black/5 bg-[#ffffffd5] text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="  inline-flex text-sm items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Pas encore de compte ? Créez en un dès maintenant !</span>
          </AnimatedShinyText>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};
