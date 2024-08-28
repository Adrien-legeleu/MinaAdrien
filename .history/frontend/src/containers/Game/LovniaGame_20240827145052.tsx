import { motion } from "framer-motion";

import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";
import { HeroHighlight, Highlight } from "@/components/UI/HeroHighlight";
import { TextGenerateEffect } from "@/components/UI/GenerateEffect";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import confetti from "canvas-confetti";
import { BackgroundBeamsWithCollision } from "@/components/UI/BackgroundBeamsCollisions";

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

    if (imagesGame.length > 1) {
      const maxIndex = imagesGame.length;
      const index1 = Math.floor(Math.random() * maxIndex);

      let index2;
      do {
        index2 = Math.floor(Math.random() * maxIndex);
      } while (index2 === index1);

      setIndexes([index1, index2]);
    } else {
      setGameOn(false);
      setIsFinish(true);
      handleClick();
    }
  };
  useEffect(() => {
    setLoading(false);
    generateRandomIndexes();
    console.log(gameOn, indexes, loading, isFinish, imagesGame);
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

  const restartGame = () => {
    setGameOn(false);
    setIsFinish(false);
    setImagesGame(() => images.map((image) => image.url));
  };
  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <BackgroundBeamsWithCollision className="pt-12">
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
        className="text-3xl mb-32 px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <Highlight className="text-black dark:text-white">LovniaGame</Highlight>
      </motion.h1>
      {!gameOn ? (
        isFinish ? (
          <div className="flex items-center justify-center flex-col gap-8 ">
            <TextGenerateEffect
              words={"🎉Bravo , voici votre photo coup de coeur ! 📸💕"}
              delay={0.3}
              className="text-[#d42121c9] text-4xl w-2/3 max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
            />
            <img
              src={imagesGame[0]}
              className="w-1/2 object-contain rounded-3xl "
              alt="photo lovnia coup de coeur"
            />
            <button
              className="bg-black rounded-xl  px-7 py-2 text-xl cursor-pointer hover:scale-105 duration-300 ease-in-out text-white"
              onClick={restartGame}
            >
              retour
            </button>
          </div>
        ) : (
          <div className=" flex items-center justify-center flex-col gap-16">
            <TextGenerateEffect
              words={
                "🎉 Dans LovniaGame, deux photos apparaissent au hasard ! Choisissez celle que vous préférez et découvrez quelle est votre photo coup de cœur ! 📸💕"
              }
              delay={0.3}
              className="text-[#d42121c4] text-4xl px-12 max-lg:text-2xl max-sm:text-lg max-[390px]:text-base text-center tracking-wider"
            />
            <button
              onClick={playGame}
              className="bg-black text-white rounded-lg text-2xl px-4 py-2"
            >
              Jouer !🎴
            </button>
          </div>
        )
      ) : (
        <div className="space-y-16">
          <button
            className="bg-black max-sm:text-sm rounded-xl ml-10 px-7 py-2 text-xl cursor-pointer hover:scale-105 duration-300 ease-in-out text-white"
            onClick={restartGame}
          >
            retour
          </button>
          <div className="columns-2 gap-20 px-20 max-md:gap-10 max-md:px-10 max-sm:gap-5 max-sm:px-5 min-h-[250px]">
            <div className="w-full flex justify-center items-center">
              <div className="flex justify-center items-center h-full">
                <img
                  src={imagesGame[indexes[0]]}
                  alt={"lovnia photo" + indexes[0]}
                  className="max-h-full max-w-full cursor-pointer shadow-black shadow-2xl rounded-2xl"
                  onClick={() => handleGamePhotos(indexes[1])}
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex justify-center items-center h-full">
                <img
                  src={imagesGame[indexes[1]]}
                  alt={"lovnia photo" + indexes[1]}
                  className="max-h-full max-w-full cursor-pointer  shadow-black/80 shadow-2xl rounded-2xl"
                  onClick={() => handleGamePhotos(indexes[0])}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </BackgroundBeamsWithCollision>
  );
};
