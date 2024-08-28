"use client";

import {
  IDescriptionForm,
  useDescriptionContext,
} from "@/context/DescriptionContext";
import { cn } from "@/utils/cn";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import AnimatedShinyText from "../UI/ShinyText";
import { IconDelete, IconUpdate } from "../icons";

interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { createDescription, description } = useDescriptionContext();
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
        className="space-y-12 py-20 px-12 overflow-y-scroll h-screen"
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
                className=" bg-gray-50 shadow-xl shadow-black/10 py-5 px-8 rounded-3xl space-y-4"
              >
                <h3 className="text-xl font-semibold text-center">
                  {index + 1}
                </h3>
                {isUpdateOpen ? (
                  <TextArea
                    showCount
                    maxLength={280}
                    id="description"
                    name="description"
                    placeholder="disable resize"
                    style={{
                      resize: "none",
                      borderColor: "#00000060",
                    }}
                    defaultValue={desc.description}
                    className="text-md leading-relaxed"
                  />
                ) : (
                  <p className="tracking-wider leading-relaxed">
                    {desc.description}
                  </p>
                )}
                <div className="flex items-center justify-end  pt-5">
                  {isUpdateOpen ? (
                    <div
                      className={cn(
                        "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                      )}
                    >
                      <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <p>Sauvegarder</p>
                      </AnimatedShinyText>
                    </div>
                  ) : (
                    <div className=" flex items-center justify-center gap-8">
                      <div
                        className="h-7 w-7 text-black/80"
                        onClick={() => setIsUpdateOpen(true)}
                      >
                        <IconUpdate />
                      </div>
                      <div className="h-7 w-7 text-black/80 ">
                        <IconDelete />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={submit}>
          {isAddOpen && (
            <TextArea
              showCount
              maxLength={280}
              id="description"
              name="description"
              placeholder="disable resize"
              style={{ height: 160, resize: "none", borderColor: "#00000060" }}
              className="text-lg"
            />
          )}
          <div className="flex items-center justify-center">
            {isAddOpen ? (
              <div
                className={cn(
                  "group mt-10 rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <button type="submit">Créer</button>
                </AnimatedShinyText>
              </div>
            ) : (
              <div
                className={cn(
                  "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <p onClick={() => setIsAddOpen(true)}>Ajoutez en une</p>
                </AnimatedShinyText>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
