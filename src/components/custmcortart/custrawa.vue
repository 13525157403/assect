<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["rawanum"],
  watch: {
    rawanum() {
      this.adata();
      this.$nextTick(() => {
        this.readiaechart();
      });
    },
  },
  data() {
    return {
      option: {
        title: [
          {
            text: `{a|${this.rawanum}}{b|%}`,
            top: "center",
            left: "center",
            textStyle: {
              fontWeight: "normal",
              rich: {
                a: {
                  fontWeight: "normal",
                  fontSize: 30,
                  color: "rgb(102,102,102)",
                  textShadowBlur: 10,
                },
              },
            },
          },
        ],
        legend: {
          bottom: '10%',
          left: "10%",
          formatter: `已使用`,
          textStyle: {
            color: "rgb(152,152,152)",
            fontSize: 14,
          },
        },
        series: [
          {
            name: "内层进度条",
            z: 3,
            type: "gauge", // 仪表盘
            center: ["center", "center"],
            radius: "85%",
            detail: {
              show: false,
            },
            title: {
              show: false,
            },
            data: [
              {
                value: this.rawanum,
                name: "Percent",
              },
            ],
            startAngle: "225", // 仪表盘起始角度
            endAngle: "-45", // 仪表盘结束角度
            min: 0,
            max: 100,
            splitNumber: 20,
            axisLine: {
              show: true,
              lineStyle: {
                roundCap: true,
                width: 14,
                color: [
                  [this.rawanum / 100, "rgb(25,162,171)"],
                  [1, "rgb(244,244,244)"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
        ],
      },
    };
  },
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },

    adata() {
      this.$set(this.option.title[0], "text", `{a|${this.rawanum - 0}}{b|%}`);
      this.$set(
        this.option.series[0].data[0],
        "value",
        `{a|${this.rawanum - 0}}{b|%}`
      );
      let arr = [
        [(this.rawanum - 0) / 100, "rgb(72,168,237)"],
        [1, "rgb(244,244,244)"],
      ];
      this.$set(this.option.series[0].axisLine.lineStyle, "color", arr);
      let v = `已使用    ${this.rawanum - 0}%`;
      this.$set(this.option.legend, "formatter", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 200px;
  height: 200px;
  color: #6fe9fe;
}
</style>
