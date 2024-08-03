"use client";
import { GalleryContainer } from "@/containers/Gallery";
import { HomeContainer } from "@/containers/Home";
import { useGroupContext } from "@/context/GroupContexts";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface IGroupDetailsProps {
  params: {
    id: string | undefined;
  };
}

export default function page({ params }: IGroupDetailsProps) {
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
  }, [isAuthenticated, group, router]);
  return (
    <main>
      <GalleryContainer params={group?._id} />
    </main>
  );
}
