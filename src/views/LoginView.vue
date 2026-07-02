<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()

const isRegister = ref(false)
const loginName = ref('')
const password = ref('')
const regName = ref('')
const regPassword = ref('')
const regCampus = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  if (!loginName.value.trim() || !password.value.trim()) {
    error.value = '请输入用户名和密码'
    return
  }
  const ok = await user.login(loginName.value.trim(), password.value)
  if (!ok) {
    error.value = '用户名或密码错误'
    return
  }
  router.push('/')
}

async function handleRegister() {
  error.value = ''
  if (!regName.value.trim() || !regPassword.value.trim()) {
    error.value = '请输入用户名和密码'
    return
  }
  const ok = await user.register(regName.value.trim(), regPassword.value, '', regCampus.value.trim() || '校本部')
  if (!ok) {
    error.value = '用户名已存在'
    return
  }
  router.push('/')
}
</script>

<template>
  <section>
    <h2>{{ isRegister ? '注册' : '登录' }}</h2>
    <p>{{ isRegister ? '注册新账号' : '登录后可发布和管理内容。' }}</p>

    <form v-if="!isRegister" class="form" @submit.prevent="handleLogin">
      <div class="field">
        <label>用户名</label>
        <input v-model="loginName" placeholder="输入用户名" />
      </div>
      <div class="field">
        <label>密码</label>
        <input v-model="password" type="password" placeholder="输入密码" />
      </div>
      <span v-if="error" class="err">{{ error }}</span>
      <button type="submit" class="submit-btn">登录</button>
      <p class="switch" @click="isRegister = true">没有账号？去注册</p>
    </form>

    <form v-else class="form" @submit.prevent="handleRegister">
      <div class="field">
        <label>用户名</label>
        <input v-model="regName" placeholder="设置用户名" />
      </div>
      <div class="field">
        <label>密码</label>
        <input v-model="regPassword" type="password" placeholder="设置密码" />
      </div>
      <div class="field">
        <label>校区</label>
        <input v-model="regCampus" placeholder="如：校本部" />
      </div>
      <span v-if="error" class="err">{{ error }}</span>
      <button type="submit" class="submit-btn">注册</button>
      <p class="switch" @click="isRegister = false">已有账号？去登录</p>
    </form>
  </section>
</template>

<style scoped>
.form { max-width: 360px; }
.field { margin-bottom: 16px; }
.field label { display: block; font-weight: 500; margin-bottom: 4px; font-size: 14px; }
.field input { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
.err { color: #e74c3c; font-size: 13px; display: block; margin-bottom: 12px; }
.submit-btn { padding: 10px 32px; background: #409eff; color: white; border: none; border-radius: 6px; font-size: 15px; cursor: pointer; }
.submit-btn:hover { background: #337ecc; }
.switch { margin-top: 16px; text-align: center; color: #409eff; font-size: 13px; cursor: pointer; }
.switch:hover { text-decoration: underline; }
</style>
