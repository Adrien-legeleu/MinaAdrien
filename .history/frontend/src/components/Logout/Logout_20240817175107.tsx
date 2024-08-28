"use client";
import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";
import Link from "next/link";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <div className="rounded-full px-4 py-2 bg-white/90 shadow-2xl shadow-black text-black h-16 w-16">
      <Link href="/" className="cursor-pointer" onClick={onLogout}>
        <IconLogout />
      </Link>
    </div>
  );
};
