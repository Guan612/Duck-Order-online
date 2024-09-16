<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import router from '@/router';

// 创建一个响应式变量来保存当前活动的路由
const activeRoute = ref('/');
// 点击时更新活动路由
const updateActiveRoute = (route) => {
	activeRoute.value = route;
};
</script>
<template>
	<div class="flex flex-col bg-transblue h-screen">
		<el-menu default-active="1">
			<el-menu-item index="1" >
				<template #title>
					<el-icon>
						<HomeFilled />
					</el-icon>
					<span class="font-blod" @click="updateActiveRoute('/home')">首页</span>
				</template>
			</el-menu-item>
			<el-menu-item index="2">
				<el-icon>
					<ShoppingCart />
				</el-icon>
				<template #title>购物车</template>
			</el-menu-item>
			<el-menu-item index="3">
				<el-icon>
					<ChatDotSquare />
				</el-icon>
				<template #title>消息</template>
			</el-menu-item>
			<el-menu-item index="4">
				<el-icon>
					<User />
				</el-icon>
				<template #title>我的</template>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<style></style>
