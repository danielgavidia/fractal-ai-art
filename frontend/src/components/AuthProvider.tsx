import { useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getCurrentUser } from "../utils/expressUtils";
import { User } from "../types/types";
import { createContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: FirebaseUser | null;
  userInfo: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserInfo(null);
      return;
    }
    const fetch = async () => {
      try {
        const res = await getCurrentUser(user);
        setUserInfo(res);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, userInfo, loading }}>{children}</AuthContext.Provider>
  );
};
