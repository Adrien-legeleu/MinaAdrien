"use client";
import { ArrowRight, IconJoinGroup, IconNewGroup } from "@/components/icons";

import { cn } from "@/utils/cn";
import { useState } from "react";
import { Create } from "./Create";
import { Join } from "./Join";

interface IModalProps {
  isModalOpen: boolean;
  modalClose: () => void;
}

export const ModalAuthGroup: React.FC<IModalProps> = ({
  isModalOpen,
  modalClose,
}) => {
  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  const isCreateFalse = () => {
    setIsCreate(false);
  };
  const isJoinFalse = () => {
    setIsJoin(false);
  };

  return (
    <div
      className={`h-screen w-full  fixed top-0 left-0 z-50 flex items-center justify-center ${
        isModalOpen ? "visible" : "hidden"
      }`}
    >
      <div
        className={`h-screen w-full  backdrop-blur-[5px]  absolute top-0 left-0${
          isModalOpen ? "visible" : "hidden"
        }`}
        onClick={modalClose}
      ></div>

      <div
        className={`bg-white/95  rounded-3xl shadow-xl shadow-slate-600 z-20 flex items-center justify-center py-16 px-16 gap-16 ${
          isModalOpen
            ? "viible opacity-100 scale-100"
            : "scale-0 opacity-0 invisible"
        } duration-500 `}
      >
        <div
          className=" w-48 h-48 flex flex-col cursor-pointer text-black/80 items-center justify-center gap-3"
          onClick={() => setIsCreate(true)}
        >
          <IconNewGroup />
          <h3 className="text-gray-400 uppercase text-center cursor-pointer">
            nouveau{" "}
          </h3>
        </div>
        <div
          onClick={() => setIsJoin(true)}
          className="h-48 w-48 flex flex-col  text-black/80 cursor-pointer items-center justify-center gap-3"
        >
          <IconJoinGroup />
          <h3 className="text-gray-400 uppercase text-center cursor-pointer">
            rejoindre{" "}
          </h3>
        </div>
      </div>
      {isCreate && <Create isCreateFalse={isCreateFalse} isCreate={isCreate} />}
      {isJoin && <Join isJoinFalse={isJoinFalse} isJoin={isJoin} />}
    </div>
  );
};
