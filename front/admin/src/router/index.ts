import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/page/layout/index.vue'
import Home from '@/page/home/index.vue'
import Product from '@/page/product/index.vue'
import Login from '@/page/auth/index.vue'

export const routes = [
  {
    path: '/',
    name: '主页',
    component: Layout,
    children: [
      {
        path: '/',
        name: '统计页面',
        component: Home,
      },
      {
        path: '/product',
        name: '商品管理',
        component: Product,
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta: { hidden: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
