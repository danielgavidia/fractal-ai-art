import { Navigate } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

interface PrivateRouteProps {
  element: JSX.Element;
  isLoggedIn: boolean;
  redirectPath: string;
}

const PrivateRoute = ({ element, isLoggedIn, redirectPath }: PrivateRouteProps) => {
  const { user } = useFirebaseAuth();

  if (isLoggedIn) {
    return user ? <Navigate to={redirectPath} /> : element;
  } else {
    return user ? element : <Navigate to={redirectPath} />;
  }
};

export default PrivateRoute;
