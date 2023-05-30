<template>
  <template v-if="TaskList">
    <component :is="TaskList" :source="source" :taskListId="route.params.listId" />
  </template>
</template>

<script setup lang="ts">
import { db, useQuery } from '@/database'
import { providers } from '@/providers'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const source = useQuery(() => db.dataSources.get({ id: +route.params.sourceId }))
const TaskList = computed(
  () => source.value && providers[source.value.providerId].components.TaskList
)
</script>
