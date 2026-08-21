<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex justify-center gap-3">
    <template v-for="loc in locales" :key="loc.code">
      <NuxtLink
        v-if="loc.code !== locale"
        :to="switchLocalePath(loc.code)"
        class="text-sm text-primary underline decoration-1 underline-offset-2 hover:opacity-75 transition"
      >{{ loc.name }}</NuxtLink>
      <span v-else class="text-sm font-medium">{{ loc.name }}</span>
    </template>
  </div>
</template>
