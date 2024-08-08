import Link from "next/link";
import { ArrowRight } from "../icons";

export const BackHome = () => {
  const groupId = localStorage.getItem("groupId");
  return (
    <Link
      href={`/home/${groupId}`}
      className="rotate-180 py-2 px-4 rounded-full text-black bg-white/60 flex items-center justify-center cursor-pointer"
    >
      <ArrowRight />
    </Link>
  );
};
