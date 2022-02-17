<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["allpeople"],
  data() {
    return {
      option: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          formatter: () => {
            return "每日监控人数";
          },
          top: "5%",
          right: "10%",
          padding: [8, 20],
          backgroundColor: "rgb(241,245,252)",
          borderRadius: 5,
          itemWidth: 15,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "rgb(153,153,153)",
                fontSize: 14,
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
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "rgb(153,153,153)",
                fontSize: 14,
              },
            },
            // splitLine: {
            //   show: false,
            // },
          },
        ],
        dataZoom: [],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: 10,
            data: [],
            itemStyle: {
              color: "rgb(52,198,53)",
              barBorderRadius: [10, 10, 0, 0],
            },
          },
        ],
      },
    };
  },
  watch: {
    allpeople() {
      this.allpeopledata();
      this.$nextTick(() => {
        this.Readiaechart();
      });
    },
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    // 数据处理
    allpeopledata() {
      const arr = [];
      const arr1 = [];
      this.allpeople.map((i, m) => {
        arr[m] = String(i.countDate).slice(5, 10);
        arr1[m] = i.countNum;
      });
      this.$set(this.option.xAxis[0], "data", arr);
      this.$set(this.option.series[0], "data", arr1);
      let zoom;
      if (arr.length > 7) {
        zoom = [{ show: true }];
      }
      if (arr.length <= 7) {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 280px;
}
</style>
