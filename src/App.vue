<script setup lang="ts"></script>

<template>
  <div class="app">
    <header>
      <h1>校园轻集市</h1>
      <p>AI 辅助前端工程实践种子项目</p>
    </header>
    <nav>
      <RouterLink to="/home" class="nav-card">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">首页</span>
      </RouterLink>
      <RouterLink to="/list" class="nav-card">
        <span class="nav-icon">📋</span>
        <span class="nav-label">列表页</span>
      </RouterLink>
      <RouterLink to="/publish" class="nav-card">
        <span class="nav-icon">📤</span>
        <span class="nav-label">发布页</span>
      </RouterLink>
      <RouterLink to="/message" class="nav-card">
        <span class="nav-icon">💬</span>
        <span class="nav-label">消息页</span>
      </RouterLink>
      <RouterLink to="/profile" class="nav-card">
        <span class="nav-icon">👤</span>
        <span class="nav-label">个人中心</span>
      </RouterLink>
    </nav>
    <div class="content-card">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  min-height: 100vh;
  background: #f5f7fa;
}
header {
  text-align: center;
  margin-bottom: 32px;
}
header h1 {
  font-size: 28px;
  color: #1a1a2e;
  margin-bottom: 8px;
}
header p {
  font-size: 14px;
  color: #888;
}
nav {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 28px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 90px;
}
.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}
.nav-icon {
  font-size: 28px;
  line-height: 1;
}
.nav-label {
  font-size: 13px;
  font-weight: 500;
}
.content-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  min-height: 200px;
}
</style>