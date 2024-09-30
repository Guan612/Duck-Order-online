<script setup lang="ts">
import { getUserCartListAIP } from '@/api/cart'
import useScoket from '@/api/socket';
import { computed, onMounted, ref } from 'vue';

const socket = useScoket('order')
socket.on("haveNewOder", () => { })

const userCartList = ref([])
const orderInfo = ref({
    isSelect:false
})

const getUserCartList = async () => {
    const res = await getUserCartListAIP()
    console.log(res)
    userCartList.value = res
}


const haveNewOder = async (orderInfo) => {
    console.log(orderInfo.value)
    socket.emit("haveNewOder", {
        message: "您有新的订单，请及时处理"
    })
    console.log('下单了')
}

const removeItem = (id: number) => {
    console.log('remove')
}

const itemTotalPrices = (price: number, quantiy: number) => {
    return price * quantiy
}

const totalPrice = (userCartList) => {
    const priceArry = userCartList.map((item) => {
        return item.price * item.quantiy
    })

    return eval(priceArry.join('+'))
}

onMounted(() => {
    getUserCartList()
})
</script>

<template>
    <div class="flex flex-col">
        <el-form v-model="orderInfo" class="flex flex-col m-2 p-2" v-if="userCartList && userCartList.length">
            <div v-for="(item, index) in userCartList" :key="item.id" 
                class="flex flex-col justify-between border-b mb-2 pb-2">
                <div class="flex flex-row justify-between items-center font-bold">
                    <div>
                        <el-radio :value="orderInfo.isSelect"></el-radio>
                    </div>
                    <div>商品名字：{{ item.name }}</div>
                    <div class="">单价：￥{{ item.price }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="felx flex-row">
                        <span class="flex" @click="item.quantiy++">+</span>
                        <span class="flex">数量: {{ item.quantiy }}</span>
                        <span class="flex" @click="item.quantiy--">-</span>
                    </div>

                    <span>总价：{{ itemTotalPrices(item.price, item.quantiy) }}</span>
                    <ElButton @click="removeItem(item.id)" type="danger" size="mini">删除</ElButton>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="font-bold text-2xl text-red-300 flex justify-end">总价：￥{{ totalPrice(userCartList) }}</div>
                <ElButton @click="haveNewOder" class="max-w-28">下单测试按钮</ElButton>
            </div>

        </el-form>
        <div class="font-bold text-center items-center text-2xl p-2 m-2" v-else>购物车还没有商品哦</div>

    </div>

</template>