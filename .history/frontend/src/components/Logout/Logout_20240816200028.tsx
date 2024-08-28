"use client";
import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";
import Link from "next/link";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <Link href="/" className="cursor-pointer" onClick={onLogout}>
      <IconLogout />
    </Link>
  );
};
