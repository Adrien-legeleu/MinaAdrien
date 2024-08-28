"use client";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);

export default function AuthPage() {
  const { isAuthentificatedUser, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthentificatedUser) {
      router.push("/group");
    } else {
      router.push("/");
    }
  }, [isAuthentificatedUser, isLoading, router]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center w-screen h-screen flex">
          <span className="loading loading-dots loading-lg"></span>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <Auth />}
    </main>
  );
}
