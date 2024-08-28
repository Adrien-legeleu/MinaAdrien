"use client";
import { useState } from "react";
import { IconGroup, IconSetting } from "../icons";
import { Params } from "./Params";

interface IHeaderProps {
  isParams: boolean;
  closeParams: () => void;
  openParams: () => void;
}

export const HeaderParams: React.FC<IHeaderProps> = ({
  isParams,
  closeParams,
  openParams,
}) => {
  return (
    <div>
      <div
        className="z-50  h-12 w-12 text-black/80 max-sm:h-8 max-sm:w-8 max-sm:top-4 max-sm:right-4  fixed top-8 right-8"
        onClick={openParams}
      >
        <IconSetting />
      </div>
      <Params isParams={isParams} closeParams={closeParams} />
    </div>
  );
};
