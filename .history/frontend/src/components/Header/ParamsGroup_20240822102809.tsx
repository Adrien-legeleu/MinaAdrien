"use client";

import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages, FileProfilPhotos } from "../File";
import { IGroupComplete } from "@/types/group";
import { api } from "@/config/api";
import { IUser } from "@/types/user";
import { cn } from "@/utils/cn";
import AnimatedGradientText from "../UI/GradientText";

export const ParamsGroup = () => {
  const { group, updateGroup } = useGroupContext();
  const groupId = localStorage.getItem("groupId");

  const [newImage, setNewImage] = useState<string[]>([
    group ? group.urlProfil : "",
  ]);
  const [members, setMembers] = useState<IUser[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");

    setNewImage(uploadedImages);
    console.log(uploadedImages);

    groupUpdate();
  };

  const getMembers = async (group: IGroupComplete | undefined) => {
    if (!group) return;

    const membersSet = new Set<IUser>();

    for (const member of group.members) {
      try {
        const response = await api.get(`/auth/user/${member.userId}`);
        console.log(response);

        membersSet.add(response.data);
      } catch (error) {
        console.error("error fetching members");
      }
    }

    setMembers(Array.from(membersSet));
  };

  useEffect(() => {
    getMembers(group);
  }, []);

  const groupUpdate = () => {
    const values = {
      groupId: groupId ? groupId : undefined,

      urlProfil: newImage[0],
      groupName: group?.groupName,
    };
    console.log(values);
    updateGroup(values);
  };

  return (
    <div className=" font-montserrat space-y-12 pt-12 ">
      <div className="flex items-center justify-center flex-col gap-8">
        <div className="h-32 w-32 rounded-full border-2 border-black/50 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FileProfilPhotos
              handleImageUpload={handleImageUpload}
              imgUrlKey="url"
              initialImage={newImage}
            />
          </div>
          <img
            src={group?.urlProfil}
            alt={group?.groupName + "url-photo-profil"}
            className="w-full h-full"
          />
        </div>

        <div
          className={cn(
            "group inline-block relative mx-auto max-w-fit flex-row items-center justify-center  px-4 py-1.5 text-sm font-medium transition-shadow duration-500 ease-out dark:bg-black/40"
          )}
        >
          <span
            className={cn(
              `relative text-5xl bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient`
            )}
          >
            {group?.groupName}
          </span>
        </div>
      </div>
      <div className="space-y-8 ">
        <h2 className="text-center tracking-wider text-2xl space-y-8">
          Les membres de {group?.groupName}
        </h2>
        <ul className="w-full h-full space-y-2 px-28">
          {members.map((member) => {
            return (
              <li
                key={member._id}
                className="rounded-full  py-1 px-4 bg-gray-50 border-black/10 border-[1px]"
              >
                <h3 className="tracking-wider text-lg">{member.username}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
