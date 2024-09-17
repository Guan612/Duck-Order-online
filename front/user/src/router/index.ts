import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

import Layout from "@/views/layout/index.vue";
import Chat from "@/views/chat/index.vue";
import Delivery from "@/views/delivery/index.vue";
import Home from "@/views/home/index.vue";
import Chart from "@/views/chart/index.vue";
import Me from "@/views/me/index.vue";
import Auth from "@/views/auth/index.vue";
import Login from "@/views/auth/login/index.vue";
import Register from "@/views/auth/register/index.vue";
import { ElMessage } from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Layout,
            children: [
                {
                    path: "/",
                    name: "home",
                    component: Home,
                    meta: { title: "首页" },
                },
                {
                    path: "/chart",
                    name: "chart",
                    component: Chart,
                    meta: { title: "购物车", requiresAuth: true },
                },
                {
                    path: "/me",
                    name: "me",
                    component: Me,
                    meta: { title: "我的", requiresAuth: true },
                },
                {
                    path: "/chat",
                    name: "chat",
                    component: Chat,
                },
                {
                    path: "/delivery",
                    name: "delivery",
                    component: Delivery,
                },
            ],
        },
        {
            path: "/auth",
            name: "auth",
            component: Auth,
            children: [
                {
                    path: "/auth/login",
                    name: "login",
                    component: Login,
                },
                {
                    path: "/auth/register",
                    name: "register",
                    component: Register,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if(to.meta.requiresAuth && !userStore.userInfo?.token) {
        ElMessage.error("请先登录");
        next('/auth/login');
    } else {
        next();
    }
})

export default router;
