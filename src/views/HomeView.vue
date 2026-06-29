<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tradeApi } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { Trade } from '@/types'

const trades = ref<Trade[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await tradeApi.list()
  trades.value = res.data.slice(0, 4)
  loading.value = false
})
</script>

<template>
  <section>
    <h2>首页</h2>
    <p>校园轻集市，一站式校园生活服务平台。</p>

    <h3>最新商品</h3>
    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="trades.length === 0" />
    <div v-else class="list">
      <ItemCard
        v-for="item in trades"
        :key="item.id"
        :title="item.title"
        :subtitle="'¥' + item.price"
        :description="item.category + ' · ' + item.condition"
        :extra="item.publisher + ' · ' + item.publishTime"
      />
    </div>
  </section>
</template>

<style scoped>
h3 { margin-top: 24px; margin-bottom: 12px; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
</style>
