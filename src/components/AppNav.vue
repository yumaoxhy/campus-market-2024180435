<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/trade', label: '二手交易', icon: '🛒' },
  { path: '/lost-found', label: '失物招领', icon: '🔍' },
  { path: '/group-buy', label: '拼单搭子', icon: '🤝' },
  { path: '/errand', label: '跑腿委托', icon: '🏃' },
  { path: '/publish', label: '发布', icon: '📤' },
  { path: '/message', label: '消息', icon: '💬' },
  { path: '/user', label: '个人中心', icon: '👤' },
]
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
}
.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}
.nav-card.active {
  color: #409eff;
  box-shadow: 0 2px 12px rgba(64,158,255,0.2);
}
.nav-icon {
  font-size: 24px;
  line-height: 1;
}
.nav-label {
  font-size: 12px;
  font-weight: 500;
}
</style>
