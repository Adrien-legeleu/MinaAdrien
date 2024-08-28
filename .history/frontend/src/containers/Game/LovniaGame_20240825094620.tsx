import { motion } from "framer-motion";

import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";
import { HeroHighlight, Highlight } from "@/components/UI/HeroHighlight";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";

export const LovniaGame = () => {
  const { images } = useImageContext();
  const [imagesGame, setImagesGame] = useState(() =>
    images.map((image) => image.url)
  );
  const [gameOn, setGameOn] = useState(false);
  const [indexes, setIndexes] = useState([0, 1]);
  const [loading, setLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const playGame = () => {
    setGameOn(true);
    generateRandomIndexes();
  };

  const generateRandomIndexes = () => {
    console.log(imagesGame);

    const maxIndex = imagesGame.length;
    const index1 = Math.floor(Math.random() * maxIndex);

    let index2;
    do {
      index2 = Math.floor(Math.random() * maxIndex);
    } while (index2 === index1);

    setIndexes([index1, index2]);
  };
  useEffect(() => {
    setLoading(false);
    generateRandomIndexes();
  }, [imagesGame]);

  const handleGamePhotos = (index: number) => {
    setLoading(true);
    if (imagesGame.length > 1) {
      const newImagesGame = imagesGame.filter((_, i) => i !== index);
      setImagesGame(newImagesGame);
    } else {
      setIsFinish(true);
      setLoading(false);
    }
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
        isFinish ? (
          <div className="flex items-center justify-center">
            <TextGenerateEffect
              words={"🎉Bravo , voici votre photo coup de coeur ! 📸💕"}
              delay={0.3}
              className="text-[#d42121b0] text-4xl max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
            />
            <img src={imagesGame[0]} alt="photo lovnia coup de coeur" />
          </div>
        ) : (
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
        )
      ) : loading ? (
        <div className="items-center justify-center flex  gap-8">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
        </div>
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
