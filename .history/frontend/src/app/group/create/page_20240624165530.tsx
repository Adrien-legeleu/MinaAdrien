"use client";
import { Create } from "@/containers/AuthGroup";
import { useGroupContext } from "@/context/GroupContexts";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isAuthenticated } = useGroupContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/choose-pseudo");
    }
  }, [isAuthenticated]);
  return (
    <main>
      <Create />
    </main>
  );
}
