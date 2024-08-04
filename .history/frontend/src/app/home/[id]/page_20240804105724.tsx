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
    if (!isAuthentificatedUser) {
      router.push("/");
    } else if (isAuthenticated && group?._id !== params.id) {
      router.push(`/home/${group?._id}`);
    }
  }, [isAuthenticated, isAuthentificatedUser, group, params.id, router]);

  return (
    <main>
      <HomeContainer params={params} />
    </main>
  );
}
