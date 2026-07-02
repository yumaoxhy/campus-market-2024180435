<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { tradeApi } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import LoadingState from '@/components/LoadingState.vue'
import ErrorState from '@/components/ErrorState.vue'
import EmptyState from '@/components/EmptyState.vue'
import SearchBar from '@/components/SearchBar.vue'
import AdminDeleteBtn from '@/components/AdminDeleteBtn.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import type { Trade } from '@/types'

const favorite = useFavoriteStore()
const user = useUserStore()
const trades = ref<Trade[]>([])
const loading = ref(true)
const error = ref('')
const keyword = ref('')
const categoryFilter = ref('')

const categories = ['数码配件', '教材资料', '生活电器', '出行工具', '其他']

const filtered = computed(() =>
  trades.value.filter(t => {
    const matchKeyword = !keyword.value || t.title.includes(keyword.value) || t.description.includes(keyword.value)
    const matchCategory = !categoryFilter.value || t.category === categoryFilter.value
    return matchKeyword && matchCategory
  })
)

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const res = await tradeApi.list()
    trades.value = res.data
  } catch {
    error.value = '无法获取数据，请检查 JSON Server 是否运行'
  }
  loading.value = false
}

async function deleteTrade(id: number) {
  await tradeApi.remove(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>二手交易</h2>
    <p>浏览和搜索校园二手商品。</p>

    <div class="filters">
      <SearchBar v-model="keyword" />
      <select v-model="categoryFilter" class="filter-select">
        <option value="">全部分类</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <LoadingState v-if="loading" />
    <ErrorState v-else-if="error" :message="error" />
    <EmptyState v-else-if="filtered.length === 0" />
    <div v-else class="list">
      <div v-for="item in filtered" :key="item.id" class="card-wrapper">
        <ItemCard
          :title="item.title"
          :subtitle="'¥' + item.price"
          :description="item.category + ' · ' + item.condition + ' · ' + item.location"
          :extra="item.publisher + ' · ' + item.publishTime"
        />
        <button
          class="fav-btn"
          :class="{ liked: favorite.has(item.id) }"
          :title="favorite.has(item.id) ? '取消收藏' : '收藏'"
          @click="favorite.toggle(item.id)"
        >
          {{ favorite.has(item.id) ? '❤️' : '🤍' }}
        </button>
        <AdminDeleteBtn v-if="user.isAdmin" :id="item.id" @delete="deleteTrade" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.filters { display: flex; gap: 12px; margin-bottom: 16px; }
.filter-select { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; background: white; }
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card-wrapper { position: relative; }
.fav-btn {
  position: absolute; top: 8px; right: 8px;
  background: white; border: none; font-size: 18px;
  cursor: pointer; padding: 4px 8px; border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1); transition: transform 0.15s;
}
.fav-btn:hover { transform: scale(1.15); }
.fav-btn.liked { background: #fff0f0; }
</style>
