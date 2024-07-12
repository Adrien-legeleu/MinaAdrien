"use client";
import { IconDelete } from "../icons";

interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
}

export const ThemeModalDelete: React.FC<IModalDeleteProps> = ({
  isOpenDeleteModal,
  themeId:string,
  modalDeleteClose:()=> void
}) => {
  return (
    <div
      className={`absolute top-12 right-2 cursor-pointer px-5  py-1 w-16  h-8 rounded-full  flex items-center text-black justify-center border-[1px] border-black/10 ${
        isOpenDeleteModal ? "visible opacity-100" : "invisible opacity-0"
      }  duration-300 ease-in-out`}
    >
      <IconDelete />
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
