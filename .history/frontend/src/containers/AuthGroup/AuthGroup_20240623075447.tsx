"use client";

import { Spotlight } from "@/components/UI/SpotLight";

export const AuthGroup = () => {
  return (
    <div className="h-screen w-full bg-black/[0.96] flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div>Bienvenue choissiser votre group</div>
    </div>
  );
};
