<template>
  <VCard>
    <VCardTitle>Microsoft To Do</VCardTitle>
    <VCardText>
      <VTextField v-model="name" label="Data Source Name" />
      <VTextField v-model="token" label="Auth Token" />
    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn @click="getToken">Get Token</VBtn>
      <VBtn variant="elevated" color="primary" @click="add">Add</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import * as msal from '@azure/msal-browser'
import { useRouter } from 'vue-router'
import { db } from '@/database'

const emits = defineEmits<{
  (event: 'close'): void
}>()

const token = ref('')
const name = ref('')
const router = useRouter()

const { href: redirectUri } = router.resolve('/callback')

async function getToken() {
  const msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_MSFT_CLIENT_ID,
      redirectUri
    },
    cache: {
      cacheLocation: 'localStorage'
    }
  }

  const msalInstance = new msal.PublicClientApplication(msalConfig)

  const loginRequest = {
    scopes: ['user.read', 'Tasks.ReadWrite']
  }

  const resp = await msalInstance.loginPopup(loginRequest)
  token.value = resp.accessToken

  const user = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
      Authorization: `Bearer ${resp.accessToken}`
    }
  }).then((res) => res.json())
  name.value ||= user.displayName + ' (Microsoft To Do)'
}

async function add() {
  await db.dataSources.add({
    providerId: 'msft-todo',
    name: name.value,
    data: {
      token: token.value
    }
  })
  emits('close')
}
</script>
