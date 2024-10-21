import { Outlet, useNavigate } from "react-router-dom";

const Root = () => {
	const navigate = useNavigate();
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
				<button onClick={() => navigate("/editor")} className="p-2">
					Editor
				</button>
			</nav>

			{/* Outlet */}
			<div className="p-2 w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
