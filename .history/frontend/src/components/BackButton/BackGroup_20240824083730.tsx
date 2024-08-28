import Link from "next/link";
import { ArrowRight } from "../icons";
import { useDescriptionContext } from "@/context/DescriptionContext";

export const BackGroup = () => {
  const { setDescription } = useDescriptionContext();
  // const backReturn = () => {
  //   localStorage.removeItem("groupId");
  //   setDescription([]);
  // };
  return (
    <Link href="/">
      <button className="rotate-180 py-2 px-4 max-sm:px-3 flex items-center justify-center max-sm:h-8 max-sm:w-10 rounded-full text-black bg-gray-100 cursor-pointer hover:-translate-x-1 duration-200 ease-in-out">
        <ArrowRight />
      </button>
    </Link>
  );
};
