import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker, UploadFile } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { FileImages } from "../File";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import AnimatedShinyText from "../UI/ShinyText";
import {
  IThemeForm,
  IThemeFormUpdate,
  useThemeContext,
} from "@/context/ThemeContext";

interface ThemeCreateprops {
  themeCreateClose: () => void;
  themeId: string | undefined;
}
export const ThemeCreate: React.FC<ThemeCreateprops> = ({
  themeCreateClose,
  themeId,
}) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [newImages, setNewImages] = useState<string[]>([]);

  const groupId =
    typeof window !== "undefined" ? localStorage.getItem("groupId") : null;

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
  };

  const { updateTheme, themes } = useThemeContext();

  const submitNewImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const theme = themes.find((tme) => tme._id === themeId);

    if (theme) {
      const newImage = {
        url: newImages[0],
        legend: formData.get("legend") as string,
        photoDate: formData.get("dataPhoto") as string,
      };

      const updatedImages = [...theme.images, newImage];

      const values: IThemeFormUpdate = {
        images: updatedImages,
        groupId: groupId,
        themeId: themeId || "",
        title: theme.title,
      };

      console.log("ezeze");
      console.log(values);

      themeCreateClose();
      updateTheme(values);
    }
  };

  return (
    <form
      className="flex flex-col z-10 gap-5 w-1/2  max-sm:w-2/3 mt-24 mx-auto items-center justify-center"
      onSubmit={submitNewImage}
    >
      <TextArea
        showCount
        maxLength={150}
        name="legend"
        placeholder="Votre légende"
        style={{
          height: 140,
          resize: "none",
          scrollbarWidth: "none",
          maxWidth: "400px",
          margin: "auto",
        }}
      />

      <FileImages
        handleImageUpload={handleImageUpload}
        imgUrlKey="url"
        initialImages={newImages}
        multipleImage={false}
      />

      <DatePicker name="dataPhoto" format={dateFormatList} />
      <div className="flex gap-8 items-center justify-center">
        <div
          className={cn(
            "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
          onClick={themeCreateClose}
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
