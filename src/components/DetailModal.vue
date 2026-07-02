<script setup lang="ts">
defineProps<{
  visible: boolean
  title: string
  details: { label: string; value: string }[]
}>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="overlay" @click.self="emit('close')">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="emit('close')">✕</button>
        </div>
        <div class="modal-body">
          <div v-for="d in details" :key="d.label" class="detail-row">
            <span class="detail-label">{{ d.label }}：</span>
            <span class="detail-value">{{ d.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: white; border-radius: 12px; padding: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.modal-header h3 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: #999; padding: 4px; }
.close-btn:hover { color: #333; }
.detail-row { margin-bottom: 10px; font-size: 14px; line-height: 1.6; }
.detail-label { color: #666; margin-right: 8px; }
.detail-value { color: #333; }
</style>
