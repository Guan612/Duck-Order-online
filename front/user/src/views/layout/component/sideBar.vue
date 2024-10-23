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
		<div class="flex-grow">
			<div class="sidebar-section" @click="$router.push(`/`)">
				<el-icon class="m-1">
					<House />
				</el-icon>
				<span>首页</span>
			</div>
			<div class="sidebar-section" @click="$router.push(`/menu/`)">
				<el-icon class="m-1">
					<ForkSpoon />
				</el-icon>
				<span>兑换</span>
			</div>
			<div class="sidebar-section" @click="$router.push(`/chat`)">
				<el-icon class="m-1">
					<ChatDotRound />
				</el-icon>
				<span>消息</span>
			</div>
			<div class="sidebar-section" @click="$router.push(`/cart`)">
				<el-icon class="m-1">
					<ShoppingCart />
				</el-icon>
				<span>购物车</span>
			</div>
			<div class="sidebar-section" @click="$router.push(`/article`)">
				<el-icon class="m-1">
					<Document />
				</el-icon>
				<span>学习</span>
			</div>
			<div class="sidebar-section" @click="$router.push('/me')">
				<el-icon class="m-1">
					<User />
				</el-icon>
				<span>我的</span>
			</div>
		</div>

		<div class="">
			<div class="sidebar-section">
				<el-icon class="m-1">
					<More />
				</el-icon>
				<span>关于</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
.sidebar-section {
	@apply flex bg-transpink rounded-2xl p-2 m-2 items-center justify-center font-bold hover:scale-110 transition-transform duration-300
}
</style>
