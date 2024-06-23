"use client";

import { Input } from "@/components/UI";
import { Spotlight } from "@/components/UI/SpotLight";

export const Join = () => {
  return (
    <div className="h-screen bg-black/[0.96] w-full flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col">
        <div className="flex flex-col">
          <Input
            placeholder="groupname"
            id="groupname"
            name="groupname"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
