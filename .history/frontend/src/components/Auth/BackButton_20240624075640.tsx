import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div className="absolute top-20 left-12">
      <Link href="/group">
        <button className="bg-white p-5">
          <div className="rotate-180">
            <ArrowRight />
          </div>
        </button>
      </Link>
    </div>
  );
};
