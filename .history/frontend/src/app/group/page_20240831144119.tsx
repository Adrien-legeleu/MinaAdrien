"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useUserContext } from "@/context/UserContexts";

export default function GroupPage() {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Vérifie que l'on est en environnement client
      if (isAuthentificatedUser) {
        if (isAuthenticated) {
          router.push(`/home/${group?._id}`);
        }
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, group, router, isAuthentificatedUser]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center flex w-screen h-screen gap-8">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <AuthGroup />}
    </main>
  );
}
