<template>
  <div :id="chartName" style="min-height: 350px;"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
export default {
  name: 'CommonChartBaseLine',
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chartName: {
      type: String,
      default: 'echarts_base_line'
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
    setOptions({ xAxisData, seriesData, title } = {}) {
      this.chart.setOption({
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          // trigger: 'item',
          // formatter: '{a} <br/>{b} : {c}'
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // legend: {
        //   type: 'scroll',
        //   orient: 'vertical',
        //   x: 'right',
        //   top: 50,
        //   data: legend
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      })
    }
  }
}
</script>
