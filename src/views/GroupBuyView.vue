<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const items = ref<any[]>([])

onMounted(async () => {
  const res = await api.groupBuys.list()
  items.value = res.data
})
</script>

<template>
  <section>
    <h2>拼单搭子</h2>
    <p>发起或加入拼单活动。</p>

    <div class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.description }}</p>
        <p class="progress">{{ item.current }} / {{ item.target }} 人</p>
        <div class="bar"><div class="fill" :style="{ width: (item.current / item.target * 100) + '%' }"></div></div>
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
</style>
