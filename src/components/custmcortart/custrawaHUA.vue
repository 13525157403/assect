<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: ['raw'],
  data() {
    return {
      option: {
        title: [
          {
            text: ``,
            top: 'center',
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
              rich: {
                a: {
                  fontWeight: 'normal',
                  fontSize: 30,
                  color: 'rgb(140,206,240)',
                  textShadowBlur: 10
                },
                b: {
                  fontSize: 24,
                  color: 'rgb(232,232,232)'
                }
              }
            }
          }
        ],
        legend: {
          bottom: 0,
          left: '0%',
          formatter: `  贷后评级：较弱\n贷后评分：63.2份`,
          textStyle: {
            color: 'rgb(204,204,204)',
            fontSize: 14
          }
        },

        series: [
          {
            name: '',
            z: 3,
            type: 'gauge', // 仪表盘
            center: ['center', 'center'],
            radius: '75%',
            detail: {
              show: false
            },
            title: {
              show: false
            },
            data: [
              {
                value: '',
                name: 'Percent'
              }
            ],
            startAngle: '225', // 仪表盘起始角度
            endAngle: '-45', // 仪表盘结束角度
            min: 0,
            max: 100,
            splitNumber: 20,
            axisLine: {
              show: true,
              lineStyle: {
                roundCap: true,
                width: 8,
                color: []
                // color: [
                //   [this.rawanum / 100, "rgb(25,162,171)"],
                //   [1, "rgb(244,244,244)"],
                // ],
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              show: false
            }
          }
        ]
      }
    }
  },
  watch: {
    raw: {
      handler: function() {
        if (this.raw) {
          this.adata()
          this.$nextTick(() => {
            this.readiaechart()
          })
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption(this.option)
      window.onresize = myChart.resize
    },
    adata() {
      this.$set(this.option.title[0], 'text', `{a|${this.raw - 0}}分`)
      this.$set(
        this.option.series[0].data[0],
        'value',
        `{a|${this.raw - 0}}{b|%}`
      )
      const arr = [
        [(this.raw - 0) / 100, 'rgb(25,162,171)'],
        [1, 'rgb(74,78,105)']
      ]
      this.$set(this.option.series[0].axisLine.lineStyle, 'color', arr)
      const p = ``
      this.$set(this.option.legend, 'formatter', p)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 200px;
  height: 200px;
  color: #6fe9fe;
}
</style>
