<template>
    <div
        class="bg-gradient-to-r from-transblue to-transpink rounded-lg fixed bottom-0 w-full shadow-md p-4 flex justify-around items-center md:hidden h-16">
        <div class="button-bar" @click="$router.push(`/`)">
            <House />
            <span>首页</span>
        </div>
        <div class="button-bar" @click="$router.push(`/menu/`)">
            <ForkSpoon />
            <span>点餐</span>
        </div>
        <div class="button-bar" @click="$router.push(`/cart/`)">
            <ShoppingCart />
            <span>订单</span>
        </div>
        <div class="button-bar" @click="$router.push(`/me/`)">
            <User />
            <span>我的</span>
        </div>
    </div>
</template>

<style scoped>
/* 可以根据需求调整底部导航的样式 */
.button-bar {
    @apply flex flex-col items-center hover:scale-110 transition-transform duration-300;
}
</style>