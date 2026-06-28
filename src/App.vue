<script setup lang="ts"></script>

<template>
  <main class="app">
    <h1>校园轻集市</h1>
    <nav>
      <RouterLink to="/home">首页</RouterLink>
      <RouterLink to="/list">列表页</RouterLink>
      <RouterLink to="/publish">发布页</RouterLink>
      <RouterLink to="/message">消息页</RouterLink>
      <RouterLink to="/profile">个人中心</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped>
.app {
  padding: 32px;
}
nav {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
nav a {
  color: red;
}
</style>