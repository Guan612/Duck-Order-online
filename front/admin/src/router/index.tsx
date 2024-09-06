import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../layout/index";
import UserAdmin from "../pages/useradmin";
import Welcome from "../pages/welcome";
import Login from "../pages/login";

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
		path: "/login",
		element: <Login />,
	},
];

export default function Router() {
	return useRoutes(routes);
}
