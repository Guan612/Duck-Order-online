<script setup lang="ts">
import { getUserCartListAIP } from '@/api/cart'
import { io } from "socket.io-client";
import { computed, onMounted, ref } from 'vue';

const socket = io('http://localhost:3001/order')
socket.on("haveNewOder", () => { })

const userCartList = ref([])
const cartInfo = ref([])

const getUserCartList = async () => {
    const res = await getUserCartListAIP()
    console.log(res)
    userCartList.value = res
}


const haveNewOder = async () => {
    socket.emit("haveNewOder", {
        message: "您有新的订单，请及时处理"
    })
    console.log('下单了')
}

const removeItem = (id:number)=>{
  console.log('remove')
}

onMounted(() => {
    getUserCartList()
})
</script>

<template>
    <div class="flex flex-col">
        <el-form v-model="cartInfo" class="flex flex-col m-2 p-2" v-if="userCartList && userCartList.length">
            <div v-for="(item) in userCartList" :key="item.id"
                class="flex flex-col justify-between border-b mb-2 pb-2">
                <div class="flex flex-row justify-between items-center font-bold">
                    <el-form-item>
                        <el-radio :value="item.name"></el-radio>
                    </el-form-item>
                    <div>{{ item.name }}</div>
                    <div class="font-bold text-red-300">单价：￥{{ item.price }}</div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="felx flex-row">
                      <div @click="item.quantiy++">+</div>
                      <div>数量: {{ item.quantiy }}</div>
                      <div @click="item.quantiy--">-</div>
                    </div>
                    
                    <span>总价：{{item.price*item.quantiy}}</span>
                    <ElButton @click="removeItem(item.id)" type="danger" size="mini">删除</ElButton>
                </div>
            </div>
            <div>总价：{{userCartList.map((item)=>{
              return item.price*item.quantiy
            })}}</div>
            <ElButton @click="haveNewOrder">下单测试按钮</ElButton>
        </el-form>
        <div class="font-bold text-center items-center text-2xl p-2 m-2" v-else>购物车还没有商品哦</div>

    </div>

</template>