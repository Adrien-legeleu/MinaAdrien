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
import { AnyMxRecord } from "dns";

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
  groupId?: string;
  groupname?: string;
  profilPhoto?: string;
  userId?:string
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
  isLoading: boolean;
  joinPageRedirect: string | undefined;
  group: IGroupComplete | undefined;

  onLogin: (values: IJoinFormsValues) => Promise<void>;
  onRegister: (values: IGroupFormsValues) => Promise<void>;
  chosePseudo: (values: IPseudoFormValues) => Promise<void>;
  onDeleteGroup: ({ groupId, userId }: any) => Promise<void>;
  updateGroup: (values: IGroup) => Promise<void>;
}>({
  isAuthenticated: false,
  isLoading: false,
  joinPageRedirect: undefined,
  group: undefined,
  onLogin: async () => {},
  onRegister: async () => {},
  chosePseudo: async () => {},
  onDeleteGroup: async () => {},
  updateGroup: async () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<IGroupComplete | undefined>(undefined);

  const { setUser } = useCreateJoinContext();

  const [joinPageRedirect, setJoinPageRedicrect] = useState<string | undefined>(
    undefined
  );

  const getGroup = async () => {
    try {
      const groupId = localStorage.getItem("groupId");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("Group name not found in local storage");
      }

      const response = await api.get(`/auth/user/${userId}`);
      console.log(response);

      setGroup(response.data);
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  const updateGroup = async (values: IGroup) => {
    const { groupId , userId, ...newValues } = values;
    try {
      await api.patch(`/auth/update/${userId}/${groupId}`, newValues);
      setUser((prev: any) => {
        return { ...prev, ...newValues };
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const changeUser = ({ group }: { group: any }) => {
    if (!group || !group._id || !group.password || !group.groupname) {
      console.error("Invalid group object:", group);
      return;
    }

    setUser((prevUser: any) => {
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
            urlProfil: group.profilPhoto || "",
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
      setJoinPageRedicrect(response.data.redirect);
    } catch (error: any) {
      console.log("Login error" + error);
    }
  };

  const onRegister = async (values: IGroupFormsValues) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", values);
      console.log(response);
      localStorage.setItem("groupId", response?.data.group._id);
      changeUser({ group: response.data.group });
      setGroup(response.data.group);
      console.log(response.data.group);

      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  const onDeleteGroup = async ({ groupId, userId }: any) => {
    try {
      const response = await api.patch(`/auth/${userId}/${groupId}`);
      console.log(response);
      setUser(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const chosePseudo = async (values: IPseudoFormValues) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/choose-pseudo", values);
      console.log(response);

      setIsAuthenticated(true);
    } catch (error: any) {
      console.log("Register error" + error);
    }
  };

  useEffect(() => {
    if (joinPageRedirect === "HomePage") {
      setIsLoading(true);
      setIsAuthenticated(true);
    }
  }, [joinPageRedirect]);

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <GroupContext.Provider
      value={{
        updateGroup,
        onDeleteGroup,
        isLoading,
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
