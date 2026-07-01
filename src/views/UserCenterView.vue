<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import { tradeApi } from '@/api/trade'
import type { Trade } from '@/types'

const user = useUserStore()
const favorite = useFavoriteStore()

const allTrades = ref<Trade[]>([])
const myTrades = ref<Trade[]>([])
const favoriteTrades = ref<Trade[]>([])
const tab = ref<'profile' | 'posts' | 'favorites'>('profile')

async function loadData() {
  const res = await tradeApi.list()
  allTrades.value = res.data as Trade[]
  myTrades.value = allTrades.value.filter((t: Trade) => t.publisher === user.name)
  favoriteTrades.value = allTrades.value.filter((t: Trade) => favorite.has(t.id))
}

async function deleteTrade(id: number) {
  await tradeApi.remove(id)
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <section>
    <h2>个人中心</h2>

    <div v-if="!user.isLoggedIn" class="login-tip">
      <p>请先 <RouterLink to="/login">登录</RouterLink> 后查看个人中心。</p>
    </div>

    <template v-else>
      <div class="profile-card">
        <div class="avatar">👤</div>
        <div class="info">
          <h3>{{ user.name }}</h3>
          <p>{{ user.campus }} · {{ user.phone }}</p>
          <span v-if="user.isAdmin" class="admin-badge">管理员</span>
        </div>
      </div>

      <div class="tabs">
        <button :class="{ active: tab === 'profile' }" @click="tab = 'profile'">个人资料</button>
        <button :class="{ active: tab === 'posts' }" @click="tab = 'posts'">我的发布</button>
        <button :class="{ active: tab === 'favorites' }" @click="tab = 'favorites'">我的收藏 ({{ favorite.count }})</button>
        <button v-if="user.isAdmin" :class="{ active: tab === 'all' }" @click="tab = 'all'">所有发布 (管理员)</button>
      </div>

      <div v-if="tab === 'profile'" class="detail">
        <p><strong>姓名：</strong>{{ user.name }}</p>
        <p><strong>电话：</strong>{{ user.phone }}</p>
        <p><strong>校区：</strong>{{ user.campus }}</p>
        <p><strong>角色：</strong>{{ user.isAdmin ? '管理员' : '普通用户' }}</p>
      </div>

      <div v-if="tab === 'posts'" class="list">
        <div v-if="myTrades.length === 0" class="empty">暂无发布</div>
        <div v-for="item in myTrades" :key="item.id" class="card">
          <div class="card-body">
            <h4>{{ item.title }}</h4>
            <p class="price">¥{{ item.price }}</p>
            <p class="meta">{{ item.createTime }}</p>
          </div>
          <button class="delete-btn" @click="deleteTrade(item.id)">删除</button>
        </div>
      </div>

      <div v-if="tab === 'favorites'" class="list">
        <div v-if="favoriteTrades.length === 0" class="empty">暂无收藏</div>
        <div v-for="item in favoriteTrades" :key="item.id" class="card">
          <div class="card-body">
            <h4>{{ item.title }}</h4>
            <p class="price">¥{{ item.price }}</p>
            <p class="meta">{{ item.createTime }}</p>
          </div>
        </div>
      </div>

      <div v-if="tab === 'all'" class="list">
        <div v-for="item in allTrades" :key="item.id" class="card">
          <div class="card-body">
            <h4>{{ item.title }}</h4>
            <p class="price">¥{{ item.price }} · {{ item.publisher }}</p>
            <p class="meta">{{ item.createTime }}</p>
          </div>
          <button class="delete-btn" @click="deleteTrade(item.id)">删除</button>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.login-tip { text-align: center; padding: 48px 0; color: #999; }
.login-tip a { color: #409eff; }
.profile-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: #f0f5ff; border-radius: 12px; margin-bottom: 20px; }
.avatar { font-size: 48px; }
.info { position: relative; }
.info h3 { margin: 0; }
.info p { color: #666; font-size: 13px; margin: 4px 0 0; }
.admin-badge { display: inline-block; padding: 2px 10px; background: #e74c3c; color: white; border-radius: 4px; font-size: 11px; margin-top: 4px; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.tabs button { padding: 8px 20px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 14px; }
.tabs button.active { background: #409eff; color: white; border-color: #409eff; }
.detail p { margin: 8px 0; font-size: 14px; }
.list { display: grid; gap: 8px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; }
.card-body h4 { margin: 0 0 6px; }
.price { margin: 0 0 4px; color: #e74c3c; font-weight: bold; font-size: 13px; }
.meta { margin: 0; color: #999; font-size: 12px; }
.delete-btn { padding: 6px 16px; border: 1px solid #e74c3c; color: #e74c3c; background: white; border-radius: 6px; cursor: pointer; font-size: 13px; }
.delete-btn:hover { background: #fff0f0; }
.empty { text-align: center; padding: 32px; color: #999; }
</style>
