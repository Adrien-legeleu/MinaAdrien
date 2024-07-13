import { ITheme, useThemeContext } from "@/context/ThemeContext";
import { IconClose } from "../icons";
import { useState } from "react";

interface IThemeImg {
  ImgId: string;
  theme: ITheme | null;
  isThemeImgModalOpen: boolean;
  themeModalImgClose: () => void;
}

export const ThemeImg: React.FC<IThemeImg> = ({
  ImgId,
  isThemeImgModalOpen,
  theme,
  themeModalImgClose,
}) => {
  const [url, setUrl] = useState("");
  const getImgUrl = () => {
    const foundUrl = theme?.images.find((tme: any) => tme._id === imgId);
  };

  return (
    <div
      className={`z-40 bg-black/30 fixed top-0 left-0 w-screen h-screen p-32 flex items-center justify-center ${
        isThemeImgModalOpen
          ? "visible scale-100 opacity-100"
          : "opacity-0 invisible scale-50 hidden"
      } duration-300 ease-in-out`}
    >
      <div className="w-full rounded-3xl h-full object-contain">
        <img src={url} alt="img theme" />
      </div>
      <div
        className="absolute top-10 right-10 w-16 h-16 text-white/80"
        onClick={themeModalImgClose}
      >
        <IconClose />
      </div>
    </div>
  );
};
