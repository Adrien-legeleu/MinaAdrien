"use client";

import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages, FileProfilPhotos } from "../File";

export const ParamsGroup = () => {
  const { group, updateGroup } = useGroupContext();

  const [newImages, setNewImages] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
  };

  return (
    <div>
      <div>
        <FileProfilPhotos />
        <h1>{group?.groupName}</h1>
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
