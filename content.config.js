import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      toc: {
        depth: 3,
        searchDepth: 3
      }
    })
  }
})
