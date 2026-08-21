<script setup>
import { locales } from '~/assets/js/localization'

const props = defineProps({
  error: Object,
  required: true
});

useHead({
  title: props.error.statusCode,
  meta: [
    {
      name: 'description',
      content: props.error.statusMessage || props.error.message
    },
  ],
});

const route = useRoute();
const { t, mergeLocaleMessage } = useI18n();

// If the URL has no recognizable locale segment (e.g. a broken external link),
// @nuxtjs/i18n's route-based lazy loader never runs, so no locale has any
// messages loaded and t() falls back to raw keys. Eagerly merge every
// locale's messages (i18n/lang/*.js — the single source of truth) so t()
// always has something to read from, regardless of what the broken route
// managed to load.
const langModules = import.meta.glob('~~/i18n/lang/*.js', { eager: true });
for (const l of locales) {
  const mod = Object.entries(langModules).find(([path]) => path.endsWith(`/${l.file}`))?.[1];
  if (mod) mergeLocaleMessage(l.code, mod.default);
}

// Read the locale from the path, or fall back to whichever locale is flagged
// `default: true` in localization.js — and pass it as a per-call override to
// t() instead of touching the reactive `locale` ref: under strategy "prefix"
// that ref is wired to *navigate* to the localized URL, and on an already
// broken route that second navigation itself 404s and blanks this page.
const localeCodes = locales.map((l) => l.code);
const defaultLocaleCode = locales.find((l) => l.default)?.code ?? localeCodes[0];
const pathLocaleMatch = route.path.match(new RegExp(`^/(${localeCodes.join('|')})(?:/|$)`));
const targetLocale = pathLocaleMatch ? pathLocaleMatch[1] : defaultLocaleCode;

const tt = (key) => t(key, {}, { locale: targetLocale });

const translatedErrorMessage = computed(() => {
  if (props.error.statusCode === 401 || props.error.statusCode === 403) return tt('unauthorized');
  if (props.error.statusCode === 404) return tt('pageNotFound');
  return tt('somethingWentWrong');
});

// A broken /it/... link goes back to that locale's root; a broken link with
// no locale segment at all goes back to the unprefixed site root.
const handleError = () => clearError({ redirect: pathLocaleMatch ? `/${targetLocale}` : '/' });
</script>

<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <p class="text-3xl font-bold">{{ translatedErrorMessage }}</p>
        <button class="mt-6 text-sm text-primary underline decoration-1 underline-offset-2 hover:opacity-75 transition"
          @click="handleError">{{ tt('backToTheHomePage') }}</button>
        <DevOnly v-if="props.error.statusCode !== 404">
          <div class="mt-4 text-left text-sm text-muted">
            <div>{{ error.statusMessage || error.message }}</div>
            <div>{{ error.stack }}</div>
          </div>
        </DevOnly>
      </div>
    </div>
  </UApp>
</template>
