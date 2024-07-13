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
      <div className="flex z-50   gap-10 py-5 fixed top-0 right-12">
        <div
          className="h-10 w-10 text-black/80"
          onClick={() => setIsParams(true)}
        >
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
