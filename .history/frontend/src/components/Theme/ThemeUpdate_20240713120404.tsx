import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker, UploadFile } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { FileImages } from "../File";
import { useState } from "react";

interface IThemeUpdate {
  isThemeUpdateOpen: boolean;
  themeUpdateClose: () => void;
  data: IImage | undefined;
}

export const ThemeUpdate: React.FC<IThemeUpdate> = ({
  isThemeUpdateOpen,
  themeUpdateClose,
  data,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [newImages, setNewImages] = useState<string[]>([]);

  const [dataImage, setDataImage] = useState<string[]>([]);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(uploadedImages);
  };

  const changeImageValue = (values: string[]) => {
    setDataImage(values);
    console.log(values);
  };
  return (
    <div>
      <TextArea
        showCount
        maxLength={100}
        name="legend"
        placeholder="Votre légende"
        style={{ height: 120, resize: "none" }}
      />

      <FileImages
        handleImageUpload={handleImageUpload}
        imgUrlKey="url"
        initialImages={newImages}
        multipleImage={false}
      />

      <DatePicker
        defaultValue={dayjs("13/07/2024", dateFormatList[0])}
        format={dateFormatList}
      />
    </div>
  );
};
