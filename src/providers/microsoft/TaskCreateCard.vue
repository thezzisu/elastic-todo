<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VTextField
        v-model="state.title"
        density="compact"
        variant="plain"
        placeholder="Title"
        hint="Enter the new title"
      />
      <VSpacer />
      <VBtn icon="mdi-content-save" variant="text" @click="onSave" />
    </VCardTitle>
    <VDivider />
    <VCardText>
      <VTextarea v-model="state.body.content" label="Note" placeholder="Add notes..." />
      <VTextField
        type="datetime-local"
        clearable
        label="Due time"
        v-model="state.due"
        :hint="state.due"
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { fetchMsft, type IMicrosoftToDoSourceData } from './core'
import type { IDataSource } from '@/database'
import { reactive } from 'vue'

const props = defineProps<{
  source: IDataSource<IMicrosoftToDoSourceData>
  taskListId: string
}>()

const emits = defineEmits<{
  close: []
}>()

const state = reactive({
  title: '',
  body: {
    content: ''
  },
  due: ''
})

async function onSave() {
  const delta = {
    title: state.title,
    status: 'notStarted',
    importance: 'normal',
    dueDateTime: state.due
      ? {
          dateTime: state.due,
          timeZone: 'UTC'
        }
      : null
  }
  await fetchMsft(
    props.source.data.account,
    `me/todo/lists/${props.taskListId}/tasks`,
    {
      method: 'POST',
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
