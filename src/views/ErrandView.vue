<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'

const items = ref<any[]>([])

onMounted(async () => {
  const res = await api.errands.list()
  items.value = res.data
})
</script>

<template>
  <section>
    <h2>跑腿委托</h2>
    <p>发布或接取跑腿任务。</p>

    <div class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.description }}</p>
        <p class="meta">{{ item.location }}</p>
        <p class="reward">酬劳：¥{{ item.reward }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; }
.card h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.meta { color: #999; font-size: 12px; }
.reward { color: #e67e22; font-weight: bold; margin-top: 8px; }
</style>
