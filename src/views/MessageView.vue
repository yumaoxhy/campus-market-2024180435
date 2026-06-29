<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { messageApi } from '@/api/message'
import EmptyState from '@/components/EmptyState.vue'
import type { Message } from '@/types'

const messages = ref<Message[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await messageApi.list()
  messages.value = res.data
  loading.value = false
})
</script>

<template>
  <section>
    <h2>消息中心</h2>
    <p>查看收到的消息和通知。</p>

    <div v-if="loading"><p>加载中...</p></div>
    <EmptyState v-else-if="messages.length === 0" />
    <div v-else class="list">
      <div v-for="msg in messages" :key="msg.id" class="msg-item" :class="{ unread: !msg.isRead }">
        <div class="msg-header">
          <strong>用户{{ msg.fromUserId }}</strong>
          <span class="time">{{ msg.createTime }}</span>
        </div>
        <p class="msg-content">{{ msg.content }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list { display: flex; flex-direction: column; gap: 8px; }
.msg-item { border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; }
.msg-item.unread { background: #f0f5ff; border-color: #409eff; }
.msg-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.time { color: #999; font-size: 12px; }
.msg-content { color: #333; font-size: 14px; margin: 0; }
</style>
