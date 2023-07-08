<template>
  <VCard>
    <VCardTitle>Microsoft To Do</VCardTitle>
    <VCardText>
      <VTextField v-model="name" label="Data Source Name" />
      <VTextField v-model="url" label="" />
    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn variant="elevated" color="primary" @click="add">Add</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db } from '@/database'

const emits = defineEmits<{
  (event: 'close'): void
}>()

const name = ref('local')
const url = ref('http://localhost:8010/')

async function add() {
  await db.dataSources.add({
    providerId: 'local',
    name: name.value,
    data: {
      url: url.value
    }
  })
  emits('close')
}
</script>
