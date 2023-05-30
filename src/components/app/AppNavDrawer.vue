<template>
  <VNavigationDrawer v-model="appState.navBar">
    <VList nav>
      <VListItem v-for="(link, i) of links" :key="i" v-bind="link" />
      <VDivider />
    </VList>
    <template #append>
      <div class="d-flex">
        <VListItem
          prepend-icon="mdi-playlist-plus"
          title="New list"
          to="/list/new"
          class="flex-fill"
        />
        <VBtn icon="mdi-cog" variant="text" to="/settings" />
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useAppState } from '@/stores/app'
import type { PropsType } from '@/utils/types'
import type { VListItem } from 'vuetify/components'

const appState = useAppState()

const links: Array<PropsType<VListItem>> = [
  { prependIcon: 'mdi-home', to: '/', title: 'Home' },
  { prependIcon: 'mdi-weather-sunny', to: '/my-day', title: 'My Day' },
  { prependIcon: 'mdi-notification-clear-all', to: '/all-tasks', title: 'All tasks' }
]
</script>
