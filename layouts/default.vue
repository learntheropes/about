
<script setup>
const i18nHead = useLocaleHead({})
useHead({
  htmlAttrs: {
    lang: (i18nHead) ? i18nHead.value.htmlAttrs.lang : null
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
});
</script>

<template>
  <div class="is-tall">
    <main class="is-tall-container">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
