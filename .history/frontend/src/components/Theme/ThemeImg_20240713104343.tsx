import { ITheme } from "@/context/ThemeContext";
import { IconClose } from "../icons";
import { IImage } from "@/context/ImageContexts";
import { useEffect } from "react";

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
  useEffect(() => {
    console.log(theme, imgId);
  }, [isThemeImgModalOpen]);

  return (
    <>
      {theme?.images.map((img: any) => {
        if (img._id === imgId) {
          return (
            <div
              key={img._id}
              className={`z-40 bg-gray-400 fixed top-0 left-0 w-screen h-screen flex items-center justify-center ${
                isThemeImgModalOpen
                  ? "visible opacity-100"
                  : "opacity-0 invisible"
              } duration-300 ease-in-out`}
            >
              <div className="w-2/3 rounded-3xl h-full">
                <img
                  src={img.url}
                  alt="img theme"
                  className="h-full w-full object-contain"
                />
              </div>
              <div
                className="absolute top-10 right-10 w-16 h-16 text-white/80"
                onClick={themeModalImgClose}
              >
                <IconClose />
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};
