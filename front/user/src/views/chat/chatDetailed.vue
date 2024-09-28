<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { io } from "socket.io-client";
import { ElButton, ElMessage } from 'element-plus';
import {useUserStore} from '@/stores/userstore'

const userStore = useUserStore()

const socket = io('http://localhost:3001/chat');
const msg = ref({
    //clientId: '',
    message: ''
});
const messages = ref([]);  // 存储所有消息
const clientId = ref('')  // 当前客户端 ID

socket.on('connectChat', () => {
    console.log('Connected to WebSocket server   '+clientId);
    msg.value.clientId = clientId;  // 获取客户端 ID
});

socket.on('chat', (msg) => {
    messages.value.push(msg);  // 存储接收到的消息
});

socket.on('chatTest', (msg) => {
    console.log(msg)  // 存储接收到的消息
})

const sendMessage = () => {
    if (msg.value.message.trim() !== '') {
        socket.emit('chat', {
            //clientId: clientId.value,  // 发送当前客户端 ID
            message: msg.value // 发送消息
        });
        console.log('Message sent:', clientId);
        msg.value.message = '';  // 清空输入框
    }
};

const chatTest = (userId) => {
    socket.emit('chatTest', {
        userId: userId, message: 'hello'
    });
    console.log('Message sent:', clientId);
}

onMounted(() => {
    socket.on('connectChat', (msg) => {
        ElMessage.success('连接成功')
        console.log('Connected to WebSocket server', msg)
    })
    socket.emit('connectChat', 1)
})
</script>
<template>
    <div class="flex flex-col h-screen">
        <div class="flex flex-row justify-between h-1/8 p-4 bg-slate-400">
            <div>小明</div>
            <ElButton type="danger" @click="chatTest(2)">测试</ElButton>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
            <div v-for="item in messages" :key="1" class="flex m-2 flex-row items-start">
                <el-avatar src="http://localhost:3000/public/images/jialin.jpg" />
                <div class="m-2 p-2 bg-transblue rounded-lg max-w-80">{{ item.message }}</div>
            </div>
        </div>
        <div class="flex flex-col bg-slate-400 h-1/6">
            <div class="">

            </div>
            <div class="flex flex-row items-center justify-center">
                <el-input v-model="msg.message" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="sendMessage">发送</el-button>
            </div>

        </div>
    </div>
</template>