<script setup lang="ts">
import articleDetail from './component/articleDetail.vue';
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl text-center font-bold mb-4 justify-center">文章列表</h1>
    <div class="flex flex-col">
      <div @click="$router.push('/article/1')" class="m-2 h-10 rounded-xl bg-transblue items-center justify-center">
        <span class="text-xl font-bold">文章1</span>
      </div>
      <div @click="$router.push('/article/2')" class="m-2 h-10 rounded-xl bg-transblue items-center justify-center">
        <span class="text-xl font-bold">文章2</span>
      </div>
    </div>
  </div>
</template>