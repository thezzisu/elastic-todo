<template>
  <VMenu>
    <template v-slot:activator="{ props }">
      <VBtn
        color="primary"
        v-bind="props"
        prepend-icon="mdi-plus"
        text="Add Provider"
        variant="elevated"
      />
    </template>
    <VList>
      <VListItem
        v-for="provider of providers"
        :key="provider.id"
        :prepend-icon="provider.icon ?? 'mdi-database'"
        :title="provider.name"
        @click="showAddSourceDialog(provider)"
      />
    </VList>
  </VMenu>
  <VDialog v-model="dialog" class="u-max-w-128">
    <component :is="addSourceComponent" @close="dialog = false" />
  </VDialog>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { providers } from '@/providers'
import type { IProvider } from '@/providers'
import type { Component } from 'vue'

const dialog = ref(false)
const addSourceComponent = shallowRef<Component>()

function showAddSourceDialog(provider: IProvider) {
  addSourceComponent.value = provider.components.SourceAdd
  dialog.value = true
}
</script>
