import { providers } from './core'
import microsoft from './microsoft'

Object.assign(providers, Object.fromEntries([microsoft].map((provider) => [provider.id, provider])))

export * from './core'
