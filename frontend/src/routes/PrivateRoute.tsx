import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

interface PrivateRouteProps {
  element: JSX.Element;
  requireAuth: boolean;
  redirectPath: string;
}

const PrivateRoute = ({ element, requireAuth, redirectPath }: PrivateRouteProps) => {
  const { user, loading } = useFirebaseAuth();

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
