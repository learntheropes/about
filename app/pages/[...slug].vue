<script setup>
const route = useRoute()
const { locale } = useI18n()

// Normalize the trailing slash before it's used anywhere: SSR (nitro.prerender.routes,
// no trailing slash) and the browser (real URL, always trailing slash) otherwise see a
// different route.path, which breaks the useAsyncData key and causes a hydration mismatch.
const contentPath = computed(() => route.path.replace(/\/+$/, ''))

const key = computed(() => `${contentPath.value}-${locale.value}`)

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
