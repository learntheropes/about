<script setup>
import { deploymentDomain } from '~/assets/js/deployment'

const props = defineProps({
  filename: { type: String, required: true }
})

const { t } = useI18n()
const href = `${deploymentDomain}/${props.filename}`
</script>

<template>
  <div class="flex gap-3 not-prose">
    <a :href="href" target="_blank" rel="noopener noreferrer"
      class="flex-1 rounded-lg border overflow-hidden transition hover:opacity-80 px-4 py-3 text-center"
      style="border-color: var(--ui-border)">
      {{ t('cvView') }}
    </a>
    <a :href="href" :download="filename"
      class="flex-1 rounded-lg border overflow-hidden transition hover:opacity-80 px-4 py-3 text-center"
      style="border-color: var(--ui-border)">
      {{ t('cvDownload') }}
    </a>
  </div>
</template>
