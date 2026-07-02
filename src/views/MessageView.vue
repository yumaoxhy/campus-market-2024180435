<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { messageApi } from '@/api/message'
import { tradeApi } from '@/api/trade'
import { lostFoundApi } from '@/api/lostFound'
import { groupBuyApi } from '@/api/groupBuy'
import { errandApi } from '@/api/errand'
import LoadStatus from '@/components/LoadStatus.vue'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'
import type { Message, Trade, LostFound, GroupBuy, Errand } from '@/types'

const user = useUserStore()
const favorite = useFavoriteStore()
const messages = ref<Message[]>([])
const myTrades = ref<Trade[]>([])
const myLostFounds = ref<LostFound[]>([])
const myGroupBuys = ref<GroupBuy[]>([])
const myErrands = ref<Errand[]>([])
const joinedGroupBuys = ref<GroupBuy[]>([])
const acceptedErrands = ref<Errand[]>([])
const loading = ref(true)
const error = ref('')
const tab = ref<'messages' | 'mine' | 'joined'>('messages')

onMounted(async () => {
  if (!user.isLoggedIn) {
    loading.value = false
    return
  }
  loading.value = true
  error.value = ''
  try {
    const [msgRes, tRes, lfRes, gbRes, errRes] = await Promise.all([
      messageApi.list(),
      tradeApi.list(),
      lostFoundApi.list(),
      groupBuyApi.list(),
      errandApi.list(),
    ])
    const allMessages = msgRes.data as Message[]
    messages.value = allMessages.filter(m => m.toUserId === user.id || m.fromUserId === user.id)
    myTrades.value = (tRes.data as Trade[]).filter(t => t.publisher === user.name)
    myLostFounds.value = (lfRes.data as LostFound[]).filter(l => l.publisher === user.name)
    myGroupBuys.value = (gbRes.data as GroupBuy[]).filter(g => g.publisher === user.name)
    myErrands.value = (errRes.data as Errand[]).filter(e => e.publisher === user.name)
    joinedGroupBuys.value = (gbRes.data as GroupBuy[]).filter(g => favorite.hasJoinedGroupBuy(g.id))
    acceptedErrands.value = (errRes.data as Errand[]).filter(e => favorite.hasAcceptedErrand(e.id))
  } catch {
    error.value = '无法获取数据'
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

    <template v-else>
      <div class="tabs">
        <button :class="{ active: tab === 'messages' }" @click="tab = 'messages'">消息</button>
        <button :class="{ active: tab === 'mine' }" @click="tab = 'mine'">我的发布</button>
        <button :class="{ active: tab === 'joined' }" @click="tab = 'joined'">我的参与</button>
      </div>

      <LoadStatus :loading="loading" :error="error" :empty="false">
        <div v-if="tab === 'messages'">
          <div v-if="messages.length === 0" class="empty">暂无消息</div>
          <div v-for="msg in messages" :key="msg.id" class="msg-item" :class="{ unread: !msg.isRead }">
            <div class="msg-header">
              <strong>{{ msg.fromUserId === user.id ? '我' : '用户' + msg.fromUserId }}</strong>
              <span class="time">{{ msg.createTime }}</span>
            </div>
            <p class="msg-content">{{ msg.content }}</p>
          </div>
        </div>

        <div v-if="tab === 'mine'">
          <h3 style="margin-top:0">我发布的交易</h3>
          <div v-if="myTrades.length === 0" class="empty">暂无交易发布</div>
          <div v-for="item in myTrades" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="meta">¥{{ item.price }} · {{ item.status === 'open' ? '在售' : '已下架' }}</p>
          </div>

          <h3>我发布的失物招领</h3>
          <div v-if="myLostFounds.length === 0" class="empty">暂无失物发布</div>
          <div v-for="item in myLostFounds" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="meta">{{ item.type === 'lost' ? '寻物' : '拾到' }} · {{ item.status === 'open' ? '进行中' : '已解决' }}</p>
          </div>

          <h3>我发布的拼单</h3>
          <div v-if="myGroupBuys.length === 0" class="empty">暂无拼单发布</div>
          <div v-for="item in myGroupBuys" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="meta">{{ item.currentCount }} / {{ item.targetCount }} 人已加入 · {{ item.status === 'open' ? '招募中' : '已结束' }}</p>
          </div>

          <h3>我发布的跑腿</h3>
          <div v-if="myErrands.length === 0" class="empty">暂无跑腿发布</div>
          <div v-for="item in myErrands" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="meta" :class="{ accepted: item.status === 'accepted' }">
              ¥{{ item.reward }} · {{ item.status === 'accepted' ? '✅ 已被接取' : '待接取' }}
            </p>
          </div>
        </div>

        <div v-if="tab === 'joined'">
          <h3 style="margin-top:0">已加入的拼单</h3>
          <div v-if="joinedGroupBuys.length === 0" class="empty">暂无加入的拼单</div>
          <div v-for="item in joinedGroupBuys" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="desc">{{ item.description }}</p>
            <p class="meta">{{ item.location }} · 截止 {{ item.deadline }}</p>
          </div>

          <h3>已接取的跑腿</h3>
          <div v-if="acceptedErrands.length === 0" class="empty">暂无接取的跑腿</div>
          <div v-for="item in acceptedErrands" :key="item.id" class="card">
            <h4>{{ item.title }}</h4>
            <p class="desc">{{ item.description }}</p>
            <p class="meta">{{ item.from }} → {{ item.to }} · 酬劳 ¥{{ item.reward }}</p>
          </div>
        </div>
      </LoadStatus>
    </template>
  </section>
</template>

<style scoped>
.login-tip { text-align: center; padding: 48px 0; color: #999; }
.login-tip a { color: #409eff; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.tabs button { padding: 8px 20px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; font-size: 14px; }
.tabs button.active { background: #409eff; color: white; border-color: #409eff; }
.empty { text-align: center; padding: 24px; color: #999; }
.msg-item { border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; margin-bottom: 8px; }
.msg-item.unread { background: #f0f5ff; border-color: #409eff; }
.msg-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.time { color: #999; font-size: 12px; }
.msg-content { color: #333; font-size: 14px; margin: 0; }
h3 { margin: 20px 0 12px; font-size: 15px; }
.card { border: 1px solid #eee; border-radius: 8px; padding: 14px 16px; margin-bottom: 8px; }
.card h4 { margin: 0 0 6px; }
.desc { color: #666; font-size: 13px; margin: 0 0 6px; }
.meta { color: #999; font-size: 12px; margin: 0; }
.meta.accepted { color: #27ae60; }
</style>
