"use client";

import {
  IDescriptionForm,
  useDescriptionContext,
} from "@/context/DescriptionContext";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { createDescription } = useDescriptionContext();
  const submit = (e: any) => {
    e.preentDefault();
    const data = new FormData(e.targetValue);
    const values = {
      description: data.get("description"),
      groupId: localStorage.getItem("groupId"),
    };

    createDescription(values as IDescriptionForm);
  };

  return (
    <div className="grid grid-cols-40/60 fixed w-full h-screen bg-gray-500 py-32 px-32 top-0 left-0 z-50">
      <ul>
        <li>Votre Groupe</li>
        <li>Vos Descriptions </li>
        <li>Thèmes d'affichage</li>

        <li>Sortir du groupe</li>
        <li>Se Déconnecter</li>
      </ul>
      <div>
        <h2>Vos descriptions</h2>
        {isAddOpen && (
          <div>
            <TextArea
              showCount
              maxLength={250}
              id="description"
              name="description"
              placeholder="disable resize"
              style={{ height: 120, resize: "none" }}
            />
            <button>créer</button>
          </div>
        )}
        <button onClick={() => setIsAddOpen(true)}>Ajoutez en une</button>
      </div>
    </div>
  );
};
