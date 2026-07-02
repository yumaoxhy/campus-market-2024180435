import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const ids = ref<number[]>([])
  const joinedGroupBuyIds = ref<number[]>([])
  const acceptedErrandIds = ref<number[]>([])

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

  function joinGroupBuy(id: number) {
    if (!joinedGroupBuyIds.value.includes(id)) {
      joinedGroupBuyIds.value.push(id)
    }
  }

  function hasJoinedGroupBuy(id: number) {
    return joinedGroupBuyIds.value.includes(id)
  }

  function acceptErrand(id: number) {
    if (!acceptedErrandIds.value.includes(id)) {
      acceptedErrandIds.value.push(id)
    }
  }

  function hasAcceptedErrand(id: number) {
    return acceptedErrandIds.value.includes(id)
  }

  return { ids, count, toggle, has, joinedGroupBuyIds, hasJoinedGroupBuy, joinGroupBuy, acceptedErrandIds, hasAcceptedErrand, acceptErrand }
}, {
  persist: true,
})
