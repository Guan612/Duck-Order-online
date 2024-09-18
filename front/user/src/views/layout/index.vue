<script setup>
import headerBar from './component/headerBar.vue';
import sideBar from './component/sideBar.vue';
</script>
<template>
    <div class="flex flex-col h-screen">
        <headerBar></headerBar>
        <div class="flex flex-row overflow-hidden">
            <sideBar class="basis-1/6 hidden md:block"></sideBar>
            <div class="md:w-5/6 overflow-y-auto w-screen">
                <!-- 使用 overflow-y-auto 允许垂直滚动 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
