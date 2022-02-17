<template>
  <div class="dashboard-editor-container">
    <!-- 预警人数 -->
    <el-row style="color: #535353">
      <div class="tit1">{{ $route.query.tit }}</div>
      <div class="tit2">{{ $route.query.name }}</div>
    </el-row>
    <!-- 评分人数 -->
    <el-row :gutter="20">
      <el-col :span="13">
        <div class="grid-content bg-purple">
          <div class="dwbk1">
            <!-- :result="result" -->
            <Score
              :skip-name="skipName"
              :monitor-id="$route.query.id"
              :result="result"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="11"
        ><div class="grid-content bg-purple-light">
          <div class="dwbk1">
            <Score1
              :skip-name2="skipName2"
              :monitor-id2="$route.query.id"
              :asstestit="asstestit"
              :frauddata="frauddata"
            />
          </div></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>监控人数</header>
            <ul>
              <li>近一周人数增长统计</li>
              <li>
                <a
                  v-for="(i, m) of titleList"
                  :key="m"
                  :class="color[m]"
                  @click="activeColor(m)"
                >
                  {{ i }}
                </a>
              </li>
              <li>
                <el-date-picker
                  v-model="value"
                  style="width: 215px; height: 26px; margin-left: 20px"
                  size="mini"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="PickdataChang"
                />
              </li>
            </ul>
            <!-- 反欺诈-评分人数图表 -->
            <div>
              <Readiaech :allpeople="allPeople" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light">
          <div class="dwbk3">
            <Assetdata :risk="Risk" />
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light">
          <div class="dwbk3">
            <RaidPiecart :pie="pie" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Score from "@/components/instansefder/farddatamoudetion.vue";
import Score1 from "@/components/instansefder/fardetailcard.vue";
import Readiaech from "@/components/Mapchina/bleminichart.vue";
import Assetdata from "@/components/Mapchina/assetDataart.vue";
import RaidPiecart from "@/components/Mapchina/deadiaRaid.vue";
import { MonitorNum } from "@/api/alertInfoDetail";
import { Riskpeople, riskLabelTag, riskLabelPiecart } from "@/api/monitor";
export default {
  components: { Score, Score1, Readiaech, Assetdata, RaidPiecart },
  data() {
    return {
      asstestit: {
        tit1: "累计标记标签（个）",
        tit2: "今日标记标签（个）",
        tit3: "平均每日标记标签(个)",
      },
      result: {},
      skipName: "riskLabelPersonDetails",
      skipName2: "riskLabelScoreDetails",
      frauddata: {},
      value: [],
      color: ["a1", ""],
      titleList: ["本周", "本月"],
      allPeople: null,
      day: 1,
      pie: {},
      Risk: {},
    };
  },
  created() {
    this.RiskLabelPiecart();
    this.management();
    this.People();
    this.numberOFRatings();
  },
  methods: {
    // 风险标签-标签数据卡
    async management() {
      const { data } = await riskLabelTag(this.$route.query.id);
      this.frauddata = data;
      // console.log(result);
    },
    // 风险标签-人数数据卡
    async People() {
      const { data } = await Riskpeople(this.$route.query.id);
      this.result = data;
      // console.log(result);
    },

    // 通过选择天数获取数据,("今日", "本周", "本月")
    activeColor(v) {
      this.color = ["", "", ""];
      this.color[v] = "a1";
      if (v === 0) {
        this.day = 1;
      } else if (v === 1) {
        this.day = 2;
      }
      this.numberOFRatings();
    },
    // 默认day='',endTime = "", startTime = "",monitorId为正常Id
    async numberOFRatings(e, s) {
      const a = this.day;
      console.log(e, s);
      let res;
      if (e && s) {
        res = await MonitorNum({
          monitorId: this.$route.query.id,
          queryTimeType: 0,
          endDate: e,
          startDate: s,
        });
      } else {
        res = await MonitorNum({
          monitorId: this.$route.query.id,
          queryTimeType: a,
          endDate: '',
          startDate: '',
        });
      }
      const { data } = res;
      this.allPeople = data.all.sort(function (a, b) {
        return a.createTime < b.createTime ? -1 : 1;
      });
      console.log(this.allPeople, "this");
      // 与时间选择标签保持同步
      if (this.allPeople) {
        this.value = [
          this.allPeople[0].countDate,
          this.allPeople[this.allPeople.length - 1].countDate,
        ];
      }
    },
    // 选择日期时获取日期数据
    PickdataChang(a) {
      this.day = 0;
      console.log(a[1], a[0], this.day);
      this.numberOFRatings(a[1], a[0]);
    },
    // 风险标签-雷达图及占比饼图
    async RiskLabelPiecart() {
      const { data } = await riskLabelPiecart(this.$route.query.id);
      console.log(data, "data");
      this.pie = {
        countInFourBid: data.countInFourBid,
        countInOneBid: data.countInOneBid,
        countInThreeBid: data.countInThreeBid,
        countInTwoBid: data.countInTwoBid,
        countNotInBid: data.countNotInBid,
      };
      this.Risk = {
        month: data.month,
        total: data.total,
        week: data.week,
      };
      // console.log(this.Risk, "this.risk");
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dashboard-editor-container {
  padding: 40px;
  background-color: rgb(242, 242, 242);
  position: relative;
}
.tit1 {
  font-size: 18px;
  color: rgb(102, 102, 102);
  font-weight: 800;
}
.tit2 {
  font-size: 10px;
  margin: 25px 0 0 15px;
}
.grid-content {
  margin-top: 20px;
}
.dwbk1 {
  height: 180px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dwbk2 {
  height: 330px;
  background-color: #fff;
  padding: 5px 20px;
  font-weight: bold;
  li {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    font-size: 10px;
    li:nth-child(1) {
      font-style: italic;
    }
    li:nth-child(2) {
      display: flex;
      width: 12%;
      justify-content: space-between;
      font-size: 12px;
      margin-left: 5%;
      font-weight: lighter;
    }
  }
}
.dwbk2 > div {
  margin-top: 10px;
  font-weight: normal;
}
.dwbk3 {
  height: 330px;
  background-color: #fff;
}
.a1 {
  color: #36a3f7;
}
</style>

