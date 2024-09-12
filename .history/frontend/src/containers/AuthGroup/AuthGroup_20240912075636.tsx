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
  IconDelete,
  IconEllipsis,
  IconPeopleGroup,
  IconPlusGroup,
} from "@/components/icons";
import Link from "next/link";
import { useGroupContext } from "@/context/GroupContexts";
import { Logout } from "@/components/Logout";
import { useDescriptionContext } from "@/context/DescriptionContext";
import AnimatedGradientText from "@/components/UI/GradientText";
import { cn } from "@/utils/cn";
import { useImageContext } from "@/context/ImageContexts";
import { useThemeContext } from "@/context/ThemeContext";

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const { setUser, user } = useCreateJoinContext();
  const { onDeleteGroup, allGroups, getGroup } = useGroupContext();
  const { getImages } = useImageContext();
  const { getTheme } = useThemeContext();
  const { getDescription } = useDescriptionContext();

  const openModalDelete = (id: string) => {
    setIsModalDeleteOpen(true);
    setGroupId(id);
  };

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

  useEffect(() => {
    if (groupId) {
      getGroup();
    }
  }, [groupId]);

  const getUser = async () => {
    try {
      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;

      if (!userId) {
        throw new Error("Group name not found in local storage");
      }

      const response = await api.get(`/auth/user/${userId}`);
      setUser(response.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteGroup = (groupId: string) => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    onDeleteGroup({ groupId, userId });
  };

  const handleGroupClick = (id: string) => {
    typeof window !== "undefined" ? localStorage.setItem("groupId", id) : null;
    setGroupId(id);
    getGroup();
    getImages();
    getTheme();
    getDescription(id);
  };

  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16 max-md:gap-20 flex-col pt-10 max-w-[1300px] items-center justify-center font-montserrat">
        {isGroup && <BackButton isGroupFalse={isGroupFalse} />}
        <div className="absolute top-10 right-14 max-sm:right-8 max-sm:top-6 z-50">
          <Logout />
        </div>
        <h1 className="text-5xl max-sm:px-3 max-lg:text-4xl max-md:text-3xl max-sm:text-2xl max-sm:text-center tracking-wider font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Heureux de te revoir,{" "}
          <div
            className={cn(
              "group inline-block relative mx-auto max-w-fit flex-row items-center justify-center rounded-2xl bg-white/55 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40"
            )}
          >
            <div
              className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
            />

            <span
              className={cn(
                `text-5xl max-lg:text-4xl max-md:text-3xl animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              {user?.username}!
            </span>
          </div>
        </h1>
        {!isGroup ? (
          <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
        ) : (
          <div
            className="w-3/4 mx-auto pt-10 px-2 relative max-md:w-2/3 max-[600px]:w-4/5 max-[460px]:w-5/6 max-[400px]:w-[90%] max-[340px]:w-[95%]"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-12 max-md:gap-9 max-[340px]:gap-4">
              {allGroups ? (
                allGroups.map((group: any) => (
                  <div
                    key={group._id}
                    className={`bg-white space-y-3  border-black/60 border-[1px] relative py-5 px-5 rounded-3xl cursor-pointer hover:bg-white/90 hover:scale-105 duration-300 ease-in-out`}
                  >
                    <div
                      className="absolute top-2 right-0 h-8 w-8"
                      onClick={() => openModalDelete(group._id)}
                    >
                      <IconEllipsis />
                      {isModalDeleteOpen && groupId === group._id ? (
                        <div
                          onClick={() => deleteGroup(group._id)}
                          className="top-0 right-2 absolute h-full w-full p-1 z-10 text-black/80 bg-white/90 rounded-full flex items-center justify-center"
                        >
                          <IconDelete />
                        </div>
                      ) : null}
                    </div>
                    <Link
                      href={`/home/${group._id}`}
                      className="flex flex-col items-center justify-between gap-6"
                      onClick={() => handleGroupClick(group._id)}
                    >
                      {group.urlProfil ? (
                        <img
                          className="rounded-3xl w-full h-[160px] object-cover object-center"
                          src={group.urlProfil}
                          alt={group.groupName}
                        />
                      ) : (
                        <div className="p-1 flex items-center justify-center w-24 h-24 border-black/50 rounded-full border-[2px] text-black/80">
                          <IconPeopleGroup />
                        </div>
                      )}
                      <h3 className="text-xl max-md:text-base text-center tracking-wider font-medium">
                        {group.groupName}
                      </h3>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="bg-black w-32 h-32 ">
                  <span className="sr-only">Loading...</span>
                  <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
                </div>
              )}
              <div
                className="rounded-3xl py-10 px-10 border-[1px] bg-white/90 text-black/75 cursor-pointer hover:scale-95 hover:bg-white/80 ease-in-out duration-300 flex items-center justify-center"
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
