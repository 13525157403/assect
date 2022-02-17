<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '110%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["amt"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: function (p) {
            return `${p.name}\n${p.value}`;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["网商贷(一期)", "网商贷(二期)", "xxx", "xxx", "xxx"],
            axisLine: {
              show: true,

              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "rgb(102,102,102)",
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "rgb(102,102,102)",
                fontSize: 12,
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: 28,
            data: [15, 60, 14, 26, 40],
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.Readiaechart();
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
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
