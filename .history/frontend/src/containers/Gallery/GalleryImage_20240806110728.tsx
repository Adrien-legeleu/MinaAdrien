import { FileImages } from "@/components/File";
import { IconDelete } from "@/components/icons";
import { Input } from "@/components/UI";
import {
  IImage,
  IImageFormUpdate,
  useImageContext,
} from "@/context/ImageContexts";
import { UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

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
  const { updateImage, deleteImage } = useImageContext();
  const groupId = localStorage.getItem("groupId");
  const [newImage, setNewImage] = useState<string[]>([image?.url!]);
  const [updateOpen, setUpdateOpen] = useState(false);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImage(uploadedImages);
  };
  const submitImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const values: IImageFormUpdate = {
      legend: data.get("legend") as string,
      url: newImage,
      photoDate: data.get("dataPhoto")
        ? new Date(data.get("date-photo") as string)
        : undefined,
      groupId: groupId || "",
      isLiked: image?.isLiked,
      imageId: image?._id || "",
    };

    console.log(values);
    updateImage(values);
    handleUpdateModal();
  };

  const deleteImageGallery = () => {
    deleteImage(image?._id || "");
  };

  const handleUpdateModal = () => {
    setUpdateOpen(!updateOpen);
  };

  return (
    <div
      className={`fixed grid grid-cols-70/30 gap-10 p-8 inset-0 top-0 left-0 h-screen w-screen z-50 ${
        isOpenModal
          ? "visible opacity-100 scale-100"
          : "invisible opacity-0 scale-50"
      } duration-500 ease-in-out`}
    >
      <div
        className="absolute h-full w-full top-0 left-0 bg-black/30 backdrop-blur-sm"
        onClick={modalClose}
      ></div>
      <div className="relative w-full h-full z-10  ">
        <img
          className="rounded-3xl object-cover w-full h-full"
          src={image?.url}
          alt={`ìmg de lovnia src: ${image?.url}`}
          onClick={() => console.log(image)}
        />
        <div
          className="absolute text-black bg-white/80 rounded-full cursor-pointer z-10 p-2 w-8 h-8 rounde-3xl flex items-center justify-center top-4 right-4"
          onClick={deleteImageGallery}
        >
          <IconDelete />
        </div>
      </div>
      {updateOpen ? (
        <form
          className="flex flex-col items-center justify-center gap-10 z-10"
          onSubmit={submitImage}
        >
          <div className="space-y-8">
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
              defaultValue={image?.legend}
              placeholder="Votre legend"
              style={{ height: 100, resize: "none" }}
            />
            <Input
              type="date"
              name="dataPhoto"
              defaultValue={image?.dataPhoto}
            />
          </div>
          <div className=" mt-4 flex gap-6">
            <button
              type="submit"
              className="rounded-full py-2 px-4 bg-black/90 text-white text-center"
            >
              sauvegarder
            </button>
            <div
              className="rounded-full py-2 px-4 bg-gray-400 text-white text-center"
              onClick={handleUpdateModal}
            >
              Annuler
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-white/80 text-center text-xl tracking-wider leading-relaxed">
            {image?.legend}
          </p>
          <p className="text-white/80 text-center text-lg tracking-wider">
            Le {image?.dataPhoto}
          </p>
          <button
            onClick={handleUpdateModal}
            className="bg-black/80 text-white py-2 px-4 rounded-full"
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
};
