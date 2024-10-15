<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserBalanceAPI } from '@/api/userbalance';

const balance = ref(0);
const getBalance = async () => {
    const res = await getUserBalanceAPI();
    if (res) {
        balance.value = res.balance
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
            <div class="">我的余额{{balance}}</div>
        </div>
    </div>
</template>