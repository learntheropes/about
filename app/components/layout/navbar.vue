<script setup>
import { navItems } from '~/assets/js/navigation'

const { locale } = useI18n()
const localePath = useLocalePath()

const links = computed(() => navItems.map((item) => ({
  to: localePath(`/${item.slug}`),
  label: item.labels[locale.value]
})))
</script>

<template>
  <nav class="flex gap-6 mt-4">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-sm font-medium transition"
      style="color: var(--ui-text-muted)"
      active-class="!text-[--ui-text]"
    >{{ link.label }}</NuxtLink>
  </nav>
</template>
