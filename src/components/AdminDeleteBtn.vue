<script setup lang="ts">
defineProps<{
  id: number
}>()
const emit = defineEmits<{ delete: [id: number] }>()
</script>

<template>
  <button class="admin-del-btn" @click="emit('delete', id)">删除</button>
</template>

<style scoped>
.admin-del-btn {
  position: absolute; top: 8px; right: 8px;
  padding: 4px 10px; border: 1px solid #e74c3c; color: #e74c3c;
  background: white; border-radius: 6px; cursor: pointer; font-size: 12px;
}
.admin-del-btn:hover { background: #fff0f0; }
</style>
