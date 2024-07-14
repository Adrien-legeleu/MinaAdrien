"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { IImage } from "@/context/ImageContexts";

export const ParallaxScrollSecond = ({
  images,
  className,
}: {
  images: IImage[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn(
        "h-[120vh] items-start overflow-y-scroll  w-full",
        className
      )}
      ref={gridRef}
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start mx-auto  px-20 gap-20 pt-32 pb-12"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateXFirst,
              }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el.url}
                className="h-80 w-full object-center object-cover  rounded-3xl shadow-xl shadow-black/30 gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt={el.url}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div key={"grid-2" + idx}>
              <img
                src={el.url}
                className="h-80 w-full object-cover object-center rounded-3xl shadow-xl shadow-black/30 gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateXThird,
              }}
              key={"grid-3" + idx}
            >
              <img
                src={el.url}
                className="h-80 w-full object-cover object-center rounded-3xl shadow-xl shadow-black/30 gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
