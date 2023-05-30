import { defineProvider } from '../core'
import SourceAdd from './SourceAdd.vue'
import TaskListList from './TaskListList.vue'
import TaskList from './TaskList.vue'

export default defineProvider({
  id: 'msft-todo',
  name: 'Microsoft To Do',
  components: {
    SourceAdd,
    TaskListList,
    TaskList
  }
})
