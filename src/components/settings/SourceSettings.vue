<template>
  <VCard title="Data Sources">
    <VList>
      <VListItem
        v-for="source of store.sources"
        :key="source.id"
        :title="source.name"
        :prepend-icon="icons[source.providerId] ?? 'mdi-database'"
      >
        <template #append>
          <VIcon icon="mdi-delete" @click="remove(source.id!)" />
        </template>
      </VListItem>
    </VList>
    <VCardActions>
      <VSpacer />
      <SourceAddBtn />
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { useDataSources } from '@/stores/source'
import SourceAddBtn from './SourceAddBtn.vue'
import { providers } from '@/providers'
import { db } from '@/database'

const store = useDataSources()
const icons = Object.fromEntries(providers.map((p) => [p.id, p.icon]))

async function remove(id: number) {
  await db.dataSources.delete(id)
}
</script>
