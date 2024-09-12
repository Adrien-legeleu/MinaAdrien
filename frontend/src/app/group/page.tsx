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
  const router = useRouter();
  const { isAuthenticated, group } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGroupId = localStorage.getItem("groupId");

      if (isAuthentificatedUser) {
        if (isAuthenticated && storedGroupId) {
          router.push(`/home/${group?._id}`);
        }
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, group, router, isAuthentificatedUser]);

  return (
    <main>
      <HomeContainer params={params} />
    </main>
  );
}
