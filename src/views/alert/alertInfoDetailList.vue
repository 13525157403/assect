<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="5" type="flex" align="middle">
        <el-col :span="2">
          <el-input
            v-model="listQuery.taskNumber"
            placeholder="预警编号"
            size="mini"
          />
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="datePicker"
            size="mini"
            type="daterange"
            style="width: 100%"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-col>
        <el-col :span="14">
          <div class="amt">
            <div>
              <div>放款金额:</div>
              <el-input
                v-model="num.loanAmtMin"
                size="mini"
                placeholder="min"
              />
              <div>&mdash;</div>
              <el-input
                v-model="num.loanAmtMax"
                size="mini"
                placeholder="max"
              />
            </div>
            <div>
              <div>贷款余额:</div>
              <el-input
                v-model="num.loanBalanceMin"
                size="mini"
                placeholder="min"
              />
              <div>&mdash;</div>
              <el-input
                v-model="num.loanBalanceMax"
                size="mini"
                placeholder="max"
              />
            </div>
            <div>
              <div>周期内放款总金额:</div>
              <el-input
                v-model="num.totalLoanAmtMin"
                size="mini"
                placeholder="min"
              />
              <div>&mdash;</div>
              <el-input
                v-model="num.totalLoanAmtMax"
                size="mini"
                placeholder="max"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" type="primary" @click="search">查询</el-button>
          <el-button size="mini" type="primary" @click="exportBtn"
            >导出</el-button
          >
        </el-col>
        <!-- <el-col :span="2">
          <div class="more" @click="morequeries">
            更多查询方式 <i :class="morequeriesicon"></i>
          </div>
        </el-col> -->
      </el-row>
      <div class="querier">
        <el-select
          v-model="listQuery.taskId"
          size="mini"
          clearable
          placeholder="预警场景"
        >
          <el-option
            v-for="item in alertNameList"
            :key="item.id"
            :label="item.taskName"
            :value="item.id"
          />
        </el-select>

        <el-select
          v-model="listQuery.alertType"
          size="mini"
          clearable
          placeholder="预警方式"
        >
          <el-option label="短信" value="1" />
          <el-option label="邮箱" value="2" />
          <el-option label="系统" value="3" />
        </el-select>
        <el-select
          v-model="listQuery.loanAmtLevel"
          size="mini"
          clearable
          placeholder="放款金额档位"
        >
          <el-option
            v-for="(i, m) in amtLevel"
            :key="m"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
        <el-select
          v-model="listQuery.totalLoanAmtLevel"
          size="mini"
          clearable
          placeholder="周期内放款总金额档位"
        >
          <el-option
            v-for="(i, m) in amtLevel"
            :key="m"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
        <el-select
          v-model="listQuery.amtLevel"
          size="mini"
          clearable
          placeholder="银联命中金额档位"
        >
          <el-option
            v-for="(i, m) in amtLevel"
            :key="m"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </div>
      <!-- <div v-show="ishmore" class="querier">
        <el-select
          size="mini"
          v-model="listQuery.alertType"
          clearable
          placeholder="预警方式"
        >
          <el-option label="短信" value="1" />
          <el-option label="邮箱" value="2" />
        </el-select>
      </div> -->
    </div>
    <el-table
      :data="dataQuery"
      fit
      highlight-current-row
      :header-cell-style="{ background: 'rgb(70,183,173)', color: '#fff' }"
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
      @sort-change="sortchange"
    >
      <el-table-column label="预警编号" prop="taskNumber" align="center" />
      <el-table-column label="预警场景" prop="taskName" align="center" />
      <el-table-column
        label="预警时间"
        prop="alertDate"
        sortable="custom"
        align="center"
        width="100"
      />
      <el-table-column
        label="贷款余额"
        prop="loanBalance"
        sortable="custom"
        align="center"
        width="100"
      />

      <el-table-column
        label="放款金额"
        prop="loanAmt"
        sortable="custom"
        align="center"
        width="100"
      />
      <el-table-column
        label="放款金额档位"
        prop="loanAmtLevelValue"
        align="center"
        width="80"
      />
      <el-table-column
        label="周期内放款总金额"
        prop="totalLoanAmt"
        sortable="custom"
        width="160"
        align="center"
      />
      <el-table-column
        label="周期内放款总金额档位"
        prop="totalLoanAmtLevelValue"
        width="100"
        align="center"
      />
      <el-table-column
        label="银联命中金额档位"
        prop="amtLevelValue"
        width="80"
        align="center"
      />
      <el-table-column
        label="预警方式"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span v-if="row.alertType == 1"> 短信 </span>
          <span v-if="row.alertType == 2">· 邮箱 </span>
        </template>
      </el-table-column>

      <el-table-column
        label="预警内容"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span style="color: #b1b639">
            {{ row.alertData }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="接收人" prop="alertTarget" align="center" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.rows"
      @pagination="getList"
    />
    <!-- 遮罩层loding -->
    <div
      v-if="lod"
      v-loading="true"
      class="app-gloab-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    ></div>
  </div>
</template>

<script>
import { getAlertInfoDetailsList, searchExport } from "@/api/alertInfoDetail";
import { amtLevlistamtLevelel } from "@/api/dubiousTransaction";
import { getTaskNameList } from "@/api/taskInfo";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      ishmore: false,
      morequeriesicon: "el-icon-arrow-right",
      lod: false,
      dataQuery: [],
      datePicker: [],
      total: 0,
      listQuery: {
        // 排序字段
        sortField: "1",
        // 排序顺序
        sortOrder: "true",
        alertId: "",
        taskNumber: "",
        alertType: "",
        taskId: "",
        startTime: "",
        endTime: "",
        rows: 10,
        page: 1,
        amtLevel: "",
        loanBalanceMax: "",
        loanBalanceMin: "",
        loanAmtLevel: "",
        loanAmtMax: "",
        loanAmtMin: "",
        totalLoanAmtLevel: "",
        totalLoanAmtMax: "",
        totalLoanAmtMin: "",
      },
      num: {
        loanBalanceMax: "",
        loanBalanceMin: 0,
        loanAmtMax: "",
        loanAmtMin: 0,
        totalLoanAmtMax: "",
        totalLoanAmtMin: 0,
      },
      channelList: [],
      alertNameList: [],
      dateList: { 1: "1天", 2: "2天", 3: "3天" },
      createFormDialogVisible: false,
      alertFrom: {
        datePicker: "",
      },
      alertName: "",
      ruleTaskDialogVisible: false,
      multipleSelection: [],
      createList: "",
      rules: {},
      amtLevel: [],
    };
  },
  created() {
    if (this.$route.query.alertId) {
      this.listQuery.alertId = this.$route.query.alertId;
    }
    // console.log(this.listQuery.alertId, "this.listQuery.alertId");
    this.getList();
    this.getAlertName();
    this.amtlevel();
  },
  methods: {
    async exportBtn() {
      // console.log(api.serverUrl);
      const params = this.listQuery;
      searchExport(params).then((res) => {
        // resolve(res)
        const blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        const a = document.createElement("a");
        a.href = url;
        // a.download = '预警详情.xlsx'
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      });
    },
    async getList() {
      console.log(this.listQuery);
      if (this.num.loanBalanceMax != "") {
        this.listQuery.loanBalanceMax = (this.num.loanBalanceMax - 0) * 100;
      }
      if (this.num.totalLoanAmtMax != "") {
        this.listQuery.totalLoanAmtMax = (this.num.totalLoanAmtMax - 0) * 100;
      }
      if (this.num.loanBalanceMin != "") {
        this.listQuery.loanBalanceMin = (this.num.loanBalanceMin - 0) * 100;
      }
      if (this.num.totalLoanAmtMin != "") {
        this.listQuery.totalLoanAmtMin = (this.num.totalLoanAmtMin - 0) * 100;
      }
      if (this.num.loanAmtMax != "") {
        this.listQuery.loanAmtMax = (this.num.loanAmtMax - 0) * 100;
      }
      if (this.num.loanAmtMin != "") {
        this.listQuery.loanAmtMin = (this.num.loanAmtMin - 0) * 100;
      }
      console.log(this.listQuery);
      const result = await getAlertInfoDetailsList(this.listQuery);
      this.lod = false;
      this.dataQuery = result.data.records;
      this.total = result.data.total;
      // this.listQuery.loanBalanceMax = "";
      // this.listQuery.totalLoanAmtMax = "";
      // this.listQuery.loanBalanceMin = "";
      // this.listQuery.totalLoanAmtMin = "";
      // this.listQuery.loanAmtMax = "";
      // this.listQuery.loanAmtMin = "";
    },
    async getAlertName() {
      var taskNameList = await getTaskNameList({ taskType: "2" });
      this.alertNameList = taskNameList.data;
    },
    async search() {
      if (this.datePicker) {
        this.listQuery.startTime = this.datePicker[0];
        this.listQuery.endTime = this.datePicker[1];
      } else {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
      }
      this.lod = true;
      this.getList();
    },
    morequeries() {
      this.ishmore = !this.ishmore;
      if (this.ishmore) {
        this.morequeriesicon = "el-icon-arrow-down";
      } else {
        this.morequeriesicon = "el-icon-arrow-right";
      }
    },
    sortchange(v) {
      if (v.prop == "alertDate") {
        this.listQuery.sortField = "1";
      }
      if (v.prop == "loanBalance") {
        this.listQuery.sortField = "2";
      }
      if (v.prop == "loanAmt") {
        this.listQuery.sortField = "3";
      }
      if (v.prop == "totalLoanAmt") {
        this.listQuery.sortField = "4";
      }
      if (v.order == "ascending") {
        this.listQuery.sortOrder = "false";
      } else {
        this.listQuery.sortOrder = "true";
      }
      this.getList();
    },
    async amtlevel() {
      const { data } = await amtLevlistamtLevelel();
      this.amtLevel = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.more {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  color: rgb(47, 144, 255);
  cursor: pointer;
}
.querier {
  height: 0;
  margin: 20px 0;
  display: flex;
  .el-select {
    margin-right: 5px;
  }
}

.amt {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}
.amt > div {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  .el-input {
    width: 24%;
  }
}
.amt > div:last-child {
  width: 60%;
}
</style>
