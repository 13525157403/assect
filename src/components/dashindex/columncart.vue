<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%', }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["allpeople"],
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: function (p) {
            return `${p.name}\n${p.value}`;
          },
        },
        legend: {
          top: "5%",
          right: "5%",
          padding: [8, 20],
          itemWidth: 8,
          itemHeight:8,
          
        },
        xAxis: [
          {
            type: "category",
            data: ['12-01','12-02', '12-03', '12-04', '12-05', '12-06', '12-07'],
            axisLine: {
              show: true,

              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisLabel: {
              show:true,
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
            name: "网商贷一期",
            type: "bar",
            barWidth: 10,
            color: "",
            data: [10, 15, 70, 65, 40, 32, 78],
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
          {
            name: "网商贷二期",
            type: "bar",
            barWidth: 10,
            data: [5, 45, 20, 35, 20, 80, 40],
            itemStyle: {
              color: "rgb(152,216,125)",
            },
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            data: [35, 30, 10, 25, 69, 20, 15],
            itemStyle: {
              color: "rgb(255,216,110)",
            },
          },
        ],
      },
    };
  },
  watch: {
    // allpeople() {
    //   this.allpeopledata()
    //   this.$nextTick(() => {
    //     this.Readiaechart()
    //   })
    // }
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
  height: 290px;
}
</style>
