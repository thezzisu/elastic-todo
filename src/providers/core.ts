import type { Component } from 'vue'

export interface IProvider {
  id: string
  name: string
  icon?: string

  components: {
    SourceAdd: Component
    TaskListList: Component
    TaskListAdd: Component
    TaskList: Component
  }
}

export const defineProvider = (provider: IProvider) => provider

export const providers: Record<string, IProvider> = Object.create(null)
