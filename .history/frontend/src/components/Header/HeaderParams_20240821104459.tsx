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
      <
        className="flex z-50  h-10 w-10 text-black/80  gap-10 py-5 fixed top-10 right-12"
        onClick={openParams}
      >
       
          <IconSetting />
      
      </div>
      <Params isParams={isParams} closeParams={closeParams} />
    </div>
  );
};
