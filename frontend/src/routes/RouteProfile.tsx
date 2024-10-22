import { useParams } from "react-router-dom";
import Profile from "../components/Profile";

const RouteProfile = () => {
	const { userId } = useParams();

	if (!userId) {
		return null;
	}

	return (
		<div>
			<Profile userId={userId} />
		</div>
	);
};

export default RouteProfile;
