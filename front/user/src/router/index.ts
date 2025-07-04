import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/userstore";

import Layout from "@/views/layout/index.vue";
import Chat from "@/views/chat/index.vue";
import ChatDetailed from "@/views/chat/component/chatDetailed.vue";
import Delivery from "@/views/delivery/index.vue";
import Home from "@/views/home/index.vue";
import Cart from "@/views/cart/index.vue";
import Me from "@/views/me/index.vue";
import Auth from "@/views/auth/index.vue";
import Login from "@/views/auth/login/index.vue";
import Register from "@/views/auth/register/index.vue";
import Menu from "@/views/menu/index.vue";
import MenuDetailed from "@/views/menu/menuDetailed.vue";
import Orrder from "@/views/order/index.vue";
import Article from "@/views/article/index.vue";
import ArticleDetail from "@/views/article/component/articleDetail.vue";
import Myorder from "@/views/me/component/myorder.vue";

const router = createRouter({
	history: createWebHistory("/user"),
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
					path: "/menu",
					name: "menu",
					component: Menu,
					meta: { title: "菜单", requiresAuth: true },
				},
				{
					path: "/menu/:id",
					name: "menuDetail",
					component: MenuDetailed,
				},
				{
					path: "/cart",
					name: "cart",
					component: Cart,
					meta: { title: "购物车", requiresAuth: true },
				},
				{
					path: "/me",
					name: "me",
					component: Me,
					meta: { title: "我的", requiresAuth: true },
				},
				{
					path: "/me/myorder",
					name: "myorder",
					component: Myorder,
					meta: { title: "我的订单", requiresAuth: true },
				},
				{
					path: "/chat",
					name: "chat",
					component: Chat,
					meta: { title: "聊天", requiresAuth: true },
				},
				{
					path: "/chat/:id",
					name: "chatDetailed",
					component: ChatDetailed,
					meta: { title: "聊天", requiresAuth: true },
				},
				{
					path: "/order/:id",
					name: "order",
					component: Orrder,
					meta: { title: "订单详情", requiresAuth: true },
				},
				{
					path: "/article",
					name: "article",
					component: Article,
					meta: { title: "文章", requiresAuth: true },
				},
				{
					path: "/article/:id",
					name: "articleDetail",
					component: ArticleDetail,
					meta: { title: "文章详情", requiresAuth: true },
				},
				{
					path: "/delivery",
					name: "delivery",
					component: Delivery,
					meta: { title: "配送", requiresAuth: true },
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
	if (to.meta.requiresAuth && !userStore.userInfo?.token) {
		ElMessage.error("请先登录");
		next("/auth/login");
	} else {
		next();
	}
});

export default router;
