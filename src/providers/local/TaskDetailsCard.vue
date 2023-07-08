<template>
  <VCard>
    <VSkeletonLoader v-if="result.isLoading.value" type="card-avatar, actions" />
    <template v-else>
      <VCardTitle class="d-flex align-center">
        <VTextField
          v-model="state.title"
          density="compact"
          variant="plain"
          hint="Enter the new title"
        />
        <VSpacer />
        <VBtn icon="mdi-delete" variant="text" color="red" @click="onDelete" />
        <VBtn icon="mdi-content-save" variant="text" @click="onSave" />
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VCheckbox v-model="state.completed" label="Completed" hide-details color="primary" />
        <VCheckbox v-model="state.important" label="Important" hide-details color="primary" />
        <VTextarea v-model="state.description" label="Note" placeholder="Add notes..." />
        <VTextField
          type="datetime-local"
          clearable
          label="Due time"
          v-model="state.due"
          :hint="state.due"
        />
      </VCardText>
      <VDivider />
      <VExpansionPanels variant="accordion">
        <VExpansionPanel title="Details">
          <VExpansionPanelText>
            <VList density="comfortable">
              <VListItem
                prepend-icon="mdi-calendar"
                :subtitle="new Date(state.createdAt).toLocaleString()"
                title="Created At"
              />
              <VListItem
                prepend-icon="mdi-calendar"
                :subtitle="new Date(state.updatedAt).toLocaleString()"
                title="Updated At"
              />
            </VList>
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel title="Raw JSON">
          <VExpansionPanelText>
            <pre class="u-overflow-scroll">{{ JSON.stringify(state, null, '  ') }}</pre>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import type { IMsftTodoTask } from './types'
import { useAsyncState } from '@vueuse/core'
import { fetchMsft, type ILocalSourceData } from './core'
import type { IDataSource } from '@/database'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const props = defineProps<{
  source: IDataSource<ILocalSourceData>
  taskId: string
  taskListId: string
}>()

const emits = defineEmits<{
  close: []
}>()

const result = useAsyncState(
  async () => {
    const data = await fetchMsft<IMsftTodoTask>(
      props.source.data,
      `me/todo/lists/${props.taskListId}/tasks/${props.taskId}`
    )
    // convert to HTML datetime-local format
    let due = new Date(data.dueAt).toLocaleString()
    return {
      ...data,
      completed: +new Date(data.finishedAt) < Date.now(),
      important: data.importance >= 1,
      due
    }
  },
  null as never,
  { resetOnExecute: false, shallow: false }
)
const state = result.state

async function onDelete() {
  await fetchMsft(
    props.source.data,
    `me/todo/lists/${props.taskListId}/tasks/${props.taskId}`,
    {
      method: 'DELETE'
    },
    true
  )
  emits('close')
}

async function onSave() {
  const delta = JSON.parse(JSON.stringify(state.value))
  delta.importance = delta.important ? 1 : 0
  delta.finishedAt = delta.completed ? new Date().toISOString() : '2989-06-04T00:00:00.000Z'
  delta.dueAt = delta.due ? new Date(delta.due).toISOString() : '2989-06-04T00:00:00.000Z'
  await fetchMsft(
    props.source.data,
    `me/todo/lists/${props.taskListId}/tasks/${props.taskId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(delta)
    },
    true
  )
  emits('close')
}
</script>
