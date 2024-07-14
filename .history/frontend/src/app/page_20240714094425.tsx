"use client";

import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/group");
    }
  }, [isAuthenticated]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="fixed bg-black top-0 left-0 w-screen h-screen backdrop-blur-sm z-[100] items-center justify-center flex">
          Loading...
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <Auth />}
    </main>
  );
}
