<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="form-field">
    <label>{{ label }} <span v-if="required" class="req">*</span></label>
    <slot />
    <span v-if="error" class="err">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-field { margin-bottom: 16px; }
label { display: block; font-weight: 500; margin-bottom: 4px; font-size: 14px; }
.req { color: #e74c3c; }
.err { color: #e74c3c; font-size: 12px; margin-top: 2px; display: block; }
</style>
