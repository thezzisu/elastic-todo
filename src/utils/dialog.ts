import type { InjectionKey } from 'vue'
import { inject } from 'vue'

export interface IDialog {
  alert: (message: string) => Promise<void>
  confirm: (message: string) => Promise<boolean>
  input: (message: string) => Promise<string | null>
}

export const dialog: InjectionKey<IDialog> = Symbol('dialog')

export const useDialog = () => {
  const inst = inject(dialog)
  if (!inst) throw new Error('no dialog provided')
  return inst
}
