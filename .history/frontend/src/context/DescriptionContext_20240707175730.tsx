"use client";

import { createContext } from "vm";
import { ReactNode } from "react";

export const DescriptionContext = createContext<{ description: boolean }>({
  description: undefined,
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [descrition, setDescription] = useState(undefined);
};
