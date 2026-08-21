<script setup>
import { deploymentDomain } from '~/assets/js/deployment'

defineProps({
  filename: { type: String, required: true }
})
</script>

<template>
  <a :href="`${deploymentDomain}/${filename}`" target="_blank" rel="noopener noreferrer"
    class="block w-full rounded-lg border overflow-hidden transition hover:opacity-80 px-4 py-3 text-center"
    style="border-color: var(--ui-border)">
    {{ filename }}
  </a>
</template>
