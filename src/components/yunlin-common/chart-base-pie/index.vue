<template>
  <div :id="chartName" style="min-height: 350px;"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
export default {
  name: 'CommonChartBasePie',
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chartName: {
      type: String,
      default: 'echarts_base_pie'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        // console.log('watch setOptions')
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const { chartName, chartData } = this
      this.chart = echarts.init(document.getElementById(chartName))
      // console.log('initChart setOptions')
      this.setOptions(chartData)
    },
    setOptions({ legend = [], data = [], name = '', title = '', radius = ['0%', '70%'] } = {}) {
      this.chart.setOption({
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          x: 'right',
          top: 50,
          data: legend
        },
        calculable: false,
        series: [
          {
            name,
            type: 'pie',
            radius,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: data
          }
        ]
      })
    }
  }
}
</script>
