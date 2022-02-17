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
          trigger: 'axis',
          formatter: (p) => {
            const dom = `<div>监控人数${p[0].value}</div><div>超阈值人数${p[1].value}</div>`
            return dom
          }
        },
        legend: {
          align: 'left',
          right: '10%',
          top: '10%',
          type: 'plain',
          textStyle: {
            color: '#000',
            fontSize: 12
          },
          // icon:'rect',
          padding: -15,
          itemGap: 10,
          itemWidth: 15,
          icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
          data: [
            {
              name: '地产'
            },
            {
              name: '投资'
            }
          ]
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
              show: true,
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
              show: true,
              lineStyle: {
                color: 'rgb(228,228,228)'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            min: 0,
            splitLine: {
              show: true,
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
        series: [
          {
            name: '地产',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 3,
                color: 'rgb(115,101,238)' // 线条颜色
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
            data: ['200', '300', '243', '340', '270', '200', '400']
          },
          {
            name: '投资',
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 3,
                color: 'rgb(97,202,249)' // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: 'rgb(97,202,249)',
              borderWidth: 2
            },
            tooltip: {
              show: true
            },
            data: ['150', '180', '140', '160', '200', '140', '200']
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
      const arr3 = []
      this.allpeople.estate.map((i) => {
        arr1.push(String(i.countDate).slice(5, 10))
        arr2.push(i.countNum)
      })
      this.allpeople.investment.map((i) => {
        arr3.push(i.countNum)
      })
      let zoom
      if (arr2.length > 7) {
        zoom = [{ show: true }]
      }
      if (arr2.length <= 7) {
        zoom = [{ show: false }]
      }
      this.$set(this.option, 'dataZoom', zoom)
      this.$set(this.option.xAxis[0], 'data', arr1)
      this.$set(this.option.series[0], 'data', arr2)
      this.$set(this.option.series[1], 'data', arr3)
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
