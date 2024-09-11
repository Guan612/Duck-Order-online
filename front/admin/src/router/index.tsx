import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../layout/index";
import UserAdmin from "../pages/useradmin";
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Register from "../pages/register";

const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Welcome />,
			},
			{
				path: "/useradmin",
				element: <UserAdmin />,
			},
		],
	},
	{
		path: "/auth",
		children: [
			{
				path: "/auth",
				element: <Login />,
			},
			{
				path: "/auth/register",
				element: <Register />,
			},
		],
	},
];

export default function Router() {
	return useRoutes(routes);
}
