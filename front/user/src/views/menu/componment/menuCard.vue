<script setup>
import { ref } from 'vue';
import { menuType } from '@/dto/menuDto';


const props = defineProps({
    foodName: String,
    cardUrl: String,
    foodPrice: Number,
    foodType: Number,
    foodQuantity: Number
})

const getMenuType = (value) => {
    return menuType[value] || "未知食物";
}
</script>

<template>
    <div
        class="flex flex-col bg-gradient-to-r from-transblue to-transpink max-w-sm m-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out hover:scale-105">
        <div class="font-bold">{{ foodName }}</div>
        <el-image :src="cardUrl" class="m-1 rounded-lg"></el-image>
        <div class="text-base">
            <p class="text-md text-blod">￥{{ foodPrice }}</p>
            <p>类型: {{ getMenuType(foodType) }}</p>
        </div>
    </div>
</template>

<style scoped></style>