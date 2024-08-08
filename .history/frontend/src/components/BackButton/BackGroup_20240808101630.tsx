import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackGroup = () => {
  return (
    <Link
      href="/group"
      className="rotate-180 py-2 px-4  rounded-full text-black bg-gray-300 cursor-pointer"
    >
      <ArrowRight />
    </Link>
  );
};
