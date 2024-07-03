import { createContext, ReactNode, useState } from "react";

export const CreateJoinContext = createContext({
  isAuthenticated: false,
  joinPageRedirect: undefined,
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
        isAuthenticated,

        joinPageRedirect,
      }}
    >
      {children}
    </CreateJoinContext.Provider>
  );
};
