<template>
  <div
    class="dashboard-home"
    v-loading="lod"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="head-home">
      <header>当前概况统计</header>
      <el-row :gutter="20" class="panel-group">
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="imgs icon-color1">
              <img :src="require('@/assets/icon/u16656.svg')" alt="" />
            </div>
            <div>
              <div class="tit">截至昨日在贷余额</div>
              <div class="card-panel-num">
                {{ surveyData.creditAssets.totalEncashAmt }}<span>万元</span>
              </div>
              <div class="man-pop-num">
                <p>
                  <span>总客户人数</span>
                  <span>{{ surveyData.creditAssets.totalNum }}人</span>
                </p>
                <p>
                  <span>授信总额</span>
                  <span v-if="surveyData.creditAssets.totalCreditLimit">
                    {{ surveyData.creditAssets.totalCreditLimit }}万元</span
                  >
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('messages')">
            <div class="imgs icon-color2">
              <img :src="require('@/assets/icon/u16670.svg')" alt="" />
            </div>
            <div>
              <div class="tit">监控预警任务数</div>
              <div class="card-panel-num">
                {{ surveyData.monitorAlert.totalTaskNum }}<span>个</span>
              </div>
              <div class="man-pop-num">
                <p>
                  <span>监控客户数</span>
                  <span>{{ surveyData.monitorAlert.totalMonitorNum }}人</span>
                </p>
                <p>
                  <span>预警客户数</span>
                  <span style="color: rgb(236, 128, 141)"
                    >{{ surveyData.monitorAlert.totalAlertNum }}人</span
                  >
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('purchases')">
            <div class="imgs icon-color3">
              <img :src="require('@/assets/icon/u16662.svg')" alt="" />
            </div>
            <div>
              <div class="tit">策略运行数量</div>
              <div class="card-panel-num">
                {{ surveyData.strategyData.totalStrategyNum }}<span>个</span>
              </div>
              <div class="man-pop-num">
                <p>
                  <span>调额客户数</span>
                  <span
                    >{{ surveyData.strategyData.totalAdjustmentNum }}人</span
                  >
                </p>
                <p style="display: flex">
                  <span>净调额总金额</span>
                  <span v-if="surveyData.strategyData.totalCreditLimitSub"
                    >{{
                      Number(
                        surveyData.strategyData.totalCreditLimitSub
                      ).toFixed(2)
                    }}万元</span
                  >
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData('shoppings')">
            <div class="imgs icon-color4">
              <img :src="require('@/assets/icon/u16678.svg')" alt="" />
            </div>
            <div>
              <div class="tit">贷后任务运行数量</div>
              <div class="card-panel-num">
                {{ surveyData.postLoan.totalReturnVisitTaskNum }}<span>个</span>
              </div>
              <div class="man-pop-num">
                <p>
                  <span>回访客户数</span>
                  <span>{{ surveyData.postLoan.totalHasNum }}人</span>
                </p>
                <p>
                  <span>待回访客户数</span>
                  <span>{{ surveyData.postLoan.totalNeverNum }}人</span>
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row class="card-content">
      <!-- 遮罩层loding -->
      <div
        v-if="lodAM"
        v-loading="true"
        class="app-gloab-loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      />
      <el-col :span="16">
        <div class="dwek1">
          <header>监控预警趋势</header>
          <div class="tit1">
            <div>210 <span>人</span></div>
            <div>平均进行</div>
          </div>
          <ul>
            <li>
              <a
                v-for="(item, index) of titleList"
                :key="index"
                :style="{
                  color: colorTimeListAM[index] ? 'rgb(16,142,233)' : '',
                }"
                @click="activeColor(index, 'AM')"
              >
                {{ item }}
              </a>
            </li>
            <li>
              <el-date-picker
                v-model="dataValueAM"
                style="width: 330px"
                size="mini"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="
                  (val) => {
                    changdatavalue(val, 'AM');
                  }
                "
                :clearable="false"
              />
            </li>
          </ul>
          <div>
            <Bork :rawanum="monitorAlertrList" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="dwek1">
          <header>
            排名查询 <a class="more" @click="moregoto('monitorDetail')">更多</a>
          </header>
          <div>
            <el-radio-group
              v-model="monitorAlertradio"
              size="mini"
              style="margin: 20px 30px"
              @change="monitorAlertradiochange"
            >
              <el-radio-button label="1">接口查询量</el-radio-button>
              <el-radio-button label="2">任务调用量</el-radio-button>
            </el-radio-group>
          </div>
          <div class="tab1">
            <el-table
              :data="monitorAlertRankList"
              style="font-size: 12px"
              :header-cell-style="{ color: 'rgb(204,204,204)' }"
            >
              <el-table-column
                label="排名"
                align="center"
                width="50"
                prop="sort"
              />
              <el-table-column
                label="渠道"
                align="center"
                width="80"
                prop="countType"
              />
              <el-table-column
                label="占比"
                align="center"
                prop="proportion"
                width="160"
              >
                <template slot-scope="{ row }">
                  <div class="progress">
                    {{ row.proportion + "%" }}
                    <el-progress
                      :percentage="parseFloat(row.proportion)"
                      :show-text="false"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="80" label="周环比" prop="compare">
                <template slot-scope="{ row }">
                  <div>
                    {{ row.compare }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="card-content">
      <!-- 遮罩层loding -->
      <div
        v-if="lodRK"
        v-loading="true"
        class="app-gloab-loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      />
      <el-col :span="15">
        <div class="dwek1">
          <header>风险策略统计</header>
          <el-radio-group
            v-model="radioRisk"
            size="mini"
            style="margin: 20px 30px"
            @change="riskStrategyStats"
          >
            <el-radio-button label="1-2">调额</el-radio-button>
            <el-radio-button label="3-4">调价</el-radio-button>
            <el-radio-button label="5-6">冻/退</el-radio-button>
          </el-radio-group>
          <div>
            <Borkcurve :rawanum="riskCartdataLeft" />
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="dwek1">
          <header>
            <a /><a class="more" @click="moregoto('activestrategy')">更多</a>
          </header>
          <div class="centrer">
            <ul>
              <li>
                <a
                  v-for="(i, m) of titleList"
                  :key="m"
                  :style="{
                    color: colorTimeListRK[m] ? 'rgb(16,142,233)' : '',
                  }"
                  @click="activeColor(m, 'RK')"
                >
                  {{ i }}
                </a>
              </li>
              <li>
                <el-date-picker
                  v-model="dataValueRK"
                  style="width: 330px"
                  size="mini"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :clearable="false"
                  @change="
                    (val) => {
                      changdatavalue(val, 'RK');
                    }
                  "
                />
              </li>
            </ul>
          </div>
          <div class="tab1">
            <div class="leand">
              <div><a class="l1"></a>客户量</div>
              <div><a class="l2"></a>收益率</div>
              <div><a class="l3"></a>资产量</div>
            </div>
            <Borkcreditamount :rawanum="riskCartdataRight" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30" class="card-content">
      <el-col :span="12">
        <div class="dwek1">
          <header>
            <div>
              客户分析
              <!-- <el-select
                v-model="customeranalysis"
                style="margin: 0 10px"
                placeholder=""
                size="mini"
              >
                <el-option label="客户" value="1" />
              </el-select> -->
            </div>
            <a class="more" @click="moregoto('labelmanagement')">更多</a>
          </header>
          <div class="tit2">
            客户特征标签
            <!-- <ul>
              <li>
                <el-date-picker
                  v-model="monandearlydataValue"
                  style="width: 330px"
                  size="mini"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="monandearlychangdatavalue"
                />
              </li>
            </ul> -->
          </div>
          <div class="cart-cust">
            <div class="cart">
              <Wordcloud :rawanum="tagdataList" />
            </div>
            <div>
              <div>标签总量</div>
              <div class="cust-num">{{ tagdataList.tagCount }}</div>
              <!-- <div class="ratio">
                <i class="el-icon-caret-top">100%</i>
                <span>同比上周</span>
              </div> -->
              <div>标记客户数</div>
              <div class="cust-num">{{ tagdataList.customCount }}</div>
              <!-- <div class="ratio">
                <i class="el-icon-caret-bottom">100%</i>
                <span>同比上周</span>
              </div> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="dwek1">
          <!-- 遮罩层loding -->
          <div
            v-if="lodPL"
            v-loading="true"
            class="app-gloab-loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          />
          <header>
            贷后管理<a class="more" @click="moregoto('postLoanReturnVisit')"
              >更多</a
            >
          </header>
          <div class="tit2">
            回访任务来源分布
            <ul>
              <li>
                <el-date-picker
                  v-model="dataValuePL"
                  style="width: 330px"
                  size="mini"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="
                    (val) => {
                      changdatavalue(val, 'PL');
                    }
                  "
                  :clearable="false"
                />
              </li>
            </ul>
          </div>

          <div class="cart-cust">
            <div class="cart">
              <Pie :pie="returnVisitPieList" />
            </div>
            <div>
              <div>回访完成率</div>
              <div class="cust-num">{{ visitDealdata.success }}%</div>
              <div class="bull-green">
                <span>&bull;</span>
                <span>{{ visitDealdata.complete }}</span>
                <span>已回访</span>
              </div>
              <div class="bull-red">
                <span>&bull;</span>
                <span>{{ visitDealdata.uncomplete }}</span>
                <span>待回访</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 遮罩层loding -->
    <div
      v-if="sletslod"
      v-loading="true"
      class="gloab-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    />
  </div>
</template>

<script>
import Bork from "@/components/dashindex/brokenlinecarttwo.vue";
import Borkcurve from "@/components/dashindex/borkencurvelinecart.vue";
import Borkcreditamount from "@/components/dashindex/borkencurevelinecreditamount.vue";
import Wordcloud from "@/components/dashindex/wordcloudpicture.vue";
import Pie from "@/components/dashindex/pieindex2.vue";
import {
  surveycreditAssets,
  surveymonitorAlert,
  surveypostLoan,
  surveystrategyData,
  monitorAlertTrends,
  monitorAlertRankinterface,
  monitorAlertRanktask,
  riskStrategyStats,
  tagData,
  returnVisitDeal,
  returnVisitList,
  creditRateAve,
} from "@/api/dashboard";
import {
  getWeekStartDate,
  getWeekEndDate,
  getMonthStartDate,
  getMonthEndDate,
  getQuarterStartMonth,
} from "@/utils/datetime";
import { sysdict, sysdicttree } from "@/api/user";
export default {
  name: "DashboardAdmin",
  components: { Bork, Borkcurve, Borkcreditamount, Wordcloud, Pie },
  data() {
    return {
      //加载中
      sletslod: false,
      lod: false,
      lodAM: false,
      lodRK: false,
      lodPL: false,
      titleList: ["本周", "本月", "本季"],
      //概况数据存储
      surveyData: {
        creditAssets: {},
        monitorAlert: {},
        postLoan: {},
        strategyData: {},
      },
      // 授信金额
      creditamount: "1",
      // 预警监控
      colorTimeListAM: [true, false, false],
      dataValueAM: [],
      queryAM: {
        startDate: "",
        endDate: "",
        queryTimeType: 1,
      },
      monitorAlertrList: null,
      monitorAlertradio: "1",
      monitorAlertRankList: [],
      // 预警监控
      //风险策略
      colorTimeListRK: [true, false, false],
      dataValueRK: [],
      queryRK: {
        startDate: "",
        endDate: "",
        queryTimeType: 1,
      },
      radioRisk: "1-2",
      riskCartdataLeft: null,
      riskCartdataRight: null,
      //风险策略
      //标签
      tagdataList: {},
      //贷后管理
      dataValuePL: [],
      queryPL: {
        startDate: "",
        endDate: "",
        queryTimeType: 1,
      },
      visitDealdata: {},
      returnVisitPieList: [],
      dataQuery: [
        {
          channelName: "<1万",
          zhouhuan: "10%",
          createTime: "35",
          percentage: "35",
        },
        {
          channelName: "1万~3万",
          zhouhuan: "10%",
          createTime: "35",
          percentage: "55",
        },
        {
          channelName: "3万~5万",
          zhouhuan: "10%",
          createTime: "35",
          percentage: "65",
        },
        {
          channelName: "5万~10万",
          zhouhuan: "10%",
          createTime: "35",
          percentage: "75",
        },
        {
          channelName: ">10万",
          zhouhuan: "10%",
          createTime: "35",
          percentage: "85",
        },
      ],
    };
  },
  created() {
    const startDate = getWeekStartDate() + " 00:00:00";
    const endDate = getWeekEndDate() + " 00:00:00";
    this.dataValueAM = [startDate, endDate];
    this.dataValueRK = [startDate, endDate];
    this.dataValuePL = [startDate, endDate];
    this.queryRK = { startDate, endDate, queryTimeType: 1 };
    this.queryAM = { startDate, endDate, queryTimeType: 1 };
    this.queryPL = { startDate, endDate, queryTimeType: 1 };
  },
  mounted() {
    this.survey();
    this.monitorAlertTrends();
    this.riskStrategyStats();
    this.tagData();
    this.returnVisitDeal();
    this.returnVisitList();
    this.creditRateAve();
    this.handSletsDataList();
  },
  methods: {
    //当前概况统计
    async survey() {
      this.lod = true;
      const { data: creditAssets } = await surveycreditAssets().catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      const { data: monitorAlert } = await surveymonitorAlert().catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      const { data: postLoan } = await surveypostLoan().catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      const { data: strategyData } = await surveystrategyData().catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      this.surveyData = {
        creditAssets,
        monitorAlert,
        postLoan,
        strategyData,
      };
    },
    //通用时间处理
    changdatavalue(dataValue, Code) {
      this[`colorTimeList${Code}`] = [];
      this[`query${Code}`].queryTimeType = 0;
      if (!dataValue) {
        const startDate = getWeekStartDate() + " 00:00:00";
        const endDate = getWeekEndDate() + " 00:00:00";
        this[`dataValue${Code}`] = [startDate, endDate];
        this[`query${Code}`] = { startDate, endDate, queryTimeType: 1 };
        return;
      }
      this[`query${Code}`].startDate = dataValue[0];
      this[`query${Code}`].endDate = dataValue[1];
      switch (Code) {
        case "AM":
          this.monitorAlertTrends();
          break;
        case "RK":
          this.riskStrategyStats();
          this.creditRateAve();
          break;
        case "PL":
          this.returnVisitDeal();
          this.returnVisitList();
          break;
      }
    },
    // 周，月，季
    activeColor(index, code) {
      this[`colorTimeList${code}`] = [];
      this[`colorTimeList${code}`][index] = true;
      let startDate = "";
      let endDate = "";
      let queryTimeType = 0;
      switch (index) {
        case 0:
          startDate = getWeekStartDate() + " 00:00:00";
          endDate = getWeekEndDate() + " 00:00:00";
          queryTimeType = 1;
          break;
        case 1:
          startDate = getMonthStartDate() + " 00:00:00";
          endDate = getMonthEndDate() + " 00:00:00";
          queryTimeType = 2;
          break;
        case 2:
          startDate = getQuarterStartMonth().quarterStartMonth;
          endDate = getQuarterStartMonth().quarterEndMonth;
          queryTimeType = 3;
          break;
      }
      this[`dataValue${code}`] = [startDate, endDate];
      this[`query${code}`] = { startDate, endDate, queryTimeType };
      if (code == "AM") {
        this.monitorAlertTrends();
      }
      if (code == "RK") {
        this.riskStrategyStats();
        this.creditRateAve();
      }
    },
    // 点击更多跳转
    moregoto(url) {
      this.$router.push({ name: url });
    },
    //监控预警左侧图表
    async monitorAlertTrends() {
      this.lodAM = true;
      const { data } = await monitorAlertTrends(this.queryAM).catch((err) => {
        this.lodAM = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lodAM = false;
      if (this.monitorAlertradio == "1") {
        this.monitorAlertRankinterface();
      } else if (this.monitorAlertradio == "2") {
        this.monitorAlertRanktask();
      }
      this.monitorAlertrList = data;
    },
    //监控预警-接口排名
    async monitorAlertRankinterface() {
      this.lodAM = true;
      const res = await monitorAlertRankinterface(this.queryAM).catch((err) => {
        this.lodAM = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lodAM = false;
      this.monitorAlertRankList = res["data"];
      console.log(res, ";;;;");
    },
    //监控预警-任务排名
    async monitorAlertRanktask() {
      this.lodAM = true;
      let res = await monitorAlertRanktask(this.queryAM).catch((err) => {
        this.lodAM = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lodAM = false;
      this.monitorAlertRankList = res.data;
      console.log(res);
    },
    //接口-任务切换
    monitorAlertradiochange(val) {
      if (val == "1") {
        this.monitorAlertRankinterface();
      } else if (val == "2") {
        this.monitorAlertRanktask();
      }
    },
    //监控预警趋势-风险策略统计
    async riskStrategyStats() {
      let from = {
        ...this.queryRK,
        code: this.radioRisk,
      };
      this.lodRK = true;
      let { data } = await riskStrategyStats(from, this.radioRisk).catch(
        (err) => {
          this.lodRK = false;
          const { response } = err;
          this.$message.error(response.data.message);
          return;
        }
      );
      this.lodRK = false;
      this.riskCartdataLeft = data;
    },
    //风险策略统计-授信利率
    async creditRateAve() {
      let { data } = await creditRateAve(this.queryRK);
      console.log(data);
      this.riskCartdataRight = data;
    },
    //客户分析-标签数据
    async tagData() {
      let { data } = await tagData();
      this.tagdataList = data;
    },
    //贷后管理-回访完成率
    async returnVisitDeal() {
      this.lodPL = true;
      let { data } = await returnVisitDeal(this.queryPL).catch((err) => {
        this.lodPL = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lodPL = false;
      this.visitDealdata = data;
      let succ = 0;
      if (data.uncomplete) {
        if (data.uncomplete == 0) {
          succ = 100;
        } else {
          succ = ((data.complete / data.uncomplete) * 100).toFixed(2);
        }
        if (data.complete == 0) {
          succ = 0;
        }
      }
      this.visitDealdata["success"] = succ;
    },
    //贷后管理-饼图
    async returnVisitList() {
      this.lodPL = true;
      let { data } = await returnVisitList(this.queryPL).catch((err) => {
        this.lodPL = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lodPL = false;
      this.returnVisitPieList = data;
    },
    //页面所有下拉框获取
    async handSletsDataList() {
      if (window.sessionStorage.getItem("slets")) return;
      this.sletslod = true;
      const { data: userAttribute } = await sysdicttree("userAttribute").catch(
        () => {
          this.sletslod = false;
        }
      );
      const { data: tagCalEventType } = await sysdicttree(
        "tagCalEventType"
      ).catch(() => {
        this.sletslod = false;
      });
      const { data: tagCalLat1 } = await sysdict("tagCalLat1").catch(() => {
        this.sletslod = false;
      });
      const { data: tagCalLat2 } = await sysdict("tagCalLat2").catch(() => {
        this.sletslod = false;
      });
      const { data: tagCalLat4 } = await sysdict("tagCalLat4").catch(() => {
        this.sletslod = false;
      });
      const { data: tagModifyDateType } = await sysdict(
        "tagModifyDateType"
      ).catch(() => {
        this.sletslod = false;
      });
      const { data: tagCalEvent } = await sysdict("tagCalEvent").catch(() => {
        this.sletslod = false;
      });
      const { data: tagPredict } = await sysdict("tagPredict").catch(() => {
        this.sletslod = false;
      });
      const { data: runStatus } = await sysdict("runStatus").catch(() => {
        this.sletslod = false;
      });
      const { data: updateType } = await sysdict("updateType").catch(() => {
        this.sletslod = false;
      });
      const { data: finallyCalculateStatus } = await sysdict(
        "finallyCalculateStatus"
      ).catch(() => {
        this.sletslod = false;
      });
      const { data: tagLayerType } = await sysdict("tagLayerType").catch(() => {
        this.sletslod = false;
      });
      const { data: tagStatus } = await sysdict("tagStatus").catch(() => {
        this.sletslod = false;
      });
      const { data: tagCalRangeType } = await sysdict("tagCalRangeType").catch(
        () => {
          this.sletslod = false;
        }
      );
      const { data: tagCreateType } = await sysdict("tagCreateType").catch(
        () => {
          this.sletslod = false;
        }
      );
      const { data: tagModifyType } = await sysdict("tagModifyType").catch(
        () => {
          this.sletslod = false;
        }
      );
      const { data: tagLastCalculateStatus } = await sysdict(
        "tagLastCalculateStatus"
      ).catch(() => {
        this.sletslod = false;
      });
      const { data: userLimit } = await sysdicttree("userLimit").catch(() => {
        this.sletslod = false;
      });
      const { data: sort } = await sysdict("sort").catch(() => {
        this.sletslod = false;
      });

      let slets = {
        userAttribute,
        tagCalEventType,
        tagCalLat1,
        tagCalLat2,
        tagCalLat4,
        tagModifyDateType,
        tagCalEvent,
        tagPredict,
        runStatus,
        updateType,
        finallyCalculateStatus,
        tagLayerType,
        tagCalRangeType,
        tagStatus,
        tagCreateType,
        tagModifyType,
        tagLastCalculateStatus,
        sort,
        userLimit,
      };
      window.sessionStorage.setItem("slets", JSON.stringify(slets));
      this.sletslod = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.gloab-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.head-home {
  padding: 20px 20px 1px 20px;
  background-color: #fff;
  margin-bottom: 20px;
  header {
    padding: 0 15px 15px;
    font-size: 20px;
    font-weight: 600;
    color: rgb(102, 102, 102);
  }
  .tit {
    font-size: 14px;
    margin: 20px 0 10px 0;
  }
  .man-pop-num > p {
    margin: 5px 0;
    span {
      font-weight: 600;
    }
    span:nth-child(1) {
      display: inline-block;
      width: 90px;
    }
    span:nth-child(2) {
      color: rgb(132, 214, 103);
    }
  }
}
.el-row {
  margin-bottom: 20px;
  position: relative;
}
.dashboard-home {
  padding: 30px;
  background-color: rgb(242, 242, 242);
  .card-panel {
    border-radius: 5px;
    height: 150px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    background: #fff;
    display: flex;
    align-items: center;
    box-shadow: 3px 3px 9px rgb(85 85 85 / 24%);
    border: none;
  }
  .imgs {
    width: 76px;
    height: 76px;
    display: flex;
    margin: 0 15px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
}
.icon-color1 {
  background-color: rgb(255, 192, 91);
}
.icon-color2 {
  background-color: rgb(132, 214, 103);
}
.icon-color3 {
  background-color: rgb(125, 117, 255);
}
.icon-color4 {
  background-color: rgb(247, 121, 109);
}
.card-panel-num {
  font-size: 30px;
  margin: 0 0 6px 0;
  font-weight: 600;
  color: rgb(127, 127, 127);
  span {
    font-size: 12px;
  }
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.cart-cust {
  display: flex;
  width: 100%;
  padding: 20px 0 10px 0;
  height: 300px;
  .cart {
    width: 65%;
  }
}
.cart-cust > div:nth-child(2) {
  border-left: 1px solid rgb(235, 235, 235);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(152, 152, 152);
  padding: 30px;
  .cust-num {
    margin: 6px 0;
    font-size: 30px;
    font-weight: 500;
    color: rgb(102, 102, 102);
  }
  .ratio {
    margin-bottom: 15px;
  }

  .bull-green,
  .bull-red {
    display: flex;
    align-items: center;
    span:nth-child(1) {
      font-size: 30px;
    }
    span:nth-child(2) {
      margin: 0 10px;
    }
  }
  .bull-red {
    span:nth-child(1),
    span:nth-child(2) {
      color: rgb(240, 65, 51);
    }
  }
  .bull-green {
    span:nth-child(1),
    span:nth-child(2) {
      color: rgb(0, 169, 80);
    }
  }

  .el-icon-caret-bottom {
    color: rgb(240, 65, 51);
  }
  .el-icon-caret-top {
    color: rgb(0, 169, 80);
  }
}
.coltab {
  border: 1px solid rgb(235, 235, 235);
}
.dwek1 {
  border-radius: 5px;
  height: 420px;
  background-color: #fff;
  font-size: 12px;
  position: relative;
  header {
    height: 50px;
    color: rgb(102, 102, 102);
    font-weight: 900;
    font-size: 16px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(235, 235, 235);
    .more {
      font-size: 12px;
      font-weight: normal;
      padding-right: 40px;
      color: rgb(16, 142, 233);
    }
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    li:nth-child(1) {
      a {
        margin-right: 15px;
      }
    }
  }
  .centrer {
    margin: 10px 0;
  }
}
.tit1 {
  color: rgb(102, 102, 102);
  display: flex;
  align-items: center;
  padding: 10px 0 0 24px;
  font-size: 24px;
  span {
    font-size: 12px;
  }
}
.tit2 {
  padding: 10px 0 0 20px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
.tit1 > div:nth-child(2) {
  font-size: 12px;
}
.tab1 {
  width: 90%;
  margin: 0 auto;
  .leand {
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    div {
      display: flex;
      align-items: center;
      margin: 0 5px;
    }
    a {
      width: 10px;
      height: 10px;
      margin: 0 5px;
      border-radius: 50%;
    }
    .l1 {
      background-color: rgb(73, 169, 238);
    }
    .l2 {
      background-color: rgb(255, 216, 110);
    }
    .l3 {
      background-color: rgb(125, 200, 86);
    }
  }
}
.progress {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-progress {
    width: 50%;
  }
}
.p1 {
  width: 100%;
  height: 100%;
}
</style>
