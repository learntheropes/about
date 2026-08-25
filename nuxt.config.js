import { isDeployed, deploymentDomain } from './app/assets/js/deployment';
import { locales, localeCodes } from './app/assets/js/localization';

export default defineNuxtConfig({

  compatibilityDate: '2026-08-20',

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
          content: 'Giovanni (learntheropes) LPY'
        },
        {
          id: 'og:image',
          name: 'og:image',
          content: `${deploymentDomain}/learn-glpy.png`
        },
        {
          id: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          id: 'twitter:image',
          name: 'twitter:image',
          content: `${deploymentDomain}/learn-glpy.png`
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
      ]
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  components: [{
    path: '~/components',
    pathPrefix: false,
    global: true
  }],

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-delay-hydration',
    'nuxt-umami',
    'nuxt-echarts'
  ],

  ui: {
    experimental: {
      componentDetection: true
    }
  },

  echarts: {
    renderer: ['svg', 'canvas'],
    charts: ['LineChart', 'BarChart', 'CandlestickChart', 'CustomChart'],
    components: ['TitleComponent', 'TooltipComponent', 'LegendComponent', 'GridComponent', 'DatasetComponent']
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

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

  nitro: {
    prerender: {
      // Bare locale roots (e.g. /en) have no page: i18n seeds them for prerendering
      // by default, but content lives under /en/building, /en/biosophy, etc.
      ignore: localeCodes.map((code) => new RegExp(`^/${code}$`)),
      // Nitro's static preset doesn't crawl "/" itself (it's reserved for the SPA
      // shell), so its links are never discovered — list every real page explicitly.
      routes: [
        '/',
        ...localeCodes.flatMap((code) =>
          // 'insights/localbitcoins' is deliberately not linked from any nav/page yet,
          // but still needs prerendering to exist as a reachable static route.
          ['building', 'biosophy', 'btcpay', 'guru', 'insights/localbitcoins'].map((slug) => `/${code}/${slug}`)
        )
      ]
    }
  },

  i18n: {
    baseUrl: deploymentDomain,
    locales,
    langDir: 'lang',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    // known i18n+prerender edge cases with definePageMeta({ i18n: false }) pages
    // (e.g. nuxt-modules/i18n#3987); safe to disable since we don't use SSR redirects
    experimental: {
      nitroContextDetection: false
    }
  },

  content: {
    locales: localeCodes,
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

  hooks: {
    // @nuxtjs/i18n unconditionally ignores "/" from prerendering when strategy is
    // "prefix" + static (it assumes root only ever redirects, never has real content).
    // We use "/" as a real, unprefixed language-picker page, so undo that ignore rule
    // once i18n has added it (its own nitro:init hook runs before this fires).
    'nitro:init': (nitro) => {
      nitro.hooks.hook('prerender:routes', () => {
        nitro.options.prerender.ignore = (nitro.options.prerender.ignore || []).filter(
          (pattern) => !(pattern instanceof RegExp && pattern.source === '^\\/$')
        )
      })
    }
  }
});