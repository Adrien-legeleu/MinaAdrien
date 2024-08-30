import { FileImages } from "@/components/File";
import { IconClose, IconDelete } from "@/components/icons";
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

  const [updateOpen, setUpdateOpen] = useState(false);

  const submitImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const values: IImageFormUpdate = {
      legend: data.get("legend") as string,
      url: image?.url,
      photoDate: data.get("dataPhoto")
        ? new Date(data.get("dataPhoto") as string).toLocaleDateString(
            "fr-FR",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : undefined,
      groupId: groupId || "",
      isLiked: image?.isLiked,
      imageId: image?._id || "",
    };

    console.log(values);
    setUpdateOpen(false);
    updateImage(values);
  };

  const deleteImageGallery = () => {
    setUpdateOpen(false);
    deleteImage(image?._id || "");
  };

  const handleUpdateModal = () => {
    setUpdateOpen(!updateOpen);
  };

  return (
    <div
      className={`fixed grid grid-cols-70/30 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center gap-10 p-8 inset-0 top-0 left-0 h-screen w-screen z-50 ${
        isOpenModal
          ? "visible opacity-100 scale-100"
          : "invisible opacity-0 scale-50"
      } duration-500 ease-in-out`}
    >
      <div
        className="z-20 absolute text-white/70 top-8 right-10 w-10 h-10 cursor-pointer hover:scale-110 duration-300 ease-in-out"
        onClick={modalClose}
      >
        <IconClose />
      </div>
      <div
        className="absolute h-full w-full top-0 left-0 bg-black/30 backdrop-blur-sm"
        onClick={modalClose}
      ></div>

      <div className="z-10 w-full h-full realtive">
        <img
          className="rounded-3xl block max-h-[95%] max-w-[95%] z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain "
          src={image?.url}
          alt={`img de lovnia src: ${image?.url}`}
          onClick={() => console.log(image)}
        />
      </div>

      {updateOpen ? (
        <form
          className="flex flex-col justify-center-center px-16 gap-12 z-10"
          onSubmit={submitImage}
        >
          <div className="space-y-10">
            <TextArea
              showCount
              maxLength={150}
              name="legend"
              defaultValue={image?.legend}
              placeholder="Votre legend"
              style={{ height: 120, resize: "none", scrollbarWidth: "none" }}
            />
            <Input
              type="date"
              name="dataPhoto"
              className="w-1/2"
              onChange={(e) => console.log(e)}
              defaultValue={image?.photoDate}
            />
          </div>
          <div className=" mt-4 flex gap-6">
            <button
              type="submit"
              className="rounded-full py-2 px-4 cursor-pointer bg-black/90 text-white text-center"
            >
              sauvegarder
            </button>
            <div
              className="rounded-full py-2 cursor-pointer px-4 bg-gray-400 text-white text-center"
              onClick={handleUpdateModal}
            >
              Annuler
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 z-10 p-5 mr-2">
          <p className="text-white/80 text-center text-xl tracking-wider leading-relaxed">
            {image?.legend}
          </p>
          <p className="text-white/80 text-center text-lg tracking-wider">
            Le {image?.photoDate}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div
              className=" text-black bg-white/80 rounded-full cursor-pointer z-10 p-2 w-8 h-8  flex items-center justify-center "
              onClick={deleteImageGallery}
            >
              <IconDelete />
            </div>
            <button
              onClick={handleUpdateModal}
              className="bg-black/80 text-white py-2 px-4 rounded-full cursor-pointer"
            >
              Modifier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
