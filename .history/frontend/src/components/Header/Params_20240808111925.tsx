"use client";

import {
  IDescriptionForm,
  IDescriptionFormUpdate,
  useDescriptionContext,
} from "@/context/DescriptionContext";

import { useState } from "react";

import { IconClose, IconLogout } from "../icons";
import { ParamsDescriptions } from "./ParamsDescriptions";
import { Modal, ModalTrigger } from "../UI/AnimatedModal";
import { useUserContext } from "@/context/UserContexts";

interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [descId, setDescId] = useState<string | null>(null);
  const {
    createDescription,
    description,
    updateDescription,
    deleteDescription,
  } = useDescriptionContext();
  const { onLogout } = useUserContext();

  const openAddDesc = () => {
    setIsAddOpen(true);
  };

  const submit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      description: data.get("description"),
      groupId: localStorage.getItem("groupId"),
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
      groupId: localStorage.getItem("groupId"),
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

  return (
    <div
      className={`grid grid-cols-40/60 fixed w-full h-screen bg-white px-32 top-0 left-0 z-50 ${
        isParams ? "visible opacity-100" : "opacity-0 invisible"
      }  duration-300 `}
    >
      <div
        className="h-12 w-12 fixed top-5 right-8 hover:scale-105 ease-in-out duration-300 cursor-pointer"
        onClick={closeParams}
      >
        <IconClose />
      </div>
      <ul className="my-20 flex items-start justify-center gap-10 flex-col border-r-2 border-black/30">
        <li className="pb-2  border-black/80 text-xl tracking-wider text-black/50 cursor-pointer">
          Votre Groupe
        </li>
        <li className="pb-2 border-b-[2px]  border-black/80 text-xl tracking-wider text-black/80 cursor-pointer">
          Vos Descriptions
        </li>
        <li className="pb-2  border-black/80 text-xl tracking-wider text-black/50 cursor-pointer">
          Thèmes d'affichage
        </li>

        <Modal>
          <div onClick={onLogout}>
            <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white  flex justify-center group/modal-btn">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                Se déconnecter
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                ⬅
              </div>
            </ModalTrigger>
          </div>
        </Modal>
      </ul>
      <div
        className="space-y-12 py-20 px-12 overflow-y-scroll h-screen "
        style={{ scrollbarWidth: "none" }}
      >
        <div id="2">
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
      </div>
    </div>
  );
};
