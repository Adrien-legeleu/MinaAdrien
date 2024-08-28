"use client";
import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";
import Link from "next/link";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <div
      className="rounded-full cursor-pointer px-4 py-2 bg-white/90 shadow-2xl shadow-black text-black h-12 w-16 max-sm:w-10 max-sm:h-14"
      onClick={onLogout}
    >
      <Link href="/">
        <IconLogout />
      </Link>
    </div>
  );
};
