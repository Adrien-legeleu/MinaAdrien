"use client";

import {
  IDescriptionForm,
  IDescriptionFormUpdate,
  useDescriptionContext,
} from "@/context/DescriptionContext";

import { useState } from "react";

import { IconClose } from "../icons";
import { ParamsDescriptions } from "./ParamsDescriptions";

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
        <li className="pb-2  border-black/80 text-xl tracking-wider text-black/50 cursor-pointer">
          Sortir du groupe
        </li>
        <li className="pb-2  border-black/80 text-xl tracking-wider text-black/50 cursor-pointer">
          Se Déconnecter
        </li>
      </ul>
      <div
        className="space-y-12 py-20 px-12 overflow-y-scroll h-screen "
        style={{ scrollbarWidth: "none" }}
      >
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
  );
};
