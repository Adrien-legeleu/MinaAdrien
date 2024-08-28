import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../UI/HeroHighlight";
import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";

export const LovniaGame = () => {
  const { images } = useImageContext();
  const [imagesGame, setImagesGame] = useState(images);
  const [gameOn, setGameOn] = useState(false);
  while (gameOn && images.length > 1) {

  }
  return  <HeroHighlight>
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
        </motion.h1></HeroHighlight>
};
