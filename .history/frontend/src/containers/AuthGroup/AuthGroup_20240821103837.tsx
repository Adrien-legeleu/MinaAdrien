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

export const AuthGroup = () => {
  const [isGroup, setIsGroup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const { setUser, user } = useCreateJoinContext();
  const { onDeleteGroup, allGroups, getGroup } = useGroupContext();
  const { getDescription } = useDescriptionContext();

  const openModalDelete = (id: string) => {
    setIsModalDeleteOpen(true);
    setGroupId(id);
    console.log(id);
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

  const deleteGroup = (groupId: string) => {
    const userId = localStorage.getItem("userId");
    console.log(userId, groupId);
    onDeleteGroup({ groupId, userId });
  };

  const handleGroupClick = (id: string) => {
    localStorage.setItem("groupId", id);
    setGroupId(id);
    getDescription(id);
  };

  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col pt-10 items-center justify-center font-montserrat">
        {isGroup && <BackButton isGroupFalse={isGroupFalse} />}
        <div className="absolute top-10 right-14  z-50">
          <Logout />
        </div>
        <h1 className="text-5xl tracking-wider font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Heureux de te revoir, {user?.username} !
        </h1>
        {!isGroup ? (
          <DescriptionAuthGroup isGroupTrue={isGroupTrue} />
        ) : (
          <div
            className="w-3/4 mx-auto pt-10 px-2 relative "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="grid grid-cols-4 gap-12 ">
              {allGroups.map((group: any) => (
                <div className="bg-white  space-y-3 border-black/80 border-[1px] relative py-7 px-5  rounded-3xl  cursor-pointer hover:bg-white/90 hover:scale-105 duration-300 ease-in-out">
                  <div
                    className="absolute top-2 right-0 h-8 w-8"
                    onClick={() => openModalDelete(group._id)}
                  >
                    <IconEllipsis />
                    {isModalDeleteOpen && groupId === group._id ? (
                      <div
                        onClick={() => deleteGroup(group._id)}
                        className=" top-0 right-2 absolute h-full w-full p-1 z-10 text-black/80 bg-white/90 rounded-full flex items-center justify-center"
                      >
                        <IconDelete />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <Link
                    href={`/home/${group._id}`}
                    key={group.groupCode}
                    className="flex flex-col items-center jusitfy-between   gap-6"
                    onClick={() => handleGroupClick(group._id)} // Utilisez la fonction pour gérer le clic sur un groupe
                  >
                    {group.urlProfil ? (
                      <img
                        className="rounded-full"
                        src={group.urlProfil}
                        alt={group.groupName}
                      />
                    ) : (
                      <div className="p-1 flex items-center justify-center w-24 h-24  border-black/50 rounded-full border-[2px] text-black/80">
                        <IconPeopleGroup />
                      </div>
                    )}

                    <h3 className="text-xl text-center tracking-wider">
                      {group.groupName}
                    </h3>
                  </Link>
                </div>
              ))}
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
