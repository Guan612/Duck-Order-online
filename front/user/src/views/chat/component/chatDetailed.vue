<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { io } from "socket.io-client";
import { ElButton, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { getRoomByIdAPI } from '@/api/chat';
import router from '@/router';

const route = useRoute();
const socket = io('http://localhost:3001/chat');
const msg = ref({
    //clientId: '',
    message: ''
});
const messages = ref([]);  // 存储所有消息
const clientId = ref('')  // 当前客户端 ID

const roomName = ref('')

socket.on('connectChat', () => {
    console.log('Connected to WebSocket server   '+clientId);
    msg.value.clientId = clientId;  // 获取客户端 ID
});

socket.on('onChat', (msg) => {
    messages.value.push(msg);  // 存储接收到的消息
});

socket.on('disconnectChat', (msg) => {
    console.log
})

const disconnect = () =>{
    const res =  socket.emit('disconnectChat', {
        
    })
    console.log(res)
    ElMessage.success('断开连接')
    //router.push('/chat')
}

socket.on('chatTest', (msg) => {
    console.log(msg)  // 存储接收到的消息
})

const sendMessage = () => {
    if (msg.value.message.trim() !== '') {
        socket.emit('onChat', {
            //这里的逻辑重写
        });
        msg.value.message = '';  // 清空输入框
    }
};

const getRoomById = async (id) => {
    const res = await getRoomByIdAPI(id);
    roomName.value = res.name
}

const chatTest = (userId) => {
    socket.emit('chatTest', {
        userId: userId, message: 'hello'
    });
    console.log('Message sent:', clientId);
}

onMounted(() => {
    getRoomById(route.params.id)

    socket.on('connectChat', (msg) => {
        ElMessage.success('连接成功')
        console.log('Connected to WebSocket server', msg)
    })
    socket.emit('connectChat')
})
</script>
<template>
    <div class="flex flex-col h-screen">
        <div class="flex flex-row justify-between h-1/8 p-4 bg-blue-300">
            <div class="font-bold">{{roomName}}</div>
            <ElButton type="danger" @click="disconnect">断开连接</ElButton>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
            <div v-for="item in messages" :key="1" class="flex m-2 flex-row items-start">
                <el-avatar src="http://localhost:3000/public/images/jialin.jpg" />
                <div class="m-2 p-2 bg-transblue rounded-lg max-w-80">{{ item.message }}</div>
            </div>
        </div>
        <div class="flex flex-col bg-blue-300 h-1/6">
            <div class="">

            </div>
            <div class="flex flex-row items-center justify-center">
                <el-input v-model="msg.message" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="sendMessage">发送</el-button>
            </div>

        </div>
    </div>
</template>