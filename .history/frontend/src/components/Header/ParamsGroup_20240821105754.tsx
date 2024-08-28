"use client";

import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages, FileProfilPhotos } from "../File";
import { IGroupComplete } from "@/types/group";
import { api } from "@/config/api";
import { IUser } from "@/types/user";

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
    <div className=" font-montserrat space-y-16 font-montserrat">
      <div className="flex items-center justify-center flex-col gap-8">
        <FileProfilPhotos
          handleImageUpload={handleImageUpload}
          imgUrlKey="url"
          initialImage={newImage}
        />
        <h1 className="text-4xl tracking-wider">{group?.groupName}</h1>
      </div>
      <div>
        <h2 className="text-center tracking-wider text-2xl space-y-8">
          Les membres de {group?.groupName}
        </h2>
        <ul className="w-full h-full space-y-2">
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
