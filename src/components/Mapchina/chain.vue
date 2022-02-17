<template>
  <div class="echarts" ref="echarts">
    <div ref="myEchart" :style="{ height: '100%', width: '100%' }" />
  </div>
</template>
<script>
import echarts from "echarts";
import "echarts/map/js/china";
import { addressMap } from "@/api/alertInfoDetail";
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "Echarts",
  props: ["mapId"],
  data() {
    return {
      option: {
        // 进行相关配置
        tooltip: {
          show: true,
          formatter: function (p) {
            const dom = `<div>评分情况</div><div>${p.name}:${
              isNaN(p.value) ? "0" : p.value
            }</div>`;
            return dom;
          },
        }, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 100,
          text: ["High", "Low"],
          realtime: true,
          calculable: true,
          color: ["rgb(103,200,69)", "rgb(136,212,101)", "rgb(221,229,219)"],
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgb(0,0,0)",
                fontSize: 6,
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        },
        series: [
          {
            name: "评分情况", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: [
              {
                name: "南海诸岛",
                value: 0,
                eventTotal: 100,
                specialImportant: 10,
                import: 10,
                compare: 10,
                common: 40,
                specail: 20,
              },
              {
                name: "北京",
                value: 0,
              },
              {
                name: "天津",
                value: 0,
              },
              {
                name: "上海",
                value: 0,
              },
              {
                name: "重庆",
                value: 0,
              },
              {
                name: "河北",
                value: 0,
              },
              {
                name: "河南",
                value: 0,
              },
              {
                name: "云南",
                value: 0,
              },
              {
                name: "辽宁",
                value: 0,
              },
              {
                name: "黑龙江",
                value: 0,
              },
              {
                name: "湖南",
                value: 0,
              },
              {
                name: "安徽",
                value: 0,
              },
              {
                name: "山东",
                value: 0,
              },
              {
                name: "新疆",
                value: 0,
              },
              {
                name: "江苏",
                value: 0,
              },
              {
                name: "浙江",
                value: 0,
              },
              {
                name: "江西",
                value: 0,
              },
              {
                name: "湖北",
                value: 0,
              },
              {
                name: "广西",
                value: 0,
              },
              {
                name: "甘肃",
                value: 0,
              },
              {
                name: "山西",
                value: 0,
              },
              {
                name: "内蒙古",
                value: 0,
              },
              {
                name: "陕西",
                value: 0,
              },
              {
                name: "吉林",
                value: 0,
              },
              {
                name: "福建",
                value: 0,
              },
              {
                name: "贵州",
                value: 0,
              },
              {
                name: "广东",
                value: 0,
              },
              {
                name: "青海",
                value: 0,
              },
              {
                name: "西藏",
                value: 0,
              },
              {
                name: "四川",
                value: 0,
              },
              {
                name: "宁夏",
                value: 0,
              },
              {
                name: "海南",
                value: 0,
              },
              {
                name: "台湾",
                value: 0,
              },
              {
                name: "香港",
                value: 0,
              },
              {
                name: "澳门",
                value: 0,
              },
            ],
          },
        ],
      },
      dataMap: {},
    };
  },
  created() {
    this.addressMap();
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
    // 地址评分-地图(左)中国地图各省评分
    async addressMap() {
      const { data } = await addressMap(this.mapId);
      console.log(this.mapId);
      this.dataMap = data;
      const arr = [];
      console.log(data, "result");
      if (data) {
        this.dataMap.forEach((i) => {
          arr.push({
            name: i.provinceName.substring(0, 2),
            value: parseInt(i.scoreAve),
          });
        });
        this.$set(this.option.series[0], "data", arr);
      }
      this.$nextTick(() => {
        this.chinaConfigure();
      });
    },
    chinaConfigure() {
      const myChart = echarts.init(this.$refs.myEchart);
      myChart.setOption(this.option);
      window.onresize = myChart.resize;
    },
  },
};
</script>

<style>
</style>
