import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/index.vue"
import Chat from "@/views/chat/index.vue"
import Delivery from "@/views/delivery/index.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Layout,
			children:[
				{
					path:'/chat',
					name:'chat',
					component:Chat
				},
				{
					path:'/delivery',
					name:'delivery',
					component:Delivery
				}
			]
		},
	],
});

export default router;
