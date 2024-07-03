"use client";

import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isAuthenticated } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/group");
    }
  }, [isAuthenticated]);

  return (
    <main>
      <Auth />
    </main>
  );
}
