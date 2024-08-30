"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../UI/HeroHighlight";
import Image from "next/image";
import AnimatedShinyText from "../UI/ShinyText";
import { cn } from "@/utils/cn";
import { ThemeModal } from "./ThemeModal";
import { IImageTheme, useThemeContext } from "@/context/ThemeContext";
import { IconEllipsis } from "../icons";
import { useState } from "react";
import { ThemeModalDelete } from "./ThemeModalDelete";
import Link from "next/link";

// Fonction pour convertir une date en format "dd/mm/yyyy" en objet Date
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

// Fonction pour formater une date en "dd mois yyyy"
const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
};

// Trouver les dates extrêmes et les formater
const findExtremesDatesToTheme = (themeImages) => {
  let minDate = new Date();
  let maxDate = new Date();
  themeImages.forEach((image) => {
    const date = parseDate(image.photoDate);
    if (date < minDate) minDate = date;
    if (date > maxDate) maxDate = date;
  });

  return [minDate, maxDate];
};

export const ThemeHome = () => {
  const { themes } = useThemeContext();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [themeIdToFonction, setThemeIdToFonction] = useState("");

  const modalDeleteClose = () => {
    setIsOpenDeleteModal(false);
  };

  const modalDeleteOpen = (id) => {
    setThemeIdToFonction(id);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  return (
    <HeroHighlight>
      <div>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Votre{" "}
          <Highlight className="text-black dark:text-white">
            LovniaInspire
          </Highlight>
        </motion.h1>
      </div>
      <div className="grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-2 gap-8 grid pt-32 px-8">
        {themes.map((theme) => {
          const [minDate, maxDate] = theme.images
            ? findExtremesDatesToTheme(theme.images)
            : [new Date("2017-07-23"), new Date("2018-07-17")];

          return (
            <div
              key={theme._id}
              className="relative bg-white/60 overflow-hidden py-7 rounded-3xl border-[1px] border-black/10 shadow-2xl shadow-black/00001 "
            >
              <div
                className="absolute top-5 right-0 w-10 h-10 text-black/80 cursor-pointer "
                onClick={() => modalDeleteOpen(theme._id)}
              >
                <IconEllipsis />
              </div>
              <ThemeModalDelete
                isOpenDeleteModal={isOpenDeleteModal}
                modalDeleteClose={modalDeleteClose}
                themeId={theme._id}
                themeIdToFonction={themeIdToFonction}
              />
              <Link
                href={`/theme/${theme._id}`}
                className="flex items-center justify-center flex-col gap-8"
              >
                <h1 className="text-2xl tracking-wider">{theme.title}</h1>
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
                <div className="px-8 space-y-3 ">
                  <p className="text-center text-2xl font-semibold tracking-wider">
                    Du {formatDate(minDate)}
                  </p>
                  <p className="text-center text-2xl font-semibold tracking-wider">
                    Au {formatDate(maxDate)}
                  </p>
                </div>
                <div
                  className={cn(
                    "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="text-xl px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <button className="flex items-center justify-center gap-3">
                      <span>Découvrir</span>
                    </button>
                  </AnimatedShinyText>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <ThemeModal />
    </HeroHighlight>
  );
};

const images = [
  "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
