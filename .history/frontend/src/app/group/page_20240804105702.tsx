"use client";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useUserContext } from "@/context/UserContexts";

defineElement(lottie.loadAnimation);

export default function GroupPage() {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthentificatedUser) {
        if (isAuthenticated && group?._id) {
          router.push(`/home/${group._id}`);
        }
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, isAuthentificatedUser, isLoading, group, router]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center flex w-screen h-screen">
          <lord-icon
            src="https://cdn.lordicon.com/sjxamlmf.json"
            trigger="loop"
            colors="primary:#ffffff,secondary:#000000"
            style={{ width: "150px", height: "150px" }}
          ></lord-icon>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <AuthGroup />}
    </main>
  );
}
