"use client";

import { ChoosePseudo } from "@/containers/ChoosePseudo";
import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const { isHome } = useGroupContext();
  const router = useRouter();

  useEffect(() => {
    if (isHome) {
      router.push("/home");
    }
  }, [isHome]);

  return (
    <main>
      <ChoosePseudo />
    </main>
  );
}
