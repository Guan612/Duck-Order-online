<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import router from '@/router';

import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)

// 创建一个响应式变量来保存当前活动的路由
const activeRoute = ref('/');
const activeName = ref('1')
// 点击时更新活动路由
const updateActiveRoute = (route) => {
	activeRoute.value = route;
};
</script>
<template>
	<div class="flex flex-col bg-transblue h-screen">
		<el-menu default-active="2">
			<el-sub-menu index="1">
				<template #title>
					<el-icon>
						<HomeFilled  class="text-xl"/>
					</el-icon>
					<span class="font-blod text-xl">首页</span>
				</template>
				<el-menu-item-group>
					<template #title><span class="font-bold text-lg">今日推介</span></template>
					<el-menu-item index="1-1">item one</el-menu-item>
					<el-menu-item index="1-2">item two</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="Group Two">
					<el-menu-item index="1-3">item three</el-menu-item>
				</el-menu-item-group>
				<el-sub-menu index="1-4">
					<template #title><span>item four</span></template>
					<el-menu-item index="1-4-1">item one</el-menu-item>
				</el-sub-menu>
			</el-sub-menu>
			<el-menu-item index="2">
				<el-icon><icon-menu /></el-icon>
				<template #title>Navigator Two</template>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<el-icon>
					<document />
				</el-icon>
				<template #title>Navigator Three</template>
			</el-menu-item>
			<el-menu-item index="4">
				<el-icon>
					<setting />
				</el-icon>
				<template #title>Navigator Four</template>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<style></style>
