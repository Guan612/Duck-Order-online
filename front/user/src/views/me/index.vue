<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserBalanceAPI,activityActiveAPI } from '@/api/userbalance';
import { ElMessage } from 'element-plus';

const balanceInfo = ref({});
const getBalance = async () => {
    const res = await getUserBalanceAPI();
    if (res) {
        balanceInfo.value = res
    }
}

const activity = ref(0);
const activityState = ref('未签到');
const activityChange = async (balanceInfo)=>{
    activity.value += 1;
    if(activity.value%2 == 0){
        ref.value = 0;
        ElMessage.error('未签到')
        activityState.value = '未签到'
    } else { 
        const res =  await activityActiveAPI(balanceInfo.id,balanceInfo.balance+100)
        if(res){
            ElMessage.success('签到成功')
            activityState.value = '已签到'
        }
    }
}

onMounted(()=>{
    getBalance();
})
</script>

<template>
    <div class="flex flex-col h-screen">
        <h1 class="text-2xl font-bold text-center m-2 p-2">个人中心</h1>
        <div>
            <div class="">我的订单</div>
            <div class="">我的余额{{balanceInfo.balance}}</div>
            <div>
                <el-button type="primary" @click="activityChange(balanceInfo)">{{activityState}}</el-button>
            </div>
        </div>
    </div>
</template>