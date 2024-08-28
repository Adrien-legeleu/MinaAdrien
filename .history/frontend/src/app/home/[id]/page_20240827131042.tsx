"use client";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
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
      {isLoading && (
        <BackgroundGradientAnimation className="items-center justify-center flex w-screen h-screen gap-8">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-red-600 rounded-full animate-bounce"></div>
        </BackgroundGradientAnimation>
      )}
      {!isLoading && <HomeContainer params={params} />}
    </main>
  );
}
