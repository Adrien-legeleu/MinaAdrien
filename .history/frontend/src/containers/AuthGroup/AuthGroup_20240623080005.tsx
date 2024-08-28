"use client";

import { Spotlight } from "@/components/UI/SpotLight";

export const AuthGroup = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="text-white text-3xl">
        Bienvenue choissiser votre group
      </div>
    </div>
  );
};
