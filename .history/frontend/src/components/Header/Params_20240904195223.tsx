"use client";

import {
  IDescriptionForm,
  IDescriptionFormUpdate,
  useDescriptionContext,
} from "@/context/DescriptionContext";
import { useState, useRef } from "react";
import { IconClose } from "../icons";
import { ParamsDescriptions } from "./ParamsDescriptions";
import { Modal, ModalTrigger } from "../UI/AnimatedModal";
import { useUserContext } from "@/context/UserContexts";
import Link from "next/link";
import { ParamsGroup } from "./ParamsGroup";
import { useGroupContext } from "@/context/GroupContexts";

interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);
  const [descId, setDescId] = useState<string | null>(null);

  const {
    createDescription,
    description,
    updateDescription,
    deleteDescription,
  } = useDescriptionContext();
  const { onLogout } = useUserContext();
  const { group } = useGroupContext();

  const openAddDesc = () => {
    setIsAddOpen(true);
  };

  const submit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      description: data.get("description"),
      groupId: group?._id,
    };
    console.log(values);
    setIsAddOpen(false);
    createDescription(values as IDescriptionForm);
  };

  const update = (desc: any) => {
    console.log(desc);
    console.log(desc._id);

    setDescId(desc._id);
    setIsUpdateOpen(true);
  };

  const updateSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      description: data.get("description"),
      groupId:
        typeof window !== "undefined" ? localStorage.getItem("groupId") : null,
      descriptionId: descId,
    };
    console.log(values);
    setIsUpdateOpen(false);
    setDescId(null);
    updateDescription(values as IDescriptionFormUpdate);
  };

  const deleteDesc = (descriptionId: string) => {
    deleteDescription(descriptionId);
  };

  const groupRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (
    index: number,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    setSelectedIndex(index);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`grid grid-cols-40/60 fixed  w-full h-screen bg-white px-32 max-xl:px-16 max-md:px-5 max-[600px]:px-0 max-xl:grid-cols-20/80 max-lg:flex max-lg:px-32 top-0 left-0 z-50 ${
        isParams ? "visible opacity-100" : "opacity-0 invisible"
      }  duration-300 `}
    >
      <div
        className="h-12 w-12 z-50 fixed top-5 right-8 hover:scale-105 ease-in-out duration-300 cursor-pointer"
        onClick={closeParams}
      >
        <IconClose />
      </div>

      <ul className="my-20 flex max-lg:fixed max-lg:flex-row max-lg:shadow-2xl max-lg:shadow-black/40 max-lg:px-7 max-lg:border-none max-[820px]:w-[90%] max-lg:bg-gray-50 max-lg:py-5 max-lg:-bottom-10 max-lg:rounded-3xl max-lg:items-center max-md:hidden max-lg:z-50 max-[1000px]:w-4/5 max-[1000px]:justify-between  max-lg:w-2/3 max-lg:left-1/2 max-lg:-translate-x-1/2 items-start justify-center gap-10 flex-col border-r-2 border-black/30">
        <li
          onClick={() => scrollToSection(1, groupRef)}
          className={`pb-2 text-xl max-lg:text-base max-md:hidden max-lg:tracking-normal tracking-wider cursor-pointer ${
            selectedIndex === 1
              ? "border-b-2 border-black/80 text-black"
              : "text-black/50"
          }`}
        >
          Votre groupe
        </li>
        <li
          onClick={() => scrollToSection(2, descriptionRef)}
          className={`pb-2 text-xl max-lg:text-base max-lg:tracking-normal  max-md:hidden  tracking-wider cursor-pointer ${
            selectedIndex === 2
              ? "border-b-2 border-black/80 text-black"
              : "text-black/50"
          }`}
        >
          Description
        </li>
        <li
          onClick={() => scrollToSection(3, themeRef)}
          className={`pb-2 text-xl max-lg:text-base max-lg:tracking-normal    max-md:hidden tracking-wider cursor-pointer ${
            selectedIndex === 3
              ? "border-b-2 border-black/80 text-black"
              : "text-black/50"
          }`}
        >
          Theme d&apos;affichage
          {/* Utilisation de &apos; pour échapper l'apostrophe */}
        </li>
        <Modal>
          <Link href="/" onClick={onLogout}>
            <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white  flex justify-center group/modal-btn">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                Se déconnecter
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                ⬅
              </div>
            </ModalTrigger>
          </Link>
        </Modal>
        <p className="text-black text-2xl tracking-wider text-left ">
          {group?.groupCode}
        </p>
      </ul>
      <div className="fixed bottom-8 right-8  hidden max-md:flex">
        <Modal>
          <Link href="/" onClick={onLogout}>
            <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white  flex justify-center group/modal-btn">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                Se déconnecter
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                ⬅
              </div>
            </ModalTrigger>
          </Link>
        </Modal>
      </div>
      <div className="top-5 left-8 text-center text-black backdrop-blur-md rounded-full py-2 px-4 items-center jsutify-center hidden max-md:flex">
        <p>{group?.groupCode}</p>
      </div>

      <div
        className="space-y-20 py-20 px-12 max-[600px]:px-6 overflow-y-scroll max-lg:h-full  h-screen "
        style={{ scrollbarWidth: "none" }}
      >
        <div id="1" ref={groupRef}>
          <ParamsGroup />
        </div>
        <div id="2" ref={descriptionRef}>
          <ParamsDescriptions
            description={description}
            deleteDesc={deleteDesc}
            updateSubmit={updateSubmit}
            update={update}
            isAddOpen={isAddOpen}
            isUpdateOpen={isUpdateOpen}
            submit={submit}
            descId={descId}
            openAddDesc={openAddDesc}
          />
        </div>
        <div id="3" ref={themeRef}>
          {/* Ici, tu pourras ajouter ton composant pour "Theme d&apos;affichage" */}
          <p>Contenu du Theme d&apos;affichage</p>{" "}
          {/* Utilisation de &apos; pour échapper l'apostrophe */}
        </div>
      </div>
    </div>
  );
};
