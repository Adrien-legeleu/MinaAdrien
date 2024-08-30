"use client";
import { GalleryContainer } from "@/containers/Gallery";
import { useGroupContext } from "@/context/GroupContexts";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function GalleryPage() {
  // Utilise un nom de composant qui commence par une majuscule
  const router = useRouter();
  const { isAuthenticated, group } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();

  useEffect(() => {
    console.log("gallery");
    console.log(isAuthenticated, group);
    console.log(isAuthentificatedUser);

    if (isAuthentificatedUser) {
      if (isAuthenticated) {
        router.push(`/gallery`);
      }
    } else {
      router.push("/");
    }
  }, [isAuthenticated, group, router, isAuthentificatedUser]); // Ajoute `isAuthentificatedUser` aux dépendances

  return (
    <main>
      <GalleryContainer />
    </main>
  );
}
