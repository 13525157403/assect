<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import store from "@/store";
export default {
  props: ["pie", "name"],
  data() {
    return {
      option: {
        color: [
          "rgb(73,169,238)",
          "rgb(152,216,125)",
          "rgb(255,216,110)",
          "rgb(243,133,123)",
          "rgb(137,150,230)",
        ],
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
            radius: "50%",
            hoverOffset: 15,
            minAngle: 0,
            startAngle: 110,
            center: ["30%", "40%"],
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              color: "rgb(152,152,152)",
              formatter: function (p) {
                const dom = `${p.data.name}\n${p.percent.toFixed(0)}%`;
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
                length2: 5,
                lineStyle: {
                  width: 1,
                  color: "rgb(216,216,216)",
                  type: "dotted",
                },
              },
            },
            data: [
              {
                name: "方式5",
                value: 38,
              },
              {
                name: "方式4",
                value: 28,
              },
              {
                name: "方式3",
                value: 20,
              },
              {
                name: "方式2",
                value: 10,
              },
              {
                name: "方式1",
                value: 6,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    listdata() {
      return store.state.tagsView.pieactive;
    },
  },
  watch: {
    listdata() {
      this.datalist();
      this.$nextTick(() => {
        this.Readiaechart();
      });
    },
    pie() {
      this.pielist();
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
    datalist() {
      let arr = [];
      console.log(this.listdata, "pppppppppppp");
      this.listdata.map((i) => {
        arr.push({ name: i.alertType, value: i.countNum });
      });
      this.$set(this.option.series[0], "data", arr);
    },
    pielist() {
      let arr = [];
      console.log(this.name,'this.name',this.pie);
      this.pie[this.name].map((i) => {
        arr.push({ name: i.alertType, value: i.countNum });
      });
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
