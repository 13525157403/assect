<template>
  <div
    class="app-container"
    v-loading="lod"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <div class="filter-container">
      <el-input
        v-model="listQuery.key"
        style="width: 220px"
        placeholder="姓名/身份证/手机号码"
      />
      <el-date-picker
        v-model="dateArr"
        style="margin: 0 20px"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @input="handleDate"
      />

      <el-button style="margin: 0 0 0 20px" type="primary" @click="getList"
        >查询</el-button
      >
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="resultList"
      :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
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
      <el-table-column label="放款日期" prop="loanDate" align="center" />
      <el-table-column label="放款金额" prop="loanAmt" align="center" />
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
import Pagination from "@/components/Pagination";
import { writeoffloanList, writeoffloanExport } from "@/api/monitor";
export default {
  components: { Pagination },
  data() {
    return {
      lod: false,
      total: 0,
      dateArr: [],
      ruleNameList: [],
      listQuery: {
        rows: 10,
        page: 1,
        monitorId: "",
        key: "",
        startDate: "",
        endDate: "",
        ruleId: "",
      },
      resultList: [],
    };
  },
  created() {
    this.listQuery.monitorId = this.$route.query.monitorId;
    this.getList();
  },
  methods: {
    async exportBtn() {
      let res = await writeoffloanExport(this.listQuery);
      const blob = new Blob([res], {
        type: "application/vnd.ms-excel",
      });
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "地址评分-累计人数数据-详情.xlsx";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },

    async getList() {
      let { data } = await writeoffloanList(this.listQuery);
      this.resultList = data.records;
      this.total = data.total;
    },
    handleDate(e) {
      this.listQuery.startDate = e[0];
      this.listQuery.endDate = e[1];
    },
  },
};
</script>
<style lang="scss" scoped>
.filter-container {
  display: flex;
}
</style>
<style lang="scss" scoped>
</style>
