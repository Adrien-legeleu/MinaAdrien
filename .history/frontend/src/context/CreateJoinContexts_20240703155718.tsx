"use client";

import { IUser } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface CreateJoinContextType {
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

// Créer le contexte avec un type par défaut
export const CreateJoinContext = createContext<CreateJoinContextType>({
  user: undefined,
  setUser: () => {},
});

export const CreateJoinContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  return (
    <CreateJoinContext.Provider value={{ user, setUser }}>
      {children}
    </CreateJoinContext.Provider>
  );
};

export const useCreateJoinContext = () => {
  return useContext(CreateJoinContext);
};
