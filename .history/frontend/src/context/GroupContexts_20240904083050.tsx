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
import { toast } from "sonner";

export interface IGroupFormsValues {
  groupname: string;
  pseudo: string;
  userId: string | undefined;
}
export interface IPseudoFormValues {
  userId: string | null;
  groupId: string | null;
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
      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      const response = await api.get("/group")";
      setAllGroups(response.data.groups);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    }
  };

  const onLogin = async (values: IJoinFormsValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setJoinPageRedicrect(response.data.redirect);
      setIsLoading(false);
      setIsAuthenticated(true);
      toast.success("Vous avez rejoins le groupe avec succès");
      setUser(response.data.user);
    } catch (error: any) {
      console.error("Erreur lors de l'inscription :", error);
      setIsLoading(false);
      toast.error("Erreur lors de l'inscription");
    }
  };

  const onRegister = async (values: IGroupFormsValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setIsLoading(false);
      setIsAuthenticated(true);
      setUser(response.data.user);
      toast.success("Vous avez créé le groupe avec succès");
      getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      setIsLoading(false);
      toast.error("Erreur lors de la création du groupe");
    }
  };

  const chosePseudo = async (values: IPseudoFormValues) => {
    setIsLoading(true);
    try {
      await api.post("/auth/choose-pseudo", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setIsLoading(false);
      toast.success("Pseudo mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo :", error);
      setIsLoading(false);
      toast.error("Erreur lors de la mise à jour du pseudo");
    }
  };

  const onDeleteGroup = async ({ groupId, userId }: any) => {
    try {
      await api.delete(`/auth/${userId}/${groupId}`);
      toast.success("Groupe supprimé avec succès");
      getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe :", error);
      toast.error("Erreur lors de la suppression du groupe");
    }
  };

  const updateGroup = async (values: IGroup) => {
    try {
      const { groupId } = values;
      await api.patch(`/group/${groupId}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Groupe mis à jour avec succès");
      getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du groupe :", error);
      toast.error("Erreur lors de la mise à jour du groupe");
    }
  };

  const getGroup = async () => {
    try {
      const groupId =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("groupd")
          : null;
      const response = await api.get(`/group/${groupId}`);
      setGroup(response.data.group);
    } catch (error) {
      console.error("Erreur lors de la récupération du groupe :", error);
    }
  };

  const handleIsLoading = () => setIsLoading((prev) => !prev);
  useEffect(() => {
    getGroup();
  }, [group?._id]); // Recharger le groupe à chaque changement de groupId

  useEffect(() => {
    getAllGroup();
  }, []);

  return (
    <GroupContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        joinPageRedirect,
        group,
        allGroups,
        onLogin,
        onRegister,
        chosePseudo,
        onDeleteGroup,
        updateGroup,
        getGroup,
        handleIsLoading,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
