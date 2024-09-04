"use client";

import { BackButton } from "@/components/Auth";
import { ArrowRight } from "@/components/icons";
import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { useCreateJoinContext } from "@/context/CreateJoinContexts";
import { IGroupFormsValues, useGroupContext } from "@/context/GroupContexts";

import { cn } from "@/utils/cn";

interface ICreateProps {
  isCreateFalse: () => void;
  modalClose: () => void;
}

export const Create: React.FC<ICreateProps> = ({
  isCreateFalse,
  modalClose,
}) => {
  const { onRegister } = useGroupContext();
  const userId = localStorage.getItem("userId");

  const { setUser } = useCreateJoinContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = {
      userId: userId,
      groupname: data.get("groupname"),
      pseudo: data.get("pseudo"),
    };
    console.log(values);
    await onRegister(values as IGroupFormsValues);
    modalClose();
  };

  const changeUser = () => {};

  return (
    <div className=" z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black/[0.96]  shadow-white shadow-2xl flex items-center justify-center">
      <form className="flex flex-col gap-12" onClick={onSubmit}>
        <TextGenerateEffect
          words="Céer votre groupe maintenant !"
          delay={0.2}
          className="text-[#ffffff60] text-3xl text-center  tracking-wider mb-10"
        />
        <div className="flex flex-col gap-4 text-lg items-center justify-center">
          <Input
            placeholder="groupname"
            id="groupname"
            name="groupname"
            type="text"
          />
          <Input placeholder="pseudo" id="pseudo" name="pseudo" type="text" />
        </div>
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <button
                className="flex items-center justify-center gap-3 "
                type="submit"
              >
                <span>Créer</span> <ArrowRight />
              </button>
            </AnimatedShinyText>
          </div>
        </div>
      </form>
    </div>
  );
};
