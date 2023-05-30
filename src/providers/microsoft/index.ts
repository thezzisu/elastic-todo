import { defineProvider } from '../core'
import SourceAdd from './SourceAdd.vue'

export default defineProvider({
  id: 'msft-todo',
  name: 'Microsoft To Do',
  components: {
    SourceAdd
  }
})
