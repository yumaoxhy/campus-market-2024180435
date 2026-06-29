<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { groupBuyApi } from '@/api/groupBuy'
import EmptyState from '@/components/EmptyState.vue'
import type { GroupBuy } from '@/types'

const items = ref<GroupBuy[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await groupBuyApi.list()
  items.value = res.data
  loading.value = false
})
</script>

<template>
  <section>
    <h2>拼单搭子</h2>
    <p>发起或加入拼单活动。</p>

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="items.length === 0" />
    <div v-else class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.description }}</p>
        <p class="progress">{{ item.currentCount }} / {{ item.targetCount }} 人</p>
        <div class="bar"><div class="fill" :style="{ width: (item.currentCount / item.targetCount * 100) + '%' }"></div></div>
        <p class="meta">{{ item.location }} · 截止 {{ item.deadline }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; }
.card h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.progress { color: #409eff; font-weight: bold; margin: 8px 0 4px; }
.bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.fill { height: 100%; background: #409eff; border-radius: 3px; }
.meta { color: #999; font-size: 12px; margin-top: 8px; }
</style>
