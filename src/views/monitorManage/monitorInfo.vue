<template>
  <div class="app-container">
    <div
      class="filter-container"
      style="margin-top: 20px; font-size: 15px; display: flex"
    >
      <div>
        <el-input
          v-model="listQuery.taskName"
          placeholder="监控任务名称"
          style="width: 15%"
          clearable
        />
        <el-date-picker
          v-model="listQuery.datePicker"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
        <el-select v-model="listQuery.status" clearable placeholder="任务状态">
          <el-option
            v-for="(val, key, i) in statusList"
            :key="i"
            :label="val"
            :value="key"
          />
        </el-select>

        <el-select
          v-model="listQuery.projectId"
          clearable
          placeholder="项目名称"
        >
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="getCurrentTask">查询</el-button>
        <el-button type="primary" :disabled="ish" @click="showCreateFormDialog"
          >新增监控任务</el-button
        >
      </div>
    </div>
    <el-table
      :data="dataQuery"
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
      :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
    >
      <el-table-column label="监控任务名称" prop="taskName" align="center" />
      <el-table-column label="所属项目" prop="projectName" align="center" />
      <el-table-column label="开始时间" prop="startTime" align="center" />
      <el-table-column label="结束时间" prop="endTime" align="center" />
      <el-table-column label="当前状态" prop="status" align="center">
        <template slot-scope="{ row }">
          <div>
            <div v-if="row.status == '已停用'" style="color: rgb(217, 0, 27)">
              {{ row.status }}
            </div>
            <div v-else style="color: rgb(112, 182, 3)">{{ row.status }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" width="220" prop="status">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="handleVew(row)"
            >详情</el-button
          >
          <el-button
            v-if="row.status == '已停用'"
            size="mini"
            type="text"
            @click="handleRenwe(row)"
            >订阅</el-button
          >
          <el-button
            v-if="row.status == '执行中'"
            size="mini"
            type="text"
            @click="handleCancel(row)"
            >取消</el-button
          >
          <el-button size="mini" type="text" @click="handleEdit(row)"
            >编辑</el-button
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

    <el-dialog
      title="添加监控任务"
      :visible.sync="createFormDialogVisible2"
      width="50%"
    >
      <el-form
        ref="createForm"
        :model="createForm"
        :rules="rules"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="选择所属项目" prop="projectId" required>
          <el-select
            v-model="createForm.projectId"
            clearable
            placeholder="项目名称"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设置时间周期" prop="datePicker" required>
          <el-date-picker
            v-model="createForm.datePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="选择监控任务" prop="taskId" required>
          <el-select
            v-model="createForm.taskId"
            clearable
            placeholder="任务名称"
          >
            <el-option
              v-for="item in taskList"
              :key="item.id"
              :label="item.taskName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createFormDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="goCreateFormDialogVisible"
          >下一步</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="选择监控规则"
      :visible.sync="createFormDialogVisible1"
      width="80%"
    >
      <el-form
        ref="createForm1"
        :model="createForm1"
        :rules="rules"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-table
          :data="ruleData"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
          :header-cell-style="{ background: '#3a835d', color: 'white' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="规则名称" prop="ruleName" align="center" />
          <el-table-column
            label="规则说明"
            prop="ruleDesc"
            align="left"
            width="300"
          />
          <el-table-column label="规则类型" prop="ruleType" align="center" />
          <el-table-column label="创建时间" prop="createTime" align="center" />
          <el-table-column label="修改时间" prop="modifyTime" align="center" />
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createTask" :loading="loading"
          >保存</el-button
        >
        <el-button @click="createFormDialogVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" :visible.sync="showMonitorRuleModel" width="60%">
      <el-form
        ref="monitorRuleForm"
        :model="monitorRuleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-table
          :data="monitorRuleData"
          border
          fit
          highlight-current-row
          :header-cell-style="{ background: '#3a835d', color: 'white' }"
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column
            label="序号"
            type="index"
            width="60"
            align="center"
          />
          <el-table-column label="规则名称" prop="ruleName" align="center" />
          <el-table-column
            label="规则说明"
            prop="ruleDesc"
            align="left"
            width="300"
          />
          <el-table-column label="规则类型" prop="ruleType" align="center" />
          <el-table-column label="当前状态" prop="alertStatus" align="center">
            <template slot-scope="{ row }">
              <div v-if="row.switchStatus">已启用</div>
              <div v-else>已停用</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="switchStatus"
            align="center"
            width="220"
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.switchStatus"
                active-color="#13ce66"
                active-text="开启"
                inactive-text="关闭"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRule">保存</el-button>
        <el-button @click="showMonitorRuleModel = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 遮罩层 -->
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
  pageAllTaskInfo,
  getRuleListByTaskId,
  addMonitorInfo,
  dy,
  getMonitorRules,
  edit,
} from "@/api/monitor";
import { getTaskNameList } from "@/api/taskInfo";
import { getAllProject } from "@/api/projectInfo";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      loading: false,
      lod: false,
      ish: true,
      dataQuery: [],
      ruleData: [],
      multipleSelection: [],
      total: 0,
      listQuery: {
        dateStamp: "",
        status: "",
        channel: "",
        rows: 10,
        page: 1,
      },
      channelList: [],
      taskList: [],
      statusList: {
        1: "执行中",
        2: "已停用",
      },
      dialogVisible: false,
      radioValue: "",
      cancelMonitorInfo: "",
      createFormDialogVisible: false,
      createForm: {
        projectId: null,
        datePicker: [],
        taskId: null,
      },
      rules: {
        projectId: [{ required: true, trigger: "blur", message: "请选择项目" }],
      },
      createFormDialogVisible2: false,
      createFormDialogVisible1: false,
      createForm1: {
        datePicker: [],
        fileName: "",
        file: "",
      },
      showMonitorRuleModel: false,
      monitorRuleForm: {},
      monitorRuleData: [],
      switchOpen: true,
      switchClose: false,
      monitorRuleStatusList: {
        1: "未启用",
        2: "已启用",
      },
      selectRuleIdArray: [],
      timer: null,
    };
  },
  created() {
    getAllProject().then((res) => {
      this.channelList = res.data;
    });
    this.getList();
    this.getAllTask();
  },
  methods: {
    // 任务列表查询
    async getList() {
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.listQuery.datePicker) {
        startDate = this.listQuery.datePicker[0];
        endDate = this.listQuery.datePicker[1];
      }
      var allTaskInfo = await pageAllTaskInfo({
        taskType: 1,
        rows: this.listQuery.rows,
        page: this.listQuery.page,
        projectId: this.listQuery.projectId,
        taskName: this.listQuery.taskName,
        taskStatus: this.listQuery.status,
        startTime: startDate,
        endTime: endDate,
      });
      if (allTaskInfo.data) {
        this.total = allTaskInfo.data.total;
        allTaskInfo = allTaskInfo.data.records;
      }
      this.dataQuery = allTaskInfo;
    },
    getCurrentTask() {
      this.lod = true;
      // console.log(this.listQuery.datePicker)
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.listQuery.datePicker) {
        startDate = this.listQuery.datePicker[0];
        endDate = this.listQuery.datePicker[1];
      }
      pageAllTaskInfo({
        taskType: 1,
        rows: this.listQuery.rows,
        page: this.listQuery.page,
        projectId: this.listQuery.projectId,
        taskName: this.listQuery.taskName,
        status: this.listQuery.status,
        startTime: startDate,
        endTime: endDate,
      })
        .then((res) => {
          this.lod = false;
          this.total = res.data.total;
          res = res.data.records;
          this.dataQuery = res;
        })
        .catch((err) => {
          this.lod = false;
          const { response } = err;
          console.log(response);
        });
    },
    // 取消监控任务
    handleCancel(row) {
      this.$confirm("确认停用该任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = { id: row.id, status: "2" };
          dy(data).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code !== 200) {
              return this.$message.error(res.msg);
            }
            this.$message({
              type: "success",
              message: "监控任务停用成功",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    showCreateFormDialog() {
      if (this.$refs["createForm"] !== undefined) {
        this.$refs["createForm"].resetFields();
      }
      this.createFormDialogVisible2 = true;
    },
    // 获取任务下拉列表
    async getAllTask() {
      var taskResult = await getTaskNameList({ taskType: "1" });
      this.taskList = taskResult.data;
      this.ish = false;
    },
    // 下一步
    goCreateFormDialogVisible() {
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          this.createFormDialogVisible2 = false;
          this.createFormDialogVisible1 = true;
          const params = { taskId: this.createForm.taskId };
          getRuleListByTaskId(params).then((res) => {
            this.ruleData = res.data;
          });
        }
      });
    },
    // 规则选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    createAntiShake(){
      clearTimeout(this.timer)
      this.loading = true;
      this.timer=setTimeout(()=>{
        this.createTask()
      },1000)
    },
    // 新建任务保存
    createTask() {
      // this.loading = true;
      const ruleIdArray = [];
      this.multipleSelection.forEach(function (item, index) {
        ruleIdArray.push(item.id);
      });
      // const formData = new FormData();
      // formData.append("projectId", this.createForm.projectId);
      // formData.append("taskId", this.createForm.taskId);
      // formData.append("startTime", this.createForm.datePicker[0]);
      // formData.append("endTime", this.createForm.datePicker[1]);
      // console.log(ruleIdArray,'ruleIdArray');
      // formData.append("ruleIds", ruleIdArray);
      // formData.append("taskType", 2);
      const vm = {
        projectId: this.createForm.projectId,
        taskId: this.createForm.taskId,
        startTime: this.createForm.datePicker[0],
        endTime: this.createForm.datePicker[1],
        ruleIds: ruleIdArray,
        taskType: 1,
      };
      console.log(vm);
      // console.log(this.createForm,'this.createForm');
      addMonitorInfo(vm)
        .then((res) => {
          console.log(res);
          if (res.success === false) {
            this.loading = false;
            this.$message.error(res.message);
            return;
          }
          this.$message.success(res.message);
          this.createFormDialogVisible1 = false;
          this.loading = false;
          this.getList();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 订阅
    handleRenwe(row) {
      this.$confirm("确认订阅该任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = { id: row.id, status: "1" };
          dy(params).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code !== 200) {
              return this.$message.error(res.msg);
            }
            this.$message({
              type: "success",
              message: "监控任务订阅成功",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },

    // 编辑
    handleEdit(row) {
      this.showMonitorRuleModel = true;
      console.log(row.id);
      const params = { taskManagementId: row.id };
      getMonitorRules(params).then((res) => {
        this.monitorRuleData = res.data;
        console.log(this.monitorRuleData);
        this.monitorRuleData.forEach((v) => {
          // eslint-disable-next-line eqeqeq
          if (v.status == 1) {
            this.$set(v, "switchStatus", false);
          } else {
            this.$set(v, "switchStatus", true);
          }
        });
      });
    },
    changeStatus($event, row) {
      console.log(row);
      console.log(this.selectRuleIdArray);

      let status = 1;
      // eslint-disable-next-line eqeqeq
      if ($event == true) {
        status = 2;
      }
      const param = { monitorRuleId: row.id, status: status };
      if (this.selectRuleIdArray.length > 0) {
        this.selectRuleIdArray.forEach(function (item, index) {
          // eslint-disable-next-line eqeqeq
          if (row.id == item.ruleId) {
            item.status = status;
          } else {
            this.selectRuleIdArray.push(param);
          }
        });
      } else {
        this.selectRuleIdArray.push(param);
      }
      console.log(this.selectRuleIdArray);
    },
    saveRule() {
      const ruleList = [];
      this.monitorRuleData.forEach((v) => {
        // eslint-disable-next-line eqeqeq
        if (v.switchStatus == true) {
          ruleList.push({ id: v.id, status: "2" });
        } else {
          ruleList.push({ id: v.id, status: "1" });
        }
      });
      // console.log(this.monitorRuleData,ruleList);
      edit({ ruleList }).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.success == true) {
          this.$message({
            message: res.message,
            type: "success",
          });
        } else {
          this.$message.error(res.message);
        }
        this.showMonitorRuleModel = false;
      });
    },

    goIndex() {
      this.$router.push({ name: "Dashboard" });
    },
    handleVew(row) {
      console.log("evv", row);
      if (row.taskName === "天擎反欺诈") {
        this.$router.push({
          name: "ManagEment",
          query: { id: row.id, name: row.taskName, tit: row.projectName },
        });
        // 反欺诈详情
      }
      if (row.taskName === "资金流向") {
        this.$router.push({
          name: "propertyInvestment",
          query: { id: row.id, name: row.taskName, tit: row.projectName },
        });
      }
      if (row.taskName === "地址评分") {
        // 地址评分详情
        this.$router.push({
          name: "fraudData",
          query: { id: row.id, name: row.taskName, tit: row.projectName },
        });
      }
      if (row.taskName === "风险标签") {
        // 风险标签详情
        this.$router.push({
          name: "RiskLabel",
          query: { id: row.id, name: row.taskName, tit: row.projectName },
        });
      }
      if (row.taskName === "核销客户") {
        // 回销客户
        this.$router.push({
          name: "writeOffCustomer",
          query: { id: row.id, name: row.taskName, tit: row.projectName },
        });
      }
    },
    getSwitchStatus(status) {
      // eslint-disable-next-line eqeqeq
      if (status == 1) {
        return false;
        // eslint-disable-next-line eqeqeq
      } else if (status == 2) {
        return true;
      }
    },
  },
};
</script>
