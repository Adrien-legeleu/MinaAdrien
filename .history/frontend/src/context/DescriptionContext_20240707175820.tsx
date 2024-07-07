"use client";

import { createContext } from "vm";
import { ReactNode, useState } from "react";

export const DescriptionContext = createContext<{ description: boolean }>({
  description: undefined,
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState(undefined);

  return (
    <DescriptionContext.Provider
      value={description}
    ></DescriptionContext.Provider>
  );
};
