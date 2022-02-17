<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '620px' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['cust'],
  data() {
    return {
      option: {
        title: {
          text: '额度趋势',
          top: '10%',
          left: 'center',
          textStyle: {
            fontSize: 14,
            color: 'rgb(51,51,51)',
            fontWeight: 'lighter'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLable: {
            padding: 10
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(153,153,153)'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(153,153,153)',
              fontSize: 10
            }
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: '20%'
        },
        series: [
          {
            type: 'line',
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              color: 'rgb(92,169,221)',
              borderWidth: 10
            },
            lineStyle: {
              width: 2,
              type: 'solid',
              color: 'rgb(92,169,221)'
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    cust(v) {
      this.custdata()
    }
  },

  mounted() {},
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption(this.option)
      window.onresize = myChart.resize
    },
    custdata() {
      const arr = []
      const arr2 = []
      const arr3 = []
      const arr4 = []
      for (const i in this.cust) {
        arr.push({
          type: 'line',
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: 'rgb(92,169,221)',
            borderWidth: 10
          },
          lineStyle: {
            width: 2,
            type: 'solid',
            color: 'rgb(92,169,221)'
          },
          data: []
        })
        arr2[i] = []
        for (let j = 0; j < this.cust[i].length; j++) {
          arr2[i].push(this.cust[i][j].creditLimit)
          arr4.push(String(this.cust[i][j].createTime).slice(5, 10))
        }
      }
      for (const i in this.cust) {
        arr3.push(arr2[i])
      }
      arr.map((i, m) => {
        i.data = arr3[m].sort((a, b) => {
          return a > b ? 1 : -1
        })
      })
      console.log(arr4, arr)
      arr4.sort((a, b) => {
        return a > b ? 1 : -1
      })
      this.$set(this.option.xAxis, 'data', arr4)
      this.$set(this.option, 'series', arr)
      this.Readiaechart()
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  // margin-left: 35px;
  width: 100%;
  height: 350px;
}
</style>
