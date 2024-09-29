<script setup lang="ts">
import { io } from "socket.io-client";

const socket = io('http://localhost:3001/order')
socket.on("haveNewOder", () => { })


const haveNewOder = async () => {
    socket.emit("haveNewOder", {
        message: "您有新的订单，请及时处理"
    })
    console.log('下单了')
}
</script>

<template>
    <div class="flex flex-col">
        <div>购物车页面</div>
        <ElButton @click="haveNewOder">下单测试按钮</ElButton>
    </div>

</template>