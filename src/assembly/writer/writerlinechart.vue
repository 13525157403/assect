<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    rawanum: {},
    color: {},
  },
  data() {
    return {
      option: {
        legend: {
          right: "auto",
          top: "10%",
          type: "plain",
          textStyle: {
            color: "#000",
            fontSize: 14,
          },
          padding: -15,
          itemGap: 20,
          itemWidth: 20,
          icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
          data: [
            {
              name: "授信金额",
            },
            {
              name: "核销金额",
            },
          ],
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              show: false,
              // 坐标轴轴线相关设置。数学上的x轴
              lineStyle: {
                color: "rgb(228,228,228)",
              },
            },
            axisLabel: {
              // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "#000",
                padding: 10,
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
            axisTick: {
              show: false,
            },
            data: [
              "10-01",
              "10-02",
              "10-03",
              "10-04",
              "10-05",
              "10-06",
              "10-07",
              "10-08",
            ],
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(228,228,228)",
                type: "dotted",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgb(221,221,221)",
                type: "dotted",
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
        grid: {
          top: "15%",
          left: "9%",
          right: "4%",
          bottom: "15%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          // },
        },
        dataZoom: [],
        series: [
          {
            name: "授信金额",
            symbol: "circle",
            symbolSize: 6,
            data: [3000, 4800, 1400, 5600, 2400, 7300, 6200, 1800],
            type: "line",
            itemStyle: {
              color: this.color[0],
            },
            areaStyle: {
              // 区域填充样式
              normal: {
                color: this.color[0],
              },
            },
            lineStyle: {
              color: this.color[0],
            },
          },
          {
            name: "核销金额",
            symbol: "circle",
            symbolSize: 6,
            data: [1000, 3800, 2400, 5000, 6400, 2300, 1200, 4800],
            type: "line",
            itemStyle: {
              color: this.color[1],
            },
            areaStyle: {
              // 区域填充样式
              normal: {
                color: this.color[1],
              },
            },
            lineStyle: {
              show: false,
            },
          },
        ],
      },
    };
  },
  watch: {
    rawanum() {
      this.readata();
      this.$nextTick(() => {
        this.readiaechart();
      });
    },
  },
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    readata() {
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      let zoom;
      this.rawanum.forEach((i) => {
        arr.push(String(i.time).slice(5, 10));
        arr1.push(i.value1);
        arr2.push(i.value2);
      });
      if (arr.length > 7) {
        zoom = [{ show: true }];
      }
      if (arr.length <= 7) {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.xAxis[0], "data", arr);
      this.$set(this.option.series[0], "data", arr1);
      this.$set(this.option.series[1], "data", arr2);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 350px;
}
</style>
