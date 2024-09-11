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
  handleIsLoading: () => void;
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
  handleIsLoading: () => {},
});

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<IGroupComplete | undefined>(undefined);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [usersPerGroup, setUsersPerGroup] = useState([""]);

  const { setUser } = useCreateJoinContext();
  const { getDescription } = useDescriptionContext();
  const [joinPageRedirect, setJoinPageRedicrect] = useState<string | undefined>(
    undefined
  );
  const [allGroups, setAllGroups] = useState<IGroupComplete[]>([]);
  const getAllGroup = async () => {
    try {
      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;
      console.log(userId);

      if (!userId) {
        console.error("User ID is not found in local storage.");
        return; // Arrêter si l'userId est introuvable
      }

      const response = await api.get("/group");

      // Vérifier la structure des données de la réponse
      if (!response.data) {
        console.error(
          "La structure des données de réponse est incorrecte :",
          response.data
        );
        return;
      }

      const userGroups = response.data.filter((group: any) =>
        group.members.some((member: any) => member.userId === userId)
      );

      setAllGroups(userGroups);
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

      console.log(response.data);

      setIsLoading(false);
      setIsAuthenticated(false);
      toast.success("Vous avez rejoins le groupe avec succès");
      getAllGroup();
      setUser(response.data);
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
      setIsAuthenticated(false);
      setUser(response.data.user);
      toast.success("Vous avez créé le groupe avec succès");
      getAllGroup();
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      setIsLoading(false);
      toast.error("Erreur lors de la création du groupe");
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
      await getAllGroup();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du groupe :", error);
      toast.error("Erreur lors de la mise à jour du groupe");
    }
  };

  const getGroup = async () => {
    const groupId =
      typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
    try {
      const response = await api.get(`/group/${groupId}`);

      setGroup(response.data);
      findUsersPerGroup(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du groupe :", error);
    }
  };
  const findUsersPerGroup = (group: IGroupComplete) => {
    group.members.map((member) => {
      usersPerGroup.push(member.userId);
    });
  };

  const handleIsLoading = () => setIsLoading((prev) => !prev);
  useEffect(() => {
    getGroup();
  }, [group?._id]); // Recharger le groupe à chaque changement de groupId

  useEffect(() => {
    getAllGroup();
    const groupId =
      typeof window !== "undefined" ? localStorage.getItem("groupId") : null;
    if (groupId) {
      setIsAuthenticated(true);
      getGroup();
      getDescription(groupId);
    }
  }, []);

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
        usersPerGroup,
        onDeleteGroup,
        updateGroup,
        getGroup,
        handleIsLoading,
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
