<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.taskName"
        placeholder="预警任务名称"
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
      <el-select v-model="listQuery.projectId" clearable placeholder="项目名称">
        <el-option
          v-for="item in projectNameList"
          :key="item.id"
          :label="item.projectName"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.status" clearable placeholder="任务状态">
        <el-option
          v-for="(val, key, i) in statusList"
          :key="i"
          :label="val"
          :value="key"
        />
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="ishadddoling">新增预警任务</el-button>
    </div>
    <el-table
      :data="dataQuery"
      :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 30px"
    >
      <el-table-column label="任务名称" prop="taskName" align="center" />
      <el-table-column label="所属项目" prop="projectName" align="center" />
      <el-table-column label="开始时间" prop="startTime" align="center" />
      <el-table-column label="结束时间" prop="endTime" align="center" />
      <el-table-column label="接收人" prop="alertTarget" align="center" />
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
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="{ row }">
          <el-button size="mini" type="text" @click="details(row)"
            >详情</el-button
          >
          <el-button
            v-if="row.status == '已停用'"
            size="mini"
            type="text"
            @click="dy(row)"
            >订阅</el-button
          >
          <el-button
            v-if="row.status == '执行中'"
            size="mini"
            type="text"
            @click="cancel(row)"
            >取消</el-button
          >
          <el-button size="mini" type="text" @click="edit(row)">编辑</el-button>
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
      title="添加预警任务"
      :visible.sync="createFormDialogVisible"
      width="40%"
      center
    >
      <el-form
        ref="createFrom"
        :model="alertFrom"
        :rules="alertRule"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="22">
            <el-form-item label="请选择所属项目:" prop="projectId">
              <el-select v-model="alertFrom.projectId" placeholder="项目名称">
                <el-option
                  v-for="item in projectNameList"
                  :key="item.id"
                  :label="item.projectName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="设置时间周期:" prop="datePicker">
              <el-col :span="22">
                <el-date-picker
                  v-model="alertFrom.datePicker"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择预警任务:" prop="taskId">
              <el-select
                v-model="alertFrom.taskId"
                placeholder="请选择预警任务"
              >
                <el-option
                  v-for="item in alertNameList"
                  :key="item.id"
                  :label="item.taskName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择预警方式:" prop="alertType">
              <el-select v-model="alertFrom.alertType" placeholder="邮箱">
                <el-option label="短信" value="1" />
                <el-option label="邮箱" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入接收方式:" prop="alertTarget">
              <el-input
                v-model="alertFrom.alertTarget"
                style="width: 60%"
                placeholder="请输入手机号/或者邮箱"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nextAdd">下 一 步</el-button>
        <el-button type="primary" @click="createFormDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="预警任务名称-项目名称名称"
      style="font-weight: bold"
      :visible.sync="ruleTaskDialogVisible"
    >
      <el-table
        :data="alertRuleDetailsList"
        :header-cell-style="{ background: '#3a835d', color: 'white' }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="ruleName" label="规则名称" />
        <el-table-column
          align="center"
          width="200"
          prop="ruleDesc"
          label="规则说明"
        />
        <el-table-column align="center" prop="ruleType" label="规则类型" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="modifyTime" label="修改时间" />
      </el-table>
      <span slot="footer" class="dialog-footer" a>
        <el-button @click="insertAlert" :disabled="aleatlod" :loading="aleatlod"
          >保存</el-button
        >
        <el-button type="primary" @click="ruleTaskDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <el-dialog style="font-weight: bold" :visible.sync="alertIdDialogVisible">
      <el-table
        :data="alertRuleList"
        :header-cell-style="{ background: '#3a835d', color: 'white' }"
        style="width: 100%"
      >
        <el-table-column prop="ruleName" label="规则名称" width="120" />
        <el-table-column prop="ruleName" label="规则说明" width="120" />
        <el-table-column
          align="center"
          prop="ruleType"
          label="规则类型"
          width="120"
        />
        <el-table-column label="当前状态" prop="status" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.status"> 已启用 </span>
            <span v-else> 已停用 </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-text="开启"
              inactive-text="关闭"
            />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alertUpdateRule">保存</el-button>
        <el-button style="color: red" @click="alertIdDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
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
import {
  getAlertList,
  selectAlertId,
  saveAlert,
  dy,
  updateRule,
  getTaskRuleList,
} from "@/api/alertInfo";
import { getTaskNameList } from "@/api/taskInfo";
import { getAllProject } from "@/api/projectInfo";
import Pagination from "@/components/Pagination";

export default {
  components: { Pagination },
  data() {
    return {
      aleatlod: false,
      ish: true,
      lod: false,
      dataQuery: [],
      value: true,
      total: 0,
      datePicker: "",
      listQuery: {
        taskType: 2,
        taskName: "",
        datePicker: "",
        endTime: "",
        startTime: "",
        status: "",
        projectName: "",
        rows: 10,
        page: 1,
      },
      alertNameList: [],
      projectNameList: [],
      alertRuleDetailsList: [],
      dyDialogVisible: false,
      alertRuleList: [{ alertStatusId: false }],
      statusList: {
        1: "执行中",
        2: "已停用",
      },
      dateList: { 1: "1天", 2: "2天", 3: "3天" },
      createFormDialogVisible: false,
      alertFrom: {
        taskType: 2,
        datePicker: "",
      },
      alertStatusId: "",
      ruleTaskDialogVisible: false,
      alertIdDialogVisible: false,
      multipleSelection: [],
      ruleIds: [],
      createList: "",
      alertRule: {
        projectId: [{ required: true, message: "不能为空", trigger: "blur" }],
        datePicker: [
          { required: true, message: "请选择日期", trigger: "blur" },
        ],
        taskId: [{ required: true, message: "不能为空", trigger: "blur" }],
        alertType: [{ required: true, message: "不能为空", trigger: "blur" }],
        alertTarget: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      var alertListResult = await getAlertList(this.listQuery);
      console.log(alertListResult, "alertListResult");
      this.dataQuery = alertListResult.data.records;
      this.total = alertListResult.data.total;
      var taskNameList = await getTaskNameList({ taskType: "2" });
      this.alertNameList = taskNameList.data;
      var projectResult = await getAllProject();
      this.projectNameList = projectResult.data;
    },

    async search() {
      this.lod = true;
      this.listQuery.startTime = this.listQuery.datePicker[0];
      this.listQuery.endTime = this.listQuery.datePicker[1];
      this.listQuery.datePicker = [];
      var alertListResult = await getAlertList(this.listQuery);
      this.dataQuery = alertListResult.data.records;
      this.total = alertListResult.data.total;
      this.lod = false;
    },
    nextAdd() {
      console.log(this.alertFrom.taskId);
      this.$refs["createFrom"].validate((valid) => {
        if (valid) {
          this.addAlertTask();
          this.ruleTaskDialogVisible = true;
        }
      });
    },
    handleRenwe(row) {
      this.createList = row;
    },
    ishadddoling() {
      if (this.$refs["createFrom"] !== undefined) {
        this.$refs["createFrom"].resetFields();
      }
      this.createFormDialogVisible = true;
    },
    async addAlertTask() {
      const taskRuleResult = await getTaskRuleList({
        taskId: this.alertFrom.taskId,
      });
      console.log(taskRuleResult, "taskRuleResult");
      this.alertRuleDetailsList = taskRuleResult.data;
      this.alertRuleDetailsList.forEach((i) => {
        if (i.status === "2") {
          i.status = true;
        } else {
          i.status = false;
        }
      });
    },
    async alertUpdateRule() {
      const ruleList = [];
      this.alertRuleList.forEach((v) => {
        if (v.status === true) {
          ruleList.push({ id: v.id, status: "2" });
        } else {
          ruleList.push({ id: v.id, status: "1" });
        }
      });
      console.log(ruleList, "ruleList");
      console.log(this.alertRuleList, "this.alertRuleList");
      try {
        var updateRuleResult = await updateRule({ ruleList });
        console.log(updateRuleResult, "updateRuleResult");
        if (updateRuleResult.success) {
          this.$message({
            type: "success",
            message: "修改状态成功!",
          });
          this.alertIdDialogVisible = false;
        } else {
          this.$message({
            type: "success",
            message: "失败",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dy(row) {
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
              message: "预警任务订阅成功",
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
    cancel(row) {
      this.$confirm("确认停用该任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await dy({ id: row.id, status: "2" });
          // console.log(res, "evev");
          if (res.code !== 200) {
            return this.$message({
              type: "info",
              message: res.message,
            });
          }
          this.search();
          this.$message({
            type: "success",
            message: "预警任务停用成功!",
          });
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "预警任务停用失败",
          });
        });
    },
    async insertAlert() {
      const ruleIdArray = [];
      this.alertFrom.startTime = this.alertFrom.datePicker[0];
      this.alertFrom.endTime = this.alertFrom.datePicker[1];
      this.multipleSelection.forEach(function (item, index) {
        ruleIdArray.push(item.id);
      });
      // this.alertFrom.ruleIds=JSON.stringify(this.ruleIds)
      // formData.append('ruleIds', ruleIdArray)
      this.alertFrom.ruleIds = ruleIdArray;
      this.aleatlod = true;
      // console.log(this.alertFrom, "this.alertFrom");
      saveAlert(this.alertFrom)
        .then((res) => {
          this.aleatlod = false;
          if (res.success) {
            this.$message({
              message: res.message,
              type: "success",
            });
            this.createFormDialogVisible = false;
            this.ruleTaskDialogVisible = false;
            this.search();
          } else {
            this.createFormDialogVisible = false;
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.aleatlod = false;
        });
    },
    details(row) {
      this.$router.push({
        name: "alertInfoDetailList",
        query: { alertId: row.id },
      });
    },
    async edit(row) {
      console.log(row.id, "row.id");
      var alertIdList = await selectAlertId({ taskManagementId: row.id });
      this.alertRuleList = alertIdList.data;
      console.log(alertIdList);
      this.alertRuleList.forEach((i) => {
        if (i.status === "2") {
          i.status = true;
        } else {
          i.status = false;
        }
      });
      this.alertIdDialogVisible = true;
    },
  },
};
</script>
