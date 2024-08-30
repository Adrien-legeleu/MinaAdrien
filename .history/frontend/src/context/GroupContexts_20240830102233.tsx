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
  allGroups: IGroup[];
  onLogin: (values: IJoinFormsValues) => Promise<void>;
  onRegister: (values: IGroupFormsValues) => Promise<void>;
  chosePseudo: (values: IPseudoFormValues) => Promise<void>;
  onDeleteGroup: ({ groupId, userId }: any) => Promise<void>;
  updateGroup: (values: IGroup) => Promise<void>;
  getGroup: () => Promise<void>;
  handleIsLoading: () => void;
}>({
  isAuthenticated: false,
  isLoading: false,
  allGroups: [],
  joinPageRedirect: undefined,
  group: undefined,
  onLogin: async () => {},
  onRegister: async () => {},
  chosePseudo: async () => {},
  onDeleteGroup: async () => {},
  updateGroup: async () => {},
  getGroup: async () => {},
  handleIsLoading: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<IGroupComplete | undefined>(undefined);

  const { setUser } = useCreateJoinContext();

  const [joinPageRedirect, setJoinPageRedicrect] = useState<string | undefined>(
    undefined
  );
  const [allGroups, setAllGroups] = useState<IGroupComplete[]>([]);
  const getAllGroup = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get("/group");
      console.log(response);

      const uniqueGroups = new Set<IGroupComplete>();

      response.data.forEach((group: IGroupComplete) => {
        group.members.forEach((member: any) => {
          if (member.userId === userId) {
            uniqueGroups.add(group);
          }
        });
      });

      setAllGroups(Array.from(uniqueGroups));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateGroup = async (values: IGroup) => {
    const { groupId, ...newValues } = values;
    try {
      console.log(newValues);

      await api.patch(`/group/${groupId}`, newValues);

      setGroup((prev: any) => {
        return { ...prev, newValues };
      });
      window.location.reload();
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
        "Le code du groupe est incorrect. Assurez vous qu'il existe, puis réessayez."
      );
    }
  };

  const onRegister = async (values: IGroupFormsValues) => {
    try {
      const response = await api.post("/auth/register", values);

      localStorage.setItem("groupId", response?.data.group._id);
      changeUser({ group: response.data.group });
      setGroup(response.data.group);
      console.log(response);

      setIsAuthenticated(true);
      toast.success("Votre groupe a bien été créer !");
      const userId = localStorage.getItem("userId");
      const groupId = [...allGroups, response.data.group];
      await api.patch(`/api/update-subscription/:${userId}`, groupId);
      console.log("subscription update réussi");
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
      setIsAuthenticated(true);
    }
  }, [joinPageRedirect]);
  const groupId = localStorage.getItem("groupId");

  const getGroup = useCallback(async () => {
    const groupId = localStorage.getItem("groupId");
    if (!groupId) return;

    try {
      const response = await api.get(`/group/${groupId}`);
      setGroup(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du groupe", error);
    }
  }, [groupId]);

  useEffect(() => {
    getGroup();
  }, [groupId]); // Recharger le groupe à chaque changement de groupId

  useEffect(() => {
    getAllGroup();
  }, []);

  const handleIsLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <GroupContext.Provider
      value={{
        handleIsLoading,
        updateGroup,
        onDeleteGroup,
        getGroup,
        isLoading,
        isAuthenticated,
        allGroups,
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
