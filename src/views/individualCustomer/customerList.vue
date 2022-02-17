<template>
  <div class="app-container">
    <el-row :gutter="5" style="font-size: 12px">
      <el-col :span="7">
        <el-input
          v-model="listQuery.certNo"
          size="mini"
          placeholder="姓名/身份证"
          style="width: 33%"
          clearable
        />
        <el-input
          v-model="listQuery.contractNo"
          size="mini"
          placeholder="借据号"
          style="width: 33%"
          clearable
        />
        <el-input
          v-model="listQuery.branch"
          size="mini"
          placeholder="记账机构"
          style="width: 32%"
          clearable
        />
      </el-col>
      <el-col :span="7">
        <el-date-picker
          v-model="datePicker"
          size="mini"
          style="width: 220px"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="datePickerchange"
        />
        <!-- <el-select
          v-model="listQuery.platId"
          style="width: 140px"
          clearable
          placeholder="渠道"
          size="mini"
        >
          <el-option
            v-for="(val, key, i) in platidList"
            :key="i"
            :label="val"
            :value="key"
          />
        </el-select> -->
        <el-input
          v-model="listQuery.platId"
          style="width: 140px"
          clearable
          placeholder="渠道"
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-select
          v-model="listQuery.status"
          clearable
          placeholder="客户状态"
          size="mini"
        >
          <el-option
            v-for="(val, key, i) in customerStatusList"
            :key="i"
            :label="val"
            :value="key"
          />
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select
          v-model="listQuery.riskType"
          clearable
          placeholder="风险标签"
          size="mini"
        >
          <el-option
            v-for="i in allslets.monitorTaskType"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button size="mini" type="primary" @click="getList">查询</el-button>
      </el-col>
      <el-col :span="3" style="display: flex; justify-content: flex-end">
        <el-button size="mini" type="primary" @click="exportExcelcust"
          >批量下载报告</el-button
        >
        <el-button size="mini" type="primary" @click="showCreateFormDialog"
          >批量下载影像件</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="dataQuery"
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
      :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        fixed
        type="selection"
        prop="date"
        label="全选"
        width="50"
      />
      <el-table-column label="姓名" prop="custName" align="center" />
      <el-table-column label="身份证号" prop="certno" align="center" />
      <el-table-column label="渠道" prop="platId" align="center">
        <template slot-scope="{ row }">{{ platidList[row.platid] }}</template>
      </el-table-column>
      <el-table-column label="授信产品" prop="productid" align="center">
        <template slot-scope="{ row }">{{
          productList[row.productid]
        }}</template>
      </el-table-column>
      <el-table-column label="授信日期" prop="finishTime" align="center">
        <template slot-scope="{ row }">{{
          row.finishTime | filterTimes
        }}</template>
      </el-table-column>
      <el-table-column label="客户状态" prop="custmerStatus" align="center">
        <template slot-scope="{ row }">
          <div
            v-if="customerStatusList[row.custmerStatus] == '逾期'"
            style="color: rgb(217, 0, 27)"
          >
            {{ customerStatusList[row.custmerStatus] }}
          </div>
          <div v-else>{{ customerStatusList[row.custmerStatus] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="handleVew(row.certno)"
            >查看报告</el-button
          >
          <el-button size="mini" type="text" @click="downvideo(row)"
            >下载影像件</el-button
          >
        </template>
      </el-table-column>
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
    />
  </div>
</template>

<script>
import {
  getCustomerList,
  dowloadPhone,
  exportExcelcust,
} from "@/api/customerList";
import { getTaskNameList } from "@/api/taskInfo";
import { sysdict } from "@/api/user";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      lod: false,
      total: 0,
      dataQuery: [],
      datePicker: [],
      listQuery: {
        endTime: "",
        startTime: "",
        productId: "",
        status: "",
        platId: "",
        certNo: "",
        rows: 10,
        page: 1,
        riskType: "",
        branch: "",
        contractNo: "",
      },
      customerStatusList: {
        NORMAL: "还款中",
        OVD: "逾期",
        CLEAR: "待支用",
        OUT_TIME: "授信过期",
      },
      platidList: {
        MYBK: "花呗",
      },
      productList: {
        WSD_KQXT: "网商贷一期",
      },
      downarr: "",
      allslets: {
        monitorTaskType: [],
      },
    };
  },
  created() {
    this.getList();
    this.getAllTask();
  },
  methods: {
    // 任务列表查询
    async getList() {
      this.lod = true;
      const { data } = await getCustomerList(this.listQuery).catch((err) => {
        const { response } = err;
        this.$message.error(response.data.message);
        this.lod = false;
      });
      this.lod = false;
      console.log(data);
      this.dataQuery = data.records;
      this.total = data.total;
    },
    // 时间处理
    datePickerchange(dataVal) {
      if (!dataVal) {
        this.listQuery.startTime = "";
        this.listQuery.endTime = "";
        return;
      }
      this.listQuery.startTime = dataVal[0];
      this.listQuery.endTime = dataVal[1];
    },
    // 单独下载影像件
    async downvideo(row) {
      this.lod = true;
      const res = await dowloadPhone(`certNos=${row.certno}`).catch((err) => {
        const { response } = err;
        this.lod = false;
        this.$message.error(response.data.message);
      });
      this.lod = false;
      const blob = new Blob([res], {
        type: "application/zip",
      }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "影像件.zip";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
    // 批量下载影像件
    async showCreateFormDialog() {
      if (this.downarr.length == 0) {
        return this.$message.error("请先勾选数据在导出");
      }
      this.lod = true;
      const res = await dowloadPhone(this.downarr).catch((err) => {
        const { response } = err;
        this.lod = false;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      const blob = new Blob([res], {
        type: "application/zip",
      }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "影像件.zip";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
    // 获取任务下拉列表
    async getAllTask() {
      var taskResult = await getTaskNameList({ taskType: "1" });
      const { data } = await sysdict("monitorTaskType");
      this.allslets.monitorTaskType = data;
      this.taskList = taskResult.data;
    },
    // 跳转个人用户
    handleVew(id) {
      this.$router.push({ name: "individualCustomer", query: { id: id } });
    },
    handleSelectionChange(certNosArr) {
      this.downarr = "";
      certNosArr.forEach((i, m) => {
        if (m == certNosArr.length - 1) {
          this.downarr += `certNos=${i.certno}`;
        } else {
          this.downarr += `certNos=${i.certno}&`;
        }
      });
    },
    // 批量下载报告
    async exportExcelcust() {
      if (this.downarr.length == 0) {
        return this.$message.error("请先勾选数据在导出");
      }
      this.lod = true;
      const res = await exportExcelcust(this.downarr).catch((err) => {
        const { response } = err;
        this.lod = false;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      const blob = new Blob([res], {
        type: "application/zip",
      }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "客户信息.zip";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>
<style lang="scss" scoped>
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30001;
}
</style>

