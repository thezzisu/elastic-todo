import { useAppState } from '@/stores/app'
import { onUnmounted } from 'vue'

export const withTitle = (title: string) => {
  const appState = useAppState()
  const oldTitle = appState.title
  appState.title = title
  onUnmounted(() => {
    appState.title = oldTitle
  })
}
