"use client";
import { HomeContainer } from "@/containers/Home";
import { useGroupContext } from "@/context/GroupContexts";
import { useUserContext } from "@/context/UserContexts";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface IGroupDetailsProps {
  params: {
    id: string;
  };
}

export default function page({ params }: IGroupDetailsProps) {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();
  console.log(group);

  useEffect(() => {
    if (isAuthentificatedUser) {
      if (isAuthenticated) {
        router.push(`/home/${group?._id}`);
      }
    } else {
      router.push("/");
    }
  }, [isAuthenticated, group, router]);

  return (
    <main>
      <HomeContainer params={params} />
    </main>
  );
}
