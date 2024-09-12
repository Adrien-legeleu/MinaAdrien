"use client";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { AuthGroup } from "@/containers/AuthGroup";
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

export default function GroupPage({ params }: IGroupDetailsProps) {
  const router = useRouter();
  const { isAuthenticated, group, isLoading } = useGroupContext();
  const { isAuthentificatedUser } = useUserContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGroupId = localStorage.getItem("groupId");

      if (isAuthentificatedUser) {
        if (isAuthenticated && storedGroupId) {
          router.push(`/home/${group?._id}`);
        } else {
          router.push("/group");
        }
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, group, router, isAuthentificatedUser]);

  return (
    <main>
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center w-screen h-screen flex gap-8">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <AuthGroup />}
    </main>
  );
}
