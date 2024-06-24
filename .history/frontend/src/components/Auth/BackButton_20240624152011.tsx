import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div className="absolute top-20 left-12">
      <Link href="/group">
        <button className="bg-white/30 px-4 py-2 rounded-full cursor-pointer hover:brightness-90 duration-300 ease-in-out">
          <div className="rotate-180">
            <ArrowRight />
          </div>
        </button>
      </Link>
    </div>
  );
};
