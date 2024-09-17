<script setup lang="ts">
import { ref } from 'vue';
import type { RegisterInfo } from '@/dto/userInfo'
import { registerAPI } from '@/api/user';
import { ElMessage } from 'element-plus';
import router from '@/router';

const labelposition = ref('right')
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const registerInfo = ref<RegisterInfo>({
    loginId: null,
    password: null,
    nickname: null,
    phone: null,
    email: null,
})

// 清理空字符串，将空字符串转换为 null
const cleanData = (data: RegisterInfo) => {
  Object.keys(data).forEach((key) => {
    if (data[key as keyof RegisterInfo] === "") {
      data[key as keyof RegisterInfo] = null;
    }
  });
  return data;
};

const register = async (registerInfo: RegisterInfo) => {
    const cleanedInfo = cleanData(registerInfo); // 清理空字符串
    const res = await registerAPI(cleanedInfo)
    if (res){
        ElMessage.success('注册成功')
        router.push('/aurh/login')
    }
}

</script>

<template>
    <div class="flex flex-row justify-center items-center h-screen">
        <div class="flex flex-col justify-center bg-transblue rounded-lg shadow-2xl p-8">
            <div class="flex text-3xl font-bold mb-4 justify-center items-center">
                <el-avatar :size="50" :src="circleUrl" />
                <span class="ml-2">用户注册</span>
            </div>
            <el-form :label-position=labelposition label-width="auto" :model=registerInfo style="max-width: 800px">
                <el-form-item label="登录id" :label-position=labelposition>
                    <el-input v-model="registerInfo.loginId" />
                </el-form-item>
                <el-form-item label="昵称" :label-position=labelposition>
                    <el-input v-model="registerInfo.nickname" />
                </el-form-item>
                <el-form-item label="密码" :label-position=labelposition>
                    <el-input v-model="registerInfo.password" type="password" />
                </el-form-item>
                <el-form-item label="电话" :label-position=labelposition>
                    <el-input v-model="registerInfo.phone" />
                </el-form-item>
                <el-form-item label="电子邮件" :label-position=labelposition>
                    <el-input v-model="registerInfo.email" />
                </el-form-item>

            </el-form>
            <div class="flex justify-center items-center">
                <el-button type="primary" @click="register(registerInfo)">注册</el-button>
            </div>
        </div>
    </div>
</template>