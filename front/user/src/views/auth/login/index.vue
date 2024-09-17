<script setup lang="ts">
import type { LoginInfo } from '@/dto/userInfo';
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const labelposition = ref('right')
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const userStore = useUserStore()

const loginInfo = ref<LoginInfo>({
    loginId: '',
    password: ''
})

const login = (loginInfo: LoginInfo) => {
    userStore.getUserInfo(loginInfo)
}

</script>

<template>
    <div class="flex flex-row justify-center items-center h-screen">
        <div class="flex flex-col justify-center bg-transblue rounded-lg shadow-2xl p-8">
            <div class="flex text-3xl font-bold mb-4 justify-center items-center">
                <el-avatar :size="50" :src="circleUrl" />
                <span class="ml-2">用户登录</span>
            </div>
            <el-form :label-position=labelposition label-width="auto" :model=loginInfo style="max-width: 800px">
                <el-form-item label="登录id" :label-position=labelposition>
                    <el-input v-model="loginInfo.loginId" />
                </el-form-item>
                <el-form-item label="密码" :label-position=labelposition>
                    <el-input v-model="loginInfo.password" type="password" />
                </el-form-item>
            </el-form>
            <div class="flex justify-center items-center">
                <el-button type="primary" @click="login(loginInfo)">登录</el-button>

            </div>
        </div>
    </div>
</template>