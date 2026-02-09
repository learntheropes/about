import {
  OButton
} from '@oruga-ui/oruga-next';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('OButton', OButton);
});
