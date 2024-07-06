"use client";

import { BackButton } from "@/components/Auth";
import { ArrowRight, IconClose } from "@/components/icons";
import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { useCreateJoinContext } from "@/context/CreateJoinContexts";
import {
  IJoinFormsValues,
  IPseudoFormValues,
  useGroupContext,
} from "@/context/GroupContexts";

import { cn } from "@/utils/cn";

interface IJoinProps {
  isJoinFalse: () => void;
  isJoin: boolean;
}

export const Join: React.FC<IJoinProps> = ({ isJoinFalse, isJoin }) => {
  const { onLogin, joinPageRedirect, chosePseudo } = useGroupContext();
  const { user } = useCreateJoinContext();

  const groupId = localStorage.getItem("groupId");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = {
      userId: user?._id,
      password: data.get("password"),
    };
    console.log(values);
    await onLogin(values as IJoinFormsValues);
  };
  const onSubmitPseudo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = {
      userId: user?._id,
      groupId: groupId,
      pseudoUser: data.get("pseudo"),
    };
    console.log(values);
    await chosePseudo(values as IPseudoFormValues);
  };

  return (
    <div className="z-50">
      {" "}
      <div
        className={`h-screen w-full  backdrop-blur-sm  absolute top-0 left-0${
          isJoin ? "visible" : "hidden"
        }`}
        onClick={isJoinFalse}
      ></div>
      <div className=" z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl  bg-white  py-12 px-20  shadow-white/70 shadow-2xl flex items-center justify-center">
        <div
          className="absolute top-4 right-4 h-12 w-12 text-black/80 cursor-pointer hover:scale-105 duration-500 ease-in-out"
          onClick={isJoinFalse}
        >
          <IconClose />
        </div>
        {joinPageRedirect === "choosePseudoPage" ? (
          <form className="flex flex-col gap-12" onClick={onSubmitPseudo}>
            <TextGenerateEffect
              words="Céer votre pseudo et c'est parti!"
              delay={0.2}
              className="text-black/70 text-3xl text-center  tracking-wider mb-10"
            />
            <div className="flex flex-col gap-4 text-lg items-center justify-center">
              <Input
                placeholder="pseudo"
                id="pseudo"
                name="pseudo"
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
                    <span>c'est parti !</span> <ArrowRight />
                  </button>
                </AnimatedShinyText>
              </div>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-12" onClick={onSubmit}>
            <TextGenerateEffect
              words="Rejoignez un groupe!"
              delay={0.2}
              className="text-black/70 text-3xl text-center  tracking-wider"
            />
            <div className="flex flex-col gap-4 text-lg items-center justify-center">
              <Input
                placeholder="code du groupe"
                id="password"
                name="password"
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
                    <span>login</span> <ArrowRight />
                  </button>
                </AnimatedShinyText>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
