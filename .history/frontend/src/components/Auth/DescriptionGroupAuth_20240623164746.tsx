import { cn } from "@/utils/cn";
import { TextGenerateEffect } from "../UI/GenerateEffect";
import AnimatedShinyText from "../UI/ShinyText";

interface IGroupProps {
  isGroupTrue: () => void;
}

export const DescriptionAuthGroup: React.FC<IGroupProps> = ({
  isGroupTrue,
}) => {
  return (
    <div className="flex flex-col gap-20  items-center flex-1 ">
      <TextGenerateEffect
        words={
          "Bienvenue ! Choisissez votre groupe et partagez vos expériences. 🌟 Connectez-vous ou créez un nouveau groupe pour commencer à explorer et partager vos passions! 🌍"
        }
        delay={0.3}
        className="text-[#ffffff60] text-xl text-center  tracking-wider"
      />
      <div
        className={cn(
          "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
        onClick={isGroupTrue}
      >
        <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <button>continuer</button>
        </AnimatedShinyText>
      </div>
    </div>
  );
};
