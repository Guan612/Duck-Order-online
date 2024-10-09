<script setup lang="ts">
import { ref } from 'vue';
import { menuType } from '@/dto/menuDto';
import { ElButton, ElMessage } from 'element-plus';
import { addToCartAIP } from '@/api/cart';

const props = defineProps({
    foodId: Number,
    foodName: String,
    cardUrl: String,
    foodPrice: Number,
    foodType: Number,
    foodQuantity: Number,
    isSell: Number
})

const foodId = ref(props.foodId);

const getMenuType = (value: number) => {
    return menuType[value] || "未知食物";
}

const addToCart = async (menuId: number) => {
    const res = await addToCartAIP({ menuId: menuId })
    if (res) {
        ElMessage.success("添加到购物车成功")
    }
}

</script>

<template>
    <div
        class="flex flex-col min-w-40 min-h-64 bg-gradient-to-r from-transblue to-transpink max-w-sm m-2 p-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out hover:scale-105 relative">
        <div class="font-bold">{{ foodName }}</div>
        <el-image :src="cardUrl" class="m-1 rounded-lg"></el-image>
        <div class="flex flex-row text-base">
            <div class="flex flex-col m-2">
                <p class="text-md text-blod">￥{{ foodPrice }}</p>
                <p>类型: {{ getMenuType(foodType) }}</p>
            </div>
            <div class="absolute bottom-2 right-2">
                <ElButton type="primary" icon="plus" size="smaill" circle @click="addToCart(foodId)" :disabled="!isSell">
                </ElButton>
            </div>
        </div>
    </div>
</template>

<style scoped></style>