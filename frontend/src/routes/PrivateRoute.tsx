import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

interface PrivateRouteProps {
	element: JSX.Element;
	isLoggedIn: boolean;
	redirectPath: string;
}

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

const PrivateRoute = ({ element, isLoggedIn, redirectPath }: PrivateRouteProps) => {
	const { user } = useAuth();

	if (isLoggedIn) {
		return user ? <Navigate to={redirectPath} /> : element;
	} else {
		return user ? element : <Navigate to={redirectPath} />;
	}
};

export default PrivateRoute;
