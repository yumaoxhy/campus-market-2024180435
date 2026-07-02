<script setup lang="ts">
defineProps<{ message?: string }>()
</script>

<template>
  <div class="error-state">
    <p>⚠️ {{ message || '加载失败，请稍后重试' }}</p>
  </div>
</template>

<style scoped>
.error-state { text-align: center; padding: 48px 0; color: #e74c3c; }
</style>
