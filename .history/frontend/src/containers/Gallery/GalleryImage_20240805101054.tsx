import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/UI/AnimatedModal";

export const GalleryImage = () => {
  const { setOpen } = useModal();
  const openModalFalse = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Créer votre Inspire
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🌟
          </div>
        </ModalTrigger>
        <ModalBody>
          <form>
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
                Créer votre
              </h4>
            </ModalContent>
            <ModalFooter className="gap-4">
              <p
                className="px-2 py-1 text-center cursor-pointer bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
                onClick={openModalFalse}
              >
                Cancel
              </p>
              <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
              >
                Sauvegarder
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};
