import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages } from "../File";

export const ParamsGroup = () => {
  const { group, updateGroup } = useGroupContext();
  const [newImage, setNewImages] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
  };

  const submitNewProfilGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values: IGroup = {
      groupname: group?.groupname,
      groupId: group?._id,
      profilPhoto: group?.profilPhoto ? group.profilPhoto : newImage[0],
    };

    console.log(values);
    updateGroup(values);
  };

  // Si vous souhaitez que la soumission se fasse automatiquement après l'upload
  useEffect(() => {
    if (newImage.length > 0) {
      const values: IGroup = {
        groupname: group?.groupname,
        groupId: group?._id,
        profilPhoto: group?.profilPhoto ? group.profilPhoto : newImage[0],
      };

      console.log(values);
      updateGroup(values);
    }
  }, [newImage]);

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
          initialImages={newImage}
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
                className="rounded-full  py-1 px-4 bg-gray-50 border-black/10 border-[1px]"
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
