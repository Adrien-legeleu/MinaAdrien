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
      className={`h-screen w-full fixed top-0 left-0 backdrop-blur-[2px] z-50 flex items-center justify-center ${
        isModalOpen ? "visible" : "hidden"
      }`}
    >
      <div className="absolute top-20 left-20 text-white ">fermer</div>
      <div
        className={`bg-black shadow-xl shadow-slate-600 flex items-center justify-center py-20 px-16 gap-16 ${
          isModalOpen
            ? "viible opacity-100 scale-100"
            : "scale-0 opacity-0 invisible"
        } duration-300 `}
      >
        <div className="bg-white" onClick={() => setIsCreate(true)}>
          créer
        </div>
        <div onClick={() => setIsCreate(false)} className="bg-white">
          login
        </div>
      </div>
      {isCreate && <Create isCreateFalse={isCreateFalse} />}
      {/* {isJoin && <Join isJoinFalse={isJoinFalse} />} */}
    </div>
  );
};
