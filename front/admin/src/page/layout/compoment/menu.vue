<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

import { routes } from "@/router/index"
import { useRoute } from 'vue-router'

const menuList = routes.map((item) => { item.children })

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const route = useRoute()
</script>


<template>
    <div class="">
        <el-menu :default-active="route.path">
            <template v-for="index in routes" :key="index.path">
                <template v-if="index.path === '/' && index.children">
                    <router-link v-for="item in index.children" :key="item.path" :to="item.path"
                        class="no-underline font-bold text-center">
                        <el-menu-item :index="item.path">
                            <span>{{ item.name }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </template>
        </el-menu>
    </div>
</template>