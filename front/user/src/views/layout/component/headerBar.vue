<script setup>
import {useUserStore} from '@/stores/userstore'
import { ref } from 'vue';
const {userInfo} = useUserStore()
const userName = ref('')
if (userInfo.loginId) {
	userName.value = userInfo.loginId
} else {
	userName.value = '未登录'
}
</script>
<template>
	<div class="bg-gradient-to-r from-transblue to-transpink h-16 flex">
		<div class="flex-1 flex justify-end items-center text-2xl font-bold m-2">{{userName}}</div>
	</div>
</template>
