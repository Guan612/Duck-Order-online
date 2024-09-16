<script setup lang="ts">
import { ref } from 'vue';
import { io } from "socket.io-client";

const socket = io('http://localhost:3001/chat');
const msg = ref({
    clientId: '',
    message: ''
});
const messages = ref([]);  // 存储所有消息
const clientId:string = ref('');   // 当前客户端 ID

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    clientId.value = socket.id;  // 获取客户端 ID
});

socket.on('chat', (msg) => {
    console.log('Message from server:', msg);
    messages.value.push(msg);  // 存储接收到的消息
});

const sendMessage = () => {
    if (msg.value.message.trim() !== '') {
        socket.emit('chat', {
            clientId: clientId.value,  // 发送当前客户端 ID
            message: msg.value.message // 发送消息
        });
        console.log('Message sent:', clientId);
        msg.value.message = '';  // 清空输入框
    }
};
</script>
<template>
    <input type="text" v-model="msg.message" />
    <button @click="sendMessage">Send</button>
    <div :class="msg.clientId === clientId ? 'bg-transblue' : 'bg-transpink'" v-for="message in messages">
        {{ message }}
    </div>
</template>