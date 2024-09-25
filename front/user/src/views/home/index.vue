<script setup lang="ts">
import { onMounted, ref } from 'vue';
import foodcard from './component/foodcard.vue';

const bannerItems = ref([
    {
        id: 1,
        imgUrl: "https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
        title: '世界永不复返'
    },
    {
        id: 2,
        imgUrl: "https://image.tmdb.org/t/p/original/AujAUbaU1pawmo4oCTRgUoLU6s0.jpg",
        title: '给新的情感留出空间'
    },
    {
        id: 3,
        imgUrl: "https://image.tmdb.org/t/p/original/75nSb1fbWooipwcSU5bUttiOriI.jpg",
        title: '于死亡之所终、生命方启新程'
    },
    {
        id: 4,
        imgUrl: "https://image.tmdb.org/t/p/original/jtSCugyOC4gtKqVXK3WaaxRNzqZ.jpg",
        title: '永远不要低估祖母对家人的爱'
    },
    {
        id: 5,
        imgUrl: "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
        title: '每个人都说这是蜘蛛侠注定的命运,但我要找到属于自己的路'
    }
]);
</script>

<template>
    <div class="flex flex-col">
        <div class="flex-grow">
            <div class="flex flex-col items-center justify-center p-4">
                <h1 class="text-4xl font-bold text-center">欢迎来到Duck Order</h1>
                <p class="text-lg text-center">在这里，您可以轻松地订购您喜欢的美食。</p>
            </div>
        </div>
        <div class="flex-grow w-full max-w-4xl mx-auto">
            <el-carousel :interval="4000" type="card" class="w-full">
                <el-carousel-item v-for="item in bannerItems" :key="item.id"
                    class="flex flex-col text-center item-center">
                    <el-image :src="item.imgUrl" fit="cover" class="rounded-lg shadow-2xl" />
                    <h3 justify="center" class="text-xl font-bold">{{ item.title }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div
            class="items-center justify-center grid grid-cols-6 md:grid-cols-10 xl:grid-cols-12 max-w-7xl mx-auto bg-transpink rounded-lg shadow-lg m-5">
            <div class="gongnen-item">
                <Film />
                <span>电影</span>
            </div>
            <div class="gongnen-item">
                <Ticket />
                <span>票务</span>
            </div>
            <div class="gongnen-item">
                <Promotion />
                <span>出行</span>
            </div>
            <div class="gongnen-item">
                <Guide />
                <span>景点</span>
            </div>
            <div class="gongnen-item">
                <Coffee />
                <span>咖啡</span>
            </div>
            <div class="gongnen-item">
                <ForkSpoon />
                <span>餐饮</span>
            </div>
        </div>
        <div class="items-center justify-center grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 max-w-7xl mx-auto m-2">
            <foodcard v-for="card in 10" />
        </div>
    </div>
</template>
<style scoped>
.gongnen-item {
    @apply flex flex-col items-center justify-center p-4 hover:scale-110 transition-transform duration-300;
}
</style>