import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div className="absolute top-20 left-12">
      <Link href="/group">
        <button className="bg-white px-4 py-3 rounded-full">
          <div className="rotate-180">
            <ArrowRight />
          </div>
        </button>
      </Link>
    </div>
  );
};
