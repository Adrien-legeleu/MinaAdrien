"use client";

import { BackButton } from "@/components/Auth";
import { ArrowRight, IconClose } from "@/components/icons";
import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { useCreateJoinContext } from "@/context/CreateJoinContexts";
import { IGroupFormsValues, useGroupContext } from "@/context/GroupContexts";

import { cn } from "@/utils/cn";

interface ICreateProps {
  isCreateFalse: () => void;
  isCreate: boolean;
}

export const Create: React.FC<ICreateProps> = ({ isCreateFalse, isCreate }) => {
  const { onRegister } = useGroupContext();
  const { user } = useCreateJoinContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = {
      userId: user?._id,
      groupname: data.get("groupname"),
    };

    await onRegister(values as IGroupFormsValues);
  };

  return (
    <div className="z-50">
      {" "}
      <div
        className={`h-screen w-full  backdrop-blur-sm  absolute top-0 left-0${
          isCreate ? "visible" : "hidden"
        }`}
        onClick={isCreateFalse}
      ></div>
      <div className=" z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl  bg-white  py-12 px-20 max-[400px]:px-16 max-[400px]:py-12 shadow-white/70 shadow-2xl flex items-center justify-center">
        <div
          className="absolute top-4 right-4 h-12 w-12 text-black/80 cursor-pointer hover:scale-105 duration-500 ease-in-out"
          onClick={isCreateFalse}
        >
          <IconClose />
        </div>
        <form className="flex flex-col gap-12 " onSubmit={onSubmit}>
          <TextGenerateEffect
            words="Céer votre groupe maintenant !"
            delay={0.2}
            className="text-black/70 max-sm:text-xl max-[400px]:text-lg text-3xl text-center  tracking-wider mb-10"
          />
          <div className="flex  text-lg items-center justify-center">
            <Input
              placeholder="groupname"
              id="groupname"
              name="groupname"
              type="text"
            />
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
    </div>
  );
};
