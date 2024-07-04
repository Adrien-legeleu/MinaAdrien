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

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-center">
        <BackButton />
        <h1 className="text-5xl tracking-wider font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Lovna
        </h1>
        {!isGroup ? (
          <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
        ) : (
          <div className="w-2/3 mx-auto">
            <div className="grid grid-cols-4 gap-12 ">
              {user?.groups.map((group: any) => (
                <div
                  key={group.groupCode}
                  className="bg-white/90 py-8 px-5 rounded-3xl"
                >
                  {group.urlProfil ? (
                    <img src={group.urlProfil} alt={group.groupName} />
                  ) : (
                    <div>icon</div>
                  )}
                  <p>Group Code: {group.groupCode}</p>
                  <p>Group Name: {group.groupName}</p>
                </div>
              ))}
              <div
                className="rounded-3xl py-10 px-8 border-[1px]  border-gray-800 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <h1 className="text-white text-xl">plus</h1>
              </div>
            </div>
            <ModalAuthGroup modalClose={modalClose} isModalOpen={isModalOpen} />
          </div>
        )}
      </div>
    </BackgroundGradientAnimation>
  );
};
