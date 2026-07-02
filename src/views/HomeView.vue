<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tradeApi } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import LoadStatus from '@/components/LoadStatus.vue'
import type { Trade } from '@/types'

const trades = ref<Trade[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const res = await tradeApi.list()
    trades.value = res.data.slice(0, 4)
  } catch {
    error.value = '无法获取数据'
  }
  loading.value = false
})
</script>

<template>
  <section>
    <h2>首页</h2>
    <p>校园轻集市，一站式校园生活服务平台。</p>

    <h3>最新商品</h3>
    <LoadStatus :loading="loading" :error="error" :empty="trades.length === 0 && !loading">
      <div class="list">
        <ItemCard
          v-for="item in trades"
          :key="item.id"
          :title="item.title"
          :subtitle="'¥' + item.price"
          :description="item.category + ' · ' + item.condition"
          :extra="item.publisher + ' · ' + item.publishTime"
        />
      </div>
    </LoadStatus>
  </section>
</template>

<style scoped>
h3 { margin-top: 24px; margin-bottom: 12px; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
</style>
