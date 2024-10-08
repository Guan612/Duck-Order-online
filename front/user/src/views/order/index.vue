<script lang="ts">
import { ref } from 'vue';
import { createOrderAPI } from '@/api/order'
import useScoket from '@/api/socket';

const userCartList = ref([]);
const socket = useScoket('order')

socket.on("haveNewOder", () => { })
const haveNewOder = async () => {
    const selectedItems = userCartList.value.filter((item) => item.isSelect === 1);
    await createOrderAPI()
    socket.emit("haveNewOder", {
        message: "您有新的订单，请及时处理",
        orderInfo: selectedItems
    })
}
</script>

<template>
    <div>下单页面</div>
</template>
