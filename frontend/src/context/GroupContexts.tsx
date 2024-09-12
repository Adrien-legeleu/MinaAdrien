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
import { useDescriptionContext } from "./DescriptionContext";

export interface IGroupFormsValues {
  groupname: string;

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
  groupId?: string | null;
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
  groupId: any;
  allGroups: IGroup[];
  onLogin: (values: IJoinFormsValues) => Promise<void>;
  onRegister: (values: IGroupFormsValues) => Promise<void>;
  onDeleteGroup: ({ groupId, userId }: any) => Promise<void>;
  updateGroup: (values: IGroup) => Promise<void>;
  getGroup: () => Promise<void>;
  getAllGroup: () => Promise<void>;
}>({
  isAuthenticated: false,
  isLoading: false,
  allGroups: [],
  joinPageRedirect: undefined,
  group: undefined,
  groupId: null,
  onLogin: async () => {},
  onRegister: async () => {},
  onDeleteGroup: async () => {},
  updateGroup: async () => {},
  getGroup: async () => {},
  getAllGroup: async () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<IGroupComplete | undefined>(undefined);
  const [groupId, setGroupId] = useState<string | null>(null);

  const { setUser } = useCreateJoinContext();
  const { getDescription } = useDescriptionContext();
  const [joinPageRedirect, setJoinPageRedicrect] = useState<string | undefined>(
    undefined
  );
  const [allGroups, setAllGroups] = useState<IGroupComplete[]>([]);

  const getAllGroup = useCallback(async () => {
    setIsLoading(true); // Active le chargement au début
    try {
      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;

      if (!userId) {
        console.error("User ID is not found in local storage.");
        setIsLoading(false);
        return;
      }

      const response = await api.get("/group");
      const userGroups = response.data.filter((group: any) =>
        group.members.some((member: any) => member.userId === userId)
      );

      setAllGroups(userGroups);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    } finally {
      setIsLoading(false); // Désactive le chargement à la fin
    }
  }, []); // Ajout de la dépendance vide pour éviter les répétitions

  const onLogin = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setIsAuthenticated(true);
      toast.success("Vous avez rejoint le groupe avec succès");
      await getAllGroup();
      setUser(response.data);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error("Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setUser(response.data.user);
      toast.success("Vous avez créé le groupe avec succès");
      await getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      toast.error("Erreur lors de la création du groupe");
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteGroup = async ({ groupId, userId }: any) => {
    try {
      await api.delete(`/auth/${userId}/${groupId}`);
      toast.success("Groupe supprimé avec succès");
      await getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la suppression du groupe :", error);
      toast.error("Erreur lors de la suppression du groupe");
    }
  };

  const updateGroup = async (values: any) => {
    try {
      const { groupId } = values;
      await api.patch(`/group/${groupId}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success("Groupe mis à jour avec succès");
      await getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du groupe :", error);
      toast.error("Erreur lors de la mise à jour du groupe");
    }
  };

  useEffect(() => {
    console.log(isLoading + "eozieoi");
  }, [isLoading]);

  const getGroup = useCallback(async () => {
    const groupId =
      typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
    if (!groupId) return;

    setIsLoading(true);
    try {
      const response = await api.get(`/group/${groupId}`);
      setGroup(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du groupe :", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const groupId =
      typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
    if (groupId) {
      setIsAuthenticated(true);
      getGroup();
      getDescription(groupId);
    }
  }, [getGroup, getDescription]); // Garder ces dépendances ici

  return (
    <GroupContext.Provider
      value={{
        groupId,
        isAuthenticated,
        isLoading,
        joinPageRedirect,
        group,
        allGroups,
        onLogin,
        onRegister,
        onDeleteGroup,
        updateGroup,
        getGroup,
        getAllGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(GroupContext);
};
