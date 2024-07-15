"use client";
import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <div className="cursor-pointer w-full h-full" onClick={onLogout}>
      <IconLogout />
    </div>
  );
};
