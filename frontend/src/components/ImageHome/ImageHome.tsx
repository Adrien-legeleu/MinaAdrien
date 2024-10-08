"use client";
import { useState } from "react";
import { FileImages } from "../File";
import { IImageForm, useImageContext } from "@/context/ImageContexts";
import { UploadFile } from "antd";
import { ParallaxScrollSecond } from "../UI/ParallaxScroll";
import { IconMinus, IconPlus } from "../icons";
import AnimatedShinyText from "../UI/ShinyText";
import { cn } from "@/utils/cn";
import { Input } from "../UI";
import { Modal, ModalTrigger } from "../UI/AnimatedModal";
import Link from "next/link";
import TextArea from "antd/es/input/TextArea";
import { useGroupContext } from "@/context/GroupContexts";

export const ImageHome = () => {
  const [newImages, setNewImages] = useState<string[]>([]);
  const { images, createImage } = useImageContext();

  const { group } = useGroupContext();

  const [dataImage, setDataImage] = useState<string[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleImageUpload = (imgUrlKey: string, fileList: UploadFile[]) => {
    const uploadedImages: string[] = fileList.map((file) => file.url || "");
    setNewImages(uploadedImages);
    changeImageValue(uploadedImages);
  };

  const changeImageValue = (values: string[]) => {
    setDataImage(values);
  };

  const submitImage = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: IImageForm = {
      legend: data.get("legend") as string,
      url: dataImage,
      photoDate: data.get("dataPhoto")
        ? new Date(data.get("dataPhoto") as string).toLocaleDateString(
            "fr-FR",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : undefined,
      groupId:
        typeof window !== "undefined" ? localStorage.getItem("groupId") : null,
      isLiked: false,
    };

    createImage(values);
  };

  const handleCreateModal = () => {
    setIsCreateOpen(!isCreateOpen);
  };
  return (
    <div className="h-full relative w-full ">
      {images[0] ? (
        <ParallaxScrollSecond images={images} />
      ) : (
        <p
          className={cn(
            `text-4xl max-md:text-3xl max-sm:text-xl w-1/2 pt-10 pb-64 mx-auto tracking-widest text-center leading-loose font-semibold  animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          Ajoutez des photos pour donner plus de vie à votre groupe ! 📸
        </p>
      )}
      <Modal>
        <Link
          href="/gallery"
          className="w-full pt-10 h-full flex  justify-center "
        >
          <ModalTrigger className="bg-black dark:bg-white dark:text-black max-sm:text-sm text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40  text-center transition duration-500">
              Voir votre LovniaGallery
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              🎥
            </div>
          </ModalTrigger>
        </Link>
      </Modal>
      <div className="absolute top-1/2 right-10 w-screen">
        <div
          className="p-2 flex absolute cursor-pointer top-0 right-0 z-10 items-center justify-center shadow-xl shadow-black/40 bg-gray-50 rounded-full h-12 w-12"
          onClick={handleCreateModal}
        >
          {isCreateOpen ? <IconMinus /> : <IconPlus />}
        </div>
        <form
          onSubmit={submitImage}
          className={`${
            isCreateOpen ? "visible opacity-100" : "invisible  opacity-0"
          }  duration-300 ease-in-out absolute shadow-2xl shadow-black/30 -top-16 right-20 max-sm:right-0 max-sm:top-16 py-8 z-50 rounded-2xl w-[500px] max-md:w-2/3 max-sm:w-4/5  flex items-center justify-center flex-col backdrop-blur-sm max-sm:backdrop-blur-md border-[1px] border-black/30 gap-8`}
        >
          <div className="space-y-6">
            <TextArea
              showCount
              maxLength={150}
              name="legend"
              placeholder="Votre legend"
              className="w-full"
              style={{
                height: 100,
                resize: "none",

                scrollbarWidth: "none",
              }}
            />
            <div className="flex max-md:flex-col gap-4 items-center justify-center">
              <Input type="date" name="dataPhoto" />

              <FileImages
                handleImageUpload={handleImageUpload}
                imgUrlKey="url"
                initialImages={newImages}
                multipleImage={false}
              />
            </div>
          </div>
          <div
            className={cn(
              "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className=" text-xl max-sm:text-base  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <button
                className="flex items-center justify-center gap-3 "
                type="submit"
              >
                <span>Créer votre image</span>
              </button>
            </AnimatedShinyText>
          </div>
        </form>
        <div
          className={`${
            isCreateOpen ? "visible " : "hidden"
          } fixed top-0 left-0 w-screen h-screen`}
          onClick={handleCreateModal}
        ></div>
      </div>
    </div>
  );
};
