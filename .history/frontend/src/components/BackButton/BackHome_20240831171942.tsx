import Link from "next/link";
import { ArrowRight } from "../icons";
import { useGroupContext } from "@/context/GroupContexts";

export const BackHome = () => {
  const { group } = useGroupContext();
  return (
    <Link href={`/home/${group._id}`}>
      <button className="rotate-180 py-2 px-4 max-sm:px-3 max-sm:h-8 max-sm:w-12 flex items-center justify-center rounded-full text-black bg-gray-300 cursor-pointer">
        <ArrowRight />
      </button>
    </Link>
  );
};
