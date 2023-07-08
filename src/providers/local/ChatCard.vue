<template>
  <VCard>
    <VCardTitle class="d-flex align-center"> Chat with AI </VCardTitle>
    <VDivider />
    <VCardText>
      <VTextField
        clearable
        label="Your prompt here..."
        v-model="prompt"
        append-icon="mdi-send"
        @click:append="request"
      />
      <VSkeletonLoader v-if="loading" type="paragraph" />
      <template v-else-if="answer">
        <VCardSubtitle>AI Suggestions</VCardSubtitle>
        <VExpansionPanels>
          <VExpansionPanel v-for="(item, i) in answer" :key="i" :title="item.name">
            <VExpansionPanelText>
              <pre>{{ JSON.stringify(item, null, 2) }}</pre>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </template>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { fetchMsft, type ILocalSourceData } from './core'
import type { IDataSource } from '@/database'
import { ref } from 'vue'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const props = defineProps<{
  source: IDataSource<ILocalSourceData>
  taskListId: string
}>()

const prompt = ref('')
const loading = ref(false)
const answer = ref<any[]>([])

async function request() {
  loading.value = true
  const data = await fetchMsft(props.source.data, `me/todo/lists/${props.taskListId}/gptreq`, {
    method: 'POST',
    body: JSON.stringify({
      gptreq: prompt.value
    })
  })
  loading.value = false
  answer.value = data.value
}
</script>
