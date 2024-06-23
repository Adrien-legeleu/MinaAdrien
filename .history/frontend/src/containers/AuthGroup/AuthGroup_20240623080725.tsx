"use client";

import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import { Spotlight } from "@/components/UI/SpotLight";

export const AuthGroup = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <TextGenerateEffect
        words={"Bienvenue , choississez votre groupe et partagez vos passions"}
        className="text-[#ffffff60] text-4xl w-1/2"
      />
    </div>
  );
};
