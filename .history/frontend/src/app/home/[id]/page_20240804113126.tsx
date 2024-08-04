import { HomeContainer } from "@/containers/Home";
import React from "react";

export interface IGroupDetailsProps {
  params: {
    id: string;
  };
}

export default function page({ params }: IGroupDetailsProps) {
  return (
    <main>
      <HomeContainer params={params} />
    </main>
  );
}
