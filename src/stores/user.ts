import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/user'

const adminAccount = { name: '000', password: '123456', role: 'admin' as const, campus: '校本部', phone: '139****0000' }

interface ApiUser {
  id: number
  name: string
  password: string
  role: 'normal' | 'admin'
  campus: string
  phone: string
}

export const useUserStore = defineStore('user', () => {
  const id = ref(0)
  const name = ref('')
  const phone = ref('')
  const campus = ref('')
  const role = ref<'normal' | 'admin'>('normal')
  const isLoggedIn = ref(false)

  const isAdmin = computed(() => isLoggedIn.value && role.value === 'admin')

  async function login(loginName: string, password: string) {
    // 管理员：硬编码校验
    if (loginName === adminAccount.name && password === adminAccount.password) {
      id.value = 999
      name.value = adminAccount.name
      phone.value = adminAccount.phone
      campus.value = adminAccount.campus
      role.value = adminAccount.role
      isLoggedIn.value = true
      return true
    }
    // 普通用户：从 API 查
    try {
      const res = await userApi.list()
      const users = res.data as ApiUser[]
      const user = users.find((u: ApiUser) => u.name === loginName && u.password === password)
      if (!user) return false
      id.value = user.id
      name.value = user.name
      phone.value = user.phone || ''
      campus.value = user.campus || ''
      role.value = 'normal'
      isLoggedIn.value = true
      return true
    } catch {
      return false
    }
  }

  async function register(regName: string, regPassword: string, regPhone: string, regCampus: string) {
    if (regName === adminAccount.name) return false
    try {
      const res = await userApi.list()
      const users = res.data as ApiUser[]
      if (users.find((u: ApiUser) => u.name === regName)) return false
      const created = await userApi.create({ name: regName, password: regPassword, role: 'normal', campus: regCampus || '校本部', phone: regPhone })
      const newUser = created.data as ApiUser
      id.value = newUser.id
      name.value = newUser.name
      phone.value = newUser.phone || ''
      campus.value = newUser.campus || ''
      role.value = 'normal'
      isLoggedIn.value = true
      return true
    } catch {
      return false
    }
  }

  function logout() {
    id.value = 0
    name.value = ''
    phone.value = ''
    campus.value = ''
    role.value = 'normal'
    isLoggedIn.value = false
  }

  return { id, name, phone, campus, role, isLoggedIn, isAdmin, login, register, logout }
}, {
  persist: true,
})
