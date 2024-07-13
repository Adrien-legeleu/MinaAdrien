import { ThemeContainer } from "@/containers/Theme";
import React from "react";

export interface IThemeDetailsProps {
  params: {
    id: string;
  };
}

export default function page({ params }: IThemeDetailsProps) {
  return (
    <main>
      <ThemeContainer params={params} />
    </main>
  );
}
