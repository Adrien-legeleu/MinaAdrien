"use client";

import { createContext } from "vm";
import { ReactNode, useContext, useState } from "react";
import { GroupContext } from "./GroupContexts";

export const DescriptionContext = createContext<{ description: undefined }>({
  description: undefined,
});

export const DescriptionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [description, setDescription] = useState(undefined);

  return (
    <DescriptionContext.Provider value={description}>
      {children}
    </DescriptionContext.Provider>
  );
};

export const useDescriptionContext = () => {
  return useContext(GroupContext);
};
