<template>
  <VContainer>
    <VRow justify="center">
      <VCol>
        <VCard>
          <VCardTitle class="d-flex align-center">
            <div>{{ taskListInfo.state.value?.displayName }}</div>
            <VSpacer />
            <VDialog v-model="createDialog" class="u-max-w-256">
              <template v-slot:activator="{ props }">
                <VBtn v-bind="props" icon="mdi-plus" variant="text" color="blue" />
              </template>
              <TaskCreateCard
                :source="props.source"
                :taskListId="props.taskListId"
                @close="onDialogClose"
              />
            </VDialog>
            <VBtn icon="mdi-delete" variant="text" color="red" @click="onDelete" />
            <VBtn icon="mdi-form-textbox" variant="text" @click="onRename" />
          </VCardTitle>
          <VDivider />
          <VList>
            <VListItem
              v-for="task of tasks.state.value"
              :key="task.id"
              :title="task.title"
              :subtitle="task.body.content"
              :prepend-icon="
                task.status === 'completed' ? 'mdi-check' : 'mdi-checkbox-blank-outline'
              "
              @click="focusTask(task)"
            />
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
  <VDialog v-model="detailsDialog" class="u-max-w-256">
    <TaskDetailsCard
      :source="props.source"
      :task-id="currentTaskId"
      :taskListId="props.taskListId"
      @close="onDialogClose"
    />
  </VDialog>
</template>

<script setup lang="ts">
import type { IDataSource } from '@/database'
import { useAsyncState } from '@vueuse/core'
import { fetchMsft, type IMicrosoftToDoSourceData } from './core'
import { watch } from 'vue'
import { useDialog } from '@/utils/dialog'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { IMsftTodoTask } from './types'
import TaskDetailsCard from './TaskDetailsCard.vue'
import TaskCreateCard from './TaskCreateCard.vue'

const props = defineProps<{
  source: IDataSource<IMicrosoftToDoSourceData>
  taskListId: string
}>()

const taskListInfo = useAsyncState(
  async () => {
    const data = await fetchMsft(props.source.data.account, `me/todo/lists/${props.taskListId}`)
    return data
  },
  null,
  {
    immediate: true
  }
)

const tasks = useAsyncState(
  async () => {
    const data = await fetchMsft(
      props.source.data.account,
      `me/todo/lists/${props.taskListId}/tasks`
    )
    return data.value
  },
  [],
  {
    immediate: true
  }
)

watch(
  () => props.taskListId,
  () => {
    taskListInfo.execute()
    tasks.execute()
  }
)

const dialog = useDialog()
const router = useRouter()

async function onDelete() {
  if (await dialog.confirm('Are you sure you want to delete this task list?')) {
    await fetchMsft(
      props.source.data.account,
      `me/todo/lists/${props.taskListId}`,
      {
        method: 'DELETE'
      },
      true
    )
    location.href = router.resolve('/').href
  }
}

async function onRename() {
  const newName = await dialog.input('Enter a new name for this task list')
  if (newName) {
    await fetchMsft(props.source.data.account, `me/todo/lists/${props.taskListId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        displayName: newName
      })
    })
    location.reload()
  }
}

const detailsDialog = ref(false)
const currentTaskId = ref('')

function focusTask(task: IMsftTodoTask) {
  currentTaskId.value = task.id
  detailsDialog.value = true
}

function onDialogClose() {
  detailsDialog.value = false
  createDialog.value = false
  tasks.execute()
}

const createDialog = ref(false)
</script>
