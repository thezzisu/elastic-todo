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
        <VTextarea v-model="state.body.content" label="Note" placeholder="Add notes..." />
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
                :subtitle="new Date(state.createdDateTime).toLocaleString()"
                title="Created At"
              />
              <VListItem
                prepend-icon="mdi-calendar"
                :subtitle="new Date(state.lastModifiedDateTime).toLocaleString()"
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
import { fetchMsft, type IMicrosoftToDoSourceData } from './core'
import type { IDataSource } from '@/database'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const props = defineProps<{
  source: IDataSource<IMicrosoftToDoSourceData>
  taskId: string
  taskListId: string
}>()

const emits = defineEmits<{
  close: []
}>()

const result = useAsyncState(
  async () => {
    const data = await fetchMsft<IMsftTodoTask>(
      props.source.data.account,
      `me/todo/lists/${props.taskListId}/tasks/${props.taskId}`
    )
    // convert to HTML datetime-local format
    let due = ''
    if (data.dueDateTime) {
      const { dateTime } = data.dueDateTime
      // timeZone is always UTC
      const date = new Date(dateTime + 'Z')
      due = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -1)
    }
    return {
      ...data,
      completed: data.status === 'completed',
      important: data.importance === 'high',
      due
    }
  },
  null as never,
  { resetOnExecute: false, shallow: false }
)
const state = result.state

async function onDelete() {
  await fetchMsft(
    props.source.data.account,
    `me/todo/lists/${props.taskListId}/tasks/${props.taskId}`,
    {
      method: 'DELETE'
    },
    true
  )
  emits('close')
}

async function onSave() {
  const delta = {
    status: state.value.completed ? 'completed' : 'notStarted',
    importance: state.value.important ? 'high' : 'normal',
    dueDateTime: state.value.due
      ? {
          dateTime: state.value.due,
          timeZone: 'UTC'
        }
      : null
  }
  await fetchMsft(
    props.source.data.account,
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
