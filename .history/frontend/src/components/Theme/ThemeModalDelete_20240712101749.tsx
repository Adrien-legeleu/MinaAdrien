interface IModalDeleteProps {
  isOpenDeleteModal: boolean;
}

export const ThemeModalDelete = () => {
  return (
    <div>
      <div
        className={`fixed w-screen h-screen top-0 left-0 ${
          isOpenDeleteModal ? "visible" : "hidden"
        }`}
      ></div>
    </div>
  );
};
