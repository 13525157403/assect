<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['amt'],
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: function(p) {
            return `${p.name}\n${p.value}`
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              show: true,

              lineStyle: {
                color: 'rgb(235,235,235)'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: 'rgb(102,102,102)',
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgb(235,235,235)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: 'rgb(102,102,102)',
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: 24,
            data: [],
            itemStyle: {
              color: 'rgb(73,169,238)'
            }
          }
        ]
      }
    }
  },
  watch: {
    amt() {
      this.amtdata()
      this.$nextTick(() => {
        this.Readiaechart()
      })
    }
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption(this.option)
      window.onresize = myChart.resize
    },
    amtdata() {
      const arr = []
      const arr2 = []
      this.amt.map((i) => {
        arr.push(i.countNum)
        arr2.push(i.countType)
      })
      this.$set(this.option.series[0], 'data', arr)
      this.$set(this.option.xAxis[0], 'data', arr2)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 300px;
}
</style>
