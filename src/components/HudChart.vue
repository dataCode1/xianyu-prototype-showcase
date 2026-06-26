<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
})

const chartEl = ref(null)
const chart = shallowRef(null)
let resizeObserver
let disposed = false
let echartsLoader

function loadEcharts() {
  if (!echartsLoader) {
    echartsLoader = Promise.all([
      import('echarts/core'),
      import('echarts/charts'),
      import('echarts/components'),
      import('echarts/renderers'),
    ]).then(([echarts, charts, components, renderers]) => {
      echarts.use([
        charts.BarChart,
        charts.LineChart,
        charts.PieChart,
        charts.RadarChart,
        components.GridComponent,
        components.LegendComponent,
        components.RadarComponent,
        components.TooltipComponent,
        renderers.CanvasRenderer,
      ])

      return echarts
    })
  }

  return echartsLoader
}

async function renderChart() {
  if (!chartEl.value) return

  const echarts = await loadEcharts()
  if (disposed || !chartEl.value) return

  if (!chart.value) {
    chart.value = echarts.init(chartEl.value, null, {
      renderer: 'canvas',
    })
  }

  chart.value.setOption(props.option, true)
}

onMounted(async () => {
  await nextTick()
  await renderChart()

  if ('ResizeObserver' in window && chartEl.value) {
    resizeObserver = new ResizeObserver(() => chart.value?.resize())
    resizeObserver.observe(chartEl.value)
  }
})

watch(
  () => props.option,
  () => {
    void renderChart()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  disposed = true
  resizeObserver?.disconnect()
  chart.value?.dispose()
})
</script>

<template>
  <div ref="chartEl" class="hud-chart" role="img" aria-label="ECharts data visualization"></div>
</template>
