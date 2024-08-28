import { useImageContext } from "@/context/ImageContexts";
import { useEffect, useState } from "react";

export const LovniaGame = () => {
  const { images } = useImageContext();
  const [imagesGame, setImagesGame] = useState(images);
  const [gameOn, setGameOn] = useState(false);
  while (gameOn && images.length > 1) {}
  return <div>eze</div>;
};
