"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  delay = 0.1,
}: {
  words: string | undefined;
  className?: string;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words?.split(" ");

  useEffect(() => {
    if (scope.current) {
      animate("span", { opacity: 1 }, { duration: 3, delay: stagger(delay) });
    }
  }, [scope, animate, delay]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray?.map((word, idx) => (
        <motion.span key={word + idx} className="opacity-0">
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="max-md:leading-relaxed leading-normal">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
