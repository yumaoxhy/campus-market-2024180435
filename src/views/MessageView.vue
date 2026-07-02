<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { messageApi } from '@/api/message'
import LoadStatus from '@/components/LoadStatus.vue'
import { useUserStore } from '@/stores/user'
import type { Message } from '@/types'

const user = useUserStore()
const messages = ref<Message[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  if (!user.isLoggedIn) {
    loading.value = false
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await messageApi.list()
    const all = res.data as Message[]
    messages.value = all.filter(m => m.toUserId === user.id || m.fromUserId === user.id)
  } catch {
    error.value = '无法获取消息'
  }
  loading.value = false
})
</script>

<template>
  <section>
    <h2>消息中心</h2>
    <p>查看收到的消息和通知。</p>

    <div v-if="!user.isLoggedIn" class="login-tip">
      <p>请先 <RouterLink to="/login">登录</RouterLink> 后查看消息。</p>
    </div>
    <LoadStatus v-else :loading="loading" :error="error" :empty="messages.length === 0">
      <div class="list">
        <div v-for="msg in messages" :key="msg.id" class="msg-item" :class="{ unread: !msg.isRead }">
          <div class="msg-header">
            <strong>{{ msg.fromUserId === user.id ? '我' : '用户' + msg.fromUserId }}</strong>
            <span class="time">{{ msg.createTime }}</span>
          </div>
          <p class="msg-content">{{ msg.content }}</p>
        </div>
      </div>
    </LoadStatus>
  </section>
</template>

<style scoped>
.login-tip { text-align: center; padding: 48px 0; color: #999; }
.login-tip a { color: #409eff; }
.list { display: flex; flex-direction: column; gap: 8px; }
.msg-item { border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; }
.msg-item.unread { background: #f0f5ff; border-color: #409eff; }
.msg-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.time { color: #999; font-size: 12px; }
.msg-content { color: #333; font-size: 14px; margin: 0; }
</style>
