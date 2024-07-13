import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker, UploadFile } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { FileImages } from "../File";
import { useState } from "react";
import { cn } from "@/utils/cn";
import AnimatedShinyText from "../UI/ShinyText";

interface IThemeUpdate {
  isThemeUpdateOpen: boolean;
  themeUpdateClose: () => void;
  data: IImage | null;
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
    <form className="flex flex-col gap-5">
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
      <div
        className={cn(
          "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <button
            className="flex items-center justify-center gap-3 "
            type="submit"
          >
            <span>Sauvegarder</span>
          </button>
        </AnimatedShinyText>
      </div>
    </form>
  );
};
