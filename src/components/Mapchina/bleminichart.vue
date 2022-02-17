<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["allpeople"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "transparent",

          formatter: (p) => {
            const dom = `<div style="width: 79px;
      height: 50px;;color:#fff;position: relative;">
        <svg style="position: absolute;top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
      <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
        transform="translate(-258.5 -592.5)" />
    </svg>
        <div style="display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;position: relative;z-index: 1;">
            <div style="margin-bottom: 4px;width:100%;display:${
              p[0] ? "flex" : "none"
            };justify-content:space-between;align-items:center;">
                <span style="font-size:12px;color:#fff;">监控人数:</span>
                <span style="font-size:12px;color:#fff;">${
                  p[0] ? p[0].data : ""
                }</span>
            </div>
            <div style="width:100%;height:100%;display:${
              p[1] ? "flex" : "none"
            };justify-content:space-between;align-items:center;">
                <span style="font-size:12px;color:#fff;">超阈值人数:</span>
                <span style="font-size:12px;color:#fff;">${
                  p[1] ? p[0].data - p[1].data : ""
                }</span>
            </div>
        </div>
    </div>`;
            return dom;
          },
        },
        legend: {
          align: "left",
          right: "10%",
          top: "10%",
          type: "plain",
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
          // icon:'rect',
          padding: -15,
          itemGap: 20,
          itemWidth: 20,
          icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
          data: [
            {
              name: "总人数",
            },
            {
              name: ">阈值",
            },
          ],
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "10%",
          bottom: "15%",
        },
        dataZoom: [],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              // 坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",

                fontSize: 14,
              },
              formatter: function (data) {
                return data;
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },

            data: ["1", "2", "3", "4", "5", "6", "7"],
          },
        ],
        yAxis: [
          {
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
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
        series: [
          {
            name: "总人数",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 5,
                color: "rgb(115,101,238)", // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "rgb(115,101,238)",
              borderWidth: 2,
            },
            tooltip: {
              show: true,
            },
            data: ["200", "300", "243", "340", "270", "200", "400"],
          },
        ],
      },
    };
  },
  watch: {
    allpeople(v) {
      this.allpeopleData();
      this.$nextTick(() => {
        this.Readiaechart();
      });
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
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    allpeopleData() {
      const allpeople = {
        arr1: [],
        arr2: [],
      };
      this.allpeople.map((i) => {
        allpeople.arr1.push(i.countNum);
        allpeople.arr2.push(i.countDate.slice(5, 10));
      });
      allpeople.arr2.sort((a, b) => {
        return a > b ? 1 : -1;
      });
      let zoom;
      if (allpeople.arr1.length > 7) {
        zoom = [{ show: true }];
      }
      if (allpeople.arr1.length <= 7) {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.series[0], "data", allpeople.arr1);
      this.$set(this.option.xAxis[0], "data", allpeople.arr2);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 260px;
}
</style>
