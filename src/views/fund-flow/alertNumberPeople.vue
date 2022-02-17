<template>
  <div
    v-loading="lod"
    class="app-container"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <div class="filter-container">
      <el-input
        v-model="listQuery.key"
        style="width: 20%"
        placeholder="姓名/身份证/手机号码"
      />
      <el-date-picker
        v-model="dataQuery"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      />
      <el-select v-model="listQuery.ruleId" clearable placeholder="命中规则">
        <el-option
          v-for="item in ruleInfoList"
          :key="item.id"
          :label="item.ruleName"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="DubiousTransactions"
      :header-cell-style="{ background: '#3a835d', color: 'white' }"
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
    >
      <el-table-column label="客户姓名" prop="name" align="center" />
      <el-table-column label="所属项目" prop="projectName" align="center" />
      <el-table-column label="手机号码" prop="mobile" align="center" />
      <el-table-column label="身份证" prop="certNo" align="center" />
      <el-table-column label="在贷余额" prop="loanBalance" align="center">
        <template slot-scope="{ row }">
          <div>
            <div
              v-if="row.loanStatus == '逾期' || row.loanStatus == '2'"
              style="color: rgb(217, 0, 27)"
            >
              {{ row.loanBalance }} 逾
            </div>
            <div v-else>
              {{ row.loanBalance }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="监控日期" prop="monitorDate" align="center" />
      <el-table-column
        label="命中规则详情"
        prop="ruleNameSplit"
        align="center"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.rows"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  exportSuspiciousNumber,
  getCumulativeMonitoringNumber,
} from "@/api/dubiousTransaction";

import { getRuleNameList } from "@/api/ruleConfig";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      lod: false,
      dataQuery: [],
      total: 0,
      listQuery: {
        monitorId: this.$route.query.monitorId,
        key: "",
        startDate: "",
        endDate: "",
        ruleId: "",
        rows: 10,
        page: 1,
      },
      projectList: [],
      ruleInfoList: [],
      DubiousTransactions: [],
    };
  },
  created() {
    this.getRule();
    this.getList();
  },
  methods: {
    exportBtn() {
      // console.log(api.serverUrl);
      const params = {
        monitorId: this.$route.query.monitorId,
        key: this.listQuery.key,
        startDate: this.listQuery.startDate,
        endDate: this.listQuery.endDate,
        ruleId: this.listQuery.ruleId,
      };
      exportSuspiciousNumber(params).then((res) => {
        // resolve(res)
        const blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        const a = document.createElement("a");
        a.href = url;
        // a.download = "累计可疑人数.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      });
    },
    async getList() {
      const cumulativeResult = await getCumulativeMonitoringNumber(
        this.listQuery
      );
      // console.log(cumulativeResult, "res");
      this.DubiousTransactions = cumulativeResult.data.records;
      this.total = cumulativeResult.data.total;
    },
    async search() {
      if (this.dataQuery) {
        this.dataQuery[0]
          ? (this.listQuery.startDate = this.dataQuery[0])
          : (this.listQuery.startDate = "");
        this.dataQuery[1]
          ? (this.listQuery.endDate = this.dataQuery[1])
          : (this.listQuery.endDate = "");
      } else {
        this.listQuery.endDate = "";
        this.listQuery.startDate = "";
      }
      // console.log("ult,", this.listQuery);
      this.lod = true;
      const { data } = await getCumulativeMonitoringNumber(this.listQuery);
      this.lod = false;
      // console.log(data, "res");
      if (data) {
        this.DubiousTransactions = data.records;
        this.total = data.total;
      } else {
        this.DubiousTransactions = [];
        this.total = 0;
      }
    },

    async getRule() {
      const ruleInfo = await getRuleNameList(this.$route.query.monitorId);
      // console.log(this.$route.query, 345);
      this.ruleInfoList = ruleInfo.data;
    },
  },
};
</script>
