<template>
  <div>
    <el-date-picker
      v-model="value"
      type="datetimerange"
      unlink-panels
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      popper-append-to-body="false"
      popper-class="sce"
      @change="actdata"
      value-format="yyyy-MM-dd HH:mm:ss"
    >
    </el-date-picker>
  </div>
</template>

<script>
import {
  GetDateStr,
  getWeekStartDate,
  getWeekEndDate,
  getLastWeekStartDate,
  getLastWeekEndDate,
  getMonthStartDate,
  getMonthEndDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
} from "@/utils/datetime";
export default {
  data() {
    return {
      value: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date(
                new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1
              );
              const start = new Date(new Date().setHours(0, 0, 0, 0));
              console.log(start, end, 111);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date(
                new Date(GetDateStr(-1)).setHours(0, 0, 0, 0) +
                  24 * 60 * 60 * 1000 -
                  1
              );
              const start = new Date(GetDateStr(-1));
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              const end = new Date(getWeekEndDate() + " 23:59:59");
              const start = new Date(getWeekStartDate() + " 00:00:00");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上周",
            onClick(picker) {
              const end = new Date(getLastWeekEndDate() + " 23:59:59");
              const start = new Date(getLastWeekStartDate() + " 00:00:00");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本月",
            onClick(picker) {
              const end = new Date(getMonthEndDate() + " 23:59:59");
              const start = new Date(getMonthStartDate() + " 00:00:00");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              const end = new Date(getLastMonthEndDate() + " 23:59:59");
              const start = new Date(getLastMonthStartDate() + " 00:00:00");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本年",
            onClick(picker) {
              const end = new Date(
                new Date().getFullYear() + "-12-31 23:59:59"
              );
              const start = new Date(
                new Date().getFullYear() + "-01-01 00:00:00"
              );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "去年",
            onClick(picker) {
              const end = new Date(
                new Date().getFullYear() - 1 + "-12-31 23:59:59"
              );
              const start = new Date(
                new Date().getFullYear() - 1 + "-01-01 00:00:00"
              );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "过去7天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "过去30天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "过去90天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上线至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    actdata(){
      this.$emit('change',this.value)
    }
  },
};
</script>

<style lang="scss">
.sce {
  border-radius: 5px;
}
.sce {
  width: 840px !important;
}
.sce .el-picker-panel__body {
  margin-left: 26%;
}
.sce .el-date-range-picker__content {
  width: 50% !important;
  float: left !important;
}
.sce .el-picker-panel__sidebar {
  width: 26% !important;
  display: flex !important;
  justify-content: space-around !important;
  flex-wrap: wrap !important;
  align-content: flex-start !important;
}
.sce .el-picker-panel__shortcut {
  border-radius: 3%;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  width: 45% !important;
  height: 30px !important;
  background-color: rgb(245, 248, 252) !important;
}
</style>