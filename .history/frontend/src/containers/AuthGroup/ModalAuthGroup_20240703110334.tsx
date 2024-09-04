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

export const ModalAuthGroup: React.FC<IModalProps> = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  const isCreateFalse = () => {
    setIsCreate(false);
  };
  const isJoinFalse = () => {
    setIsJoin(false);
  };

  return (
    <div>
      <div className="fixed bg-black shadow-xl shadow-slate-600 flex items-center justify-center py-20 px-16 gap-16">
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
