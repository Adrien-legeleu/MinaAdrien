import { HomeContainer } from "@/containers/Home";
import React from "react";

export interface IGroupDetails {
  params: {
    id: string;
  };
}

export default function page({ params }: IGroupDetails) {
  return (
    <main>
      <HomeContainer />
    </main>
  );
}
