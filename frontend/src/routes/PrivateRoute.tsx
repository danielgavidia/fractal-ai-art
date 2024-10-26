import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

interface PrivateRouteProps {
  element: JSX.Element;
  requireAuth: boolean;
  redirectPath: string;
}

const PrivateRoute = ({ element, requireAuth, redirectPath }: PrivateRouteProps) => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return;
  }
  const { user, loading } = context;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to={redirectPath} />;
  }
  if (!requireAuth && user) {
    return <Navigate to={redirectPath} />;
  }

  return element;
};

export default PrivateRoute;
