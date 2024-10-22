import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.tsx";

// Routes
import Root from "./routes/Root.tsx";
import RouteFeed from "./routes/RouteFeed.tsx";
import RouteEditor from "./routes/RouteEditor.tsx";
import RouteAuth from "./routes/RouteAuth.tsx";
import RouteProfile from "./routes/RouteProfile.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <RouteFeed />,
			},
			{
				path: "/feed",
				element: <RouteFeed />,
			},
			{
				path: "/editor",
				element: (
					<PrivateRoute element={<RouteEditor />} isLoggedIn={false} redirectPath="/auth/login" />
				),
			},
			{
				path: "/auth/:authOperation",
				element: <PrivateRoute element={<RouteAuth />} isLoggedIn={true} redirectPath="/feed" />,
			},
			{
				path: "/profile/:userId",
				element: <RouteProfile />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
);
