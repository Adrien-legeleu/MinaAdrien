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
    <div>
      {theme?.images.map((img: any) => {
        if (img._id === imgId) {
          return (
            <div
              key={img._id}
              className={`z-40 px-16 max-md:px-5 max-sm:px-3 fixed  top-0 left-0 py-4 dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.5]   w-screen h-screen flex items-center justify-center ${
                isThemeImgModalOpen
                  ? "visible opacity-100 scale-100"
                  : "opacity-0 invisible scale-0"
              } duration-500 ease-in-out`}
            >
              <div className="absolute pointer-events-none w-screen h-screen inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

              <div
                onClick={themeModalImgClose}
                className="w-screen h-screen absolute top-0 left-0"
              ></div>

              <div>
                <img
                  src={img.url}
                  alt="img theme"
                  className="z-10   object-contain rounded-3xl "
                />
              </div>

              <div
                className="absolute top-5  z-10 cursor-pointer left-20 w-12 h-12 max-sm:left-5 text-black/80 hover:scale-105 duration-200 ease-in-out"
                onClick={themeModalImgClose}
              >
                <IconClose />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
