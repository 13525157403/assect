<template>
  <div class="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>

<script>
import echarts from "echarts";
import store from "@/store";
export default {
  props: ["pie"],
  data() {
    return {
      option: {
        title: {
          text: ``,
          subtext: "资金用途占比",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgb(102,102,102)",
            fontSize: 30,
            textAlign: "center",
          },
          top: "35%",
          left: "21%",
        },
        color: [
          "rgb(73,169,238)",
          "rgb(152,216,125)",
          "rgb(255,216,110)",
          "rgb(243,133,123)",
          "rgb(137,150,230)",
        ],
        legend: {
          icon: "circle",
          top: "20%",
          right: "20%",
          itemHeight: 10,
          itemWidth: 10,
          itemGap: 10,
          orient: "vertical",
          textStyle: {
            fontSize: 14,
            width: 10,
            rich: {
              a: {
                width: 80,
                height: 20,
                fontSize: 14,
              },
              b: {
                width: 50,
                fontSize: 14,
              },
            },
          },
          formatter: (p) => {
            let v;
            let sum;
            this.arrs.forEach((i, m) => {
              if (i.name == p) {
                v = this.arr[m];
                sum = this.sum[m];
              }
            });
            let arr = [`{a|${p}}{b|${v}人}{c|${sum}}%`];
            return arr;
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
            radius: ["45%", "55%"],
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
                name: "资金用途",
                value: 76,
              },
              {
                name: "反欺诈",
                value: 56,
              },
              {
                name: "资产质量",
                value: 40,
              },
              {
                name: "授信接口",
                value: 20,
              },
              {
                name: "账务",
                value: 12,
              },
            ],
          },
        ],
      },
      arr: [],
      sum: [],
      arrs: [],
    };
  },
  mounted() {},
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
      myChart.on("click", function (p) {
        store.commit("tagsView/PIE_MODIFY", p.name);
      });
      window.onresize = myChart.resize;
    },
    piedata() {
      let arr = [];
      this.arr = [];
      this.sum = [];
      let num = 0;
      for (let i in this.pie) {
        arr.push({ name: i, value: this.pie[i] });
        this.arr.push(this.pie[i]);
        num += this.pie[i] - 0;
      }
      this.arr.sort((a, b) => {
        return b - a;
      });
      arr.sort((a, b) => {
        return b.value - a.value;
      });
      this.arr.forEach((i) => {
        if (num !== 0) {
          this.sum.push(((i / num) * 100).toFixed(0));
        } else {
          this.sum.push(0);
        }
      });
      let str;
      if (this.sum[0] <= 10) {
        str = ` ${this.sum[0]}%`;
      } else {
        str = `${this.sum[0]}%`;
      }
      this.arrs = arr;
      this.$set(this.option.series[0], "data", arr);
      this.$set(this.option.title, "text", str);
      this.$set(this.option.title, "subtext", `${arr[0].name}占比`);
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
