import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import Chat from "@/views/chat/index.vue";
import Delivery from "@/views/delivery/index.vue";
import Home from "@/views/home/index.vue";
import Chart from "@/views/chart/index.vue";
import Me from "@/views/me/index.vue";

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
                },
                {
                    path: "/chart",
                    name: "chart",
                    component: Chart,
                },
                {
                    path: "/me",
                    name: "me",
                    component: Me,
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
    ],
});

export default router;
