import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactsContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  addContact: (contact: Contact) => Promise<void>;
  clearContacts: () => Promise<void>;
}

const STORAGE_KEY = "@contacts";

const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // ✅ Load contacts from AsyncStorage on app start
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setContacts(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load contacts from storage:", error);
      }
    };

    loadContacts();
  }, []);

  // ✅ Persist contacts to AsyncStorage whenever they change
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      } catch (error) {
        console.error("Failed to save contacts:", error);
      }
    };

    if (contacts.length >= 0) {
      saveContacts();
    }
  }, [contacts]);

  // ✅ Helper functions
  const addContact = async (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const clearContacts = async () => {
    setContacts([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, addContact, clearContacts }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};
