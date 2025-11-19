<script lang="ts" setup>
import Menu from "@/page/layout/compoment/menu.vue"
const squareUrl = ""
</script>

<template>
    <div class="h-screen">
        <el-container class="h-full flex flex-col">
            <el-header class="flex items-center justify-between bg-blue-300">
                <div class="font-bold">管理后台</div>
                <div class="flex justify-center items-center">
                    <div class="mx-2 font-bold">超级管理员</div>
                    <el-avatar shape="square" :src="squareUrl" />
                </div>
            </el-header>
            <el-container class="grow">
                <el-aside class="!w-36">
                    <Menu></Menu>
                </el-aside>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>