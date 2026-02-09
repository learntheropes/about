export default defineNuxtPlugin(() => {
  if (!import.meta.dev) return

  window.addEventListener('pageshow', (e) => {
    // If the page was restored from the browser back/forward cache,
    // force a reload so Vite/Nuxt module URLs are fresh.
    if (e.persisted) window.location.reload()
  })
})
