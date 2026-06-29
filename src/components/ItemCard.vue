<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  description?: string
  extra?: string
}>()
</script>

<template>
  <div class="item-card">
    <h4>{{ title }}</h4>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <p v-if="description" class="description">{{ description }}</p>
    <p v-if="extra" class="extra">{{ extra }}</p>
  </div>
</template>

<style scoped>
.item-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}
.item-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.item-card h4 { margin: 0 0 8px; font-size: 15px; }
.subtitle { color: #e74c3c; font-weight: bold; margin: 4px 0; }
.description { color: #666; font-size: 13px; }
.extra { color: #999; font-size: 12px; margin-top: 8px; }
</style>
