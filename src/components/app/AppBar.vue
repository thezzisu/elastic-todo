<template>
  <VAppBar border>
    <VAppBarNavIcon @click="appState.navBar = !appState.navBar" />
    <VAppBarTitle>ElasticTODO</VAppBarTitle>
  </VAppBar>
</template>

<script setup lang="ts">
import { useAppState } from '@/stores/app'

const appState = useAppState()
</script>
