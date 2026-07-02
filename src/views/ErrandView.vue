<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { errandApi } from '@/api/errand'
import LoadStatus from '@/components/LoadStatus.vue'
import AdminDeleteBtn from '@/components/AdminDeleteBtn.vue'
import DetailModal from '@/components/DetailModal.vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import type { Errand } from '@/types'

const user = useUserStore()
const favorite = useFavoriteStore()
const items = ref<Errand[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const selected = ref<Errand | null>(null)

const filtered = computed(() =>
  !keyword.value ? items.value : items.value.filter(i => i.title.includes(keyword.value) || i.description.includes(keyword.value))
)

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await errandApi.list()
    items.value = res.data
  } catch {
    error.value = '无法获取数据'
  }
  loading.value = false
}

async function removeItem(id: number) {
  await errandApi.remove(id)
  await loadData()
}

async function accept(id: number) {
  if (favorite.hasAcceptedErrand(id)) return
  await errandApi.update(id, { status: 'accepted' })
  favorite.acceptErrand(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>跑腿委托</h2>
    <p>发布或接取跑腿任务。</p>

    <div class="filters">
      <input v-model="keyword" placeholder="搜索..." class="search-input" />
    </div>

    <LoadStatus :loading="loading" :error="error" :empty="filtered.length === 0 && !loading">
      <div class="list">
        <div v-for="item in filtered" :key="item.id" class="card" :class="{ accepted: item.status === 'accepted' }">
          <div class="card-body" @click="selected = item">
            <h4>{{ item.title }}</h4>
            <p class="desc">{{ item.description.slice(0, 30) }}{{ item.description.length > 30 ? '...' : '' }}</p>
            <p class="meta">{{ item.from }} → {{ item.to }}</p>
            <p class="reward">酬劳：¥{{ item.reward }}</p>
            <p class="meta">{{ item.publisher }} · 截止 {{ item.deadline }}</p>
          </div>
          <div class="card-actions">
            <span v-if="item.status === 'accepted' || favorite.hasAcceptedErrand(item.id)" class="accepted-tag">已接取</span>
            <button v-else-if="user.isLoggedIn" class="action-btn" @click="accept(item.id)">接取</button>
            <AdminDeleteBtn v-if="user.isAdmin" :id="item.id" @delete="removeItem" />
          </div>
        </div>
      </div>
    </LoadStatus>

    <DetailModal
      v-if="selected"
      :visible="!!selected"
      :title="selected.title"
      :details="[
        { label: '描述', value: selected.description },
        { label: '任务类型', value: selected.taskType },
        { label: '起始地点', value: selected.from },
        { label: '送达地点', value: selected.to },
        { label: '酬劳', value: '¥' + selected.reward },
        { label: '发布者', value: selected.publisher },
        { label: '截止时间', value: selected.deadline },
        { label: '状态', value: selected.status === 'accepted' ? '已接取' : '待接取' },
      ]"
      @close="selected = null"
    />
  </section>
</template>

<style scoped>
.filters { margin-bottom: 16px; }
.search-input { width: 100%; max-width: 360px; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; position: relative; }
.card.accepted { background: #f9f9f9; opacity: 0.8; }
.card-body { cursor: pointer; }
.card-body h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.meta { color: #999; font-size: 12px; }
.reward { color: #e67e22; font-weight: bold; margin-top: 8px; }
.card-actions { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
.action-btn { padding: 6px 16px; background: #e67e22; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
.action-btn:hover { background: #d35400; }
.accepted-tag { color: #27ae60; font-weight: bold; font-size: 13px; }
</style>
