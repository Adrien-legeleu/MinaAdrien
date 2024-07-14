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
      {isAuthenticated && (
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-50 items-center justify-center flex ">
          loading
        </div>
      )}
      <Auth />
    </main>
  );
}
