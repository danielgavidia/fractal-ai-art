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
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// THIS EXISTS TO PROVIDE AUTHENTICATION STATE ANYWHERE IN MY APPLICATION TREE!!
// that's the whole reason it exists, so OTHER components can ask IT: "Hey AuthProvider, what is my current auth status btw??"
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null); // rename this to firebaseuser
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // EFFECT -- get userInfo for the firebaseuser
  useEffect(() => {
    // if there is no firebase user, we aren't authenticated yet, so who cares!
    if (!user) {
      setUserInfo(null);
      return;
    }

    // if there IS a firebase user, we want to go get the AI Art User (Our User) credentials and put them in the auth provider.
    const fetch = async () => {
      const res = await getCurrentUser(user);
      setUserInfo(res);
    };
    fetch();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);
  // do a tiny bit more work, to go actually get the user from the backend

  return <AuthContext.Provider value={{ user, userInfo }}>{children}</AuthContext.Provider>;
};
