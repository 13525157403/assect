<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";

import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["rawanum"],
  data() {
    return {
      option: {
        grid: {
          top: "10%",
          left: "4%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                margin: 0,
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisTick: {
              show: false,
            },
            data: [
              "10/02",
              "10/03",
              "10/04",
              "10/05",
              "10/06",
              "10/07",
              "10/08",
            ],
          },
        ],
        yAxis: [
          {
            name: "{hr|}{a|(单位/人)}",
            nameTextStyle: {
              rich: {
                hr: {
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "rgb(73,169,238)",
                },
                a: {
                  color: "#000",
                },
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                padding: 0,
              },
              formatter: function (value) {
                if (value === 0) {
                  return value;
                }
                return value;
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            name: "{hr|}{a|(单位/万元)}",
            nameTextStyle: {
              rich: {
                hr: {
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "rgb(255,216,110)",
                },
                a: {
                  color: "#000",
                },
              },
            },
            position: "right",
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
                padding: 0,
              },
              formatter: function (value) {
                if (value === 0) {
                  return value;
                }
                return value;
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          formatter: (p) => {
            let dom = `<div>${p[0].axisValueLabel}</div>`;
            dom += `${p[0].marker}${p[0].seriesName}${p[0].value}人<br>`;
            dom += `${p[1].marker}${p[1].seriesName}${p[1].value}万元`;
            // console.log(p);
            // p.forEach((item) => {
            //   dom += `${item.marker}${item.seriesName}${item.value}<br>`;
            // });
            return dom;
          },
        },
        dataZoom: [],
        series: [
          {
            // z:2,
            name: "客户数",
            data: [10, 20, 40, 10, 60, 55, 32],
            type: "line",
            showAllSymbol: true,
            symbolSize: 4,
            smooth: true,
            yAxisIndex: 0,
            areaStyle: {
              // 区域填充样式
              normal: {
                color: "rgb(219,238,252)",
              },
            },
            lineStyle: {
              normal: {
                width: 2,
                color: "rgb(73,169,238)", // 线条颜色
              },
            },
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
          {
            // z:1,
            name: "金额",
            type: "line",
            // symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆

            symbolSize: 4,
            yAxisIndex: 1,
            itemStyle: {
              color: "rgb(245,154,35)",
            },
            lineStyle: {
              color: "rgb(245,154,35)",
              width: 3,
            },
            areaStyle: {
              // 区域填充样式
              normal: {
                color: "rgb(254,245,233)",
              },
            },
            data: [40, -20, 30, 35, 12, 56, 45],
          },
        ],
      },
    };
  },
  
  watch: {
    rawanum() {
      this.readata();
    },
    
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
    readiaechart() {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.myEchart);
        myChart.setOption(this.option);
        window.onresize = myChart.resize;
      });
    },
    readata() {
      let xArr = [];
      let yarrLeft = [];
      let yarrRight = [];
      let zoom = [{ show: false }];
      this.rawanum.forEach((item) => {
        xArr.push(String(item.countDate).slice(5, 10));
        yarrLeft.push(item.countNum);
        yarrRight.push(Number(item.countAmt) / 10000);
      });
      if (xArr.length > 7) {
        zoom = [{ show: true }];
      } else {
        zoom = [{ show: false }];
      }
      console.log(yarrLeft, yarrRight);
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.xAxis[0], "data", xArr);
      this.$set(this.option.series[0], "data", yarrLeft);
      this.$set(this.option.series[1], "data", yarrRight);
      this.$refs.myEchart.removeAttribute("_echarts_instance_");
      this.$nextTick(() => {
        this.readiaechart();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 300px;
}
</style>
