<script setup>
import { ref } from 'vue';

const cardUrl = ref('')
cardUrl.value = 'https://image.tmdb.org/t/p/original/h446dxc86JRkhJYM8n13eqBjbGo.jpg'

const props = defineProps({
    foodName: String,
    cardUrl: String,
    foodPrice: Number,
    foodQuantity: Number
})
</script>

<template>
    <div
        class="bg-gradient-to-r from-transblue to-transpink max-w-sm m-2 p-2 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out hover:scale-105">
        <div class="font-bold">荒野机器人</div>
        <el-image :src="cardUrl" class="rounded-lg"></el-image>
        <div class="text-gray-700 text-base">
            <p>Price: $10</p>
            <p>Quantity: 10</p>
        </div>
    </div>
</template>

<style scoped></style>