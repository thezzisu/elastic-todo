<template>
  <slot />
  <VDialog v-model="alertDialog" persistent class="u-max-w-128">
    <VCard>
      <VCardTitle>Alert</VCardTitle>
      <VCardText>{{ alertMsg }}</VCardText>
      <VCardActions>
        <VBtn color="primary" variant="elevated" @click="alertCb()">OK</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="confirmDialog" persistent class="u-max-w-128">
    <VCard>
      <VCardTitle>Confirm</VCardTitle>
      <VCardText>{{ confirmMsg }}</VCardText>
      <VCardActions>
        <VBtn color="primary" @click="confirmCb(false)"> Cancel </VBtn>
        <VBtn color="primary" @click="confirmCb(true)"> Confirm </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <VDialog v-model="inputDialog" persistent class="u-max-w-128">
    <VCard>
      <VCardTitle>Input</VCardTitle>
      <VCardText>
        {{ inputMsg }}
        <VTextField v-model="inputVal" />
      </VCardText>
      <VCardActions>
        <VBtn color="primary" @click="inputCb(null)"> Cancel </VBtn>
        <VBtn color="primary" @click="inputCb(inputVal)"> OK </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { dialog } from '@/utils/dialog'
import { ref } from 'vue'
import { provide } from 'vue'

const alertDialog = ref(false)
const alertMsg = ref('')
let alertCb = () => {}

const confirmDialog = ref(false)
const confirmMsg = ref('')
let confirmCb = (_val: boolean) => {}

const inputDialog = ref(false)
const inputMsg = ref('')
const inputVal = ref('')
let inputCb = (_val: string | null) => {}

provide(dialog, {
  alert(message) {
    return new Promise((resolve) => {
      alertMsg.value = message
      alertDialog.value = true
      alertCb = () => {
        alertDialog.value = false
        resolve()
      }
    })
  },
  confirm(message) {
    return new Promise<boolean>((resolve) => {
      confirmMsg.value = message
      confirmDialog.value = true
      confirmCb = (val) => {
        confirmDialog.value = false
        resolve(val)
      }
    })
  },
  input(message) {
    return new Promise<string | null>((resolve) => {
      inputMsg.value = message
      inputVal.value = ''
      inputDialog.value = true
      inputCb = (val) => {
        inputDialog.value = false
        resolve(val)
      }
    })
  }
})
</script>
