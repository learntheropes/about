<script setup>
const route = useRoute()
const { locale, t, locales, defaultLocale, setLocale } = useI18n()
const localePath = useLocalePath()

// Check if current path needs language prefix redirect
const checkLanguagePrefix = () => {
  const path = route.path
  const supportedLocales = locales.value.map(l => typeof l === 'string' ? l : l.code)
  
  // If path doesn't start with a supported locale, redirect
  if (!supportedLocales.some(locale => path.startsWith(`/${locale}/`))) {
    return true
  }
  return false
}

// Redirect to path with language prefix if needed
onMounted(() => {
  if (checkLanguagePrefix()) {
    navigateTo(localePath('/btcpay-registration/'), { replace: true })
  }
})

const key = computed(() => `${route.path}-${locale.value}`)

const { data, pending, error } = await useAsyncData(
  key,
  () =>
    queryCollection('content')
      .path(route.path)
      .first(),
  {
    watch: [locale, () => route.path]
  }
)

useHead({
  title: data.value.title,
  meta: [
    {
      id: 'description',
      name: 'description',
      content: data.value.description
    },
    {
      id: 'og:title',
      name: 'og:title',
      content: data.value.title
    },
    {
      id: 'og:description',
      name: 'og:description',
      content: data.value.description
    },
  ],
});
</script>


<template>
  <NuxtLayout>
    <div class="container">
      <h1 class="title has-text-primary">{{ data.title }}</h1>
      <!-- <h1 class="subtitle">{{ data.description }}</h1> -->
      <!-- <IndexToc :toc="data.body.toc" /> -->
      <ContentRenderer :value="data" class="content" />
    </div>
  </NuxtLayout>
</template>
