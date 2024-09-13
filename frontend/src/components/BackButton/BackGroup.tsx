import Link from "next/link";
import { ArrowRight } from "../icons";
import { useGroupContext } from "@/context/GroupContexts";

export const BackGroup = () => {
  const { getAllGroup } = useGroupContext();
  const backGroup = () => {
    typeof window !== "undefined" ? localStorage.removeItem("groupId") : null;
    getAllGroup();
  };
  return (
    <Link href="/group" onClick={backGroup}>
      <button className="rotate-180 py-2 px-4 max-sm:px-3 flex items-center justify-center max-sm:h-8 max-sm:w-12 rounded-full text-black bg-gray-100 cursor-pointer hover:-translate-x-1 duration-200 ease-in-out">
        <ArrowRight />
      </button>
    </Link>
  );
};
