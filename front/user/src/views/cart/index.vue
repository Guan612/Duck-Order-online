<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import { getUserCartListAIP } from '@/api/cart'
import { addOrderListAPI, createOrderAPI } from '@/api/order'
import { cartList } from '@/dto/cartDto';
import { computed, onMounted, ref } from 'vue';
import router from '@/router';

const userCartList = ref([]);
const allSelected = ref(false)

const getUserCartList = async () => {
    const res = await getUserCartListAIP()
    userCartList.value = res
}

const itemTotalPrices = (price: number, quantiy: number) => {
    return price * quantiy
}

const totalPrice = (userCartList: cartList[]) => {
    const priceArry = userCartList.map((item) => {
        return item.price * item.quantity
    })

    return eval(priceArry.join('+'))
}

const selectAll = () => {
    userCartList.value.forEach((item: cartList) => {
        item.isSelect = allSelected.value ? 1 : 0
    })
}

const removeAllSelected = () => {
    userCartList.value = userCartList.value.filter((item: cartList) => {
        return item.isSelect !== 1
    })
}

const getIsSelected = (item: cartList) => {
    return computed({
        get() {
            return item.isSelect === 1;  // 将 1 转换为 true
        },
        set(value) {
            item.isSelect = value ? 1 : 0;  // 将 true 转换为 1，false 转换为 0
        }
    });
};

const goOder = async () => {
    const selectedItems = userCartList.value.filter((item) => item.isSelect === 1);
    const res = await createOrderAPI()
    if (res) {
        const orderId = res.id
        const listres = await addOrderListAPI(orderId, selectedItems)
        if (listres) {
            router.push(`/order/${orderId}`)
        }
    }
}

onMounted(() => {
    getUserCartList()
})
</script>

<template>
    <div class="flex flex-col h-screen" v-if="userCartList && userCartList.length">
        <div class="flex flex-row m-2 items-center justify-between">
            <el-checkbox v-model="allSelected" @change="selectAll" class="p-2">
                <div class="text-xl font-bold">全选</div>
            </el-checkbox>
            <ElButton @click="removeAllSelected" type="danger" size="mini" class="max-w-28 m-1">删除选中</ElButton>
        </div>
        <!-- 可滚动的购物车列表 -->
        <div class="flex-grow overflow-y-auto m-2 p-2">
            <div v-for="(item, index) in userCartList" :key="item.id"
                class="flex flex-col justify-between border-b mb-3 pb-2 min-h-28">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row items-center font-bold">
                        <el-checkbox v-model="getIsSelected(item).value"></el-checkbox>
                        <div class="ml-1">{{ item.name }}</div>
                    </div>
                    <div class="">单价：￥{{ item.price }}</div>
                </div>
                <div class="flex flex-row justify-between items-center">
                    <div class="felx flex-row">
                        <el-input v-model="item.quantity" type="number" min="1" style="max-width: 150px"
                            placeholder="数量">
                            <template #prepend>
                                <el-button :icon="Minus" @click="item.quantity--" :disabled="item.quantity <= 1" />
                            </template>
                            <template #append>
                                <el-button :icon="Plus" @click="item.quantity++" />
                            </template>
                        </el-input>
                    </div>
                    <span class="font-bold text-red-300">总价：￥{{ itemTotalPrices(item.price, item.quantity) }}</span>
                </div>
            </div>
        </div>

        <!-- 固定在底部的总价和按钮 -->
        <div class="sticky bottom-0 bg-white p-4 border-t flex flex-col">
            <div class="font-bold text-2xl text-red-300 flex justify-end">总价：￥{{ totalPrice(userCartList) }}</div>
            <div class="flex justify-end mt-2">
                <ElButton @click="goOder" type="primary" class="max-w-28">去下单</ElButton>
            </div>
        </div>
    </div>
    <div class="font-bold text-center items-center text-2xl p-2 m-2" v-else>购物车还没有商品哦</div>
</template>