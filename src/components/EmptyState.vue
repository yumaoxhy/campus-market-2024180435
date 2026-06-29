<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="empty">
    <span class="icon">📭</span>
    <p>{{ message || '暂无数据' }}</p>
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 48px 0;
  color: #999;
}
.icon { font-size: 48px; display: block; margin-bottom: 12px; }
</style>
