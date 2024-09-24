import { message } from "antd";
import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../layout/index";
import UserAdmin from "../pages/systemadmin/useradmin";
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Register from "../pages/register";
import useAuth from "../hooks/login/useAuth";
import MenuAdmin from "../pages/systemadmin/memuadmin";

const RequireAuth = ({ element }) => {
    const auth = useAuth();
    if (!auth) {
        message.error("请先登录后使用");
        return <Navigate to="/auth" />;
    } else {
        return element;
    }
    //return auth ? element : <Navigate to="/auth" />;
    
};

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <RequireAuth element={<Welcome />} />,
            },
            {
                path: "/useradmin",
                element: <RequireAuth element={<UserAdmin />} />,
            },
            {
                path: "menuadmin",
                element : <RequireAuth element={<MenuAdmin />} />,
            }
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
