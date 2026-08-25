<script setup>
import { computed } from 'vue'

const props = defineProps({
  // [{ id, label, points: [{ x: 'YYYY-MM-DD', y: number }] }]
  series: { type: Array, required: true },
  yScale: { type: String, default: 'linear' }, // 'linear' | 'log'
  unit: { type: String, default: '' },
})

const { locale } = useI18n()

const option = computed(() => ({
  color: [
    '#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300',
    '#8e44ad', '#c0392b', '#16a085', '#d4ac0d', '#2c3e50', '#e91e63',
    '#3498db', '#e67e22', '#27ae60', '#f1c40f', '#9b59b6', '#7f8c8d',
    '#1abc9c', '#c0392b', '#2980b9', '#d35400', '#229954', '#f39c12',
  ],
  tooltip: { trigger: 'axis' },
  legend: { type: 'scroll', bottom: 0 },
  grid: { top: 24, right: 24, left: 56, bottom: 48 },
  xAxis: { type: 'time' },
  yAxis: {
    type: props.yScale === 'log' ? 'log' : 'value',
    axisLabel: { formatter: (v) => Number(v).toLocaleString(locale.value) + (props.unit ? ` ${props.unit}` : '') },
  },
  series: props.series.map((s) => ({
    id: s.id,
    name: s.label,
    type: 'line',
    showSymbol: false,
    data: s.points.map((p) => [p.x, p.y]),
  })),
}))
</script>

<template>
  <div class="not-prose">
    <VChart class="chart" :option="option" autoresize />
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 480px;
}
</style>
