"use client";
import { IconDelete } from "../icons";

interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
  themeId: string;
  modalDeleteClose: () => void;
}

export const ThemeModalDelete: React.FC<IModalDeleteProps> = ({
  isOpenDeleteModal,
  themeId,
  modalDeleteClose,
}) => {
  return (
    <div>
      <div
        className={`absolute top-12 right-2 cursor-pointer px-6  py-2 w-20 h-10 rounded-full bg-white  flex items-center text-black justify-center border-[1px] border-black/10 ${
          isOpenDeleteModal ? "visible opacity-100" : "invisible opacity-0"
        }  duration-300 ease-in-out`}
      >
        <IconDelete />
      </div>
    </div>
  );
};

{
  /* <div
        className={`fixed w-screen h-screen top-0 left-0 ${
          isOpenDeleteModal ? "visible" : "hidden"
        }`}
      ></div> */
}
