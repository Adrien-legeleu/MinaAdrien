import { IconDelete } from "../icons";

interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
}

export const ThemeModalDelete: React.FC<IModalDeleteProps> = ({
  isOpenDeleteModal,
}) => {
  return (
    <div>
      <div
        className={`fixed w-screen h-screen top-0 left-0 ${
          isOpenDeleteModal ? "visible" : "hidden"
        }`}
      ></div>
      <div className="absolute top-5 -right-5  py-3 w-32 h-10 rounded-full bg-white border-[1px] border-black/10 ">
        <IconDelete />
      </div>
    </div>
  );
};
