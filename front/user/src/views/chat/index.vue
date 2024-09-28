<script lang="ts" setup>
import {getRoomListAPI} from '@/api/chat'
import { onMounted, ref } from 'vue';
const roomList = ref([])

const getRoomList = async ()=>{
    const res = await getRoomListAPI()
    roomList.value = res
}

onMounted(()=>{
    getRoomList()
})
</script>
<template>
    <div class="flex flex-col m-2 p-2">
        <div class="text-2xl font-bold mb-2">聊天室列表</div>
        <div v-for="item in roomList" :key="item.id" class="w-full bg-transblue p-2 border border-gray-300 rounded-md mb-2 cursor-pointer hover:bg-transpink" @click="$router.push(`/chat/${item.id}`)">
            {{item.name}}
        </div>
    </div>
</template>