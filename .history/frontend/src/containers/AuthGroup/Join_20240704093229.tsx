"use client";

import { BackButton } from "@/components/Auth";
import { ArrowRight } from "@/components/icons";
import { Input } from "@/components/UI";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { useCreateJoinContext } from "@/context/CreateJoinContexts";
import {
  IJoinFormsValues,
  IPseudoFormValues,
  useGroupContext,
} from "@/context/GroupContexts";
import { useUserContext } from "@/context/UserContexts";

import { cn } from "@/utils/cn";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";

interface IJoinProps {
  isJoinFalse: () => void;
}

export const Join: React.FC<IJoinProps> = ({ isJoinFalse }) => {
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
    <div className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black/[0.96]  shadow-white shadow-2xl flex items-center justify-center">
      {joinPageRedirect === "choosePseudoPage" ? (
        <form className="flex flex-col gap-12" onClick={onSubmitPseudo}>
          <TextGenerateEffect
            words="Céer votre groupe maintenant !"
            delay={0.2}
            className="text-[#ffffff60] text-3xl text-center  tracking-wider mb-10"
          />
          <div className="flex flex-col gap-4 text-lg items-center justify-center">
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
      ) : joinPageRedirect === "HomePage" ? (
        <div className="bg-white p-32">
          iezoeizoeiozieozieozieozieozieoziiiiiiiiiiiiiiii
        </div>
      ) : (
        <form className="flex flex-col gap-12" onClick={onSubmit}>
          <TextGenerateEffect
            words="Céer votre groupe maintenant !"
            delay={0.2}
            className="text-[#ffffff60] text-3xl text-center  tracking-wider mb-10"
          />
          <div className="flex flex-col gap-4 text-lg items-center justify-center">
            <Input
              placeholder="password"
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
  );
};
