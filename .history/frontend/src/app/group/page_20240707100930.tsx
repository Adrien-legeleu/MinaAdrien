"use client";

import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const { isAuthenticated, group } = useGroupContext();
  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${group?.groupname}`);
    }
  }, [isAuthenticated]);
  return (
    <main>
      <AuthGroup />
    </main>
  );
}
