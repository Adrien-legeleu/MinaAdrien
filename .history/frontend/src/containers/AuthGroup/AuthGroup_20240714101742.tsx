"use client";

import { BackButton, DescriptionAuthGroup } from "@/components/Auth";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { api } from "@/config/api";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { ModalAuthGroup } from "./ModalAuthGroup";
import { useCreateJoinContext } from "@/context/CreateJoinContexts";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import {
  IconEllipsis,
  IconPeopleGroup,
  IconPlusGroup,
} from "@/components/icons";
import Link from "next/link";

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupId , setGroupId] =useStat("")
  const { setUser, user } = useCreateJoinContext();

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const isGroupTrue = () => {
    setIsGroup(true);
  };

  const isGroupFalse = () => {
    setIsGroup(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("Group name not found in local storage");
      }

      const response = await api.get(`/auth/user/${userId}`);
      setUser(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col pt-10 items-center justify-center">
        <BackButton />
        <h1 className="text-5xl tracking-wider font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Lovna
        </h1>
        {!isGroup ? (
          <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
        ) : (
          <div
            className="w-2/3 mx-auto overflow-y-scroll rounded-t-3xl pt-10 px-2 relative "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="grid grid-cols-4 gap-12 ">
              {user?.groups.map((group: any) => (
                <Link
                  href={`/home/${group._id}`}
                  key={group.groupCode}
                  className="bg-white/90 relative py-5 px-2 flex flex-col items-center jusitfy-between rounded-3xl  gap-6  cursor-pointer hover:bg-white/80 hover:scale-105 duration-300 ease-in-out"
                  onClick={() => localStorage.setItem("groupId", group._id)}
                >
                  <div className="absolute top-2 right-0 h-8 w-8">
                    <IconEllipsis />
                  </div>
                  {group.urlProfil ? (
                    <img src={group.urlProfil} alt={group.groupName} />
                  ) : (
                    <div className="p-1 flex items-center justify-center w-24 h-24  border-black/50 rounded-full border-[2px] text-black/80">
                      <IconPeopleGroup />
                    </div>
                  )}

                  <h3 className="text-xl text-center tracking-wider">
                    {group.groupName}
                  </h3>
                </Link>
              ))}
              <div
                className="rounded-3xl py-10 px-10 border-[1px] bg-white/80 text-black/75 cursor-pointer hover:scale-95 hover:bg-white/70 ease-in-out duration-300 flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
              >
                <IconPlusGroup />
              </div>
            </div>
            <ModalAuthGroup modalClose={modalClose} isModalOpen={isModalOpen} />
          </div>
        )}
      </div>
    </BackgroundGradientAnimation>
  );
};
