<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MenuCard from './componment/menuCard.vue';
import { getMenuListAPI, searchMenuAPI, searchMenuByTypeAPI } from '@/api/menu'
import type { menu } from "@/dto/menuDto"
import { ElMessage } from 'element-plus';

const searchMenu = ref('')
const selectMenuType = ref([])

const menuList = ref<menu[]>([])

const getMenuList = async () => {
    const res = await getMenuListAPI()
    menuList.value = res
}

const searchMenuList = async (value: string) => {
    if (value === '') {
        getMenuList()
        return
    }
    const res = await searchMenuAPI(value)
    if (res.length === 0) {
        ElMessage.error('未找到相关菜品')
        return
    }
    ElMessage.success('搜索成功')
    menuList.value = res
    //searchMenu.value = ''
}

const searchMenuType = async (value: number[]) => {
    if (value.length === 0) {
        getMenuList();
        return;
    }
    const res = await searchMenuByTypeAPI(value);
    ElMessage.success('筛选成功')
    menuList.value = res;
}

onMounted(() => {
    getMenuList()
})

const options = [
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
        <div class="flex flex-row items-center justify-between mb-2">
            <div class="flex w-1/3 mx-3">
                <el-select v-model="selectMenuType" @change="searchMenuType(selectMenuType)" placeholder="选择菜品类型"
                    size="large" multiple>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>

            <div class="flex w-1/3">
                <el-input v-model="searchMenu" placeholder="请输入菜名以搜索">

                </el-input>
                <el-button type="primary" size="large" class="mx-2" @click="searchMenuList(searchMenu)">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>搜索</span>
                </el-button>
            </div>
        </div>
        <div class="items-center justify-center grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 max-w-7xl mx-auto m-2">
            <MenuCard v-for="item in menuList" key="item.id" :foodName="item.name" :cardUrl="item.pictureUrl"
                :foodPrice="item.price" :foodType="item.type" :foodId="item.id"
                @click="$router.push(`/menu/${item.id}`)" />
        </div>
    </div>
</template>