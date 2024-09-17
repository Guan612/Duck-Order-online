<script setup>
import { id } from 'element-plus/es/locales.mjs';
import { ref } from 'vue';

const bannerItems = ref([{
    id: '',
    imgUrl: "",
    title: ''
}]);
bannerItems.value = [
    {
        id: 1,
        imgUrl: "https://p2.bahamut.com.tw/B/2KU/42/3b771ae5a9d98c04a1923ae0101l37a5.JPG",
        title: '异世相遇，尽享美味'
    },
    {
        id: 2,
        imgurl: "../assets/img/bentiebishenke.jpg",
        title: '願此行，終抵群星'
    },
    {
        id: 3,
        imgUrl: "https://p2.bahamut.com.tw/B/2KU/42/3b771ae5a9d98c04a1923ae0101l37a5.JPG",
        title: '异世相遇，尽享美味'
    },
    {
        id: 4,
        imgurl: "https://hngameguide.com/wp-content/uploads/2024/06/%E6%98%9F%E7%A9%B9%E9%90%B5%E9%81%93-%E9%9B%B2%E7%92%83-%E8%A7%92%E8%89%B2%E7%AB%8B%E7%B9%AA.jpg",
        title: '願此行，終抵群星'
    }
]
</script>
<template>
    <div class="flex flex-col">
        <div>
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="item in bannerItems" :key="item.id" class="flex flex-col text-center">
                    <el-image :src=item.imgUrl lazy />
                    <h3 justify="center" class="text-xl font-bold" >{{ item.title }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>