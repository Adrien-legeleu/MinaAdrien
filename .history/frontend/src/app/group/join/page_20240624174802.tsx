"use client";

import { Join } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isAuthenticated } = useGroupContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated]);
  return (
    <main>
      <Join />
    </main>
  );
}
