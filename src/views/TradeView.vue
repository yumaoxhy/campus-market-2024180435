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
  trades.value = res.data
  loading.value = false
})
</script>

<template>
  <section>
    <h2>二手交易</h2>
    <p>浏览和搜索校园二手商品。</p>

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="trades.length === 0" />
    <div v-else class="list">
      <ItemCard
        v-for="item in trades"
        :key="item.id"
        :title="item.title"
        :subtitle="'¥' + item.price"
        :description="item.category + ' · ' + item.condition + ' · ' + item.location"
        :extra="item.publisher + ' · ' + item.publishTime"
      />
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
</style>
