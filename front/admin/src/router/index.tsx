import { message } from "antd";
import { useRoutes, Navigate } from "react-router-dom";

import Layout from "../layout/index";
import UserAdmin from "../pages/useradmin";
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Register from "../pages/register";
import useAuth from "../hooks/login/useAuth";
import MenuAdmin from "../pages/memuadmin";
import Chat from "../pages/chat";
import ChatDetal from "../pages/chat/compment/chatDetal";
import Order from "../pages/order";
import OrderInfo from "../pages/order/oderInfo";
import BalanceAdmin from "../pages/balanceadmin";

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
                path: "/menuadmin",
                element: <RequireAuth element={<MenuAdmin />} />,
            },
            {
                path: "/chat",
                element: <RequireAuth element={<Chat />} />,
            },
            {
                path: "/chat/:id",
                element: <RequireAuth element={<ChatDetal />} />
            },
            {
                path: "/order",
                element: <RequireAuth element={<Order />} />
            },
            {
                path: "/oederInfo",
                element: <RequireAuth element={<OrderInfo />} />
            },
            {
                path:"/balanceadmin",
                element:<RequireAuth element={<BalanceAdmin/>} />
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
