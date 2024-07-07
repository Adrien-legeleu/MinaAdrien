"use client";
import { useState } from "react";
import { IconGroup, IconSetting } from "../icons";
import { Params } from "./Params";

export const HeaderParams = () => {
  const [isParams, setIsParams] = useState(false);

  const closeParams = () => {
    setIsParams(false);
  };

  return (
    <div>
      <div className="flex   gap-10 py-5 fixed top-0 right-12">
        <div className="h-10 w-10 text-black/80">
          <IconSetting />
        </div>
        <div className="h-10 w-10 text-black/80">
          <IconGroup />
        </div>
      </div>
      <Params isParams={isParams} closeParams={closeParams} />
    </div>
  );
};
