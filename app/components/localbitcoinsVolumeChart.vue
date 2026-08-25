<script setup>
import { onMounted, ref } from 'vue'
import { loadLocalbitcoinsVolume, allMarkets } from '~/assets/js/localbitcoinsVolume'

const series = ref([])
const loading = ref(true)

onMounted(async () => {
  series.value = await loadLocalbitcoinsVolume(allMarkets)
  loading.value = false
})
</script>

<template>
  <div class="not-prose">
    <p v-if="loading" class="text-sm" style="color: var(--ui-text-dimmed)">{{ $t('loadingChart') }}</p>
    <LineChart v-else :series="series" y-scale="log" unit="BTC" />
  </div>
</template>
