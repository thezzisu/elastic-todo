<template>
  <VCard>
    <VCardTitle>Microsoft To Do</VCardTitle>
    <VCardText>
      <VTextField v-model="name" label="Data Source Name" />
      <VTextField :model-value="account?.username" label="Microsoft Username" readonly />
    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn @click="selectAccount">Select Account</VBtn>
      <VBtn variant="elevated" color="primary" @click="add" :disabled="!account">Add</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as msal from '@azure/msal-browser'
import { db } from '@/database'
import { shallowRef } from 'vue'
import { loginMsft } from './core'

const emits = defineEmits<{
  (event: 'close'): void
}>()

const name = ref('')
const account = shallowRef<msal.AccountInfo>()

async function selectAccount() {
  const result = await loginMsft()
  if (result) {
    name.value ||= result.username + ' (Microsoft To Do)'
    account.value = result
  }
}

async function add() {
  await db.dataSources.add({
    providerId: 'msft-todo',
    name: name.value,
    data: {
      account: account.value
    }
  })
  emits('close')
}
</script>
