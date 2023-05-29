import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppState = defineStore('app_state', () => {
  const navBar = ref<boolean>()
  return { navBar }
})
