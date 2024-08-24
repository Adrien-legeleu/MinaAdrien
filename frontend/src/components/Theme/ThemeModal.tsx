"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../UI/AnimatedModal";
import { Highlight } from "../UI/HeroHighlight";
import { Input } from "../UI";
import TextArea from "antd/es/input/TextArea";
import { FileImages } from "../File";
import { UploadFile } from "antd";
import {
  IImageTheme,
  IThemeForm,
  useThemeContext,
} from "@/context/ThemeContext";
import { IImage } from "@/context/ImageContexts";

export function ThemeModal() {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [newImages, setNewImages] = useState<string[]>([]);
  const groupId = localStorage.getItem("groupId");
  const [dataImages, setDataImages] = useState<string[]>([]);
  const { createTheme } = useThemeContext();
  const { setOpen } = useModal();

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(uploadedImages);
  };

  const changeImageValue = (values: string[]) => {
    setDataImages(values);
    console.log(values);
  };
  const submitTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formDataImages: IImageTheme[] = dataImages.map((img) => ({
      legend: "",
      dataPhoto: "",
      url: img,
      groupId: groupId,
    }));

    const values: IThemeForm = {
      title: data.get("title") as string,
      images: formDataImages,
      bio: data.get("bio") as string,
      groupId: groupId,
      isLiked: false,
    };

    console.log(values);
    console.log("ezezzezzzezezezeze");
    openModalFalse();
    createTheme(values);
  };

  const openModalFalse = () => {
    setOpen(false);
  };

  return (
    <div className="pt-20 flex items-center justify-center">
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
          <form onSubmit={submitTheme}>
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
                Créer votre
                <Highlight className="mx-2">LovniaInspire</Highlight>now! 🌟
              </h4>
              <div className="flex justify-center items-center">
                {images.map((image, idx) => (
                  <motion.div
                    key={"images" + idx}
                    style={{
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt="bali images"
                      className="rounded-lg h-16 w-16 md:h-32 md:w-32 object-cover flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="grid-cols-2 max-[425px]:flex max-[425px]:flex-col max-[425px]:px-10 max-[400px]:px-4 items-center justify-center grid gap-5 pt-5">
                <div className="space-y-5">
                  <Input placeholder="Titre" name="title" id="title" />
                  <TextArea
                    showCount
                    maxLength={100}
                    name="bio"
                    placeholder="Votre biographie"
                    style={{ height: 80, resize: "none" }}
                  />
                </div>
                <div
                  className="overflow-y-scroll max-h-40 space-y-2"
                  style={{ scrollbarWidth: "none" }}
                >
                  <h4 className="text-sm text-black/80 text-center">
                    Vos images de couvertures
                  </h4>
                  <FileImages
                    handleImageUpload={handleImageUpload}
                    imgUrlKey="url"
                    initialImages={newImages}
                    multipleImage={true}
                  />
                </div>
              </div>
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
                Créer !
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
