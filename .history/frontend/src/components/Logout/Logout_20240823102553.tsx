"use client";
import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";
import Link from "next/link";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <div
      className="rounded-full cursor-pointer  relative px-4 py-2 max-sm:py-3 bg-white/90 shadow-2xl shadow-black text-black h-12 w-16 max-sm:w-16 max-sm:h-10"
      onClick={onLogout}
    >
      <Link href="/" className="flex items-center justify-center w-full h-full">
        <IconLogout />
      </Link>
    </div>
  );
};
