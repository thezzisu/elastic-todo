<template>
  <VContainer class="fill-height align-start">
    <VRow>
      <VCol cols="12">
        <SourceSettings />
      </VCol>
      <VCol cols="12">
        <UISettings />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import SourceSettings from '@/components/settings/SourceSettings.vue'
import UISettings from '@/components/settings/UISettings.vue'
import { withTitle } from '@/utils/withs'

withTitle('Settings')
</script>
