import Link from "next/link";
import { ArrowRight } from "../icons";

interface IBackButtonProps {
  isGroupFalse: () => void;
}

export const BackButton: React.FC<IBackButtonProps> = ({ isGroupFalse }) => {
  return (
    <div className="absolute top-10 left-14 max-sm:right-8 max-sm:top-6">
      <button
        onClick={isGroupFalse}
        className="bg-white/60 px-4 py-2 max-sm:py-3 max-sm:px-5 rounded-full cursor-pointer hover:brightness-90 duration-300 ease-in-out"
      >
        <div className="rotate-180">
          <ArrowRight />
        </div>
      </button>
    </div>
  );
};
