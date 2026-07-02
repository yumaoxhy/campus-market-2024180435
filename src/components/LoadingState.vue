<script setup lang="ts">
defineProps<{ message?: string }>()
</script>

<template>
  <div class="loading-state">
    <span class="spinner"></span>
    <p>{{ message || '加载中...' }}</p>
  </div>
</template>

<style scoped>
.loading-state { text-align: center; padding: 48px 0; color: #999; }
.spinner { display: inline-block; width: 24px; height: 24px; border: 3px solid #eee; border-top-color: #409eff; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 12px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
