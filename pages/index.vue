<script setup>
const route = useRoute()
const { locale, t, locales, defaultLocale, setLocale } = useI18n()
const localePath = useLocalePath()

function pickLocale() {
  const raw = String(navigator.language || '').toLowerCase()
  const base = raw.split('-')[0]

  const supported = locales.value.map(l =>
    typeof l === 'string' ? l : l.code
  )

  return supported.includes(base)
    ? base
    : defaultLocale.value
}

// Redirect to brower's language or default locale
onMounted(async () => {

  const target = pickLocale()
  await setLocale(target)
  navigateTo(localePath('/', target), { replace: true })
})


const key = computed(() => `${route.path}-${locale.value}`)

const contentPath = computed(() => {
  // normalize /en/ -> /en
  // keep "/" as "/"
  const p = route.path
  if (p === '/') return '/'
  return p.replace(/\/+$/, '')
})

const { data, pending, error } = await useAsyncData(
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
    statusMessage: `Home content not found for locale: ${locale.value}`
  })
}


useHead({
  title: data.value?.title || 'Home',
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
      <h1 class="subtitle">{{ data.description }}</h1>
      <IndexToc :toc="data.body.toc" />
      <ContentRenderer :value="data" class="content" />
    </div>
  </NuxtLayout>
</template>
