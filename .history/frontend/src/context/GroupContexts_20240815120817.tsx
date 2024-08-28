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
import { toast } from "sonner";

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
  groupCode: string;

  userId: string | undefined;
}
export interface IGroup {
  groupId?: string;
  groupName?: string;
  urlProfil?: string;
  userId?: string;
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
        throw new Error("User ID not found in local storage");
      }

      if (!groupId) {
        throw new Error("Group ID not found in local storage");
      }

      const response = await api.get(`/auth/user/${userId}`);
      console.log(response);

      const group = response.data.groups.find(
        (group: any) => group.groupId === groupId
      );

      if (!group) {
        throw new Error(`Group with ID ${groupId} not found`);
      }

      setGroup(group);
      console.log(group);
    } catch (error: any) {
      console.error(
        "An error occurred while fetching the group:",
        error.message
      );
    }
  };

  const updateGroup = async (values: IGroup) => {
    const { groupId, userId, ...newValues } = values;
    try {
      console.log(values);

      await api.patch(`/auth/update/${userId}/${groupId}`, newValues);
      setUser((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          groups: prev.groups.map((group: any) => {
            if (group.groupId === groupId) {
              return { ...group, ...newValues };
            }
            return group;
          }),
        };
      });
      setGroup((prev: any) => {
        return { ...prev, newValues };
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
      toast.success("Le groupe a été trouvé !");
    } catch (error: any) {
      console.log("Login error" + error);
      toast.error(
        "Le code du groupe est incorrect. Assurez vous qu'il existe, puis réessayez"
      );
    }
  };

  const onRegister = async (values: IGroupFormsValues) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", values);

      localStorage.setItem("groupId", response?.data.group._id);
      changeUser({ group: response.data.group });
      setGroup(response.data.group);

      setIsAuthenticated(true);
      toast.success("Votre groupe a bien été créer !");
    } catch (error: any) {
      console.log("Register error" + error);
      toast.error("Erreur lors de la création du groupe");
    }
  };

  const onDeleteGroup = async ({ groupId, userId }: any) => {
    try {
      const response = await api.patch(`/auth/${userId}/${groupId}`);

      setUser(response.data);
      toast.success("Groupe supprimer");
    } catch (error: any) {
      console.log(error);
      toast.error("Erreur lors de la suppression du groupe");
    }
  };

  const chosePseudo = async (values: IPseudoFormValues) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/choose-pseudo", values);
      console.log(response);

      setIsAuthenticated(true);
      toast.success("Pseudo bien reçu. Bienvenue dans votre nouveau groupe !");
    } catch (error: any) {
      console.log("Register error" + error);
      toast.error("Pseudo non reçcu");
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
