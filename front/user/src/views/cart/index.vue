<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import { getUserCartListAIP } from '@/api/cart'
import useScoket from '@/api/socket';
import { computed, onMounted, ref } from 'vue';

const socket = useScoket('order')
socket.on("haveNewOder", () => { })

const allSelected = ref(false)

const userCartList = ref([])
const orderInfo = ref({
    isSelect: false
})

const getUserCartList = async () => {
    const res = await getUserCartListAIP()
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

const selectAll = () => {
    userCartList.value.forEach((item) => {
        item.isSelect = allSelected.value ? 1 : 0
    })
}

const getIsSelected = (item) => {
    return computed({
        get() {
            return item.isSelect === 1;  // 将 1 转换为 true
        },
        set(value) {
            item.isSelect = value ? 1 : 0;  // 将 true 转换为 1，false 转换为 0
        }
    });
};

onMounted(() => {
    getUserCartList()
})
</script>


<template>
    <div class="flex flex-col h-screen" v-if="userCartList && userCartList.length">
        <!-- 可滚动的购物车列表 -->
        <el-form v-model="orderInfo" class="flex-grow overflow-y-auto m-2 p-2">
            <div v-for="(item, index) in userCartList" :key="item.id"
                class="flex flex-col justify-between border-b mb-3 pb-2">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row items-center font-bold">
                        <el-checkbox v-model="getIsSelected(item).value"></el-checkbox>
                        <div class="ml-1">{{ item.name }}</div>
                    </div>
                    <div class="">单价：￥{{ item.price }}</div>
                </div>
                <div class="flex flex-row justify-between items-center">
                    <div class="felx flex-row">
                        <el-input v-model="item.quantiy" type="number" min="1" style="max-width: 150px"
                            placeholder="数量">
                            <template #prepend>
                                <el-button :icon="Minus" @click="item.quantiy--" :disabled="item.quantiy <= 1" />
                            </template>
                            <template #append>
                                <el-button :icon="Plus" @click="item.quantiy++" />
                            </template>
                        </el-input>
                    </div>

                    <span class="font-bold text-red-300">总价：￥{{ itemTotalPrices(item.price, item.quantiy) }}</span>
                    <ElButton @click="removeItem(item.id)" type="danger" size="mini">删除</ElButton>
                </div>
            </div>
        </el-form>

        <!-- 固定在底部的总价和按钮 -->
        <div class="sticky bottom-0 bg-white p-4 border-t flex flex-col">
            <div class="flex flex-row justify-between items-center">
                <el-checkbox v-model="allSelected" @change="selectAll">全选</el-checkbox>
            </div>
            <div class="font-bold text-2xl text-red-300 flex justify-end">总价：￥{{ totalPrice(userCartList) }}</div>
            <ElButton @click="haveNewOder" class="max-w-28">下单测试按钮</ElButton>
        </div>
    </div>
    <div class="font-bold text-center items-center text-2xl p-2 m-2" v-else>购物车还没有商品哦</div>
</template>