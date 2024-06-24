import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div className="absolute top-20 left-12">
      <Link href="/group">
        <button className="bg-white px-5 py-5 rounded-full">
          <div className="rotate-180">
            <ArrowRight />
          </div>
        </button>
      </Link>
    </div>
  );
};
