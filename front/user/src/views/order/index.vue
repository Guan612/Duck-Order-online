<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { createOrderAPI, getOrderDetaiLListAPI, updateOrderAPI, getOrderTotalPriceAPI } from '@/api/order'
import useScoket from '@/api/socket';

const orderList = ref([]);
const socket = useScoket('order');
const route = useRoute();
const orderDialogVisible = ref(false);
const orderTotalPrice = ref(0);

socket.on("haveNewOder", () => { })
socket.on("payOrder", () => { })
socket.on("exitPayment", () => { })


const haveNewOder = async () => {
    socket.emit("haveNewOder", {
        message: "您有新的订单，请及时处理",
        orderList: orderList.value
    })
    await updateOrderAPI(route.params.id, { orderStatus: 2, })
    orderDialogVisible.value = false
}

const payOrder = async () => {
    socket.emit("payOrder", {
        message: "用户正在支付",
        //orderId: route.params.id
    })
    const res = await getOrderTotalPriceAPI(route.params.id)
    orderTotalPrice.value = res
    orderDialogVisible.value = true
}

const exitPayment = async () => {
    socket.emit("exitPayment", {
        message: "用户取消支付",
        //orderId: route.params.id
    })
    await updateOrderAPI(route.params.id, { orderStatus: 1 })
    orderDialogVisible.value = false
}

const getOrderList = async (orderId) => {
    const res = await getOrderDetaiLListAPI(orderId)
    orderList.value = res
}

onMounted(() => {
    getOrderList(route.params.id)
})
</script>

<template>
    <div class="flex flex-col m-2 h-screen">
        <div class="flex justify-center items-center text-2xl font-bold mb-4">订单确认</div>
        <div class="flex-grow overflow-y-auto m-1 p-2">
            <div v-for="item in orderList" :key="item.id"
                class="flex flex-row justify-between items-center m-1 p-2 rounded-lg bg-slate-200">
                <div>
                    <div class="font-bold mx-1">{{ item.name }}</div>
                    <div class="mx-1">{{ item.quantity }}份</div>
                </div>

                <div class="font-bold mx-1 text-red-300">{{ item.price * item.quantity }}元</div>
            </div>
        </div>
        <div class="sticky bottom-0 bg-white p-4 border-t flex flex-col">
            <div class="flex justify-end">
                <el-button type="danger" @click="$router.back()">取消</el-button>
                <el-button type="primary" @click="payOrder">确认</el-button>
            </div>
        </div>
        <el-dialog v-model="orderDialogVisible" title="支付" width="500">
            <div>
                <div class="font-bold text-red-300">请您确认付款金额￥{{orderTotalPrice}}</div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="exitPayment">取消支付</el-button>
                    <el-button type="primary" @click="haveNewOder">
                        支付完成
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>