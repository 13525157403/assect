<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '95%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    risk: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      t: '',
      option: {
        color: ['rgb(73,169,238)', 'rgb(125,200,86)', 'rgb(255,216,110)'],
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: (p) => {
            const dom = `<div>手机号稳定等级:${p.value[0]}级</div><div>地址稳定等级:${p.value[1]}级</div><div>偿债能力:${this.t}级</div><div>最近六个月支付金额等级:${p.value[3]}级</div><div>最近六个月流动资产价值等级:${p.value[4]}级</div><div>最近一年履约等级:${p.value[5]}级</div>`
            return dom
          }
        },

        radar: [
          {
            center: ['40%', '45%'],
            radius: '50%',
            name: {
              textStyle: {
                fontSize: '14',
                color: 'rgb(152,152,152)'
              }
            },
            indicator: [
              {
                text: '手机号稳定等级',
                max: 10.0,
                color: 'rgb(51,51,51)'
              },
              { text: '地址稳定等级', max: 10.0, color: 'rgb(51,51,51)' },
              { text: '偿债能力', max: 10.0, color: 'rgb(51,51,51)' },
              {
                text: '最近六个月支付金额等级',
                max: 10.0,
                color: 'rgb(51,51,51)'
              },
              {
                text: '最近六个月流动资产价值等级',
                max: 10.0,
                color: 'rgb(51,51,51)'
              },
              { text: '最近一年履约等级', max: 10.0, color: 'rgb(51,51,51)' }
            ],
            splitArea: {
              areaStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgb(204,204,204)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgb(204,204,204)'
              }
            }
          }
        ],
        calculable: true,
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [3.5, 4.8, 3.2, 4.7, 4.5],
                name: '累计查询结果',
                areaStyle: {
                  color: 'rgba(70,183,173,0.5)'
                },
                symbolSize: 0,
                lineStyle: {
                  normal: {
                    color: 'rgba(70,183,173,0.5)',
                    width: 0
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    risk() {
      console.log(this.risk, 'risk', 'rrrrr')
      this.riskData()
      this.$nextTick(() => {
        this.readiaechart()
      })
    }
  },
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption(this.option)
      window.onresize = myChart.resize
    },
    riskData() {
      const arr = []
      let v = ''
      this.t = this.risk.repaymentSeg
      switch (this.risk.repaymentSeg) {
        case 'A':
          v = 1.4
          break
        case 'B':
          v = 2.8
          break
        case 'C':
          v = 4.2
          break
        case 'D':
          v = 5.6
          break
        case 'E':
          v = 7
          break
        case 'F':
          v = 8.4
          break
        default:
          break
      }
      arr[0] = this.risk.mobileFixedGrade - 0
      arr[1] = this.risk.adrStabilityGrade - 0
      arr[2] = v
      arr[3] = this.risk.totPayAmt6mGrade - 0
      arr[4] = this.risk.last6mAvgAssetTotalGrade - 0
      arr[5] = this.risk.positiveBizCnt1yGrade - 0
      this.$set(this.option.series[0].data[0], 'value', arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 350px;
}
</style>
