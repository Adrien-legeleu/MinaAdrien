"use client";
import { IconDelete } from "../icons";

interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
}

export const ThemeModalDelete: React.FC<IModalDeleteProps> = ({
  isOpenDeleteModal,
}) => {
  return (
    <div className="absolute top-10 right-0 px-7  py-5 w-20  h-12 rounded-full  flex items-center text-black justify-center border-[1px] border-black/10 ">
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
