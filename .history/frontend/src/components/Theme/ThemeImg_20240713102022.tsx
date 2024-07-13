import { ITheme } from "@/context/ThemeContext";
import { IconClose } from "../icons";
import { useState, useEffect } from "react";

interface IThemeImg {
  imgId: string;
  theme: ITheme | null;
  isThemeImgModalOpen: boolean;
  themeModalImgClose: () => void;
}

export const ThemeImg: React.FC<IThemeImg> = ({
  imgId,
  isThemeImgModalOpen,
  theme,
  themeModalImgClose,
}) => {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isThemeImgModalOpen && theme) {
      const foundImage = theme.images.find((img: any) => img._id === imgId);
      if (foundImage) {
        setUrl(foundImage.url as any);
      }
    }
  }, [imgId, isThemeImgModalOpen, theme]);

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
