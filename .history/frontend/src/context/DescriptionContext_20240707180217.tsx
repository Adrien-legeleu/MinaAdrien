"use client";

import { createContext } from "vm";
import { ReactNode, useContext, useState } from "react";
import { GroupContext } from "./GroupContexts";

export const DescriptionContext = createContext<{
  description: boolean;
  email: string;
  password: string;
  groups: IGroup[];
  profilPhoto: string;
}>({
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
