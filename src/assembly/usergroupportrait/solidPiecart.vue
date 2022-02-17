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
    color: {
      type: Array,
      default: function () {
        return [
          "rgb(73,169,238)",
          "rgb(152,216,125)",
          "rgb(255,216,110)",
          "rgb(243,133,123)",
          "rgb(128,128,255)",
          "rgb(243,133,123)",
          "rgb(29,233,182)",
          "rgb(56,155,183)",
          "rgb(255,124,63)",
          "rgb(255,184,166)",
          "rgb(88,215,157)",
          "rgb(255,106,122)",
          "rgb(160,174,255)",
          "rgb(68,55,201)",
          "rgb(115,221,166)",
          "rgb(255,154,24)",
          "rgb(158,149,255)",
          "rgb(158,227,254)",
          "rgb(253,81,81)",
          "rgb(101,229,221)",
        ];
      },
    },
  },
  data() {
    return {
      num: 0,
      option: {
        color: this.color,
        legend: {
          icon: "circle",
          bottom: "6%",
          itemHeight: 10,
          itemWidth: 10,
          itemGap: 10,
          orient: "horizontal",
          formatter: (p) => {
            let str = "";
            if (p.length > 5) {
              str = String(p).slice(0, 5) + "...";
            } else {
              str = p;
            }
            return str;
          },
        },
        tooltip: {
          trigger: "item",
          formatter: (p) => {
            const dom = `<div>${p.name}</div>
            <div>人数${p.value}</div>`;
            return dom;
          },
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            avoidLabelOverlap: false,
            hoverOffset: 15,
            minAngle: 10,
            startAngle: 120,
            center: ["54%", "40%"],
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              formatter: function (p) {
                let str = "";
                if (p.name.length > 5) {
                  str = String(p.data.name).slice(0, 5) + "...";
                } else {
                  str = p.data.name;
                }
                const dom = `${str}: ${p.percent.toFixed(2)}%`;
                return dom;
              },
              show: true,
              rich: {},
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
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    cartdata() {
      this.piedata();
    },
  },
  mounted() {},
  methods: {
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    piedata() {
      let dataArr = [];
      this.cartdata.forEach((item) => {
        dataArr.push({ name: item.tagLayerName, value: item.calculateNum });
      });
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
