import { createContext } from "react";

export const CreateJoinCOntext = createContext({
  user: undefined,
});

export const CreateJoinContexts = ({ children }: { children: Reactnode }) => {
  const [user, setUser] = useState(undefined);
};
