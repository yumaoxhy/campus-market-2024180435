<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { lostFoundApi } from '@/api/lostFound'
import EmptyState from '@/components/EmptyState.vue'
import { useUserStore } from '@/stores/user'
import type { LostFound } from '@/types'

const user = useUserStore()
const items = ref<LostFound[]>([])
const loading = ref(true)

async function loadData() {
  const res = await lostFoundApi.list()
  items.value = res.data
  loading.value = false
}

async function removeItem(id: number) {
  await lostFoundApi.remove(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>失物招领</h2>
    <p>发布和查看失物招领信息。</p>

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="items.length === 0" />
    <div v-else class="list">
      <div v-for="item in items" :key="item.id" class="card">
        <span class="tag" :class="item.type">{{ item.type === 'lost' ? '寻物' : '拾到' }}</span>
        <h4>{{ item.title }}</h4>
        <p class="desc">{{ item.description }}</p>
        <p class="meta">{{ item.location }} · {{ item.eventTime }}</p>
        <button v-if="user.isAdmin" class="admin-del-btn" @click="removeItem(item.id)">删除</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; position: relative; }
.card h4 { margin: 8px 0; }
.tag { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 12px; }
.tag.lost { background: #fff0f0; color: #e74c3c; }
.tag.found { background: #f0fff0; color: #27ae60; }
.desc { color: #666; font-size: 13px; }
.meta { color: #999; font-size: 12px; margin-top: 8px; }
.admin-del-btn {
  position: absolute; top: 8px; right: 8px;
  padding: 4px 10px; border: 1px solid #e74c3c; color: #e74c3c;
  background: white; border-radius: 6px; cursor: pointer; font-size: 12px;
}
.admin-del-btn:hover { background: #fff0f0; }
</style>
