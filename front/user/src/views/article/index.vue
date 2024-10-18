<script setup lang="ts">
import articleDetail from './component/articleDetail.vue';
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl text-center font-bold mb-4">文章</h1>
    <div class="flex flex-col">
      <div @click="$router.push('/article/1')" class="m-2">文章1</div>
    </div>
  </div>
</template>