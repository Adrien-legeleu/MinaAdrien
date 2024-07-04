"use client";
import { ArrowRight } from "@/components/icons";

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
      className={`h-screen w-full fixed top-0 left-0 z-50 flex items-center justify-center ${
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
        className={`bg-white/95 py-12px-8 shadow-xl shadow-slate-600 z-20 flex items-center justify-center py-20 px-16 gap-16 ${
          isModalOpen
            ? "viible opacity-100 scale-100"
            : "scale-0 opacity-0 invisible"
        } duration-500 `}
      >
        <div className="bg-white" onClick={() => setIsCreate(true)}>
          créer
        </div>
        <div onClick={() => setIsJoin(true)} className="bg-white">
          login
        </div>
      </div>
      {isCreate && <Create isCreateFalse={isCreateFalse} />}
      {isJoin && <Join isJoinFalse={isJoinFalse} />}
    </div>
  );
};
