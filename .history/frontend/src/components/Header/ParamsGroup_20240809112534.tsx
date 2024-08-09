import { useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useState } from "react";
import { UploadFile } from "antd";

export const ParamsGroup = () => {
  const { group } = useGroupContext();
  const [newImages, setNewImages] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
  };
  return (
    <div>
      <div>
        {/* {group?.profilPhoto ? (
          <div className="w-1/2 rounded-full border-[1px] border-black/50">
            <img src={group.profilPhoto} alt={group.groupname} />
          </div>
        ) : (
          <div className="w-1/2 rounded-full border-[1px] border-black/50">
            <IconGroup />
          </div>
        )} */}

        <FileImages
          handleImageUpload={handleImageUpload}
          imgUrlKey="url"
          initialImages={newImages}
          multipleImage={false}
        />
        <h1>{group?.groupname}</h1>
      </div>
      <div>
        <h2 className="text-center tracking-wider text-2xl">
          Les membres de {group?.groupname}²
        </h2>
        <ul className="w-full h-full space-y-2">
          {group?.members.map((member) => {
            return (
              <li
                key={member.userId}
                className="rounded-full  py-1 px-4 bg-gray-100 border-black/30 border-[1px]"
              >
                <h3 className="tracking-wider text-lg">{member.pseudoUser}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
