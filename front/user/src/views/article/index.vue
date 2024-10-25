<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getArticleListAPI } from '@/api/article';
import { articleType } from '@/dto/articleDto';
import { ElButton } from 'element-plus';
const articleList = ref([]);

const getArticleList = async () => {
  const res = await getArticleListAPI();
  articleList.value = res
}

const getArticleType = (value: number) => {
  return articleType[value] || "未知类型";
}

onMounted(() => {
  getArticleList()
})
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl text-center font-bold mb-4 justify-center">文章列表</h1>
    <div class="flex flex-row justify-between bg-transblue m-2 rounded-xl" v-for="article in articleList"
      :key="article.id">
      <div class="m-2  items-center justify-center">
        <div class="text-xl font-bold m-2 items-center">{{ article.title }}</div>
        <div class="text-sm m-2">{{ getArticleType(article.ArticledType) }}</div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <ElButton type="primary" class="m-2" @click="$router.push(`/article/${article.id}`)">查看详情</ElButton>
      </div>
    </div>
  </div>
</template>