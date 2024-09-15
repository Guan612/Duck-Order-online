<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';
import { io } from "socket.io-client";

const location = ref('');
const mapLink = ref({
    href: '',
    textContent: ''
});

const status = ref('');

const socket = io('http://localhost:3001/delivery');

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('delivery', (position) => {
    console.log('Message from server:', position);
    location.value = position;
});


function geoFindMe() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.value = "";
        mapLink.value.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.value.textContent = `纬度：${latitude} °，经度：${longitude} °`;

        socket.emit('delivery', { latitude, longitude });
    }

    function error() {
        status.value = "无法获取你的位置";
    }

    if (!navigator.geolocation) {
        status.value = "你的浏览器不支持地理位置";
    } else {
        status.value = "定位中……";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function compareLocation(a, b) {
    return a.latitude === b.latitude && a.longitude === b.longitude;
}

onUnmounted(() => {
    geoFindMe();
});
</script>

<template>
    <div>
        <button @click="geoFindMe">获取位置</button>
        <p>{{ status }}</p>
        <a :href="mapLink.href" target="_blank">{{ mapLink.textContent }}</a>
    </div>
    <div>
        <h1>这是服务器返回的骑手定位</h1>
        <p>纬度：{{ location.latitude }} °，经度：{{ location.longitude }} °</p>

        <h5>
            <div v-if="compareLocation(status, location)">骑手到达</div>
            <div v-else>骑手未到达</div>
        </h5>
    </div>
</template>