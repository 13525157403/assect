<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from 'echarts'
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ['pie'],
  data() {
    return {
      option: {
        color: [
          'rgb(73,169,238)',
          'rgb(152,216,125)',
          'rgb(255,216,110)',
          'rgb(243,133,123)',
          'rgb(137,150,230)'
        ],
        tooltip: {
          trigger: 'item',
          formatter: function(p) {
            const dom = `<div>${p.name}</div><div>${p.percent.toFixed(0)}%</div>`
            return dom
          }
        },
        series: [
          {
            type: 'pie',
            radius: '45%',
            hoverOffset: 15,
            minAngle: 0,
            startAngle: 110,
            center: ['50%', '50%'],
            itemStyle: {
              borderRadius: 8
            },
            label: {
              formatter: function(p) {
                const dom = `${p.data.name}${p.percent.toFixed(0)}%`
                return dom
              },
              show: true,
              rich: {
                hr: {
                  backgroundColor: 't',
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12]
                },
                a: {
                  padding: [-20, 10, -10, 0]
                }
              }
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 5,
                lineStyle: {
                  width: 1,
                  color: 'rgb(216,216,216)',
                  type: 'dotted'
                }
              }
            },
            data: [
              {
                name: '命中1项',
                value: 38,
                shadoBlur: 10,
                radius: '120px',
                itemStyle: {
                  normal: {
                    borderWidth: 10,
                    borderColor: '#fff'
                  }
                }
              },
              {
                name: '命中2项',
                value: 28
              },
              {
                name: '命中3项',
                value: 20
              },
              {
                name: '命中4项',
                value: 10
              },
              {
                name: '未命中',
                value: 6
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    pie() {
      this.PieData()
      this.$nextTick(() => {
        this.Readiaechart()
      })
    }
  },
  mounted() {
    let that = this;
    var erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.echarts, function (element) {
      that.$nextTick(function () {
        echarts.init(that.$refs.myEchart).resize();
      });
    });
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart)
      myChart.setOption(this.option)
      window.onresize = myChart.resize
    },
    PieData() {
      const arr = [
        {
          name: '命中1项',
          value: this.pie.countInOneBid,
          itemStyle: {
            normal: {
              borderWidth: 10,
              borderColor: '#fff'
            }
          }
        },
        {
          name: '命中2项',
          value: this.pie.countInTwoBid
        },
        {
          name: '命中3项',
          value: this.pie.countInThreeBid
        },
        {
          name: '命中4项',
          value: this.pie.countInFourBid
        },
        {
          name: '未命中',
          value: this.pie.countNotInBid
        }
      ]
      this.$set(this.option.series[0], 'data', arr)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
