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
      <!-- <VTextField
        type="datetime-local"
        clearable
        label="Due time"
        v-model="state.due"
        :hint="state.due"
      /> -->
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { fetchMsft, type ILocalSourceData } from './core'
import type { IDataSource } from '@/database'
import { reactive } from 'vue'

const props = defineProps<{
  source: IDataSource<ILocalSourceData>
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
    description: state.body.content,
    importance: 0,
    createdAt: new Date().toISOString(),
    dueAt: '2989-06-04T00:00:00.000Z',
    finishedAt: '2989-06-04T00:00:00.000Z',
    updatedAt: new Date().toISOString(),
    kindofevent: 1
  }
  await fetchMsft(
    props.source.data,
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
