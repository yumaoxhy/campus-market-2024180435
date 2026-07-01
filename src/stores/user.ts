import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Account {
  name: string
  password: string
  role: 'normal' | 'admin'
  campus: string
  phone: string
}

const accounts: Account[] = [
  { name: '000', password: '123456', role: 'admin', campus: '校本部', phone: '139****0000' },
]

function nextId() {
  return accounts.length + 1
}

export const useUserStore = defineStore('user', () => {
  const id = ref(0)
  const name = ref('')
  const phone = ref('')
  const campus = ref('')
  const role = ref<'normal' | 'admin'>('normal')
  const isLoggedIn = ref(false)

  const isAdmin = computed(() => isLoggedIn.value && role.value === 'admin')

  function login(loginName: string, password: string) {
    const account = accounts.find(a => a.name === loginName && a.password === password)
    if (!account) return false
    id.value = accounts.indexOf(account) + 1
    name.value = account.name
    phone.value = account.phone
    campus.value = account.campus
    role.value = account.role
    isLoggedIn.value = true
    return true
  }

  function register(regName: string, regPassword: string, regPhone: string, regCampus: string) {
    if (accounts.find(a => a.name === regName)) return false
    accounts.push({ name: regName, password: regPassword, role: 'normal', campus: regCampus, phone: regPhone })
    id.value = nextId()
    name.value = regName
    phone.value = regPhone
    campus.value = regCampus
    role.value = 'normal'
    isLoggedIn.value = true
    return true
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
})
