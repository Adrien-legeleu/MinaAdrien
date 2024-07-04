import { useGroupContext } from "@/context/GroupContexts";
import { useRouter } from "next/router";
import React from "react";

const router = useRouter();
export default function page() {
  const { isHome } = useGroupContext();

  return <div>dsdsdsdsdsdsdssssssssss</div>;
}
