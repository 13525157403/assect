<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  props: ["pie"],
  data() {
    return {
      option: {
        color: [
          "rgb(8,41,247)",
          "rgb(244,97,111)",
          "rgb(204,0,255)",
          "rgb(40,204,216)",
        ],
        legend: {
          bottom: "10%",
          itemHeight: 10,
          itemWidth: 10,
          itemGap: 10,
          orient: "horizontal",
        },
        tooltip: {
          trigger: "item",
          formatter: function (p) {
            const dom = `<div>${p.name}</div><div>${p.percent.toFixed(
              0
            )}%</div>`;
            return dom;
          },
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "50%"],
            avoidLabelOverlap: false,
            hoverOffset: 15,
            minAngle: 0,
            startAngle: 80,
            center: ["50%", "40%"],
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              formatter: function (p) {
                const dom = `${p.data.name}${p.percent.toFixed(0)}%`;
                return dom;
              },
              show: true,
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  padding: [-20, 10, -10, 0],
                },
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 10,
                lineStyle: {
                  width: 2,
                  color: "rgb(204,204,204)",
                  type: "solid",
                },
              },
            },
            data: [
              {
                name: "地产类",
                value: 38,
              },
              {
                name: "地产+投资",
                value: 28,
              },
              {
                name: "投资类",
                value: 20,
              },
              {
                name: "无交易信息",
                value: 10,
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    pie() {
      this.piedata();
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
    piedata() {
      const arr = [];
      arr[3] = { name: this.pie[0].countType, value: this.pie[0].countNum };
      arr[0] = { name: this.pie[1].countType, value: this.pie[1].countNum };
      arr[2] = { name: this.pie[2].countType, value: this.pie[2].countNum };
      arr[1] = { name: this.pie[3].countType, value: this.pie[3].countNum };
      this.$set(this.option.series[0], "data", arr);
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
