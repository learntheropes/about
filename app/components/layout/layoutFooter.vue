<script setup>
defineProps({
  showLocaleSwitcher: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <footer style="border-top: 1px solid var(--ui-border)">
    <div class="max-w-3xl mx-auto px-6 py-6 flex flex-col items-center gap-4">
      <SocialLinks />
      <LocaleSwitcher v-if="showLocaleSwitcher" />
    </div>
  </footer>
</template>
