import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
  incomingServer: string[];
  outgoingEmail: string[];
  recoveryEmail: string;
  subscription: string[];
  twoFASecret: string;
  twoFAEnabled: boolean;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: { email: string }, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiUrl =
  'http://ec2-51-20-249-56.eu-north-1.compute.amazonaws.com:3000/api';
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (err) {
        console.error('❌ Failed to load session', err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (userData: { email: string }, jwtToken: string) => {
    setToken(jwtToken);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('token', jwtToken);

    await getUser(jwtToken);
  };

  const getUser = async (jwtToken: string) => {
    try {
      const res = await fetch(`${apiUrl}/get-user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await res.json();
      setUser(data.user);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      console.error('❌ Error fetching user:', err);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
