"use client";

import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages, FileProfilPhotos } from "../File";
import { IGroupComplete } from "@/types/group";
import { api } from "@/config/api";

export const ParamsGroup = () => {
  const { group, updateGroup } = useGroupContext();

  const [newImage, setNewImage] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImage(uploadedImages);
  };

  const getMembers = async (group: IGroupComplete) => {
    group?.members.map((member) => {
      const response = await api.get(`/auth/user/${member.userId}`);
      console.log(response);
      setMembers((prev) => {
        return [...prev, response.data];
      });
    });
  };
  useEffect(()=> {
    getMembers()
  },[])

  return (
    <div className=" font-montserrat space-y-16">
      <div className="flex items-center justify-center flex-col gap-8">
        <FileProfilPhotos
          handleImageUpload={handleImageUpload}
          imgUrlKey="url"
          initialImage={newImage}
        />
        <h1 className="text-4xl tracking-wider">{group?.groupName}</h1>
      </div>
      <div>
        <h2 className="text-center tracking-wider text-2xl">
          Les membres de {group?.groupName}
        </h2>
        {/* <ul className="w-full h-full space-y-2">
          {group?.members.map((member) => {
            return (
              <li
                key={member.userId}
                className="rounded-full  py-1 px-4 bg-gray-50 border-black/10 border-[1px]"
              >
                <h3 className="tracking-wider text-lg">{member.pseudoUser}</h3>
              </li>
            );
          })}
        </ul> */}
      </div>
    </div>
  );
};
