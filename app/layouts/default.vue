
<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() => [
  { to: localePath('/'), label: t('navWork') },
  { to: localePath('/biosophy'), label: t('navBiosophy') },
  { to: localePath('/btcpay'), label: t('navBtcpay') },
])

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
  <div class="min-h-screen flex flex-col">
    <header class="max-w-3xl mx-auto w-full px-6 pt-6">
      <div class="aspect-[5/3] overflow-hidden">
        <img
          src="/learn-glpy.png"
          alt="Giovanni (learntheropes) LPY"
          class="w-full h-full object-cover object-[center_30%]"
        >
      </div>
      <nav class="flex gap-6 mt-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium transition"
          style="color: var(--ui-text-muted)"
          active-class="!text-[--ui-text]"
        >{{ link.label }}</NuxtLink>
      </nav>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
