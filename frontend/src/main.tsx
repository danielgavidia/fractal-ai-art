// import { StrictMode } from "react";
import "./index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import RouteFeed from "./routes/RouteFeed.tsx";
import RouteEditor from "./routes/RouteEditor.tsx";
import RouteAuth from "./routes/RouteAuth.tsx";
import { AuthProvider } from "./components/AuthProvider.tsx";

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
				element: <RouteEditor />,
			},
			{ path: "/auth/:authOperation", element: <RouteAuth /> },
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
	// </StrictMode>
);
