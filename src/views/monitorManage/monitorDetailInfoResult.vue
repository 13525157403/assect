<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.certNoOrMobileOrName"
        style="width: 220px"
        placeholder="姓名/身份证/手机号码"
      />
      <el-select
        v-model="listQuery.transactionType"
        clearable
        placeholder="交易类别"
      >
        <el-option
          v-for="(val, key, i) in transactionTypeList"
          :key="i"
          :label="val"
          :value="key"
        />
      </el-select>
      <el-select
        v-model="listQuery.amtLevel"
        clearable
        placeholder="银联命中档位"
      >
        <el-option
          v-for="(val, i) in LeavesList"
          :key="i"
          :label="val.label"
          :value="val.value"
        />
      </el-select>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary" @click="exportBtn">导出</el-button>
    </div>
    <el-table
      :data="monitorDetailResultList"
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
      <el-table-column label="监控状态" prop="monitorStatus" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.monitorStatus == 1"> 待查询 </span>
          <span v-if="row.monitorStatus == 2"> 已完成 </span>
        </template>
      </el-table-column>

      <el-table-column label="交易时间" prop="transactionDate" align="center" />
      <el-table-column label="交易类别" prop="transactionType" align="center" />
      <el-table-column
        label="银联命中档位"
        prop="amtLevelValue"
        align="center"
      />
      <el-table-column label="商户名称" prop="merchantName" align="center" />
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
import { getAllProject } from "@/api/projectInfo";
import { amtLevlistamtLevelel } from "@/api/dubiousTransaction";
import { searchExport, viewListByPage } from "@/api/monitor";

import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      lod: false,
      dataQuery: [],
      total: 0,
      listQuery: {
        projectId: "",
        transactionType: "",
        certNoOrMobileOrName: "",
        amtLevel: "",
        rows: 10,
        page: 1,
        id: "",
      },
      projectList: [],
      transactionTypeList: { 0: "地产", 1: "投资" },
      monitorDetailResultList: [],
      LeavesList: [],
    };
  },
  created() {
    this.getList();
    this.getProject();
    this.amtlevel();
  },
  methods: {
    async exportBtn() {
      // console.log(api.serverUrl);
      const params = {
        certNoOrMobileOrName: this.listQuery.certNoOrMobileOrName,
        id: this.listQuery.id,
        projectId: this.listQuery.projectId,
        amtLevel: this.listQuery.amtLevel,
        transactionType: this.listQuery.transactionType,
      };
      searchExport(params).then((res) => {
        // resolve(res)
        const blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        const a = document.createElement("a");
        a.href = url;
        // a.download = '监控明细.xlsx'
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      });
    },
    async getList() {
      console.log(this.listQuery);
      this.listQuery.id = this.$route.query.id;
      this.lod = true;
      const result = await viewListByPage(this.listQuery);
      console.log(result, "result");
      this.lod = false;
      this.monitorDetailResultList = result.data.records;
      this.total = result.data.total;
    },
    async getProject() {
      const projectResult = await getAllProject();
      // console.log(projectResult, 'projectResult')
      this.projectList = projectResult.data;
    },
    async amtlevel() {
      const { data } = await amtLevlistamtLevelel();
      this.LeavesList = data;
      // console.log(data)
    },
  },
};
</script>
