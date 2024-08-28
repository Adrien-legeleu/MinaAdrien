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
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="relative w-full min-w-[200px]">
              <input
                type="text"
                placeholder="Username"
                className="border-none rounded-3xl py-4 px-5 bg-gradient-to-b from-indigo-500 text-gray-500 outline-none"
              />
            </div>

            <div className="relative  w-full min-w-[200px]">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  placeholder="Password"
                  className="border-none rounded-3xl py-4 px-5  bg-gradient-to-b from-white/80 to-white/20 text-gray-500 outline-none"
                />
              </div>
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

        <p className="absolute right-5 bottom-5  bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          ✨ Pas encore de compte ? Créez en un dès maintenant !
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};
