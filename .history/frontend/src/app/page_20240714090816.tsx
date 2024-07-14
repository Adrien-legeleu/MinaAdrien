"use client";

import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/group");
    }
    if (isLoading) {
      console.log(isLoading);
    }
  }, [isAuthenticated, isLoading]);

  return (
    <main>
      {isLoading && (
        <div className="fixed bg-black top-0 left-0 w-screen h-screen backdrop-blur-sm z-50 items-center justify-center flex ">
          loading
        </div>
      )}
      <Auth />
    </main>
  );
}
