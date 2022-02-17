<template>
  <div class="dashboard-editor-container">
    <el-row style="color: #535353">
      <div class="tit1">{{ $route.query.tit }}</div>
      <div class="tit2">{{ $route.query.name }}</div>
    </el-row>

    <el-row :gutter="20">
      <!-- 预警人数 -->
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
      <!-- 评分人数 -->
      <el-col :span="11"
        ><div class="grid-content bg-purple-light">
          <div class="dwbk1">
            <!-- :asstestit="asstestit" :frauddata="frauddata" -->
            <Score1
              :skip-name2="skipName2"
              :monitor-id2="$route.query.id"
              :asstestit="asstestit"
              :frauddata="frauddata"
            />
          </div></div
      ></el-col>
    </el-row>

    <el-row :gutter="30">
      <!-- 评分人数 -->
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <div class="dwbk2">
            <header>评分人数</header>
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
                  style="width: 240px; margin-left: 30px"
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
      <!-- 评分/在贷余额 -->
      <el-col :span="9">
        <div class="grid-content bg-purple-light">
          <div class="dwbk3">
            <header>评分/在贷余额</header>
            <div>
              <Bleechart :e-id-data="EIdData" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Score from "@/components/instansefder/farddatamoudetion.vue";
import Score1 from "@/components/instansefder/fardetailcard.vue";
import Readiaech from "@/components/Mapchina/eachredia.vue";
import Bleechart from "@/components/Mapchina/Bleechart.vue";
import { ManageMent, numberOfRatings, blecart } from "@/api/alertInfoDetail";
export default {
  components: { Score, Score1, Readiaech, Bleechart },
  data() {
    return {
      asstestit: {
        tit1: "累计评分次数",
        tit2: "今日反欺诈评分（次）",
        tit3: "平均每日评分(次)",
      },
      result: {},
      skipName: "FraudDataPerson",
      skipName2: "FraudDataScore",
      frauddata: {},
      value: [],
      color: ["", "a1", ""],
      titleList: ["今日", "本周", "本月"],
      allPeople: [],
      EIdData: [],
      day: 1,
    };
  },
  created() {
    this.management();
    this.People();
    this.numberOFRatings();
    this.Blecart();
  },
  methods: {
    // //反欺诈-评分数据卡
    async management() {
      const { data } = await ManageMent("score", this.$route.query.id);
      this.frauddata = data;
    },
    // 反欺诈-人数数据卡
    async People() {
      const { data } = await ManageMent("people", this.$route.query.id);
      this.result = data;
    },
    // 通过选择天数获取数据,("今日", "本周", "本月")
    activeColor(v) {
      this.color = ["", "", ""];
      this.color[v] = "a1";
      if (v === 0) {
        this.day = 0;
      } else if (v === 1) {
        this.day = 1;
      } else if (v === 2) {
        this.day = 2;
      }
      this.numberOFRatings();
    },
    // 反欺诈-评分人数
    // 默认day=''(天数),endTime = ""(结束日期), startTime = ""(开始日期),monitorId为正常Id
    async numberOFRatings(endTime = "", startTime = "") {
      
      const a = this.day;
      const { data } = await numberOfRatings({
        monitorId: this.$route.query.id,
        queryTimeType: a,
        endDate: endTime,
        startDate: startTime,
      });
      if (data.all.length !== 0) {
        data.all.sort(function (a, b) {
          return a.countDate < b.countDate ? -1 : 1;
        });
        data.overThreshold.sort(function (a, b) {
          return a.countDate < b.countDate ? -1 : 1;
        });
        this.value = [
          data.all[0].countDate,
          data.all[data.all.length - 1].countDate,
        ];
        let arr = [];
        data.all.map((i, m) => {
          arr.push({
            countAll: i.countNum,
            count: data.overThreshold[m].countNum,
            createTime: i.countDate,
          });
        });
        this.allPeople = arr;
      }
    },
    // 选择日期时获取日期数据
    PickdataChang(a) {
      this.day=0
      this.numberOFRatings(a[1], a[0]);
    },
    async Blecart() {
      const { data } = await blecart(this.$route.query.id);
      this.EIdData = data;
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

  .cardOfEl {
    height: 150px;
  }
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-content {
      /* position: relative;
    overflow: hidden; */
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3;
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: left;
        font-weight: bold;
        /* margin: 26px; */
        margin-left: 20px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 12px;
          margin-top: 12px;
          span {
            color: red;
            margin-right: 5px;
          }
        }

        .card-panel-num {
          font-size: 20px;
          margin-bottom: 12px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
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
  width: 100%;
  height: 180px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dwbk2 {
  height: 400px;
  background-color: #fff;
  padding: 10px 40px;
  font-weight: bold;
  li {
    display: flex;
    align-items: center;
  }
  ul {
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    li:nth-child(1) {
      font-style: italic;
    }
    li:nth-child(2) {
      width: 20%;
      justify-content: space-between;
      font-size: 12px;
      font-weight: lighter;
      margin-left: 15%;
    }
  }
}
.dwbk2 > div {
  margin-top: 10px;
  font-weight: normal;
}

.dwbk3 {
  height: 400px;
  background-color: #fff;
  padding: 10px 20px;
  font-weight: bold;
}
.a1 {
  color: rgb(16, 142, 233);
}
</style>

