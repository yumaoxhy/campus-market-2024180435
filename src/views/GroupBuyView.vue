<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { groupBuyApi } from '@/api/groupBuy'
import LoadStatus from '@/components/LoadStatus.vue'
import AdminDeleteBtn from '@/components/AdminDeleteBtn.vue'
import DetailModal from '@/components/DetailModal.vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import type { GroupBuy } from '@/types'

const user = useUserStore()
const favorite = useFavoriteStore()
const items = ref<GroupBuy[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const selected = ref<GroupBuy | null>(null)

const filtered = computed(() =>
  !keyword.value ? items.value : items.value.filter(i => i.title.includes(keyword.value) || i.description.includes(keyword.value))
)

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await groupBuyApi.list()
    items.value = res.data
  } catch {
    error.value = '无法获取数据'
  }
  loading.value = false
}

async function removeItem(id: number) {
  await groupBuyApi.remove(id)
  await loadData()
}

async function join(id: number) {
  if (favorite.hasJoinedGroupBuy(id)) return
  const item = items.value.find(i => i.id === id)
  if (!item || item.currentCount >= item.targetCount) return
  await groupBuyApi.update(id, { currentCount: item.currentCount + 1 })
  favorite.joinGroupBuy(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>拼单搭子</h2>
    <p>发起或加入拼单活动。</p>

    <div class="filters">
      <input v-model="keyword" placeholder="搜索..." class="search-input" />
    </div>

    <LoadStatus :loading="loading" :error="error" :empty="filtered.length === 0 && !loading">
      <div class="list">
        <div v-for="item in filtered" :key="item.id" class="card">
          <div class="card-body" @click="selected = item">
            <h4>{{ item.title }}</h4>
            <p class="desc">{{ item.description.slice(0, 30) }}{{ item.description.length > 30 ? '...' : '' }}</p>
            <p class="progress">{{ item.currentCount }} / {{ item.targetCount }} 人</p>
            <div class="bar"><div class="fill" :style="{ width: (item.currentCount / item.targetCount * 100) + '%' }"></div></div>
            <p class="meta">{{ item.location }} · 截止 {{ item.deadline }}</p>
          </div>
          <div class="card-actions">
            <span v-if="favorite.hasJoinedGroupBuy(item.id)" class="joined-tag">已加入</span>
            <button v-else-if="user.isLoggedIn && item.currentCount < item.targetCount" class="action-btn" @click="join(item.id)">加入</button>
            <span v-else-if="item.currentCount >= item.targetCount" class="full-tag">已满员</span>
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
        { label: '类型', value: selected.type },
        { label: '进度', value: selected.currentCount + ' / ' + selected.targetCount + ' 人' },
        { label: '地点', value: selected.location },
        { label: '发布者', value: selected.publisher },
        { label: '截止时间', value: selected.deadline },
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
.card-body { cursor: pointer; }
.card-body h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.progress { color: #409eff; font-weight: bold; margin: 8px 0 4px; }
.bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.fill { height: 100%; background: #409eff; border-radius: 3px; }
.meta { color: #999; font-size: 12px; margin-top: 8px; }
.card-actions { margin-top: 12px; display: flex; gap: 8px; align-items: center; }
.action-btn { padding: 6px 16px; background: #409eff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
.action-btn:hover { background: #337ecc; }
.full-tag { color: #999; font-size: 13px; }
.joined-tag { color: #27ae60; font-weight: bold; font-size: 13px; }
</style>
