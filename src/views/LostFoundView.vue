<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { lostFoundApi } from '@/api/lostFound'
import LoadStatus from '@/components/LoadStatus.vue'
import AdminDeleteBtn from '@/components/AdminDeleteBtn.vue'
import DetailModal from '@/components/DetailModal.vue'
import { useUserStore } from '@/stores/user'
import type { LostFound } from '@/types'

const user = useUserStore()
const items = ref<LostFound[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const typeFilter = ref('')
const selected = ref<LostFound | null>(null)

const filtered = computed(() =>
  items.value.filter(i => {
    const matchKeyword = !keyword.value || i.title.includes(keyword.value) || i.description.includes(keyword.value)
    const matchType = !typeFilter.value || i.type === typeFilter.value
    return matchKeyword && matchType
  })
)

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await lostFoundApi.list()
    items.value = res.data
  } catch {
    error.value = '无法获取数据'
  }
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

    <div class="filters">
      <input v-model="keyword" placeholder="搜索..." class="search-input" />
      <select v-model="typeFilter" class="filter-select">
        <option value="">全部</option>
        <option value="lost">寻物</option>
        <option value="found">拾到</option>
      </select>
    </div>

    <LoadStatus :loading="loading" :error="error" :empty="filtered.length === 0 && !loading">
      <div class="list">
        <div v-for="item in filtered" :key="item.id" class="card" @click="selected = item">
          <span class="tag" :class="item.type">{{ item.type === 'lost' ? '寻物' : '拾到' }}</span>
          <h4>{{ item.title }}</h4>
          <p class="desc">{{ item.description }}</p>
          <p class="meta">{{ item.location }} · {{ item.eventTime }}</p>
          <AdminDeleteBtn v-if="user.isAdmin" :id="item.id" @delete="removeItem" />
        </div>
      </div>
    </LoadStatus>

    <DetailModal
      v-if="selected"
      :visible="!!selected"
      :title="selected.title"
      :details="[
        { label: '描述', value: selected.description },
        { label: '类型', value: selected.type === 'lost' ? '寻物' : '拾到' },
        { label: '物品名称', value: selected.itemName },
        { label: '地点', value: selected.location },
        { label: '时间', value: selected.eventTime },
        { label: '联系方式', value: selected.contact },
        { label: '发布者', value: selected.publisher },
      ]"
      @close="selected = null"
    />
  </section>
</template>

<style scoped>
.filters { display: flex; gap: 12px; margin-bottom: 16px; }
.search-input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.filter-select { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; background: white; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; position: relative; }
.card h4 { margin: 8px 0; }
.tag { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 12px; }
.tag.lost { background: #fff0f0; color: #e74c3c; }
.tag.found { background: #f0fff0; color: #27ae60; }
.desc { color: #666; font-size: 13px; }
.meta { color: #999; font-size: 12px; margin-top: 8px; }
</style>
