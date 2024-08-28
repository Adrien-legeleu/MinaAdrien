"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useUserContext } from "@/context/UserContexts";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function GroupPage() {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();
  console.log(group);

  useEffect(() => {
    console.log("euizueizueiu");

    console.log(isAuthentificatedUser);

    if (isAuthentificatedUser) {
      if (isAuthenticated) {
        router.push(`/home/${group?._id}`);
      }
    } else {
      router.push("/");
    }
  }, [isAuthenticated, group, router]);

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
