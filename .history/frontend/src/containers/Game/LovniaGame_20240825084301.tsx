import { motion } from "framer-motion";

import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";
import { HeroHighlight, Highlight } from "@/components/UI/HeroHighlight";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";

export const LovniaGame = () => {
  const { images } = useImageContext();
  const [imagesGame, setImagesGame] = useState(() =>
    images.map((image) => image.url)
  );
  const [gameOn, setGameOn] = useState(false);
  const [indexes, setIndexes] = useState([0, 1]);
  const [loading, setLoading] = useState(false);
  const playGame = () => {
    setGameOn(true);
    generateRandomIndexes();
  };

  const generateRandomIndexes = () => {
    console.log(imagesGame);

    const maxIndex = imagesGame.length;
    const randomIndexes = [
      Math.floor(Math.random() * maxIndex),
      Math.floor(Math.random() * maxIndex),
    ];

    if (randomIndexes[0] === randomIndexes[1]) {
      return generateRandomIndexes();
    }

    setIndexes(randomIndexes);
  };
  useEffect(() => {
    setLoading(false);
    generateRandomIndexes();
  }, [imagesGame]);

  const handleGamePhotos = (index: number) => {
    setLoading(true);
    const newImagesGame = imagesGame.filter((_, i) => i !== index);
    setImagesGame(newImagesGame);
  };

  return (
    <div className="mt-32">
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
        <Highlight className="text-black dark:text-white">LovniaGame</Highlight>
      </motion.h1>
      {!gameOn ? (
        <div className=" flex items-center justify-center flex-col gap-16">
          <TextGenerateEffect
            words={
              "🎉 Dans LovniaGame, deux photos apparaissent au hasard ! Choisissez celle que vous préférez et découvrez quelle est votre photo coup de cœur ! 📸💕"
            }
            delay={0.3}
            className="text-[#00000060] text-4xl max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
          />
          <button
            onClick={playGame}
            className="bg-black text-white rounded-lg text-2xl px-4 py-2"
          >
            Jouer !🎴
          </button>
        </div>
      ) : loading ? (
        <div>loading</div>
      ) : (
        <div className="grid grid-cols-2  gap-16 ">
          <div className="w-2/3 h-full flex justify-center items-center relative ">
            <img
              src={imagesGame[indexes[0]]}
              alt={"lovnia photo" + indexes[0]}
              className="h-full w-full object-contain rounded-3xl"
              onClick={() => handleGamePhotos(indexes[1])}
            />
          </div>
          <div className="w-2/3 h-full flex justify-center items-center relative ">
            <img
              src={imagesGame[indexes[1]]}
              alt={"lovnia photo" + indexes[1]}
              className="h-full w-full object-contain rounded-3xl"
              onClick={() => handleGamePhotos(indexes[0])}
            />
          </div>
        </div>
      )}
    </div>
  );
};
