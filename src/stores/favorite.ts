import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const ids = ref<number[]>([])

  const count = computed(() => ids.value.length)

  function toggle(id: number) {
    const idx = ids.value.indexOf(id)
    if (idx === -1) {
      ids.value.push(id)
    } else {
      ids.value.splice(idx, 1)
    }
  }

  function has(id: number) {
    return ids.value.includes(id)
  }

  return { ids, count, toggle, has }
})
