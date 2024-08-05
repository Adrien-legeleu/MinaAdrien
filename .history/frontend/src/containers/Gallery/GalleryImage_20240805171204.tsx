import { FileImages } from "@/components/File";
import { Input } from "@/components/UI";
import { IImage, IImageFormUpdate } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface ImageGalleryProps {
  image: IImage | undefined;
  isOpenModal: boolean;
  modalClose: () => void;
}

export const GalleryImage: React.FC<ImageGalleryProps> = ({
  image,
  modalClose,
  isOpenModal,
}) => {
  const [newImage, setNewImage] = useState<string[]>([]);
  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImage(uploadedImages);
  };
   const submitTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formDataImages: IImageTheme[] = dataImages.map((img) => ({
      legend: "",
      dataPhoto: "",
      url: img,
      groupId: groupId,
    }));

    const values: IImageFormUpdate = {
      legend: data.get("legend") as string,
      images: formDataImages,
      dataPhoto: data.get("dataPhoto") as string,
      groupId: groupId,
      isLiked: false,
    };

    console.log(values);
    console.log("ezezzezzzezezezeze");
    openModalFalse();
    cr

  return (
    <div
      className={`fixed grid grid-cols-60/40 p-20 gap-10 inset-0 top-0 left-0 h-full w-screen z-50 ${
        isOpenModal
          ? "visible opacity-100 scale-100"
          : "invisible opacity-0 scale-50"
      } duration-500 ease-in-out`}
    >
      <div
        className="absolute h-full w-full top-0 left-0 bg-black/30 backdrop-blur-sm"
        onClick={modalClose}
      ></div>
      <div>
        <img className="rounded-3xl object-cover " src={image?.url} alt={`ìmg de lovnia src: ${image?.url}`} />
      </div>
      <form className="flex flex-col items-end justify-center gap-8">
        <div>
          <FileImages
            handleImageUpload={handleImageUpload}
            imgUrlKey="url"
            initialImages={newImage}
            multipleImage={false}
          />
          <TextArea
            showCount
            maxLength={150}
            name="legend"
            defaultValue={image?.dataPhoto}
            placeholder="Votre legend"
            style={{ height: 100, resize: "none" }}
          />
          <Input type="date" name="dataPhoto" />
        </div>
        <div className="space-x-6 mt-10">
          <button>sauvegarder</button>
          <button onClick={modalClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};
