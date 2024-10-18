<script setup lang="ts">
import PDF from "pdf-vue3";
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { onMounted, ref } from "vue";
import { ElButton, ElMessage } from "element-plus";
import { ArrowLeft } from "@element-plus/icons-vue";
import router from "@/router";
import { getUserBalanceAPI, activityActiveAPI } from '@/api/userbalance'

const flag = ref(false);
const time = ref(3);
const balanceInfo = ref({})

const getUserBalance = async () => {
    const res = await getUserBalanceAPI();
    if (res) {
        balanceInfo.value = res
    }
}

onMounted(() => {
    getUserBalance()
    const timeEnd = setInterval(async () => {
        time.value--;
        if (time.value == 0) {
            ElMessage.success("时间到，获得积分！")
            const newBalance = balanceInfo.value.balance + 10
            activityActiveAPI(balanceInfo.value.id, newBalance)
            clearInterval(timeEnd)
        }
    }, 1000)
})
</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-between items-center m-2 p-2">
            <ElButton :icon="ArrowLeft" type="primary" class="" @click="router.back">返回</ElButton>
            <h1 class="text-2xl font-bold mx-4">记念刘和珍君</h1>
            <div class="font-bold">剩余时间：{{ time }}秒</div>
        </div>
        <ElButton @click="flag = !flag" type="primary" class="m-2 p-2">切换</ElButton>
        <div>

        </div>
        <div v-if=flag>
            <h1 class="text-2xl font-bold mb-4 text-gray-500">文章详情</h1>
            <PDF src="http://localhost:3000/public/pdf/test.pdf" />
        </div>
        <div v-else>
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-2xl font-bold mb-4 text-gray-500">视频详情</h1>
                <video-player src="http://localhost:3000/public/video/test.mp4"
                    poster="http://localhost:3000/public/images/dolbybaner.png" :controls="true" :autoplay="true"
                    :loop="true" :volume="0.6" class="m-2 p-2 w-full h-96" />
            </div>
        </div>
    </div>
</template>