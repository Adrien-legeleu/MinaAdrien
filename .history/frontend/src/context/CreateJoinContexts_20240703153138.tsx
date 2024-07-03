import { createContext, ReactNode, useState } from "react";

export const CreateJoinContext = createContext({
  user: undefined,
});
export const CreateJoinContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState(undefined);

  return (
    <CreateJoinContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </CreateJoinContext.Provider>
  );
};
