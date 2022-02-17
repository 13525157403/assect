<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="回访任务" name="returnVisitTask">
        <el-row>
          <el-input
            v-model="returnVisitTask.name"
            placeholder="任务名称"
            style="width: 10%"
            clearable
          />
          <el-date-picker
            v-model="returnVisitTask.datePicker"
            style="width: 20%"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          />
          <el-select
            v-model="returnVisitTask.mode"
            clearable
            placeholder="回访方式"
          >
            <el-option label="人工" value="1" />
          </el-select>
          <el-select
            v-model="returnVisitTask.taskId"
            clearable
            placeholder="回访原因"
          >
            <el-option
              v-for="(item, m) in reasonList"
              :key="m"
              :label="item.reason"
              :value="item.taskId"
            />
          </el-select>
          <el-select
            v-model="returnVisitTask.status"
            clearable
            placeholder="回访状态"
          >
            <el-option label="进行中" value="1" />
            <el-option label="已停用" value="2" />
          </el-select>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" :disabled="ish1" @click="saveTask"
            >新建任务</el-button
          >
        </el-row>
        <el-table
          :data="returnVisitTaskData"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column
            v-if="show"
            label="回访任务"
            prop="id"
            align="center"
          />
          <el-table-column label="回访任务名称" prop="name" align="center" />
          <el-table-column label="回访方式" prop="mode" align="center" />
          <el-table-column label="回访原因" prop="reason" align="center" />
          <el-table-column label="任务描述" prop="visitDesc" align="center" />
          <el-table-column label="任务状态" prop="status" align="center" />
          <el-table-column label="发布时间" prop="createTime" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="mini" @click="modifyTask(row)">修改</el-button>
              <el-button
                v-show="row.status == '已停用'"
                size="mini"
                type="text"
                @click="enable(row.id)"
                >启用
              </el-button>
              <el-button
                v-show="row.status == '进行中'"
                size="mini"
                type="text"
                @click="disable(row.id)"
                >禁用
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="returnVisitTask.page"
          :limit.sync="returnVisitTask.rows"
          @pagination="getReturnVisitTask"
        />
      </el-tab-pane>

      <el-tab-pane label="回访列表" name="task">
        <div class="filter-container">
          <el-input
            v-model="returnVisitListQuery.nameOrCertOrMobile"
            placeholder="姓名/身份证/手机号"
            style="width: 15%"
            clearable
          />
          <el-date-picker
            v-model="returnVisitListQuery.datePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          />
          <el-input
            v-model="returnVisitListQuery.reason"
            placeholder="回访原因"
            style="width: 15%"
            clearable
          />
          <el-input
            v-model="returnVisitListQuery.count"
            placeholder="回访次数"
            style="width: 15%"
            clearable
          />
          <el-button type="primary" @click="getTaskList">查询</el-button>
          <el-button type="primary" @click="exportListBtn">导出</el-button>
        </div>
        <el-table
          :data="taskInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
          @selection-change="listHandleSelectionChange"
        >
          <el-table-column
            fixed
            type="selection"
            prop="date"
            label="全选"
            width="50"
          />
          <el-table-column label="客户姓名" prop="name" align="center" />
          <el-table-column label="手机号" prop="mobile" align="center" />
          <el-table-column label="身份证号" prop="certNo" align="center" />
          <el-table-column label="回访原因" width="300" prop="reason" align="center" />
          <el-table-column
            label="回访次数"
            prop="returnVisitCount"
            align="center"
          />
          <el-table-column label="回访日期" width="150" prop="createTime" align="center">
            <template slot-scope="{ row }">
              {{ row.createTime | filterTimes }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="{ row }">
              <el-button type="mini" @click="addRecordModel(row)"
                >回访登记</el-button
              >
              <el-button type="mini" @click="toRecordPage(row.id)"
                >回访明细</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="returnVisitListQuery.total > 0"
          :total="returnVisitListQuery.total"
          :page.sync="returnVisitListQuery.page"
          :limit.sync="returnVisitListQuery.rows"
          @pagination="getTaskList"
        />
      </el-tab-pane>

      <el-tab-pane label="回访记录" name="returnVisitRecordTab">
        <div class="filter-container">
          <el-input
            v-model="returnVisitRecordQuery.nameOrCertOrMobile"
            placeholder="姓名/身份证/手机号"
            style="width: 15%"
            clearable
          />
          <el-date-picker
            v-model="returnVisitRecordQuery.datePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          />
          <el-input
            v-model="returnVisitRecordQuery.reason"
            placeholder="回访原因"
            style="width: 15%"
            clearable
          />
          <el-select
            v-model="returnVisitRecordQuery.returnVisitResult"
            clearable
            placeholder="回访结果"
          >
            <el-option label="接通" value="1" />
            <el-option label="未接通" value="2" />
            <el-option label="错/空/停" value="3" />
          </el-select>

          <el-button type="primary" @click="getReturnVisitRecordPage"
            >查询</el-button
          >
          <el-button type="primary" @click="exportRecordBtn">导出</el-button>
        </div>
        <el-table
          :data="ruleInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            type="selection"
            prop="date"
            label="全选"
            width="50"
          />
          <el-table-column label="客户姓名" prop="name" align="center" />
          <el-table-column label="手机号" prop="mobile" align="center" />
          <el-table-column label="身份证号" prop="certNo" align="center" />
          <el-table-column label="回访原因" prop="reason" align="center" />
          <el-table-column label="回访日期" prop="createTime" align="center">
            <template slot-scope="{ row }">
              {{ row.createTime | filterTimes }}
            </template>
          </el-table-column>
          <el-table-column
            label="回访结果"
            prop="returnVisitResult"
            align="center"
          />
          <el-table-column
            label="回访小结"
            prop="returnVisitSubsection"
            align="center"
          />
        </el-table>
        <pagination
          v-show="returnVisitRecordQuery.total > 0"
          :total="returnVisitRecordQuery.total"
          :page.sync="returnVisitRecordQuery.page"
          :limit.sync="returnVisitRecordQuery.rows"
          @pagination="getReturnVisitRecordPage"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="returnVisitTaskFrom.id != null ? '修改任务' : '添加任务'"
      :visible.sync="returnVisitTaskDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="returnVisitTaskFrom"
          :model="returnVisitTaskFrom"
          :rules="returnVisitTaskFromRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item label="输入任务名称:" prop="name" required>
              <el-input v-model="returnVisitTaskFrom.name" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择回访原因">
              <el-select
                v-model="returnVisitTaskFrom.taskType"
                placeholder="任务类别"
                @change="change"
              >
                <el-option label="监控" value="1" />
                <el-option label="预警" value="2" />
              </el-select>
              <el-select
                v-model="returnVisitTaskFrom.taskId"
                placeholder="任务名称"
                @change="taskChange"
              >
                <el-option
                  v-for="(item, m) in taskTypeLists"
                  :key="m"
                  :label="item.taskName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="回访方式:" prop="mode">
              <el-select v-model="returnVisitTaskFrom.mode">
                <el-option label="人工" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="returnVisitTaskFrom.status != null" :span="22">
            <el-form-item label="回访状态">
              <el-select
                v-model="returnVisitTaskFrom.status"
                placeholder="有效"
              >
                <el-option label="进行中" value="1" />
                <el-option label="已禁用" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入任务描述:" prop="visitDesc" required>
              <el-input
                v-model="returnVisitTaskFrom.visitDesc"
                style="width: 60%"
                placeholder="项目说明文字"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="addTask" :loading="returnVisit">确认</el-button>
              <el-button @click="returnVisitTaskDialogVisible = false"
                >取消</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>

    <el-dialog
      :title="'添加回访小结'"
      :visible.sync="recordDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="registerFrom"
          :model="registerFrom"
          :rules="registerRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item label="客户姓名:" prop="name">
              <el-input
                v-model="registerFrom.name"
                style="width: 60%"
                readonly
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="回访原因:" prop="reason">
              <el-input
                v-model="registerFrom.reason"
                style="width: 60%"
                readonly
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="回访结果:" prop="returnVisitResult" required>
              <el-select
                v-model="registerFrom.returnVisitResult"
                clearable
                placeholder="请选择"
              >
                <el-option label="接通" value="1" />
                <el-option label="未接通" value="2" />
                <el-option label="错/空/停" value="3" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item
              label="请输入登记小结:"
              prop="returnVisitSubsection"
              required
            >
              <el-input
                v-model="registerFrom.returnVisitSubsection"
                style="width: 60%"
                placeholder="回访小结文字描述"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="saveRegisterInfo"
                >确认</el-button
              >
              <el-button @click="recordDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
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
  disableOrEnable,
  getReturnVisitTaskByPage,
  reasonForReturnVisit,
  saveReturnVisitTask,
  updateReturnVisitTask,
  getReturnVisitRecordPage,
  searchExport,
  getReturnVisitListByPage,
  searchExportList,
  saveRegister,
} from "@/api/postLoanReturnVisit";
import Pagination from "@/components/Pagination";
import { getTaskNameList } from "@/api/taskInfo";
import { getAllTask } from "@/api/monitor";

export default {
  components: { Pagination },
  data() {
    return {
      returnVisit:false,
      show: false,
      lod: false,
      returnVisitTaskDialogVisible: false,
      recordDialogVisible: false,
      returnVisitTaskFrom: {},
      returnVisitTaskFromRule: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        mode: [{ required: true, message: "不能为空", trigger: "blur" }],
        taskId: [{ required: true, message: "不能为空", trigger: "blur" }],
        visitDesc: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      registerRule: {
        returnVisitResult: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        returnVisitSubsection: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
      activeName: "returnVisitTask",
      returnVisitTaskData: [],
      reasonList: [],
      taskTypeLists: [],
      total: 0,
      returnVisitTask: {
        page: 1,
        endTime: "",
        startTime: "",
        name: "",
        mode: "",
        status: "",
        taskId: "",
        datePicker: [],
        rows: 10,
      },
      returnVisitListQuery: {
        total: 0,
        page: 1,
        nameOrCertOrMobile: "",
        reason: "",
        count: "",
        startTime: "",
        endTime: "",
        rows: 10,
      },
      returnVisitRecordQuery: {
        total: 0,
        page: 1,
        nameOrCertOrMobile: "",
        reason: "",
        returnVisitListId: "",
        returnVisitResult: "",
        startTime: "",
        endTime: "",
        datePicker: [],
        rows: 10,
      },
      recordSelection: [],
      listSelection: [],
      taskInfoList: [],
      ruleInfoList: [],
      registerFrom: {},
      taskList: [],
      ish1: true,
      ish2: true,
      ish3: true,
    };
  },
  created() {
    this.getReason();
    this.getReturnVisitTask();
    this.getAllTask();
    this.getTaskNameList();
  },
  methods: {
    async getReason() {
      const reasonForReturnVisits = await reasonForReturnVisit();
      this.reasonList = reasonForReturnVisits.data;
    },
    handleClick(tab, event) {
      this.returnVisitRecordQuery.returnVisitListId = null;
      if (this.activeName === "task") {
        this.getTaskList();
      }
      if (this.activeName === "returnVisitRecordTab") {
        this.getReturnVisitRecordPage();
      }
      // eslint-disable-next-line eqeqeq
      if (this.activeName == "project") {
        this.getReturnVisitTask();
      }
    },
    // 获取任务下拉列表
    getAllTask() {
      getAllTask().then((res) => {
        // console.log(res,'rgb')
        this.taskList = res.data;
      });
    },
    // 回访任务查询
    async getReturnVisitTask() {
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.returnVisitTask.datePicker) {
        startDate = this.returnVisitTask.datePicker[0];
        endDate = this.returnVisitTask.datePicker[1];
      }
      var returnVisitTaskList = await getReturnVisitTaskByPage({
        rows: this.returnVisitTask.rows,
        page: this.returnVisitTask.page,
        name: this.returnVisitTask.name,
        mode: this.returnVisitTask.mode,
        status: this.returnVisitTask.status,
        taskId: this.returnVisitTask.taskId,
        startTime: startDate,
        endTime: endDate,
      });
      this.total = returnVisitTaskList.data.total;
      returnVisitTaskList = returnVisitTaskList.data.records;
      this.returnVisitTaskData = returnVisitTaskList;
    },
    async search() {
      this.lod = true;
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.returnVisitTask.datePicker) {
        startDate = this.returnVisitTask.datePicker[0];
        endDate = this.returnVisitTask.datePicker[1];
      }
      getReturnVisitTaskByPage({
        rows: this.returnVisitTask.rows,
        page: this.returnVisitTask.page,
        name: this.returnVisitTask.name,
        mode: this.returnVisitTask.mode,
        status: this.returnVisitTask.status,
        taskId: this.returnVisitTask.taskId,
        startTime: startDate,
        endTime: endDate,
      }).then((res) => {
        this.lod = false;
        this.total = res.data.total;
        res = res.data.records;
        this.returnVisitTaskData = res;
      });
    },
    saveTask() {
      if (this.$refs["returnVisitTaskFrom"] !== undefined) {
        this.$refs["returnVisitTaskFrom"].resetFields();
      }
      this.returnVisitTaskFrom = {};
      this.returnVisitTaskDialogVisible = true;
    },
    modifyTask(row) {
      this.returnVisitTaskDialogVisible = true;
      this.returnVisitTaskFrom = {};
      this.$set(this.returnVisitTaskFrom, "name", row.name);
      this.$set(this.returnVisitTaskFrom, "mode", row.mode);
      this.$set(this.returnVisitTaskFrom, "status", row.status);
      this.$set(this.returnVisitTaskFrom, "visitDesc", row.visitDesc);
      this.$set(this.returnVisitTaskFrom, "taskType", row.taskType);
      // returnVisitTaskFrom.taskId
      // this.taskTypeLists = [{ id: row.taskId, taskName: row.taskName }]
      // console.log(this.taskTypeLists,'this.taskTypeLists');
      // console.log(row.taskId);
      this.$set(this.returnVisitTaskFrom, "taskId", row.taskId);
      this.$set(this.returnVisitTaskFrom, "id", row.id);
    },
    // 回访任务保存
    async addTask() {
      this.$refs["returnVisitTaskFrom"].validate(() => {
        if (!this.returnVisitTaskFrom.id) {
          this.returnVisit=true
          saveReturnVisitTask(this.returnVisitTaskFrom).then((res) => {
            this.returnVisit=false
            // eslint-disable-next-line eqeqeq
            if (res.code === 200) {
              this.returnVisitTaskDialogVisible = false;
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.returnVisitTaskDialogVisible = true;
              this.$message.error(res.message);
            }
            this.getReturnVisitTask();
          }).catch(()=>{
            this.returnVisit=false
          });
        } else {
          if (this.returnVisitTaskFrom.status === "进行中") {
            this.returnVisitTaskFrom.status = "1";
          } else if (this.returnVisitTaskFrom.status === "已停用") {
            this.returnVisitTaskFrom.status = "2";
          }
          if (this.returnVisitTaskFrom.mode === "人工") {
            this.returnVisitTaskFrom.mode = "1";
          }
          updateReturnVisitTask(this.returnVisitTaskFrom).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code !== 200) {
              this.returnVisitTaskDialogVisible = true;
              return this.$message.error(res.message);
            }
            this.returnVisitTaskDialogVisible = false;
            this.$message({
              message: res.message,
              type: "success",
            });
            this.getReturnVisitTask();
          });
        }
      });
    },
    // 获取回访任务新建下拉框
    async getTaskNameList() {
      const taskTypeListsResult = await getTaskNameList({
        taskType: this.returnVisitTaskFrom.taskType,
      });
      this.ish1 = false;
      // console.log(taskTypeListsResult, "taskTypeListsResult");
      this.taskTypeLists = taskTypeListsResult.data;
      this.returnVisitTaskFrom.taskId = taskTypeListsResult.data[0].id;
    },
    taskChange() {
      this.$forceUpdate();
    },
    change() {
      this.returnVisitTaskFrom.taskId = {};
      this.getTaskNameList();
    },
    // 启用任务
    enable(id) {
      this.$confirm("确认启用任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const formData = new FormData();
          formData.append("id", id);
          await disableOrEnable(formData);
          this.search();
          this.$message({
            type: "success",
            message: "回访任务启用成功!",
          });
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "回访任务启用失败",
          });
        });
    },
    disable(id) {
      this.$confirm("确认停用该任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const formData = new FormData();
          formData.append("id", id);
          await disableOrEnable(formData);
          this.search();
          this.$message({
            type: "success",
            message: "回访任务停用成功!",
          });
          this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "回访任务停用失败",
          });
        });
    },
    // 任务列表查询
    async getTaskList() {
      this.lod = true;
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.returnVisitListQuery.datePicker) {
        startDate = this.returnVisitListQuery.datePicker[0];
        endDate = this.returnVisitListQuery.datePicker[1];
      }
      var taskResult = await getReturnVisitListByPage({
        rows: this.returnVisitListQuery.rows,
        page: this.returnVisitListQuery.page,
        count: this.returnVisitListQuery.count,
        nameOrCertOrMobile: this.returnVisitListQuery.nameOrCertOrMobile,
        reason: this.returnVisitListQuery.reason,
        startTime: startDate,
        endTime: endDate,
      });
      this.lod = false;
      this.taskInfoList = taskResult.data.records;
      this.returnVisitListQuery.total = taskResult.data.total;
    },
    // 回放记录列表查询
    async getReturnVisitRecordPage(listId) {
      this.lod = true;
      let startDate;
      let endDate;
      // eslint-disable-next-line eqeqeq
      if (undefined != this.returnVisitRecordQuery.datePicker) {
        startDate = this.returnVisitRecordQuery.datePicker[0];
        endDate = this.returnVisitRecordQuery.datePicker[1];
      }
      var ruleResult = await getReturnVisitRecordPage({
        rows: this.returnVisitRecordQuery.rows,
        page: this.returnVisitRecordQuery.page,
        nameOrCertOrMobile: this.returnVisitRecordQuery.nameOrCertOrMobile,
        reason: this.returnVisitRecordQuery.reason,
        returnVisitListId: this.returnVisitRecordQuery.returnVisitListId,
        returnVisitResult: this.returnVisitRecordQuery.returnVisitResult,
        startTime: startDate,
        endTime: endDate,
      });
      this.lod = false;
      this.ruleInfoList = ruleResult.data.records;
      this.returnVisitRecordQuery.total = ruleResult.data.total;
    },
    async exportRecordBtn() {
      console.log(this.recordSelection);
      if (this.recordSelection.length <= 0) {
        return this.$message.error("请先勾选数据再导出");
      }
      var ids = "";
      this.recordSelection.forEach((res) => {
        if (ids === "") {
          ids = res.id;
        } else {
          ids = ids + "," + res.id;
        }
      });
      const params = {
        ids: ids,
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
        // a.download = "贷后回访记录.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      });
    },
    async exportListBtn() {
      console.log(this.listSelection);
      if (this.listSelection.length <= 0) {
        return this.$message.error("请先勾选数据再导出");
      }
      var ids = "";
      this.listSelection.forEach((res) => {
        if (ids === "") {
          ids = res.id;
        } else {
          ids = ids + "," + res.id;
        }
      });
      const params = {
        ids: ids,
      };
      searchExportList(params).then((res) => {
        const blob = new Blob([res], {
          type: "application/vnd.ms-excel",
        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        const a = document.createElement("a");
        a.href = url;
        // a.download = "贷后回访列表.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      });
    },
    // 保存回访小结信息
    saveRegisterInfo() {
      this.$refs["registerFrom"].validate((valid) => {
        console.log(this.registerFrom.id);
        if (valid) {
          const formData = new FormData();
          formData.append("id", this.registerFrom.id);
          formData.append(
            "returnVisitResult",
            this.registerFrom.returnVisitResult
          );
          formData.append(
            "returnVisitSubsection",
            this.registerFrom.returnVisitSubsection
          );
          saveRegister(formData).then((res) => {
            if (res.code === 200) {
              this.recordDialogVisible = false;
              this.$message({
                message: res.msg,
                type: "success",
              });
            } else {
              this.recordDialogVisible = false;
              this.$message.error(res.msg);
            }
            this.getTaskList();
          });
        }
      });
    },
    addRecordModel(row) {
      this.recordDialogVisible = true;
      this.$set(this.registerFrom, "id", row.id);
      this.$set(this.registerFrom, "name", row.name);
      this.$set(this.registerFrom, "reason", row.reason);
      this.$set(this.registerFrom, "returnVisitResult", row.returnVisitResult);
    },

    handleSelectionChange(val) {
      this.recordSelection = val;
    },
    listHandleSelectionChange(val) {
      this.listSelection = val;
    },

    toRecordPage(id) {
      this.activeName = "returnVisitRecordTab";
      this.returnVisitRecordQuery.returnVisitListId = id;
      this.getReturnVisitRecordPage();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
