import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker, UploadFile } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { FileImages } from "../File";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import AnimatedShinyText from "../UI/ShinyText";
import { IThemeFormUpdate, useThemeContext } from "@/context/ThemeContext";

interface IThemeUpdate {
  themeUpdateClose: () => void;
  data: IImage | null;
  themeId: string;
  imgId: string;
}

export const ThemeUpdate: React.FC<IThemeUpdate> = ({
  themeUpdateClose,
  data,
  themeId,
  imgId,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [newImages, setNewImages] = useState<string[]>([]);
  const [dataImage, setDataImage] = useState<string[]>([]);
  const groupId = localStorage.getItem("groupId") || undefined;

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(uploadedImages);
  };

  const changeImageValue = (values: string[]) => {
    setDataImage(values);
    console.log(values);
  };

  useEffect(() => {
    if (data?.url) {
      setNewImages(Array.isArray(data.url) ? data.url : [data.url]);
    }
  }, [data]);

  const { updateTheme, themes } = useThemeContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const theme = themes.find((tme) => tme._id === themeId);

    const updatedImages = theme?.images.map((img: any) =>
      img._id === imgId
        ? {
            url: dataImage,
            legend: formData.get("legend") as string,
            dataPhoto: formData.get("dataPhoto") as string,
          }
        : img
    );

    const values: IThemeFormUpdate = {
      images: updatedImages,
      groupId: groupId,
      themeId: themeId || "",
      title: theme?.title,
    };
    console.log("ezeze");

    console.log(values);
    updateTheme(values);
  };

  return (
    <form
      className="flex flex-col gap-5 items-center justify-center"
      onSubmit={onSubmit}
    >
      <TextArea
        showCount
        maxLength={100}
        name="legend"
        defaultValue={data?.legend}
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
        defaultValue={dayjs(
          data?.dataPhoto ? data?.dataPhoto : "07/02/2024",
          dateFormatList[0]
        )}
        name="dataPhoto"
        format={dateFormatList}
      />
      <div className="flex gap-8 items-center justify-center">
        <div
          className={cn(
            "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
          onClick={themeUpdateClose}
        >
          <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>Annuler</span>
          </AnimatedShinyText>
        </div>
        <div
          className={cn(
            "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <button
              className="flex items-center justify-center gap-3"
              type="submit"
            >
              <span>Sauvegarder</span>
            </button>
          </AnimatedShinyText>
        </div>
      </div>
    </form>
  );
};
