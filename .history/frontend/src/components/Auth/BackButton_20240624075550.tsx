import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackButton = () => {
  return (
    <div>
      <Link href="/group">
        <button>
          <ArrowRight />
        </button>
      </Link>
    </div>
  );
};
