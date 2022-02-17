<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['countaccoun'],
  data() {
    return {
      option: {
        title: {
          text: '近一年在贷余额变化',
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
          data: ['0', '09', '98', '78', '45', '34', '56'],
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
              color: 'rgb(153,153,153)'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            type: 'line',
            showSymbol: true,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              color: 'rgb(0,157,217)',
              borderWidth: 18
            },
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgb(0,0,204)'
            },
            data: [150, 230, 224, 218, 135, 147, 260]
          }
        ]
      }
    }
  },
  watch: {
    countaccoun() {
      this.custdata()
      console.log(this.countaccoun, 'fu')
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
    custdata() {
      const arr = []
      const arr2 = []
      const arr3 = []
      const arr4 = []
      for (const i in this.countaccoun) {
        arr.push({
          type: 'line',
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 14,
          itemStyle: {
            color: 'rgb(92,169,221)',
            borderWidth: 14
          },
          lineStyle: {
            width: 2,
            type: 'solid',
            color: 'rgb(0,0,204)'
          },
          data: []
        })
        arr2[i] = []
        for (let j = 0; j < this.countaccoun[i].length; j++) {
          arr2[i].push(this.countaccoun[i][j].totalAmount)
          arr4.push(String(this.countaccoun[i][j].date).slice(5, 10))
        }
      }
      for (const i in this.countaccoun) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  margin-left: 40px;
  width: 90%;
  height: 350px;
}
</style>
