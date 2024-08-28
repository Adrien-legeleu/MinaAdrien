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
        className="z-50  h-14 w-14 text-black/80   fixed top-10 right-14"
        onClick={openParams}
      >
        <IconSetting />
      </div>
      <Params isParams={isParams} closeParams={closeParams} />
    </div>
  );
};
