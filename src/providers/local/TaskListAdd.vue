<template>
  <VCard title="Add Task List" subtitle="Microsoft To Do">
    <VCardText>
      <VTextField v-model="name" label="Task List Name" />
    </VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn variant="elevated" color="primary" @click="add">Add</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type IDataSource } from '@/database'
import { fetchMsft, type ILocalSourceData } from './core'

const props = defineProps<{
  source: IDataSource<ILocalSourceData>
}>()

const emits = defineEmits<{
  (event: 'close'): void
}>()

const name = ref('')

async function add() {
  await fetchMsft(props.source.data, 'me/todo/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      displayName: name.value
    })
  })
  emits('close')
  location.reload()
}
</script>
