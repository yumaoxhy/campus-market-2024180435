import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(1)
  const name = ref('当前用户')
  const phone = ref('138****1234')
  const campus = ref('校本部')

  return { id, name, phone, campus }
})
