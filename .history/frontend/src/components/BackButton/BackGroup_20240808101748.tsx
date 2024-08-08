import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackGroup = () => {
  return (
    <Link href="/group">
      <button className="rotate-180 py-2 px-4  rounded-full text-black bg-gray-100 cursor-pointer hover:-translate-x-2 duration-200 ease-in-out">
        <ArrowRight />
      </button>
    </Link>
  );
};
