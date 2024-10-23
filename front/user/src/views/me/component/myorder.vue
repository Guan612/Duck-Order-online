<script lang="ts" setup>
import { orderStatus } from '@/dto/orderDto';
import { getUserOrderListAPI } from '@/api/order'
import { onMounted, ref } from 'vue';
import { ElButton } from 'element-plus';

const myorderList = ref([]); // 存储订单列表
const dialogVisible = ref(false); // 控制对话框显示状态
const selectedOrderMenuList = ref([]); // 存储选中的订单的菜单列表

// 获取订单列表
const getMyOrderList = async () => {
    const res = await getUserOrderListAPI();
    myorderList.value = res;
}

// 获取订单状态
const getOrderStatus = (orderStatusValue: number) => {
    return orderStatus[orderStatusValue] || "未知状态";
};

// 点击详情按钮时，打开对话框并设置选中的订单菜单列表
const openDialog = (menuList) => {
    selectedOrderMenuList.value = menuList; // 将选中的订单菜单赋值
    dialogVisible.value = true; // 打开对话框
};

onMounted(() => {
    getMyOrderList(); // 初始化时获取订单列表
})
</script>

<template>
    <div class="flex flex-col h-full">
        <div class="flex flex-row items-center">
            <ElButton type="primary" class="m-2" round icon="ArrowLeft" @click="$router.push('/me')"></ElButton>
            <div class="text-2xl font-bold text-center m-2 p-2">我的订单</div>
        </div>

        <!-- 遍历订单列表 -->
        <div class="overflow-y-auto h-full">
            <div v-for="item in myorderList" :key="item.id"
                class="flex flex-row items-center justify-between m-2 p-2 bg-transblue rounded-lg">
                <div class="flex flex-col m-2">
                    <div>订单编号：{{ item.id }}</div>
                    <div :class="{ 'text-green-500': item.orderStatus === 1, 'text-red-600': item.orderStatus === 2 }">
                        订单状态：{{ getOrderStatus(item.orderStatus) }}</div>
                    <div>订单金额：{{ item.totalPrice }}元</div>
                </div>
                <div class="flex flex-col m-2">
                    <!-- 点击按钮时调用 openDialog 方法，并传递订单的菜单列表 -->
                    <ElButton type="primary" round @click="openDialog(item.menuList)">详情</ElButton>
                </div>
            </div>
        </div>


        <!-- 订单详情对话框 -->
        <el-dialog v-model="dialogVisible" title="订单详情">
            <div v-for="menuItem in selectedOrderMenuList" :key="menuItem.id"
                class="flex flex-row items-center bg-slate-200 rounded-lg justify-between m-2 p-2">
                <div class="flex flex-col m-1">
                    <div>{{ menuItem.name }}</div>
                    <div class="text-transpink">单价：{{ menuItem.price }}元</div>

                </div>
                <div class="">{{ menuItem.quantity }}份</div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">退出</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>