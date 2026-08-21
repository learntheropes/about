<script setup>
definePageMeta({ i18n: false })

useHead({
  title: 'Giovanni (learntheropes) LPY'
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="max-w-3xl mx-auto w-full px-6 pt-6">
      <HeaderImage />
    </header>
    <main class="flex-1">
      <div class="max-w-3xl mx-auto p-6">
        <LanguagePicker />
      </div>
    </main>
    <LayoutFooter :show-locale-switcher="false" />
  </div>
</template>
