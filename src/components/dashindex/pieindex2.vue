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
            radius: "70%",
            hoverOffset: 15,
            minAngle: 0,
            startAngle: 110,
            center: ["50%", "50%"],
            itemStyle: {
              borderRadius: 8,
            },
            label: {
              type: "item",
              color: "rgb(152,152,152)",
              formatter: function (p) {
                const dom = `{a|${p.data.name}}\n${p.percent.toFixed(0)}%`;
                return dom;
              },
              show: true,
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 8,
                  width: 8,
                  height: 8,
                  padding: [3, 3, 0, 0],
                },
              },
            },
            labelLine: {
              normal: {
                length: 10,
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
                name: "项目监控任务",
                value: 38,
                shadoBlur: 10,
                itemStyle: {
                  normal: {
                    color: "rgb(73,169,238)",
                  },
                },
                selected: true,
              },
              {
                name: "项目预警任务",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "rgb(152,216,125)",
                  },
                },
              },
              {
                name: "手动\n录入\n数据",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "rgb(255,216,110)",
                  },
                },
              },
              {
                name: "其他",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "rgb(243,133,123)",
                  },
                },
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
      let pieArr = [];
      let colorArr = [
        "rgb(73,169,238)",
        "rgb(152,216,125)",
        "rgb(255,216,110)",
        "rgb(243,133,123)",
        "rgb(128,128,255)",
        "rgb(0,255,255)",
      ];
      this.pie.forEach((item, index) => {
        let num = Math.round(Math.random() * 10);
        if (num > 5) {
          num = num - 5;
        }
        if (index == 0) {
          pieArr.push({
            name: item.countType,
            value: item.countNum,
            shadoBlur: 10,
            itemStyle: {
              normal: {
                color: "rgb(73,169,238)",
              },
            },
            selected: true,
          });
        } else {
          pieArr.push({
            name: item.countType,
            value: item.countNum,
            itemStyle: {
              normal: {
                color: colorArr[num],
              },
            },
          });
        }
      });
      this.$set(this.option.series[0], "data", pieArr);
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
