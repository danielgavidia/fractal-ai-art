import { useContext } from "react";
import { AuthContext, AuthContextType } from "../components/AuthProvider";

export const useFirebaseAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useFirebaseAuth must be used within an AuthProvider");
  }

  const { user, userInfo, loading } = context;

  return { user, userInfo, loading };
};
