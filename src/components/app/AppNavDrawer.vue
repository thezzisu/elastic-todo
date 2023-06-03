<template>
  <VNavigationDrawer v-model="appState.navBar">
    <VList nav>
      <VListItem v-for="(link, i) of links" :key="i" v-bind="link" />
      <VDivider />
      <template v-for="source of sources.sources" :key="source.id">
        <component :is="providers[source.providerId].components.TaskListList" :source="source" />
      </template>
    </VList>
    <template #append>
      <div class="d-flex">
        <TaskListCreateBtn :sources="sources.sources" />
        <VBtn icon="mdi-cog" variant="text" to="/settings" />
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { providers } from '@/providers'
import { useAppState } from '@/stores/app'
import { useDataSources } from '@/stores/source'
import type { PropsType } from '@/utils/types'
import type { VListItem } from 'vuetify/components'
import TaskListCreateBtn from '../settings/TaskListCreateBtn.vue'

const appState = useAppState()

const links: Array<PropsType<VListItem>> = [
  { prependIcon: 'mdi-home', to: '/', title: 'Home' },
  { prependIcon: 'mdi-weather-sunny', to: '/my-day', title: 'My Day' }
  // { prependIcon: 'mdi-notification-clear-all', to: '/all-tasks', title: 'All tasks' }
]

const sources = useDataSources()
</script>
