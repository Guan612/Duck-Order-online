<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
    {
        value: -1,
        label: '全部',
    },
    {
        value: 0,
        label: '热菜',
    },
    {
        value: 1,
        label: '凉菜',
    },
    {
        value: 2,
        label: '主食',
    },
    {
        value: 3,
        label: '汤',
    },
    {
        value: 4,
        label: '饮品',
    },
    {
        value: 5,
        label: '小吃',
    }

]
</script>

<template>
    <div class="flex flex-col m-2">
        <div class="flex flex-row items-center justify-center">
            <div class="fount-semibold text-xl">菜品类型：</div>
            <el-select v-model="value" placeholder="选择菜品类型" size="large" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" size="large" class="mx-2">搜索</el-button>
        </div>
    </div>
</template>