import { FileImages } from "@/components/File";
import { Input } from "@/components/UI";
import { IImage } from "@/context/ImageContexts";
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

  return (
    <div
      className={`fixed inset-0 top-0 left-0 h-full w-screen z-50 ${
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
        <img src={image?.url} alt={`ìmg de lovina src: ${image?.url}`} />
      </div>
      <form>
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
            name="bio"
            defaultValue={image?.dataPhoto}
            placeholder="Votre legend"
            style={{ height: 100, resize: "none" }}
          />
          <Input type="date" name="date-photo" />
        </div>
        <div>
          <button>sauvegarder</button>
          <button onClick={modalClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};
