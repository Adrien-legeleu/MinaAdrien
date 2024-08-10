import { IGroup, useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";
import { useEffect, useState } from "react";
import { UploadFile } from "antd";
import { FileImages, FileProfilPhoto } from "../File";

export const ParamsGroup = () => {
  const { group, updateGroup } = useGroupContext();
  const [imageUrl, setImageUrl] = useState<string>();
  const [newImage, setNewImages] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
  };

  const submitNewProfilGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values: IGroup = {
      groupName: group?.groupName,
      groupId: group?._id,
      urlProfil: group?.urlProfil ? group.urlProfil : newImage[0],
    };

    console.log(values);
    updateGroup(values);
  };

  // Si vous souhaitez que la soumission se fasse automatiquement après l'upload
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (newImage.length > 0) {
      const values: IGroup = {
        groupName: group?.groupName,
        groupId: group?._id,
        urlProfil: group?.urlProfil ? group.urlProfil : newImage[0],
        userId: userId || undefined,
      };

      console.log(values);
      updateGroup(values);
    }
  }, [newImage]);

  return (
    <div>
      <div>
        {group?.urlProfil ? (
          <div className="w-1/2 rounded-full border-[1px] relative border-black/50">
            <img src={group.urlProfil} alt={group.groupName} />
            <div className="absolute rounded-full top-0 left-0 bg-black/20 flex items-center justify-center">
              <FileProfilPhoto imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
          </div>
        ) : (
          <div className="w-1/2 rounded-full relative border-[1px] border-black/50 group">
            <IconGroup />
            <div className="absolute group-hover:visible group-hover:opacity-100 duration-300 ease-in-out opcaity-0 invisible rounded-full top-0 left-0 bg-black/20 flex items-center justify-center">
              <FileProfilPhoto imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
          </div>
        )}

        <h1>{group?.groupName}</h1>
      </div>
      <div>
        <h2 className="text-center tracking-wider text-2xl">
          Les membres de {group?.groupName}²
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
