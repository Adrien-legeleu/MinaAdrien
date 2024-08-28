"use client";
import { useThemeContext } from "@/context/ThemeContext";
import { IconDelete } from "../icons";

interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
  themeIdToFonction: string;
  themeId: string;
  modalDeleteClose: () => void;
}

export const ThemeModalDelete: React.FC<IModalDeleteProps> = ({
  isOpenDeleteModal,
  themeId,
  modalDeleteClose,
  themeIdToFonction,
}) => {
  const { deleteTheme } = useThemeContext();

  const onDeleteTheme = () => {
    deleteTheme(themeId);
  };

  return (
    <div>
      {themeIdToFonction === themeId && (
        <div
          className={`absolute top-12 right-2 scale-95 cursor-pointer px-6  py-2 w-20 h-10 rounded-full bg-white  flex items-center text-black justify-center border-[1px] border-black/10 ${
            isOpenDeleteModal ? "visible opacity-100" : "invisible opacity-0"
          }  duration-300 ease-in-out`}
          onClick={onDeleteTheme}
        >
          <IconDelete />
        </div>
      )}
    </div>
  );
};
