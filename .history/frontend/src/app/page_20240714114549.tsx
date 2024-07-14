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
  const { isAuthenticated, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      router.push("/group");
    } else {
      router.push(`/`);
    }
  }, [isAuthenticated]);

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
      {!isLoading && <Auth />}
    </main>
  );
}
