<script setup>
import { guru } from '~/assets/js/guruLinks'
import { deploymentDomain } from '~/assets/js/deployment'

const props = defineProps({
  section: { type: String, required: true }
})

const { t } = useI18n()
const utmSource = new URL(deploymentDomain).hostname
const cards = guru[props.section] || []

const isValidLink = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const withUtm = (url) => {
  const parsed = new URL(url)
  parsed.searchParams.set('utm_source', utmSource)
  return parsed.toString()
}
</script>

<template>
  <div class="mt-8 not-prose">
    <h2 class="text-xl font-semibold" style="color: var(--ui-text)">{{ t(section) }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <component :is="isValidLink(card.link) ? 'a' : 'div'" v-for="card in cards" :key="card.link"
        v-bind="isValidLink(card.link) ? { href: withUtm(card.link), target: '_blank', rel: 'noopener noreferrer' } : {}"
        class="block rounded-lg border overflow-hidden transition"
        :class="isValidLink(card.link) ? 'hover:opacity-80' : 'opacity-50'" style="border-color: var(--ui-border)">
        <img :src="card.cover" :alt="card.title" class="w-full aspect-video object-cover" loading="lazy">
        <p class="p-3 text-sm font-medium" style="color: var(--ui-text)">{{ card.title }}</p>
      </component>
    </div>
  </div>
</template>
