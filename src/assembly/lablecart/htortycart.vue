<template>
  <div class="echarts" ref="echarts" :style="{ height: maxHeight, width: '980px' }">
    <div ref="myEchart" :style="{ height: maxHeight, width: '980px' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import store from "@/store";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  props: ["amt", "reg", "height"],
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
          left: "6%",
          right: "10%",
          containLabel: true,
        },
        dataZoom: [],
        yAxis: [],
        xAxis: [],
        series: [
          {
            name: "Direct",
            type: "bar",
            stack: "Total",
            barWidth: 28,
            data: [15, 60, 14],
            label: {
              show: true,
              position: "right",
              color: "#000",
              formatter: function (p) {},
            },
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "rgb(73,169,238)",
            },
          },
        ],
      },
      xAxis: [
        {
          type: "value",
          interval: 0,
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgb(235,235,235)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
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
      yAxis: [
        {
          type: "category",
          interval: 0,
          // inverse: true,
          data: [],
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgb(235,235,235)",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
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
      maxHeight: "240px",
    };
  },
  computed: {},
  watch: {
    amt: function () {
      this.amtdata();
    },
    reg() {
      this.regdata();
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
    Readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    regdata() {
      if (this.reg) {
        this.maxHeight = "240px";
        this.option.xAxis = this.yAxis;
        this.option.yAxis = this.xAxis;
        this.$set(this.yAxis[0].axisLabel, "rotate", this.rotate);
        this.$set(this.option.series[0].label, "position", "top");
        this.$refs.myEchart.removeAttribute("_echarts_instance_");
        this.$nextTick(() => {
          this.Readiaechart();
        });
      } else {
        this.maxHeight = this.height;
        this.$set(this.yAxis[0].axisLabel, "rotate", 0);
        this.$set(this.option.series[0].label, "position", "right");
        this.$set(this.option, "dataZoom", []);
        this.option.xAxis = this.xAxis;
        this.option.yAxis = this.yAxis;
        this.$refs.myEchart.removeAttribute("_echarts_instance_");
        this.$nextTick(() => {
          this.Readiaechart();
        });
      }
    },
    amtdata() {
      if (!this.amt) return;
      const arr1 = [];
      const arr2 = [];
      this.rotate = 0;
      let zoom = [{ show: false }];
      this.amt.forEach((i) => {
        arr1.push(i.countNum);
        arr2.push(i.countType);
      });
      if (arr2.length > 15) {
        zoom = [{ show: true }];
      } else {
        zoom = [{ show: false }];
      }
      if (arr2.length > 7) {
        this.rotate = 60;
      } else {
        this.rotate = 0;
      }
      this.$set(this.option, "dataZoom", zoom);
      this.$set(this.option.series[0], "data", arr1);
      this.$set(this.yAxis[0], "data", arr2);
      this.regdata();
    },
  },
};
</script>

