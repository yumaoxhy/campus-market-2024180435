<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { groupBuyApi } from '@/api/groupBuy'
import LoadStatus from '@/components/LoadStatus.vue'
import AdminDeleteBtn from '@/components/AdminDeleteBtn.vue'
import { useUserStore } from '@/stores/user'
import type { GroupBuy } from '@/types'

const user = useUserStore()
const items = ref<GroupBuy[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')

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
          <h4>{{ item.title }}</h4>
          <p class="desc">{{ item.description }}</p>
          <p class="progress">{{ item.currentCount }} / {{ item.targetCount }} 人</p>
          <div class="bar"><div class="fill" :style="{ width: (item.currentCount / item.targetCount * 100) + '%' }"></div></div>
          <p class="meta">{{ item.location }} · 截止 {{ item.deadline }}</p>
          <AdminDeleteBtn v-if="user.isAdmin" :id="item.id" @delete="removeItem" />
        </div>
      </div>
    </LoadStatus>
  </section>
</template>

<style scoped>
.filters { margin-bottom: 16px; }
.search-input { width: 100%; max-width: 360px; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 16px; position: relative; }
.card h4 { margin: 0 0 8px; }
.desc { color: #666; font-size: 13px; }
.progress { color: #409eff; font-weight: bold; margin: 8px 0 4px; }
.bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.fill { height: 100%; background: #409eff; border-radius: 3px; }
.meta { color: #999; font-size: 12px; margin-top: 8px; }
</style>
