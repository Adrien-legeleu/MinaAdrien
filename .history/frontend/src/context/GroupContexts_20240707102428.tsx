"use client";
import { api } from "@/config/api";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCreateJoinContext } from "./CreateJoinContexts";
import { IGroupComplete } from "@/types/group";

export interface IGroupFormsValues {
  groupname: string;
  pseudo: string;
  userId: string | undefined;
}
export interface IPseudoFormValues {
  userId: string | undefined;
  groupId: string | undefined;
  pseudoUser: string;
}
export interface IJoinFormsValues {
  password: string;

  userId: string | undefined;
}
export interface IGroup {
  groupId: string;
  groupCode: string;
  groupName: string;
  urlProfil: string;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  groups: IGroup[];
  profilPhoto: string;
}
export const GroupContext = createContext<{
  isAuthenticated: boolean;
  joinPageRedirect: string | undefined;
  group: IGroupComplete | undefined;

  onLogin: (values: IJoinFormsValues) => Promise<void>;
  onRegister: (values: IGroupFormsValues) => Promise<void>;
  chosePseudo: (values: IPseudoFormValues) => Promise<void>;
  // onLogout: () => void;
}>({
  isAuthenticated: false,
  joinPageRedirect: undefined,
  group: undefined,
  onLogin: async () => {},
  onRegister: async () => {},
  chosePseudo: async () => {},
  // onLogout: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [group, setGroup] = useState<IGroupComplete | undefined>(undefined);

  const { setUser } = useCreateJoinContext();

  const [joinPageRedirect, setJoinPageRedicrect] = useState<string | undefined>(
    undefined
  );

  const getGroup = async () => {
    try {
      const groupId = localStorage.getItem("groupId");
      const response = await api.get(`/group/${groupId}`);
      setGroup(response.data);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  // const onLogout = useCallback(() => {
  //   localStorage.removeItem("authToken-group");
  //   localStorage.removeItem("groupId");
  //   setIsAuthenticated(false);
  //   console.log("logout");
  // }, []);

  const changeUser = ({ group }: { group: any }) => {
    if (
      !group ||
      !group._id ||
      !group.password ||
      !group.groupname ||
      !group.profilPhoto
    ) {
      console.error("Invalid group object:", group);
      return;
    }

    setUser((prevUser: IUser | undefined) => {
      if (!prevUser) {
        return prevUser;
      }
      return {
        ...prevUser,
        groups: [
          ...prevUser.groups,
          {
            groupId: group._id,
            groupCode: group.password,
            groupName: group.groupname,
            urlProfil: group.profilPhoto,
          },
        ],
      };
    });
  };

  const onLogin = async (values: IJoinFormsValues) => {
    try {
      const response = await api.post("/auth/login", values);
      console.log(response);
      localStorage.setItem("groupId", response.data.group._id);
      localStorage.setItem("authToken-group", response?.data?.authToken);
      setJoinPageRedicrect(response.data.redirect);
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };

  const onRegister = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/register", values);
      console.log(response);
      localStorage.setItem("authToken-group", response?.data?.authToken);
      localStorage.setItem("groupId", response?.data.group._id);
      changeUser({ group: response.data.group });
      getGroup();
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  const chosePseudo = async (values: IPseudoFormValues) => {
    try {
      const response = await api.post("/auth/choose-pseudo", values);
      console.log(response);

      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  const checkToken = async () => {
    try {
      await api.get("/check-token-group");
      setIsAuthenticated(true);
    } catch (error: any) {
      // onLogout();
      console.log(error);
    }
  };

  useEffect(() => {
    if (joinPageRedirect === "HomePage") {
      setIsAuthenticated(true);
    }
  }, [joinPageRedirect]);

  useEffect(() => {
    const authTokenGroup = localStorage.getItem("authToken-group");

    if (!authTokenGroup) {
      setIsAuthenticated(false);
    } else {
      checkToken();
    }
  }, []);

  return (
    <GroupContext.Provider
      value={{
        isAuthenticated,
        onLogin,
        onRegister,
        group,
        joinPageRedirect,
        chosePseudo,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
