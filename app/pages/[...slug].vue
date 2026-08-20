<script setup>
const route = useRoute()
const { locale, locales } = useI18n()
const localePath = useLocalePath()

const supportedLocales = computed(() => locales.value.map(l => typeof l === 'string' ? l : l.code))

// Path with any locale prefix stripped, e.g. "/en/biosophy/" -> "/biosophy", "/en/" -> "/"
const pathWithoutLocale = computed(() => {
  const p = route.path
  for (const code of supportedLocales.value) {
    if (p === `/${code}` || p.startsWith(`/${code}/`)) {
      return p.slice(code.length + 1) || '/'
    }
  }
  return p
})

// Redirect to the same page with a language prefix if missing
onMounted(() => {
  const hasLocalePrefix = supportedLocales.value.some(code => route.path === `/${code}` || route.path.startsWith(`/${code}/`))
  if (!hasLocalePrefix) {
    const target = pathWithoutLocale.value === '/' ? '/' : `${pathWithoutLocale.value}/`
    navigateTo(localePath(target), { replace: true })
  }
})

const key = computed(() => `${route.path}-${locale.value}`)

const contentPath = computed(() => {
  const p = route.path
  return p === '/' ? '/' : p.replace(/\/+$/, '')
})

const { data } = await useAsyncData(
  key,
  () =>
    queryCollection('content')
      .path(contentPath.value)
      .first(),
  {
    watch: [locale, () => route.path]
  }
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Content not found for path: ${contentPath.value} (${locale.value})`
  })
}

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
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-primary">{{ data.title }}</h1>
      <p v-if="data.description" class="text-lg text-muted mt-2">{{ data.description }}</p>
      <ContentRenderer :value="data" class="prose dark:prose-invert max-w-none mt-6" />
    </div>
  </NuxtLayout>
</template>
