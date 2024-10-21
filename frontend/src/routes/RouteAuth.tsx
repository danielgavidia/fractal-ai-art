import { useParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RouteAuth = () => {
	const { authOperation } = useParams();
	return (
		<div>
			{authOperation === "login" || authOperation === "signup" ? (
				<AuthForm authOperation={authOperation} />
			) : (
				<></>
			)}
		</div>
	);
};

export default RouteAuth;
