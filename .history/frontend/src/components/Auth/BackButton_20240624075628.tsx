import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div>
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
