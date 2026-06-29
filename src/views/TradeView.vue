<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const goods = ref<any[]>([])

onMounted(async () => {
  const res = await api.goods.list()
  goods.value = res.data
})
</script>

<template>
  <section>
    <h2>二手交易</h2>
    <p>浏览和搜索校园二手商品。</p>

    <div class="list">
      <div v-for="item in goods" :key="item.id" class="card">
        <h4>{{ item.title }}</h4>
        <p class="price">¥{{ item.price }}</p>
        <p class="meta">{{ item.category }} · {{ item.createTime }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; }
.card h4 { margin: 0 0 8px; }
.price { color: #e74c3c; font-weight: bold; font-size: 18px; margin: 4px 0; }
.meta { color: #999; font-size: 12px; }
</style>
