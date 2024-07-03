import { createContext, ReactNode, useState } from "react";

export const CreateJoinContext = createContext({
  user: undefined,
});

export const CreateJoinContextsProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(undefined);


  return (
    <
  )
};
