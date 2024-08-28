import Link from "next/link";
import { ArrowRight } from "../icons";
import { useDescriptionContext } from "@/context/DescriptionContext";

export const BackGroup = () => {
  const { setDescription } = useDescriptionContext();
  const backReturn = () => {
    localStorage.removeItem("groupId");
    setDescription([]);
  };
  return (
    <Link href="/" onClick={backReturn}>
      <button className="rotate-180 py-2 px-4  rounded-full text-black bg-gray-100 cursor-pointer hover:-translate-x-1 duration-200 ease-in-out">
        <ArrowRight />
      </button>
    </Link>
  );
};
