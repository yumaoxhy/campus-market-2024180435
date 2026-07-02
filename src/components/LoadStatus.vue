<script setup lang="ts">
defineProps<{
  loading?: boolean
  error?: string
  empty?: boolean
}>()
</script>

<template>
  <div v-if="loading" class="state loading">
    <span class="spinner"></span>
    <p>加载中...</p>
  </div>
  <div v-else-if="error" class="state error">
    <p>加载失败：{{ error }}</p>
  </div>
  <div v-else-if="empty" class="state empty">
    <p>暂无数据</p>
  </div>
  <slot v-else />
</template>

<style scoped>
.state { text-align: center; padding: 48px 0; color: #999; }
.spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #eee; border-top-color: #409eff; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px; }
@keyframes spin { to { transform: rotate(360deg); } }
.error { color: #e74c3c; }
</style>
