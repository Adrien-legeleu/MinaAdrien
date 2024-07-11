"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../UI/HeroHighlight";
import Image from "next/image";
export const ThemeHome = () => {
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
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center  "
        >
          Votre{" "}
          <Highlight className="text-black dark:text-white">
            LovniaInspire
          </Highlight>
        </motion.h1>
      </div>
      <div className="grid-cols-3">
        <div>
          <h1>Titre</h1>
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
                  width="500"
                  height="500"
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

const images = [
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fwww.photo-paysage.com%2Falbums%2Fuserpics%2F10001%2Fthumb_Lever-de-soleil-a-Monument-Valley.jpg&imgrefurl=https%3A%2F%2Fwww.photo-paysage.com%2F&docid=Ftp6HDH0_q-inM&tbnid=sDIJ3LcQESce2M&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECF0QAA..i&w=449&h=298&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECF0QAA",
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fbeau-d-paysage-automne-avec-des-arbres-et-feuilles-au-soleil-en-ecosse-124278811.jpg&imgrefurl=https%3A%2F%2Ffr.dreamstime.com%2Fphotos-images%2Fpaysage.html&docid=fQBziFXs0AGKZM&tbnid=6NRrSzWFey3MNM&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECC8QAA..i&w=800&h=534&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECC8QAA",
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fwww.aquaportail.com%2Fpictures2401%2Fpaysage-de-montagne.webp&imgrefurl=https%3A%2F%2Fwww.aquaportail.com%2Fdictionnaire%2Fdefinition%2F25%2Fpaysage&docid=ltyA3MMMEInEhM&tbnid=ORYv9-PLjeZ5zM&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECGYQAA..i&w=1600&h=1200&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECGYQAA",
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fcc-prod.scene7.com%2Fis%2Fimage%2FCCProdAuthor%2FAdobeStock_187565989%3F%24pjpeg%24%26jpegSize%3D200%26wid%3D720&imgrefurl=https%3A%2F%2Fwww.adobe.com%2Ffr%2Fcreativecloud%2Fphotography%2Fdiscover%2Flandscape-photography.html&docid=ZFsBPiWHvhn_-M&tbnid=ngzF9lBOO5UxIM&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECF4QAA..i&w=720&h=481&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECF4QAA",
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fwww.photo-paysage.com%2Falbums%2FPaysages%2FLac-riviere-cascade%2Fthumb_croatie-lacs-plitvice-cascades-7.jpg&imgrefurl=https%3A%2F%2Fwww.photo-paysage.com%2Findex.php%3Fcat%3D49&docid=4Tvo-fUSmrRnZM&tbnid=ubTasAaiZbIBFM&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECHIQAA..i&w=450&h=337&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECHIQAA",
  "https://www.google.com/imgres?q=paysage%20image&imgurl=https%3A%2F%2Fwww.civitatis.com%2Fblog%2Fwp-content%2Fuploads%2F2024%2F02%2Fshutterstock_1240186387-1280x890.jpg&imgrefurl=https%3A%2F%2Fwww.civitatis.com%2Fblog%2Ffr%2F10-paysages-naturels-monde%2F&docid=jYzDdng_pL2TeM&tbnid=hldwPackRJIU3M&vet=12ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECFIQAA..i&w=1280&h=890&hcb=2&ved=2ahUKEwih-tbSup6HAxUnT6QEHYiWCbUQM3oECFIQAA",
];
