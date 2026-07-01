<script setup lang="ts">
import { ref } from 'vue'
import { tradeApi } from '@/api/trade'
import { lostFoundApi } from '@/api/lostFound'
import { groupBuyApi } from '@/api/groupBuy'
import { errandApi } from '@/api/errand'
import FormField from '@/components/FormField.vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const publishType = ref('')
const title = ref('')
const description = ref('')
const location = ref('')
const price = ref<number | null>(null)
const condition = ref('')
const category = ref('')
const itemName = ref('')
const contact = ref('')
const lostType = ref('lost')
const groupType = ref('')
const targetCount = ref<number | null>(null)
const taskType = ref('')
const reward = ref<number | null>(null)
const from = ref('')
const to = ref('')
const deadline = ref('')
const submitted = ref(false)

const errors = ref<Record<string, string>>({})

const typeOptions = [
  { value: '', label: '-- 请选择 --' },
  { value: 'trade', label: '二手交易' },
  { value: 'lostFound', label: '失物招领' },
  { value: 'groupBuy', label: '拼单搭子' },
  { value: 'errand', label: '跑腿委托' },
]

const categoryOptions = ['数码配件', '教材资料', '生活电器', '出行工具', '其他']
const conditionOptions = ['全新', '九成新', '八成新', '七成新', '五成新以下']
const groupTypeOptions = ['拼餐', '学习资料', '运动', '其他']
const taskTypeOptions = ['取快递', '代买', '代跑腿']

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!publishType.value) e.type = '请选择发布类型'
  if (!title.value.trim() || title.value.length < 2) e.title = '标题至少 2 个字符'
  if (!description.value.trim() || description.value.length < 10) e.description = '描述至少 10 个字符'
  if (!location.value.trim()) e.location = '请填写地点'

  if (publishType.value === 'trade') {
    if (!price.value || price.value <= 0) e.price = '请输入有效价格'
    if (!category.value) e.category = '请选择分类'
    if (!condition.value) e.condition = '请选择成色'
  }
  if (publishType.value === 'lostFound') {
    if (!itemName.value.trim()) e.itemName = '请输入物品名称'
    if (!contact.value.trim()) e.contact = '请输入联系方式'
  }
  if (publishType.value === 'groupBuy') {
    if (!groupType.value) e.groupType = '请选择拼单类型'
    if (!targetCount.value || targetCount.value < 2) e.targetCount = '目标人数至少为 2'
    if (!deadline.value) e.deadline = '请选择截止时间'
  }
  if (publishType.value === 'errand') {
    if (!taskType.value) e.taskType = '请选择任务类型'
    if (!reward.value || reward.value <= 0) e.reward = '请输入有效酬劳'
    if (!from.value.trim()) e.from = '请填写起始地点'
    if (!to.value.trim()) e.to = '请填写送达地点'
    if (!deadline.value) e.deadline = '请选择截止时间'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return

  const now = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const base = {
    title: title.value.trim(),
    description: description.value.trim(),
    location: location.value.trim(),
    publisher: user.name,
    status: 'open',
    publishTime: now,
  }

  let res
  switch (publishType.value) {
    case 'trade':
      res = await tradeApi.create({ ...base, price: price.value, condition: condition.value, category: category.value })
      break
    case 'lostFound':
      res = await lostFoundApi.create({ ...base, type: lostType.value, itemName: itemName.value.trim(), contact: contact.value.trim(), eventTime: now })
      break
    case 'groupBuy':
      res = await groupBuyApi.create({ ...base, type: groupType.value, targetCount: targetCount.value, currentCount: 1, deadline: deadline.value })
      break
    case 'errand':
      res = await errandApi.create({ ...base, taskType: taskType.value, reward: reward.value, from: from.value.trim(), to: to.value.trim(), deadline: deadline.value })
      break
  }

  if (res && res.status === 201) {
    submitted.value = true
  }
}

function resetForm() {
  publishType.value = ''
  title.value = ''
  description.value = ''
  location.value = ''
  price.value = null
  condition.value = ''
  category.value = ''
  itemName.value = ''
  contact.value = ''
  lostType.value = 'lost'
  groupType.value = ''
  targetCount.value = null
  taskType.value = ''
  reward.value = null
  from.value = ''
  to.value = ''
  deadline.value = ''
  errors.value = {}
  submitted.value = false
}
</script>

<template>
  <section>
    <h2>发布信息</h2>
    <p>选择发布类型，填写对应信息。</p>

    <div v-if="submitted" class="success">
      <p>✅ 发布成功！</p>
      <button @click="resetForm">继续发布</button>
    </div>

    <form v-else @submit.prevent="submit" class="form">
      <FormField label="发布类型" required :error="errors.type">
        <select v-model="publishType">
          <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </FormField>

      <template v-if="publishType">
        <FormField label="标题" required :error="errors.title">
          <input v-model="title" placeholder="请输入标题" />
        </FormField>

        <FormField label="描述" required :error="errors.description">
          <textarea v-model="description" placeholder="请详细描述" rows="4"></textarea>
        </FormField>

        <FormField label="地点" required :error="errors.location">
          <input v-model="location" placeholder="如：校本部、东区宿舍" />
        </FormField>

        <div v-if="publishType === 'trade'" class="field-group">
          <FormField label="价格 (¥)" required :error="errors.price">
            <input v-model.number="price" type="number" min="0" placeholder="0" />
          </FormField>
          <FormField label="分类" required :error="errors.category">
            <select v-model="category">
              <option value="">-- 请选择 --</option>
              <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
            </select>
          </FormField>
          <FormField label="成色" required :error="errors.condition">
            <select v-model="condition">
              <option value="">-- 请选择 --</option>
              <option v-for="c in conditionOptions" :key="c" :value="c">{{ c }}</option>
            </select>
          </FormField>
        </div>

        <div v-if="publishType === 'lostFound'" class="field-group">
          <FormField label="类型" required>
            <select v-model="lostType">
              <option value="lost">寻物</option>
              <option value="found">拾到</option>
            </select>
          </FormField>
          <FormField label="物品名称" required :error="errors.itemName">
            <input v-model="itemName" placeholder="如：黑色校园卡" />
          </FormField>
          <FormField label="联系方式" required :error="errors.contact">
            <input v-model="contact" placeholder="手机号或微信" />
          </FormField>
        </div>

        <div v-if="publishType === 'groupBuy'" class="field-group">
          <FormField label="拼单类型" required :error="errors.groupType">
            <select v-model="groupType">
              <option value="">-- 请选择 --</option>
              <option v-for="t in groupTypeOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </FormField>
          <FormField label="目标人数" required :error="errors.targetCount">
            <input v-model.number="targetCount" type="number" min="2" placeholder="2" />
          </FormField>
          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="deadline" type="datetime-local" />
          </FormField>
        </div>

        <div v-if="publishType === 'errand'" class="field-group">
          <FormField label="任务类型" required :error="errors.taskType">
            <select v-model="taskType">
              <option value="">-- 请选择 --</option>
              <option v-for="t in taskTypeOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </FormField>
          <FormField label="酬劳 (¥)" required :error="errors.reward">
            <input v-model.number="reward" type="number" min="0" placeholder="0" />
          </FormField>
          <FormField label="起始地点" required :error="errors.from">
            <input v-model="from" placeholder="如：菜鸟驿站" />
          </FormField>
          <FormField label="送达地点" required :error="errors.to">
            <input v-model="to" placeholder="如：宿舍楼下" />
          </FormField>
          <FormField label="截止时间" required :error="errors.deadline">
            <input v-model="deadline" type="datetime-local" />
          </FormField>
        </div>

        <button type="submit" class="submit-btn">提交发布</button>
      </template>
    </form>
  </section>
</template>

<style scoped>
.form { max-width: 600px; }
:deep(input), :deep(select), :deep(textarea) {
  width: 100%; padding: 8px 12px; border: 1px solid #ddd;
  border-radius: 6px; font-size: 14px; box-sizing: border-box;
}
:deep(textarea) { resize: vertical; }
.field-group {
  border: 1px solid #eee; border-radius: 8px; padding: 16px;
  margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
}
.submit-btn {
  padding: 10px 32px; background: #409eff; color: white;
  border: none; border-radius: 6px; font-size: 15px; cursor: pointer;
}
.submit-btn:hover { background: #337ecc; }
.success { text-align: center; padding: 48px 0; }
.success p { font-size: 20px; margin-bottom: 16px; }
.success button { padding: 8px 24px; border: 1px solid #409eff; color: #409eff; background: white; border-radius: 6px; cursor: pointer; }
</style>
