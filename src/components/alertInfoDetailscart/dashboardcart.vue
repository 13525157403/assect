<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["rawanum"],
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
          bottom: "6%",
          left: "5%",
          formatter: `比目标值偏高    ${this.rawanum - 40}%`,
          textStyle: {
            color: "rgb(152,152,152)",
            fontSize: 12,
          },
        },
        series: [
          {
            name: "内层进度条",
            z: 3,
            type: "gauge", // 仪表盘
            center: ["center", "center"],
            radius: "80%",
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
                width: 12,
                color: [
                  [this.rawanum / 100, "rgb(72,168,237)"],
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
  watch: {
    rawanum() {
      this.rawanumdata();
      this.$nextTick(()=>{
        this.readiaechart()
      })
    },
  },
  methods: {
    readiaechart() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
    rawanumdata() {
      let str = `{a|${this.rawanum}}{b|%}`;
      let str1;
      let color = [
        [this.rawanum / 100, "rgb(72,168,237)"],
        [1, "rgb(244,244,244)"],
      ];
      let data = [
        {
          value: this.rawanum,
          name: "Percent",
        },
      ];
      if (this.rawanum - 40 < 0) {
        str1 = `比目标值偏低    ${40 - this.rawanum}%`;
      } else {
        str1 = `比目标值偏高    ${this.rawanum - 40}%`;
      }
      this.$set(this.option.title[0], "text", str);
      this.$set(this.option.legend, "formatter", str1);
      this.$set(this.option.series[0].axisLine.lineStyle, "color", color);
      this.$set(this.option.series[0], "data", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 200px;
  height: 200px;
  margin-top: 40px;
  color: #6fe9fe;
}
</style>
