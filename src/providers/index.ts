import { providers } from './core'
import microsoft from './microsoft'
import local from './local'

Object.assign(
  providers,
  Object.fromEntries([microsoft, local].map((provider) => [provider.id, provider]))
)

export * from './core'
