"use client";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
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
              placeholder="disable resize"
              style={{ height: 120, resize: "none" }}
            />
          </div>
        )}
        <button onClick={() => setIsAddOpen(true)}>Ajoutez en une</button>
      </div>
    </div>
  );
};
