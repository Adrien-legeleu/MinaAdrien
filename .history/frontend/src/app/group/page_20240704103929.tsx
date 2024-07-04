"use client";

import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { isHome } = useGroupContext();
  useEffect(() => {
    if (isHome) {
      router.push("/home");
    }
  }, [isHome]);
  return (
    <main>
      <AuthGroup />
    </main>
  );
}
