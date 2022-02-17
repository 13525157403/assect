<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '95%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: {
    risk: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      option: {
        color: ["rgb(73,169,238)", "rgb(125,200,86)", "rgb(255,216,110)"],
        tooltip: {
          trigger: "item",
        },
        legend: {
          icon: "circle",
          orient: "horizontal", // 这里主要是标识不同颜色代表不同的同学
          x: "center",
          y: "bottom",
          itemGap: 5,
          itemWidth: 10,
          itemHeigth: 10,
          textStyle: {
            fontSize: 12,
          },
          data: ["累计查询结果", "近一月查询结果", "近一周查询结果"],
        },
        radar: [
          {
            center: ["48%", "45%"],
            radius: "55%",
            startAngle: 90,
            splitNumber: 4,
            shape: "cirle",
            nameGap: 20,
            name: {
              formatter: "{value}",
              textStyle: {
                fontSize: "14",
                color: "rgb(152,152,152)",
              },
            },
            indicator: [
              {
                text: "虚假申请 ",
                max: 5.0,
                color: "rgb(152,152,152)",
              },
              { text: "失信人 ", max: 5.0 },
              { text: "营销套利 ", max: 5.0 },
              { text: "未命中", max: 5.0 },
              { text: "经济犯罪", max: 5.0 },
            ],
            splitArea: {
              areaStyle: {
                color: "#fff",
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgb(237,237,237)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgb(237,237,237)",
              },
            },
          },
        ],
        calculable: true,
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [3.5, 4.8, 3.2, 4.7, 4.5],
                name: "累计查询结果",
              },
              {
                value: [4.2, 4.1, 3.9, 3.7, 3.5],
                name: "近一月查询结果",
                color: "blue",
              },
              {
                value: [3.4, 1.8, 1.2, 6.7, 1.5],
                name: "近一周查询结果",
              },
            ],
          },
        ],
      },
    };
  },
  watch: {
    risk: {
      handler() {
        this.riskData();
        this.$nextTick(() => {
          this.readiaechart();
        });
      },
      immediate: true,
    },
  },
  mounted() {
    let that = this;
    var erd = elementResizeDetectorMaker();
    erd.listenTo(this.$refs.echarts, function (element) {
      that.$nextTick(function () {
        echarts.init(that.$refs.myEchart).resize();
      });
    });
  },
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    riskData() {
      const risk = JSON.parse(JSON.stringify(this.risk));
      const arr = [];
      for (const i in risk) {
        arr[i] = [];
        for (const j in risk[i]) {
          arr[i].push(risk[i][j]);
        }
      }
      this.$set(this.option.series[0].data[0], "value", arr["total"]);
      this.$set(this.option.series[0].data[1], "value", arr["month"]);
      this.$set(this.option.series[0].data[2], "value", arr["week"]);
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
