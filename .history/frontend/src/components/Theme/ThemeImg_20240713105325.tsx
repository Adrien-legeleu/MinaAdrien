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
              className={`z-40  fixed top-0 left-0 py-8 dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]   w-screen h-screen flex items-center justify-center ${
                isThemeImgModalOpen
                  ? "visible opacity-100"
                  : "opacity-0 invisible"
              } duration-300 ease-in-out`}
            >
              <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

              <img
                src={img.url}
                alt="img theme"
                className="h-full   object-contain rounded-3xl "
              />

              <div
                className="absolute top-10 right-10 w-16 h-16 text-white/80 hover:scale-105 duration-200 ease-in-out"
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

{/* <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
  {/* Radial gradient for the container to give a faded look */}
</div>; */}
