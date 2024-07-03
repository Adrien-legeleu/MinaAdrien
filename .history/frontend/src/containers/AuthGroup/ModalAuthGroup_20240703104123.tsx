import { ArrowRight } from "@/components/icons";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";

export const ModalAuthGroup = () => {
  return (
    <div className="fixed bg-black shadow-xl shadow-slate-600 flex items-center justify-center py-20 px-16">
      <div>
        <div
          className={cn(
            "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <button>créer</button>
        </div>
      </div>
    </div>
  );
};
