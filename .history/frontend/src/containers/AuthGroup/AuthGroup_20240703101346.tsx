"use client";

import { BackButton, DescriptionAuthGroup } from "@/components/Auth";
import { ArrowRight } from "@/components/icons";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { api } from "@/config/api";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [user, setUser] = useState(null);

  const isGroupTrue = () => {
    setIsGroup(true);
  };
  const isGroupFalse = () => {
    setIsGroup(false);
  };

  useEffect(() => {}, []);

  const getUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in local storage");
      }
      const response = await api.get("/auth/user", userId);
      setUser(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col gap-28  items-center justify-center bg-black/[0.96] overflow-y-hidden">
      <BackButton />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <AnimatedShinyText className=" text-6xl transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 cursor-default">
        <span onClick={isGroupFalse}>LOVNA</span>
      </AnimatedShinyText>
      {!isGroup ? (
        <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
      ) : (
        <div>{}</div>
      )}
    </div>
  );
};
