<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '二手交易', icon: '🛒' },
  { path: '/lost-found', label: '失物招领', icon: '🔍' },
  { path: '/group-buy', label: '拼单搭子', icon: '🤝' },
  { path: '/errand', label: '跑腿委托', icon: '🏃' },
  { path: '/publish', label: '发布', icon: '📤' },
  { path: '/message', label: '消息', icon: '💬' },
]

function handleLogout() {
  user.logout()
  router.push('/')
}
</script>

<template>
  <nav class="app-nav">
    <RouterLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-card"
      :class="{ active: route.path === item.path }"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-label">{{ item.label }}</span>
    </RouterLink>

    <div v-if="user.isLoggedIn" class="nav-card user-card">
      <span class="nav-icon">👤</span>
      <span class="nav-label">{{ user.name }}</span>
      <div class="user-dropdown">
        <RouterLink to="/user" class="dropdown-item">个人中心</RouterLink>
        <button class="dropdown-item" @click="handleLogout">退出</button>
      </div>
    </div>
    <RouterLink v-else to="/login" class="nav-card">
      <span class="nav-icon">🔑</span>
      <span class="nav-label">登录</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px 0;
  flex-wrap: wrap;
}
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 80px;
  position: relative;
}
.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}
.nav-card.active {
  color: #409eff;
  box-shadow: 0 2px 12px rgba(64,158,255,0.2);
}
.nav-icon { font-size: 24px; line-height: 1; }
.nav-label { font-size: 12px; font-weight: 500; }

.user-card { cursor: default; }
.user-card:hover .user-dropdown { display: block; }
.user-dropdown {
  display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  background: white; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  padding: 4px 0; z-index: 10; min-width: 100px; margin-top: 4px;
}
.dropdown-item {
  display: block; width: 100%; padding: 8px 16px; text-align: center;
  border: none; background: none; font-size: 13px; cursor: pointer;
  text-decoration: none; color: #333; box-sizing: border-box;
}
.dropdown-item:hover { background: #f5f7fa; color: #409eff; }
</style>
