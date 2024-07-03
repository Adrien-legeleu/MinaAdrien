"use client";

import { BackButton, DescriptionAuthGroup } from "@/components/Auth";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { Spotlight } from "@/components/UI/SpotLight";
import { api } from "@/config/api";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { ModalAuthGroup } from "./ModalAuthGroup";

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="h-screen w-full flex flex-col gap-28 items-center justify-center bg-black/[0.96] overflow-y-hidden">
      <BackButton />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <AnimatedShinyText className="text-6xl transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 cursor-default">
        <span onClick={isGroupFalse}>LOVNA</span>
      </AnimatedShinyText>
      {!isGroup ? (
        <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
      ) : (
        <div className="h-screen w-full">
          <div className="grid grid-cols-5">
            {user?.groups.map((group: any) => (
              <div key={group.groupCode}>
                <p>Group Code: {group.groupCode}</p>
                <p>Group Name: {group.groupName}</p>
                <p>Profile URL: {group.urlProfil}</p>
              </div>
            ))}
            <div
              className="rounded-3xl py-10 px-8 border-[1px]  border-gray-800 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <h1 className="text-white text-xl">plus</h1>
            </div>
          </div>
          {/* <ModalAuthGroup modalClose={modalClose} isModalOpen={isModalOpen} /> */}
        </div>
      )}
    </div>
  );
};
