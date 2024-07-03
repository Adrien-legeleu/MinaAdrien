import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export const CreateJoinContext = createContext({
  user: undefined,
  setUser: () => {},
});

export const CreateJoinContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  return (
    <CreateJoinContext.Provider value={{ user, setUser }}>
      {children}
    </CreateJoinContext.Provider>
  );
};

export const useCreateJoinContext = () => {
  return useContext(CreateJoinContext);
};
