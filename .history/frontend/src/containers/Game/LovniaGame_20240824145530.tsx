import { motion } from "framer-motion";

import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";
import { HeroHighlight, Highlight } from "@/components/UI/HeroHighlight";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";

export const LovniaGame = () => {
  const { images } = useImageContext();
  const [imagesGame, setImagesGame] = useState(images);
  const [gameOn, setGameOn] = useState(false);
  while (gameOn && images.length > 1) {}
  return (
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
        className="text-3xl mb-20 px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <Highlight className="text-black dark:text-white">
          LovniaInspire
        </Highlight>
      </motion.h1>
      {gameOn ? (
        <div className="space-y-5">
          <TextGenerateEffect
            words={
              "🎉 Dans LovniaGame, deux photos apparaissent au hasard ! Choisissez celle que vous préférez et découvrez quelle est votre photo coup de cœur ! 📸💕"
            }
            delay={0.3}
            className="text-[#00000060] text-4xl max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
          />
          <button>Jouer !🎴</button>
        </div>
      ) : (
        <div>sqd</div>
      )}
    </div>
  );
};
