import { defineProvider } from '../core'
import SourceAdd from './SourceAdd.vue'
import TaskListList from './TaskListList.vue'
import TaskListAdd from './TaskListAdd.vue'
import TaskList from './TaskList.vue'

export default defineProvider({
  id: 'local',
  name: 'Local',
  components: {
    SourceAdd,
    TaskListList,
    TaskListAdd,
    TaskList
  }
})
