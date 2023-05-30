import type { Component } from 'vue'

export interface Provider {
  id: string
  name: string
  icon?: string

  components: {
    SourceAdd: Component
  }
}

export const defineProvider = (provider: Provider) => provider
