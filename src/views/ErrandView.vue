<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { errandApi } from '@/api/errand'
import EmptyState from '@/components/EmptyState.vue'
import { useUserStore } from '@/stores/user'
import type { Errand } from '@/types'

const user = useUserStore()
const items = ref<Errand[]>([])
const loading = ref(true)

async function loadData() {
  const res = await errandApi.list()
  items.value = res.data
  loading.value = false
}

async function removeItem(id: number) {
  await errandApi.remove(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>跑腿委托</h2>
    <p>发布或接取跑腿任务。</p>

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="items.length === 0" />
    <div v-else class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.description }}</p>
        <p class="meta">{{ item.from }} → {{ item.to }}</p>
        <p class="reward">酬劳：¥{{ item.reward }}</p>
        <p class="meta">{{ item.publisher }} · 截止 {{ item.deadline }}</p>
        <button v-if="user.isAdmin" class="admin-del-btn" @click="removeItem(item.id)">删除</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; position: relative; }
.card h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.meta { color: #999; font-size: 12px; }
.reward { color: #e67e22; font-weight: bold; margin-top: 8px; }
.admin-del-btn {
  position: absolute; top: 8px; right: 8px;
  padding: 4px 10px; border: 1px solid #e74c3c; color: #e74c3c;
  background: white; border-radius: 6px; cursor: pointer; font-size: 12px;
}
.admin-del-btn:hover { background: #fff0f0; }
</style>
