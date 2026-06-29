<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const categories = ref<any[]>([])
const goods = ref<any[]>([])

onMounted(async () => {
  const catRes = await api.categories.list()
  categories.value = catRes.data
  const goodsRes = await api.goods.list()
  goods.value = goodsRes.data
})
</script>

<template>
  <section>
    <h2>首页</h2>
    <p>校园轻集市，一站式校园生活服务平台。</p>

    <h3>分类</h3>
    <div class="category-list">
      <div v-for="cat in categories" :key="cat.id" class="category-item">
        <span class="cat-icon">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </div>
    </div>

    <h3>最新商品</h3>
    <div class="goods-list">
      <div v-for="item in goods" :key="item.id" class="goods-card">
        <h4>{{ item.title }}</h4>
        <p class="price">¥{{ item.price }}</p>
        <p class="meta">{{ item.category }} · {{ item.createTime }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 { margin-top: 24px; margin-bottom: 12px; }
.category-list { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.category-item {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 18px; background: #f0f5ff; border-radius: 8px;
  font-size: 14px;
}
.cat-icon { font-size: 20px; }
.goods-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.goods-card { border: 1px solid #eee; border-radius: 8px; padding: 16px; }
.goods-card h4 { margin: 0 0 8px; font-size: 15px; }
.price { color: #e74c3c; font-weight: bold; font-size: 18px; }
.meta { color: #999; font-size: 12px; }
</style>
