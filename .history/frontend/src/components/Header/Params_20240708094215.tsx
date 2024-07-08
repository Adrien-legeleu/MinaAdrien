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
  const { createDescription, description } = useDescriptionContext();
  const submit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      description: data.get("description"),
      groupId: localStorage.getItem("groupId"),
    };
    console.log(values);

    createDescription(values as IDescriptionForm);
  };

  return (
    <div className="grid grid-cols-40/60 fixed w-full h-screen bg-white  px-32 top-0 left-0 z-50">
      <ul className="py-20">
        <li>Votre Groupe</li>
        <li>Vos Descriptions </li>
        <li>Thèmes d'affichage</li>

        <li>Sortir du groupe</li>
        <li>Se Déconnecter</li>
      </ul>
      <div
        className="space-y-8 py-20 px-12 overflow-y-scroll h-screen"
        style={{ scrollbarWidth: "none" }}
      >
        <h2 className="text-4xl tracking-wider text-center mb-8">
          Vos descriptions
        </h2>
        <div className="space-y-4">
          {" "}
          {description.map((desc: any, index: number) => {
            return (
              <div
                key={"description number :" + index}
                className=" bg-gray-50 shadow-xl shadow-black/10 py-5 px-8 rounded-3xl"
              >
                <p>{desc.description}</p>
              </div>
            );
          })}
        </div>
        {isAddOpen && (
          <form onSubmit={submit}>
            <TextArea
              showCount
              maxLength={250}
              id="description"
              name="description"
              placeholder="disable resize"
              style={{ height: 120, resize: "none" }}
            />
            <button type="submit">créer</button>
          </form>
        )}
        <button onClick={() => setIsAddOpen(true)}>Ajoutez en une</button>
      </div>
    </div>
  );
};
