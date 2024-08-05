import { FileImages } from "@/components/File";
import { Input } from "@/components/UI";
import { UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export const GalleryImage = ({ image, modalClose }: any) => {
  const [newImage, setNewImage] = useState<string[]>([]);
  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImage(uploadedImages);
  };

  return (
    <div>
      <div>
        <img src={image.src} alt={`ìmg de lovina src: ${image.src}`} />
      </div>
      <form>
        <div>
          <FileImages
            handleImageUpload={handleImageUpload}
            imgUrlKey="url"
            initialImages={newImages}
            multipleImage={false}
          />
          <TextArea
            showCount
            maxLength={150}
            name="bio"
            placeholder="disable resize"
            style={{ height: 100, resize: "none" }}
          />
          <Input type="date" name="date-photo" />
        </div>
      </form>
    </div>
  );
};
