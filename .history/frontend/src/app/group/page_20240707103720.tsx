"use client";

import { AuthGroup } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function GroupPage() {
  const router = useRouter();
  const { isAuthenticated, group } = useGroupContext();
  console.log(group);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/home/${group?._id}`);
    }
  }, [isAuthenticated, group, router]);

  return (
    <main>
      <AuthGroup />
    </main>
  );
}
