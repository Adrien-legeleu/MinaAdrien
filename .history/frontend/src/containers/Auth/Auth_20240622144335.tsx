"use client";

import { ArrowRight } from "@/components/icons";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";
import { Login } from "./Login";

export const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Découvrez Lovna maintenant !
        </h1>
        <Login />

        <p className="absolute right-5 bottom-5  bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          ✨ Pas encore de compte ? Créez en un dès maintenant !
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};
