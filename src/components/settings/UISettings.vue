<template>
  <VCard title="UI Settings">
    <VList>
      <VListItem prepend-icon="mdi-git" :title="hash" subtitle="Git Hash" />
    </VList>
  </VCard>
</template>

<script setup lang="ts">
const hash = __GIT_HASH__
</script>
