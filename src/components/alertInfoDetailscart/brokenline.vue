<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["rawanum"],
  data() {
    return {
      option: {
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
                padding: 14,
                fontSize: 14,
              },
              formatter: function (data) {
                return data;
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
            data: [],
          },
        ],
        yAxis: [
          {
            min: 0,
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
                padding: 16,
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
        },
        dataZoom: [],
        series: [
          {
            data: [],
            type: "line",
            itemStyle: {
              color: "rgb(152,216,125)",
            },
            lineStyle: {
              color: "rgb(152,216,125)",
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
      let arr4 = [];
      this.rawanum.map((i) => {
        arr4.push(i.countNum);
        arr.push(i.countNum);
        arr1.push(String(i.countDate).slice(5, 10));
      });
      arr4.sort((a, b) => {
        return b - a;
      });
      let zoom;
      if (arr1.length > 7) {
        zoom = [{ show: true }];
      }
      if (arr1.length <= 7) {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.series[0], "data", arr);
      this.$set(this.option.xAxis[0], "data", arr1);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 80%;
  height: 350px;
}
</style>
