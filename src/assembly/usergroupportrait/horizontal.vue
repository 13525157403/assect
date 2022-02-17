<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["cartdata"],
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
          top: "10%",
          left: "0%",
          right: "15%",
          containLabel: true,
        },
        dataZoom: [],
        yAxis: [
          {
            inverse: true,
            type: "category",
            data: [],
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
        xAxis: [
          {
            position: "top",
            type: "value",
            data: [],
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgb(235,235,235)",
              },
            },
            axisLabel: {
              // interval: 0,
              textStyle: {
                color: "rgb(102,102,102)",
                fontSize: 12,
              },
            },
            splitLine: {
              show: true,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: 28,
            data: [],
            itemStyle: {
              color: "rgb(73,169,238)",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#000",
              },
            },
          },
        ],
      },
    };
  },
  watch: {
    cartdata() {
      this.cartList();
    },
  },
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    cartList() {
      let xArr = [];
      let dataArr = [];
      let zoom = [{ show: false }];
      this.cartdata.forEach((item) => {
        dataArr.push(item.calculateNum);
        xArr.push(item.tagLayerName);
      });
      if (xArr.length > 7) {
        zoom = [{ show: true }];
      } else {
        zoom = [{ show: false }];
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.series[0], "data", dataArr);
      this.$set(this.option.yAxis[0], "data", xArr);
      this.$refs.myEchart.removeAttribute("_echarts_instance_");
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
  height: 300px;
}
</style>
