const isDeployed = process.env.NODE_ENV === 'production';
const deploymentDomain = process.env.URL || 'http://localhost:3000'
import {
  locales,
  localeCodes,
  defaultLocale,
} from './assets/js/localization';

export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          id: 'googlebot',
          name: 'googlebot',
          content: 'notranslate'
        },
        {
          id: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          id: 'og:url',
          name: 'og:url',
          content: deploymentDomain
        },
        {
          id: 'og:site_name',
          name: 'og:site_name',
          content: 'Giovanni Learntheropes'
        },
        {
          id: 'og:image',
          name: 'og:image',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
        {
          id: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          id: 'twitter:image',
          name: 'twitter:image',
          content: `${deploymentDomain}/favicon/favicon.png`
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon/favicon.ico'
        },
      ]
    },
  },

  css: [
    '~/assets/scss/main.scss',
  ],

  components: [{
    path: '~/components',
    pathPrefix: false,
    global: true
  }],

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-delay-hydration',
    'nuxt-umami'
  ],

  umami: {
    enabled: (isDeployed) ? true : false,
    id: process.env.NUXT_PUBLIC_UMAMI_ID,
    host: process.env.NUXT_PUBLIC_UMAMI_HOST,
    autoTrack: true,
  },

  router: {
    options: {
      trailingSlash: true,
    },
  },

  i18n: {
    baseUrl: deploymentDomain,
    locales,
    defaultLocale,
    lazy: true,
    langDir: 'lang',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    trailingSlash: true
  },

  content: {
    locales: localeCodes,
    defaultLocale,
    experimental: { nativeSqlite: true },
  },

  delayHydration: {
    mode: 'init',
    debug: !isDeployed
  },

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },
});
