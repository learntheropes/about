
<script setup>
defineProps({
  showLocaleSwitcher: {
    type: Boolean,
    default: true
  }
})

const i18nHead = useLocaleHead({})
useHead({
  htmlAttrs: {
    lang: (i18nHead) ? i18nHead.value.htmlAttrs.lang : null
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="max-w-3xl mx-auto w-full px-6 pt-6">
      <HeaderImage />
      <Navbar />
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter :show-locale-switcher="showLocaleSwitcher" />
  </div>
</template>
