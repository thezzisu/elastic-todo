<template>
  <VListItem prepend-icon="mdi-playlist-plus" title="New list" class="flex-fill" @click="''">
    <VMenu activator="parent">
      <VList>
        <VListItem
          v-for="source of props.sources"
          :key="source.id"
          :prepend-icon="providers[source.providerId].icon ?? 'mdi-database'"
          :title="source.name"
          @click="showCreateDialog(source)"
        />
      </VList>
    </VMenu>
  </VListItem>
  <VDialog v-model="dialog" class="u-max-w-128">
    <component :is="activeComponent" :source="activeSource" @close="dialog = false" />
  </VDialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { providers } from '@/providers'
import type { Component } from 'vue'
import type { IDataSource } from '@/database'

const props = defineProps<{
  sources: IDataSource[]
}>()

const dialog = ref(false)
const activeSource = shallowRef<IDataSource>()
const activeComponent = shallowRef<Component>()

function showCreateDialog(source: IDataSource) {
  activeSource.value = source
  activeComponent.value = providers[source.providerId].components.TaskListAdd
  dialog.value = true
}
</script>
