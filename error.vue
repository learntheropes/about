<script setup>
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

const {
  locale,
  t
} = useI18n();

let translatedErrorMessage
switch(props.error.statusCode) {
  case 401:
    translatedErrorMessage = t('unauthorized')
    break;
  case 403:
    translatedErrorMessage = t('unauthorized')
    break;
  case 404:
    translatedErrorMessage = t('pageNotFound')
    break;
    break;
  default:
    translatedErrorMessage = t('somethingWentWrong')
}

const handleError = () => clearError({ redirect: `/${locale.value}` });
</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">{{ translatedErrorMessage }}</p>
        <DevOnly v-if="props.error.statusCode !== 404"> 
          <div class="block content">
            <div>{{ error.statusMessage || error.message }}</div>
            <div>{{ error.stack }}</div>
          </div>
        </DevOnly>
      </div>
    </div>
  </div>
</template>
