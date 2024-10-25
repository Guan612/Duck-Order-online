<script setup>
import { useUserStore } from '@/stores/userstore'
import { ElButton } from 'element-plus';
import { ref } from 'vue';
const { userInfo, logout } = useUserStore()
const userName = ref('')
if (userInfo.loginId) {
	userName.value = userInfo.loginId
} else {
	userName.value = '未登录'
}
</script>
<template>
	<div class="bg-gradient-to-r from-transblue to-transpink h-16 flex flex-row">
		<div class="flex justify-end items-center  m-2">
			<div class="text-2xl font-bold">{{ userName }}</div>
			<ElButton @click="logout" type="primary" class="ml-2">退出登录</ElButton>
		</div>
	</div>
</template>
