"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function GroupPage() {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();
  console.log(group);

  useEffect(() => {
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
        <BackgroundGradientAnimation className="items-center justify-center flex">
          <lord-icon
            src="https://cdn.lordicon.com/sjxamlmf.json"
            trigger="loop"
            colors="primary:#ffffff0,secondary:#000000"
            className="w-32 h-32"
          ></lord-icon>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <AuthGroup />}
    </main>
  );
}
