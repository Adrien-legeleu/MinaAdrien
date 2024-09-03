"use client";
import { HomeContainer } from "@/containers/Home";
import { useGroupContext } from "@/context/GroupContexts";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface IGroupDetailsProps {
  params: {
    id: string;
  };
}

export default function HomePage({ params }: IGroupDetailsProps) {
  // Utilise un nom de composant qui commence par une majuscule
  const router = useRouter();
  const { isAuthenticated, group } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();
  console.log(group);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("windoooooow", isAuthenticated, isAuthentificatedUser);

      if (isAuthentificatedUser) {
        if (isAuthenticated) {
          router.push(`/home/${group?._id}`);
        }
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, group, router, isAuthentificatedUser]); // Ajoute `isAuthentificatedUser` aux dépendances

  return (
    <main>
      <HomeContainer params={params} />
    </main>
  );
}
