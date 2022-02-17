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
      compareList: [],
      option: {
        grid: {
          top: "0%",
          left: "0%",
          right: "1%",
          bottom: "1%",
          containLabel: true,
        },
        dataZoom: [],
        xAxis: [
          {
            position: "bottom",
            boundaryGap: false,
            axisLine: {
              show: false,
              // 坐标轴轴线相关设置。数学上的x轴
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: false,
              // interval: 0,
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
          // {
          //   position: "top",
          //   splitLine: {
          //     show: false,
          //     lineStyle: {
          //       color: "rgb(228,228,228)",
          //     },
          //   },
          //   axisLine: {
          //     show: true,
          //     lineStyle: {
          //       color: "rgb(228,228,228)",
          //     },
          //   },
          //   axisLabel: {
          //     show: true,
          //     textStyle: {
          //       color: "#000",
          //       padding: [0, 20, 0, 0],
          //     },
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   data: ["1", "2", "3", "4", "5", "6", "7"],
          // },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "#000",
                padding: [0, 20, 0, 0],
              },
            },
            axisTick: {
              show: false,
            },
          },
          // {
          //   position: "right",
          //   splitLine: {
          //     show: false,
          //     lineStyle: {
          //       color: "rgb(228,228,228)",
          //     },
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: "rgb(228,228,228)",
          //     },
          //   },
          //   axisLabel: {
          //     show: false,
          //     textStyle: {
          //       color: "#000",
          //       padding: [0, 20, 0, 0],
          //     },
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          // },
        ],
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          // },
          textStyle: {
            color: "#000",
            padding: "10",
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
          backgroundColor: "#fff",
          borderColor: "#000",
          formatter: (p) => {
            let icon = `<i class="el-icon-caret-bottom"></i>`;
            let pre = this.compareList[p[0].dataIndex];
            if (pre >= 0 && pre != "-%") {
              icon = `<i class="el-icon-caret-top" style="color:green"></i>`;
            } else if (pre < 0) {
              icon = `<i class="el-icon-caret-bottom" style="color:red"></i>`;
            } else {
              icon = ``;
            }
            let dom = `<div>${p[0].marker}${p[0].axisValueLabel}日利率   同比上周 ${icon}  ${pre}</div><div style="font-size:24px">${p[0].value}%</div>`;

            return dom;
          },
          backgroundColor: "#fff",
        },
        series: [
          {
            // z:1,
            name: "总人数",
            type: "line",
            // symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 1,
            smooth: true,
            areaStyle: {
              // 区域填充样式
              normal: {
                color: "rgb(234,247,229)",
              },
            },
            lineStyle: {
              normal: {
                width: 1,
                color: "rgb(152,216,125)", // 线条颜色
              },
            },
            itemStyle: {
              color: "rgb(152,216,125)",
            },
            data: [10, 20, -30, 10, 1, 23, 32],
          },
        ],
      },
    };
  },
  watch: {
    rawanum() {
      if (this.rawanum) {
        this.readata();
      }
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
      let zoom = [{ show: false }];
      this.compareList = [];
      this.rawanum.forEach((item) => {
        xArr.push(String(item.countDate).slice(5, 10));
        if (!item.rate) {
          yarrLeft.push(0);
        } else {
          yarrLeft.push(item.rate);
        }
        if (item.compare) {
          this.compareList.push(item.compare);
        } else {
          this.compareList.push("-%");
        }
      });
      if (xArr.length > 7) {
        zoom = [{ show: true }];
      } else {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.xAxis[0], "data", xArr);
      this.$set(this.option.series[0], "data", yarrLeft);
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
  width: 95%;
  height: 240px;
  border: 1px solid rgb(228, 228, 228);
}
</style>
