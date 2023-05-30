import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'

export const useAppState = defineStore('app_state', () => {
  const navBar = ref<boolean>()
  const title = useTitle()
  const background = ref(
    'url(https://asset.zisu.dev/api/pixiv/img/img-original/img/2022/04/03/22/31/01/97385469_p0.jpg)'
  )
  return { navBar, title, background }
})
