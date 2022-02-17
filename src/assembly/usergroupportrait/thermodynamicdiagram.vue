<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    cartdata: {},
  },
  data() {
    return {
      num: 0,
      option: {
        tooltip: {
          position: "top",
          type: "item",
          formatter: (p) => {
            return p.data[2];
          },
        },
        animation: false,
        grid: {
          height: "65%",
          top: "3%",
          left: "6.5%",
          right: "0%",
        },
        xAxis: {
          interval: 0,
          type: "category",
          axisLabel: {
            show: false,
            fontSize: 10,
            rotate: 20,
          },
          data: [
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "74000-72000",
            "[其它]",
          ],
          splitArea: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: ["个体", "司机", "职员", "公务员", "工人", "白领"],
          splitArea: {
            show: false,
          },
          axisLabel: {
            show: false,
            fontSize: 10,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "8%",
          precision: 2,
          indicatorSize: "20%",
          color: ["rgb(32,138,254)", "rgb(191,218,249)"],
        },
        series: [
          {
            name: "",
            type: "heatmap",
            data: [],
            itemStyle: {
              borderWidth: 2,
              borderColor: "#fff",
            },
            label: {
              show: true,
              formatter: (p) => {
                return `${p.data[2]}`;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  watch: {
    cartdata() {
      this.therdata();
    },
  },
  mounted() {},
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    therdata() {
      let arr = [...this.cartdata];
      let dataArr = [];
      let len = 0;
      arr.sort((a, b) => {
        return a.calculateNum - b.calculateNum
      });
      console.log(arr, "arr");
      arr.forEach((item, index) => {
        if (index !== 0 && index % 10 == 0) {
          len++;
        }
        dataArr.push([index - len * 10, len, item.calculateNum]);
      });
      this.$set(this.option.visualMap, "max", arr[arr.length - 1].calculateNum);
      this.$set(this.option.series[0], "data", dataArr);
      this.$nextTick(() => {
        this.Readiaechart();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
