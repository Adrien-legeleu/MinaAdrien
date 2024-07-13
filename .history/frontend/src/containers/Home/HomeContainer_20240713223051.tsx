"use client";

import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { HeaderParams } from "@/components/Header";
import { ImageHome } from "@/components/ImageHome";
import { ThemeHome } from "@/components/Theme";
import { ModalProvider } from "@/components/UI/AnimatedModal";
import { useDescriptionContext } from "@/context/DescriptionContext";
import { cn } from "@/utils/cn";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();

  return (
    <div className="py-8 ">
      <HeaderParams />
      {
        <div className="w-1/2 mx-auto">
          {description[0] ? (
            <p className="text-3xl text-[#d83c3c] text-center  leading-loose tracking-widest">
              {description[0]?.description}
            </p>
          ) : (
            <p
              className={cn(
                `text-4xl tracking-wider font-semibold inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Décrivez votre groupe en ajoutant plusieurs descriptions !✨
            </p>
          )}
        </div>
      }
      <ImageHome />

      <ModalProvider>
        <ThemeHome />
      </ModalProvider>
    </div>
  );
};
