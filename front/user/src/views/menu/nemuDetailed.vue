<script setup lang="ts">
import { getMenuByIdAPI } from '@/api/menu';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const detalParamValue = route.params.id

const menuDetailed = ref({})

const getDetaled = async (detalParamValue: string) => {
    const res = await getMenuByIdAPI(detalParamValue)
    menuDetailed.value = res
}

onMounted(() => {
    if (detalParamValue) { // 检查参数是否存在
        getDetaled(detalParamValue);
    }
})

</script>

<template>
<div>详情信息{{menuDetailed.name}}</div>
</template>

<style scoped></style>