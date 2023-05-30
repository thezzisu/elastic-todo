<template>
  <VContainer>
    <VRow justify="center">
      <VCol>
        <VCard>
          <VCardTitle>{{ taskListInfo.state.value?.displayName }}</VCardTitle>
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
            />
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import type { IDataSource } from '@/database'
import { useAsyncState } from '@vueuse/core'
import { fetchMsft, type IMicrosoftToDoSourceData } from './core'
import { watch } from 'vue'

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
</script>
