import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Définir le type pour l'utilisateur (vous pouvez remplacer 'any' par le type exact de votre utilisateur)
type UserType = any;

// Définir le type pour le contexte
interface CreateJoinContextType {
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
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
