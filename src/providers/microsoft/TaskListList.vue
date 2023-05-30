<template>
  <VListItem
    v-for="list of resp.state.value"
    :key="list.id"
    :title="list.displayName"
    subtitle="Microsoft To Do"
    prepend-icon="mdi-format-list-bulleted"
    :to="`/list/${source.id}/${list.id}`"
  />
</template>

<script setup lang="ts">
import type { IDataSource } from '@/database'
import { useAsyncState } from '@vueuse/core'
import { type IMicrosoftToDoSourceData, fetchMsft } from './core'

const props = defineProps<{
  source: IDataSource<IMicrosoftToDoSourceData>
}>()

const resp = useAsyncState(
  async () => {
    const data = await fetchMsft(props.source.data.account, 'me/todo/lists')
    return data.value
  },
  [],
  {
    immediate: true
  }
)
</script>
