import { ArrowRight } from "@/components/icons";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";
import { useState } from "react";

export const ModalAuthGroup = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  return (
    <div className="fixed bg-black shadow-xl shadow-slate-600 flex items-center justify-center py-20 px-16 gap-16">
      <div className="bg-white" onClick={setIsCreate(true)}>
        créer
      </div>
      <div className="bg-white">login</div>
    </div>
  );
};
