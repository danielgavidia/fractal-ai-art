import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { getUserCurrent } from "../utils/expressUtils";
import { User } from "../types/types";

const Root = () => {
	// userId
	const [userInfo, setUserInfo] = useState<User>();

	// Navigation
	const navigate = useNavigate();

	// Context
	const authContext = useContext(AuthContext);
	if (!authContext) {
		return null;
	}
	const { user } = authContext;

	// Sign out
	async function logOut() {
		await auth.signOut();
		navigate("/feed");
	}

	// Fetch user id
	useEffect(() => {
		const fetch = async () => {
			const res = await getUserCurrent();
			setUserInfo(res);
		};
		fetch();
	}, []);

	return (
		<div className="w-full">
			{/* Navbar */}
			<nav className="w-full sticky top-0 z-10 flex border-b-2 border-black bg-sky-800 text-white">
				<button onClick={() => navigate("/feed")} className="flex-1 text-left p-2">
					AI Art
				</button>
				<button onClick={() => navigate("/feed")} className="p-2">
					Feed
				</button>
				{user ? (
					// User is logged in
					<>
						<button onClick={() => logOut()} className="p-2">
							Logout
						</button>
						<button onClick={() => navigate("/editor")} className="p-2">
							Editor
						</button>
						<button onClick={() => navigate(`/profile/${userInfo?.id}`)} className="p-2">
							Profile
						</button>
					</>
				) : (
					// User is logged out / not signed up
					<>
						<button onClick={() => navigate("/auth/login")} className="p-2">
							Login
						</button>
						<button onClick={() => navigate("/auth/signup")} className="p-2">
							Signup
						</button>
					</>
				)}
			</nav>

			{/* Outlet */}
			<div className="p-2 w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
