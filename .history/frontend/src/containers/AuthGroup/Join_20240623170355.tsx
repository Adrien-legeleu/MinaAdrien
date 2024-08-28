"use client";

import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import { Spotlight } from "@/components/UI/SpotLight";

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
          className="text-[#ffffff60] text-2xl text-center  tracking-wider"
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
      </div>
    </div>
  );
};
