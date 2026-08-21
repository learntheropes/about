<script setup>
import { locales } from '~/assets/js/localization'
import { navItems } from '~/assets/js/navigation'
</script>

<template>
  <div class="flex flex-col gap-3">
    <details
      v-for="loc in locales"
      :key="loc.code"
      name="language-picker"
      class="group rounded-lg border overflow-hidden"
      style="border-color: var(--ui-border)"
    >
      <summary
        class="marker-none cursor-pointer select-none px-4 py-3 flex items-center justify-between font-semibold text-lg text-primary"
      >
        {{ loc.name }}
        <span class="transition-transform duration-200 group-open:rotate-180" aria-hidden="true">⌄</span>
      </summary>
      <div class="flex flex-col border-t" style="border-color: var(--ui-border)">
        <a
          v-for="item in navItems"
          :key="item.slug"
          :href="`/${loc.code}/${item.slug}`"
          class="px-4 py-3 border-b last:border-b-0 font-medium transition hover:text-primary"
          style="border-color: var(--ui-border-muted); color: var(--ui-text-muted)"
        >{{ item.labels[loc.code] }}</a>
      </div>
    </details>
  </div>
</template>

<style scoped>
summary.marker-none {
  list-style: none;
}

summary.marker-none::-webkit-details-marker {
  display: none;
}
</style>
