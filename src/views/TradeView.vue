<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tradeApi } from '@/api/trade'
import ItemCard from '@/components/ItemCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import type { Trade } from '@/types'

const favorite = useFavoriteStore()
const user = useUserStore()
const trades = ref<Trade[]>([])
const loading = ref(true)

async function loadData() {
  const res = await tradeApi.list()
  trades.value = res.data
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

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="trades.length === 0" />
    <div v-else class="list">
      <div v-for="item in trades" :key="item.id" class="card-wrapper">
        <ItemCard
          :title="item.title"
          :subtitle="'¥' + item.price"
          :description="item.category + ' · ' + item.condition + ' · ' + item.location"
          :extra="item.publisher + ' · ' + item.publishTime"
        />
        <button class="fav-btn" :class="{ liked: favorite.has(item.id) }" @click="favorite.toggle(item.id)">
          {{ favorite.has(item.id) ? '❤️' : '🤍' }}
        </button>
        <button v-if="user.isAdmin" class="admin-del-btn" @click="deleteTrade(item.id)">删除</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
.card-wrapper { position: relative; }
.fav-btn {
  position: absolute; top: 8px; right: 8px;
  background: white; border: none; font-size: 18px;
  cursor: pointer; padding: 4px 8px; border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.fav-btn.liked { background: #fff0f0; }
.admin-del-btn {
  position: absolute; top: 8px; left: 8px;
  padding: 4px 10px; border: 1px solid #e74c3c; color: #e74c3c;
  background: white; border-radius: 6px; cursor: pointer; font-size: 12px;
}
.admin-del-btn:hover { background: #fff0f0; }
</style>
