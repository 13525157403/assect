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
        title: {
          text: "200",
          subtext: "   人数",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgb(102,102,102)",
            fontSize: 30,
            textAlign: "center",
          },

          top: "35%",
          left: "20%",
        },
        color: [
          "rgb(73,169,238)",
          "rgb(152,216,125)",
          "rgb(255,216,110)",
          "rgb(243,133,123)",
          "rgb(137,150,230)",
        ],
        legend: {
          top: "26%",
          right: "10%",
          itemHeight: 10,
          itemWidth: 10,
          itemGap: 10,
          orient: "vertical",
          formatter: (p) => {
            if (p === "杭州") {
              return p + "    " + this.arr[0] + "人  " + this.sum[0] + "%";
            }
            if (p === "成都") {
              return p + "    " + this.arr[1] + "人  " + this.sum[1] + "%";
            }
            if (p === "深圳") {
              return p + "    " + this.arr[2] + "人  " + this.sum[2] + "%";
            }
            if (p === "广州") {
              return p + "    " + this.arr[3] + "人  " + this.sum[3] + "%";
            }
            if (p === "上海") {
              return p + "    " + this.arr[4] + "人  " + this.sum[4] + "%";
            }
          },
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
            radius: ["35%", "45%"],
            avoidLabelOverlap: false,
            hoverOffset: 15,
            minAngle: 0,
            startAngle: 120,
            center: ["28%", "40%"],
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              show: false,
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
                name: "杭州",
                value: 76,
              },
              {
                name: "成都",
                value: 56,
              },
              {
                name: "深圳",
                value: 40,
              },
              {
                name: "广州",
                value: 20,
              },
              {
                name: "上海",
                value: 12,
              },
            ],
          },
        ],
      },
      arr: [76, 56, 40, 20, 12],
      sum: [37, 27, 20, 10, 6],
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
  height: 100%;
}
</style>
