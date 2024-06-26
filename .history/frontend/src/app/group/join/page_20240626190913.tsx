"use client";

import { Join } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isAuthenticated, joinPageRedirect } = useGroupContext();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (joinPageRedirect === "choosePseudoPage") {
        router.push("/group/choose-pseudo");
      } else if (joinPageRedirect === "groupPage") {
        router.push("/group/home");
      }
    }
  }, [isAuthenticated]);
  return (
    <main>
      <Join />
    </main>
  );
}
