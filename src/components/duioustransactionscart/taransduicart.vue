<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['allpeople'],
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'axis'

        },

        grid: {
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        dataZoom: [],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: 'rgb(228,228,228)'
              }
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: '#000',
                padding: 14,
                fontSize: 14
              },
              formatter: function(data) {
                return data
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgb(228,228,228)'
              }
            },
            axisTick: {
              show: false
            },
            data: []
          }
        ],
        yAxis: [
          {
            min: 0,
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgb(228,228,228)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgb(228,228,228)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
                padding: 16
              },
              formatter: function(value) {
                if (value === 0) {
                  return value
                }
                return value
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        dataZoom: [],
        series: [
          {
            name: '总人数',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            areaStyle: {
              // 区域填充样式
              normal: {
                color: 'rgb(219,238,252)'
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: 'rgb(73,169,238)' // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: 'rgb(115,101,238)',
              borderWidth: 2
            },
            tooltip: {
              show: true
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    allpeople() {
      this.alldata()
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
    alldata() {
      const arr1 = []
      const arr2 = []
      this.allpeople.map((i) => {
        arr1.push(String(i.countDate).slice(5, 10))
        arr2.push(i.countNum)
      })
      let zoom
      if (arr1.length > 7) {
        zoom = [{ show: true }]
      }
      if (arr1.length <= 7) {
        zoom = [{ show: false }]
      }
      this.$set(this.option, 'dataZoom', zoom)
      this.$set(this.option.xAxis[0], 'data', arr1)
      this.$set(this.option.series[0], 'data', arr2)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 280px;
}
</style>
