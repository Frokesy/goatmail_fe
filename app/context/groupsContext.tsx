import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  createdAt: string;
}

interface GroupsContextType {
  groups: Group[];
  addGroup: (group: Omit<Group, "id" | "createdAt">) => Promise<void>;
  clearGroups: () => Promise<void>;
}

const STORAGE_KEY = "@groups";

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setGroups(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load groups:", error);
      }
    };
    loadGroups();
  }, []);

  useEffect(() => {
    const saveGroups = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
      } catch (error) {
        console.error("Failed to save groups:", error);
      }
    };
    saveGroups();
  }, [groups]);

  const addGroup = async (group: Omit<Group, "id" | "createdAt">) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...group,
    };
    setGroups((prev) => [...prev, newGroup]);
  };

  const clearGroups = async () => {
    setGroups([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GroupsContext.Provider value={{ groups, addGroup, clearGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupsProvider");
  }
  return context;
};
