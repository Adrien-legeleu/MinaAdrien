"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function Page() {
  const { isAuthentificatedUser, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    console.log("ezeze");
    console.log(isAuthentificatedUser);
    if (isAuthentificatedUser) {
      router.push("/group");
    }
  }, [isAuthentificatedUser]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center w-screen h-screen flex">
          <lord-icon
            src="https://cdn.lordicon.com/sjxamlmf.json"
            trigger="loop"
            colors="primary:#ffffff00,secondary:#000000"
            className="w-60 h-60"
          ></lord-icon>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <Auth />}
    </main>
  );
}