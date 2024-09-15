<script setup>
import { ref } from 'vue';
import { io } from "socket.io-client";

const socket = io('http://localhost:3001/chat');
const msg = ref('');
const messages = ref([]);
socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('chat', (msg) => {
    console.log('Message from server:', msg);
    messages.value.push(msg);
});

const sendMessage = () => {
    if (msg.value.trim() !== '') {
        socket.emit('chat', msg.value); // 发送输入框中的消息
        console.log('Message sent:', msg.value);
        msg.value = ''; // 清空输入框
    }
}

</script>

<template>
    <input type="text" v-model="msg" />
    <button @click="sendMessage">Send</button>
    <div class="" v-for="message in messages" :key="message.id">
        {{ message }}
    </div>
</template>