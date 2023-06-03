<template>
  <DialogProvider>
    <VApp :style="{ background: appState.background }">
      <AppBar />
      <AppNavDrawer />
      <VMain>
        <RouterView />
      </VMain>
    </VApp>
  </DialogProvider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBar from '@/components/app/AppBar.vue'
import AppNavDrawer from '@/components/app/AppNavDrawer.vue'
import { useAppState } from './stores/app'
import DialogProvider from './components/providers/DialogProvider.vue'

const appState = useAppState()
</script>
