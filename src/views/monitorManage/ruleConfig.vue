<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="项目" name="project">
        <div class="filter-container">
          <el-input
            v-model="projectQuery.projectIdAndName"
            placeholder="项目名称"
            style="width: 15%"
            clearable
          />
          <el-select
            v-model="projectQuery.status"
            clearable
            placeholder="项目状态"
          >
            <el-option
              v-for="(val, key, i) in statusList"
              :key="i"
              :label="val"
              :value="key"
            />
          </el-select>

          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" @click="addProjectDialog"
            >新建项目</el-button
          >
        </div>
        <el-table
          :data="projectInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column
            v-if="show"
            label="项目id"
            prop="id"
            align="center"
          />
          <el-table-column label="项目名称" prop="projectName" align="center" />
          <el-table-column label="项目描述" prop="projectDesc" align="center" />
          <el-table-column label="项目状态" prop="statusDesc" align="center" />
          <el-table-column label="创建时间" prop="createTime" align="center">
            <template slot-scope="{ row }">
              {{ row.createTime | filterTimes }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="mini" @click="editProjectDialog(row)"
                >修改</el-button
              >
              <el-button type="mini" @click="deleteProject(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="projectQuery.total > 0"
          :total="projectQuery.total"
          :page.sync="projectQuery.page"
          :limit.sync="projectQuery.rows"
          @pagination="getList"
        />
      </el-tab-pane>

      <el-tab-pane label="任务" name="task">
        <div class="filter-container">
          <el-input
            v-model="taskQuery.taskIdAndName"
            placeholder="任务名称"
            style="width: 15%"
            clearable
          />
          <el-select
            v-model="taskQuery.taskType"
            clearable
            placeholder="任务类别"
          >
            <el-option
              v-for="(val, key, i) in taskTypeList"
              :key="i"
              :label="val"
              :value="key"
            />
          </el-select>
          <el-select
            v-model="taskQuery.taskStatus"
            clearable
            placeholder="任务状态"
          >
            <el-option
              v-for="(val, key, i) in statusList"
              :key="i"
              :label="val"
              :value="key"
            />
          </el-select>

          <el-button type="primary" @click="getTaskList">查询</el-button>
          <el-button type="primary" @click="addAlertTask">新建任务</el-button>
        </div>
        <el-table
          :data="taskInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column v-if="show" label="任务" prop="id" align="center" />
          <el-table-column label="任务名称" prop="taskName" align="center" />
          <el-table-column
            label="任务类别"
            prop="taskTypeDesc"
            align="center"
          />
          <el-table-column label="任务描述" prop="taskDesc" align="center" />
          <el-table-column
            label="任务状态"
            prop="taskStatusDesc"
            align="center"
          />
          <el-table-column label="创建时间" prop="createTime" align="center">
            <template slot-scope="{ row }">
              {{ row.createTime | filterTimes }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="mini" @click="eddTaskModel(row)">修改</el-button>
              <el-button type="mini" @click="deleteTaskById(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="taskQuery.total > 0"
          :total="taskQuery.total"
          :page.sync="taskQuery.page"
          :limit.sync="taskQuery.rows"
          @pagination="getTaskList"
        />
      </el-tab-pane>

      <el-tab-pane label="规则" name="rule">
        <div class="filter-container">
          <el-input
            v-model="ruleQuery.ruleIdAndName"
            placeholder="规则名称"
            style="width: 15%"
            clearable
          />
          <el-select
            v-model="ruleQuery.ruleType"
            clearable
            placeholder="规则类型"
          >
            <el-option
              v-for="(val, key, i) in ruleTypeList"
              :key="i"
              :label="val"
              :value="key"
            />
          </el-select>
          <el-select
            v-model="ruleQuery.status"
            clearable
            placeholder="规则状态"
          >
            <el-option label="有效" value="1" />
            <el-option label="无效" value="2" />
          </el-select>
          <el-select
            v-model="ruleQuery.taskId"
            clearable
            placeholder="所属任务"
          >
            <el-option
              v-for="item in taskList"
              :key="item.id"
              :label="item.taskName"
              :value="item.id"
            />
          </el-select>

          <el-button type="primary" @click="getRuleList">查询</el-button>
          <el-button type="primary" :disabled="ish" @click="addRuleModel"
            >新建规则</el-button
          >
        </div>
        <el-table
          :data="ruleInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column
            v-if="show"
            label="规则id"
            prop="id"
            align="center"
            width="70"
          />
          <el-table-column label="所属任务" prop="taskName" align="center" />
          <el-table-column label="规则名称" prop="ruleName" align="center" />
          <el-table-column label="规则描述" prop="ruleDesc" align="center" />
          <el-table-column label="规则状态" prop="statusDesc" align="center" />
          <el-table-column
            label="规则类型"
            prop="ruleTypeDesc"
            align="center"
          />
          <el-table-column label="创建时间" prop="createTime" align="center">
            <template slot-scope="{ row }">
              {{ row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="mini" @click="eddRuleModel(row)">修改</el-button>
              <el-button type="mini" @click="deleteRuleById(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="ruleQuery.total > 0"
          :total="ruleQuery.total"
          :page.sync="ruleQuery.page"
          :limit.sync="ruleQuery.rows"
          @pagination="getRuleList"
        />
      </el-tab-pane>

      <el-tab-pane label="审批" name="approve">
        <div class="filter-container">
          <el-input
            v-model="approveQuery.name"
            placeholder="名称"
            style="width: 15%"
            clearable
          />
          <el-select
            v-model="approveQuery.type"
            clearable
            style="width: 120px"
            placeholder="类型"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="dateArr"
            style="width: 230px; height: 36px"
            size="small"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @input="handleDate"
          />
          <el-select
            v-model="approveQuery.approveStatus"
            clearable
            style="width: 120px"
            placeholder="审批状态"
          >
            <el-option
              v-for="item in approveStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" @click="getApproveList">查询</el-button>
        </div>
        <el-table
          :data="approveInfoList"
          :header-cell-style="{ background: 'rgb(70,183,173)', color: 'white' }"
          fit
          highlight-current-row
          style="width: 100%; margin-top: 20px; margin-bottom: 30px"
        >
          <el-table-column v-if="show" label="审批" prop="id" align="center" />
          <el-table-column label="类别" prop="type" align="center" />
          <el-table-column label="名称" prop="name" align="center" />
          <el-table-column
            label="修改内容"
            prop="updateContent"
            align="center"
          />
          <el-table-column label="审批状态" prop="approveStatus" align="center">
            <template slot-scope="{ row }">
              <span v-if="row.approveStatus == 1"> 通过 </span>
              <span v-if="row.approveStatus == 2"> 拒绝 </span>
              <span v-if="row.approveStatus == 3"> 审批中 </span>
            </template>
          </el-table-column>
          <el-table-column label="提交日期" prop="createTime" align="center" />
          <el-table-column label="审批时间" prop="approveTime" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.approveStatus == 3"
                type="mini"
                @click="revoke(row.id)"
                >撤回</el-button
              >
              <el-button
                v-if="row.approveStatus == 3"
                type="mini"
                @click="approveMainView(row)"
                >审批</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="approveQuery.total > 0"
          :total="approveQuery.total"
          :page.sync="approveQuery.page"
          :limit.sync="approveQuery.rows"
          @pagination="getApproveList"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :title="projectFrom.id != null ? '修改项目' : '添加项目'"
      :visible.sync="projectDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="projectFrom"
          :model="projectFrom"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item label="项目名称:" prop="projectName" required>
              <el-input v-model="projectFrom.projectName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col v-if="projectFrom.status != null" :span="22">
            <el-form-item label="项目状态:">
              <el-select v-model="projectFrom.status">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入项目代码:" prop="projectCode" required>
              <el-input v-model="projectFrom.projectCode" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入项目描述:" prop="projectDesc" required>
              <el-input
                v-model="projectFrom.projectDesc"
                style="width: 60%"
                placeholder="项目说明文字"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary"  @click="addProject" :loading="ruleLod" >确认</el-button>
              <el-button @click="projectDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>

    <el-dialog
      :title="taskFrom.id != null ? '修改任务' : '添加任务'"
      :visible.sync="taskDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="taskFrom"
          :model="taskFrom"
          :rules="taskRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item label="请输入任务名称:" prop="taskName" required>
              <el-input v-model="taskFrom.taskName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择任务类别:" prop="taskType" required>
              <el-select
                v-model="taskFrom.taskType"
                clearable
                placeholder="请选择"
              >
                <el-option label="监控" value="1" />
                <el-option label="预警" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="taskFrom.taskStatus != null" :span="22">
            <el-form-item label="任务状态:">
              <el-select v-model="taskFrom.taskStatus">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入任务描述:" prop="taskDesc" required>
              <el-input
                v-model="taskFrom.taskDesc"
                style="width: 60%"
                placeholder="任务说明文字"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" :loading="ruleLod"  @click="saveTask">确认</el-button>
              <el-button @click="taskDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>

    <el-dialog
      :title="ruleFrom.id != null ? '修改规则' : '添加规则'"
      :visible.sync="ruleDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="ruleFrom"
          :model="ruleFrom"
          :rules="ruleFromRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item label="规则名称:" prop="ruleName">
              <el-input v-model="ruleFrom.ruleName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则描述:" prop="ruleDesc">
              <el-input v-model="ruleFrom.ruleDesc" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择所属任务" prop="taskId">
              <el-select
                v-model="ruleFrom.taskType"
                placeholder="任务类别"
                @change="change"
              >
                <el-option label="监控" value="1" />
                <el-option label="预警" value="2" />
              </el-select>
              <el-select
                v-model="ruleFrom.taskId"
                placeholder="任务名称"
                @change="taskChange"
              >
                <el-option
                  v-for="item in taskTypeLists"
                  :key="item.id"
                  :label="item.taskName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则类型" prop="ruleType" required>
              <el-select v-model="ruleFrom.ruleType" placeholder="请选择">
                <el-option label="或" value="1" />
                <el-option label="且" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleFrom.ruleStatus != null" :span="22">
            <el-form-item label="规则状态">
              <el-select v-model="ruleFrom.ruleStatus" placeholder="有效">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则编码(sql)" prop="implSql">
              <el-input v-model="ruleFrom.implSql" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="saveRule" :loading="ruleLod" >确认</el-button>
              <el-button @click="ruleDialogVisible = false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>

    <el-dialog
      :title="'项目审批'"
      :visible.sync="approveProjectDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="projectFrom"
          :model="projectFrom"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item v-if="show" label="项目id:" prop="id" required>
              <el-input v-model="projectFrom.id" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="项目名称:" prop="projectName" required>
              <el-input v-model="projectFrom.projectName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col v-if="projectFrom.status != null" :span="22">
            <el-form-item label="项目状态:">
              <el-select v-model="projectFrom.status">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入项目代码:" prop="projectCode" required>
              <el-input v-model="projectFrom.projectCode" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入项目描述:" prop="projectDesc" required>
              <el-input
                v-model="projectFrom.projectDesc"
                style="width: 60%"
                placeholder="项目说明文字"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="approveSuccess(projectFrom.id)"
                >通过</el-button
              >
              <el-button @click="approveFailed(projectFrom.id)">拒绝</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="'任务审批'"
      :visible.sync="approveTaskDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="taskFrom"
          :model="taskFrom"
          :rules="taskRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item v-if="show" label="项目id:" prop="id" required>
              <el-input v-model="taskFrom.id" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入任务名称:" prop="taskName" required>
              <el-input v-model="taskFrom.taskName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择任务类别:" prop="taskType" required>
              <el-select
                v-model="taskFrom.taskType"
                clearable
                placeholder="请选择"
              >
                <el-option label="监控" value="1" />
                <el-option label="预警" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="taskFrom.taskStatus != null" :span="22">
            <el-form-item label="任务状态:">
              <el-select v-model="taskFrom.taskStatus">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请输入任务描述:" prop="taskDesc" required>
              <el-input
                v-model="taskFrom.taskDesc"
                style="width: 60%"
                placeholder="任务说明文字"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="approveSuccess(taskFrom.id)"
                >通过</el-button
              >
              <el-button @click="approveFailed(taskFrom.id)">拒绝</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="'规则审批'"
      :visible.sync="approveRuleDialogVisible"
      center
    >
      <el-row>
        <el-form
          ref="ruleFrom"
          :model="ruleFrom"
          :rules="ruleFromRule"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-col :span="22">
            <el-form-item v-if="show" label="规则id:" prop="id" required>
              <el-input v-model="ruleFrom.id" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则名称:" prop="ruleName">
              <el-input v-model="ruleFrom.ruleName" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则描述:" prop="ruleDesc">
              <el-input v-model="ruleFrom.ruleDesc" style="width: 60%" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="请选择所属任务" prop="taskId">
              <el-select
                v-model="ruleFrom.taskType"
                placeholder="任务类别"
                @change="change"
              >
                <el-option label="监控" value="1" />
                <el-option label="预警" value="2" />
              </el-select>
              <el-select
                v-model="ruleFrom.taskId"
                placeholder="任务名称"
                @change="taskChange"
              >
                <el-option
                  v-for="item in taskTypeLists"
                  :key="item.id"
                  :label="item.taskName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则类型" prop="ruleType">
              <el-select v-model="ruleFrom.ruleType" placeholder="请选择">
                <el-option label="或" value="1" />
                <el-option label="且" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleFrom.ruleStatus != null" :span="22">
            <el-form-item label="规则状态" prop="ruleStatus">
              <el-select v-model="ruleFrom.ruleStatus" placeholder="有效">
                <el-option label="有效" value="1" />
                <el-option label="无效" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="规则编码(sql)" prop="implSql">
              <el-input v-model="ruleFrom.implSql" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item>
              <el-button type="primary" @click="approveSuccess(ruleFrom.id)"
                >通过</el-button
              >
              <el-button @click="approveFailed(ruleFrom.id)">拒绝</el-button>
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
    ></div>
  </div>
</template>

<script>
import {
  getProject,
  getTaskInfo,
  getApproveInfo,
  getRuleInfo,
  saveProjectInfo,
  saveTaskInfo,
  saveRuleInfo,
  deleteProject,
  deleteTask,
  deleteRule,
  revoke,
  approveSuccessMethod,
  approveFailedMethod,
} from "@/api/ruleConfig";
import { getAllTask } from "@/api/monitor";
import { getTaskNameList } from "@/api/taskInfo";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      ruleLod: false,
      lod: false,
      ish: true,
      show: false,
      projectDialogVisible: false,
      taskDialogVisible: false,
      ruleDialogVisible: false,
      projectFrom: {},
      projectRule: {},
      ruleFrom: {},
      rules: {
        projectCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        projectDesc: [{ required: true, message: "不能为空", trigger: "blur" }],
        projectName: [{ required: true, message: "不能为空", trigger: "blur" }],
        id: [{ required: true, message: "不能为空", trigger: "blur" }],
        implSql: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      ruleFromRule: {
        ruleName: [{ required: true, message: "不能为空", trigger: "blur" }],
        ruleDesc: [{ required: true, message: "不能为空", trigger: "blur" }],
        taskId: [{ required: true, message: "不能为空", trigger: "blur" }],
        ruleType: [{ required: true, message: "不能为空", trigger: "blur" }],
        implSql: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      projectRules: {
        projectName: [{ required: true, message: "不能为空", trigger: "blur" }],
        projectCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        projectDesc: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      taskRule: {
        taskName: [{ required: true, message: "不能为空", trigger: "blur" }],
        taskType: [{ required: true, message: "不能为空", trigger: "blur" }],
        taskDesc: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      activeName: "project",
      dataQuery: [],
      total: 0,
      listQuery: {},
      projectQuery: {
        total: 0,
        page: 1,
        projectIdAndName: "",
        projectStatus: "",
        rows: 10,
      },
      taskQuery: {
        total: 0,
        page: 1,
        taskIdAndName: "",
        taskType: "",
        taskStatus: "",
        rows: 10,
      },
      ruleQuery: {
        total: 0,
        page: 1,
        ruleIdAndName: "",
        taskType: "",
        status: "",
        rows: 10,
      },
      approveQuery: {
        total: 0,
        page: 1,
        name: "",
        type: "",
        approveStatus: "",
        rows: 10,
      },
      channelList: [],
      statusList: {
        1: "有效",
        2: "无效",
      },
      taskTypeList: {
        1: "监控",
        2: "预警",
      },
      ruleTypeList: {
        1: "或",
        2: "且",
      },
      approveStatusOptions: [
        {
          value: "1",
          label: "通过",
        },
        {
          value: "2",
          label: "拒绝",
        },
        {
          value: "3",
          label: "审批中",
        },
      ],
      typeOptions: [
        {
          value: "1",
          label: "项目",
        },
        {
          value: "2",
          label: "任务",
        },
        {
          value: "3",
          label: "规则",
        },
      ],
      dateArr: [],
      createFormDialogVisible: false,
      alertFrom: {
        datePicker: "",
      },
      ruleTaskDialogVisible: false,
      approveProjectDialogVisible: false,
      approveTaskDialogVisible: false,
      approveRuleDialogVisible: false,
      multipleSelection: [],
      projectInfoList: [],
      taskInfoList: [],
      ruleInfoList: [],
      approveInfoList: [],
      createList: "",
      taskFrom: {},
      taskTypeLists: [],
      taskList: [],
    };
  },
  created() {
    this.getList();
    this.getAllTask();
    this.getTaskNameList();
  },
  methods: {
    async getList() {
      this.lod = true;
      var projectResult = await getProject(this.projectQuery);
      this.projectInfoList = projectResult.data.records;
      this.projectQuery.total = projectResult.data.total;
      this.lod = false;
    },
    async handleClick(tab, event) {
      // eslint-disable-next-line eqeqeq
      if (this.activeName == "approve") {
        this.getApproveList();
      }
      // eslint-disable-next-line eqeqeq
      if (this.activeName == "task") {
        this.getTaskList();
      }
      // eslint-disable-next-line eqeqeq
      if (this.activeName == "rule") {
        this.getAllTask();
        this.getRuleList();
      }
      // eslint-disable-next-line eqeqeq
      if (this.activeName == "project") {
        this.getList();
      }
    },
    // 任务列表查询
    async getTaskList() {
      this.lod = true;
      var taskResult = await getTaskInfo(this.taskQuery);
      this.taskInfoList = taskResult.data.records;
      this.taskQuery.total = taskResult.data.total;
      this.lod = false;
    },
    // 规则列表查询
    async getRuleList() {
      this.lod = true;
      var ruleResult = await getRuleInfo(this.ruleQuery);
      this.ruleInfoList = ruleResult.data.records;
      this.ruleQuery.total = ruleResult.data.total;
      this.lod = false;
    },
    // 审批列表查询
    async getApproveList() {
      this.lod = true;
      this.approveQuery.startDate = this.dateArr[0];
      this.approveQuery.endDate = this.dateArr[1];
      var approveResult = await getApproveInfo(this.approveQuery);
      this.approveInfoList = approveResult.data.records;
      this.approveQuery.total = approveResult.data.total;
      this.lod = false;
    },
    // 添加项目窗口
    addProjectDialog() {
      if (this.$refs["projectFrom"] !== undefined) {
        this.$refs["projectFrom"].resetFields();
      }
      this.projectFrom = {};
      this.projectDialogVisible = true;
    },
    // 编辑窗口
    editProjectDialog(row) {
      this.projectFrom = {};
      this.$set(this.projectFrom, "projectName", row.projectName);
      this.$set(this.projectFrom, "projectCode", row.projectCode);
      this.$set(this.projectFrom, "projectDesc", row.projectDesc);
      this.$set(this.projectFrom, "status", row.status);
      this.$set(this.projectFrom, "id", row.id);
      this.projectDialogVisible = true;
    },

    async addProject() {
      this.$refs["projectFrom"].validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append("projectName", this.projectFrom.projectName);
          formData.append("projectCode", this.projectFrom.projectCode);
          formData.append("projectDesc", this.projectFrom.projectDesc);
          // eslint-disable-next-line eqeqeq
          if (this.projectFrom.id) {
            formData.append("id", this.projectFrom.id);
            formData.append("status", this.projectFrom.status);
          }
          // console.log(formData,'res',this.projectFrom);
          // return
          this.ruleLod = true;
          saveProjectInfo(formData)
            .then((res) => {
              this.ruleLod = false;
              // eslint-disable-next-line eqeqeq
              if (res.code === 200) {
                this.projectDialogVisible = false;
                this.$message({
                  message: res.message,
                  type: "success",
                });
              } else {
                this.projectDialogVisible = false;
                this.$message.error(res.message);
              }
              this.getList();
            })
            .catch(() => {
              this.ruleLod = false;
            });
        }
      });
    },
    // 新建任务
    addAlertTask() {
      if (this.$refs["taskFrom"] !== undefined) {
        this.$refs["taskFrom"].resetFields();
      }
      this.taskFrom = {};
      this.$forceUpdate();
      this.taskDialogVisible = true;
    },
    // 新建任务保存
    saveTask() {
      this.$refs["taskFrom"].validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append("taskName", this.taskFrom.taskName);
          formData.append("taskType", this.taskFrom.taskType);
          formData.append("taskDesc", this.taskFrom.taskDesc);
          // eslint-disable-next-line eqeqeq
          if (undefined != this.taskFrom.id) {
            formData.append("id", this.taskFrom.id);
            formData.append("taskStatus", this.taskFrom.taskStatus);
          }
          this.ruleLod = true;
          saveTaskInfo(formData)
            .then((res) => {
              this.ruleLod = false;
              // eslint-disable-next-line eqeqeq
              if (res.code == 200) {
                this.taskDialogVisible = false;
                this.$message({
                  message: res.message,
                  type: "success",
                });
              } else {
                this.taskDialogVisible = false;
                this.$message.error(res.message);
              }
              this.getTaskList();
            })
            .catch(() => {
              this.ruleLod = false;
            });
        }
      });
    },
    eddTaskModel(row) {
      this.taskDialogVisible = true;
      this.$set(this.taskFrom, "taskName", row.taskName);
      this.$set(this.taskFrom, "taskType", row.taskType);
      this.$set(this.taskFrom, "taskDesc", row.taskDesc);
      this.$set(this.taskFrom, "taskStatus", row.taskStatus);
      this.$set(this.taskFrom, "id", row.id);
    },

    // 规则新增窗口
    addRuleModel() {
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
      this.ruleFrom = {};
      this.ruleDialogVisible = true;
      this.getAllTask();
    },

    eddRuleModel(row) {
      this.ruleDialogVisible = true;
      this.ruleFrom = {};
      this.$set(this.ruleFrom, "ruleName", row.ruleName);
      this.$set(this.ruleFrom, "ruleDesc", row.ruleDesc);
      this.$set(this.ruleFrom, "ruleStatus", row.status);
      this.$set(this.ruleFrom, "ruleType", row.ruleType);
      this.$set(this.ruleFrom, "implSql", row.implSql);
      this.$set(this.ruleFrom, "taskType", row.taskType);
      this.getTaskNameList();
      // console.log(row.taskType,'row.taskType');
      // this.$set(this.taskTypeLists,)
      // this.taskTypeLists = [{ id: row.taskId, taskName: row.taskName }]
      this.$set(this.ruleFrom, "taskId", row.taskId);
      this.$set(this.ruleFrom, "id", row.id);
    },
    // 规则保存
    async saveRule() {
      this.$refs["ruleFrom"].validate((valid) => {
        if (valid) {
          if (this.ruleFrom.id == null) {
            this.ruleFrom.status = "1";
          } else {
            this.ruleFrom.status = this.ruleFrom.ruleStatus;
          }
          this.ruleLod=true
          saveRuleInfo(this.ruleFrom).then((res) => {
            this.ruleLod=false
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.ruleDialogVisible = false;
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.ruleDialogVisible = false;
              this.$message.error(res.message);
            }
            this.getRuleList();
          }).catch(()=>{
            this.ruleLod=false
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 审批页面
    approveMainView(row) {
      console.log(row);

      if (row.type === "项目") {
        this.approveProjectDialogVisible = true;
        this.projectFrom = {};
        this.$set(this.projectFrom, "projectName", row.name);
        this.$set(this.projectFrom, "projectCode", row.projectCode);
        this.$set(this.projectFrom, "projectDesc", row.orDesc);
        this.$set(this.projectFrom, "status", row.status);
        this.$set(this.projectFrom, "id", row.id);
      } else if (row.type === "任务") {
        this.approveTaskDialogVisible = true;
        this.taskFrom = {};
        this.$set(this.taskFrom, "taskName", row.name);
        this.$set(this.taskFrom, "taskType", row.taskType);
        this.$set(this.taskFrom, "taskDesc", row.orDesc);
        this.$set(this.taskFrom, "taskStatus", row.status);
        this.$set(this.taskFrom, "id", row.id);
      } else if (row.type === "规则") {
        this.approveRuleDialogVisible = true;
        this.ruleFrom = {};
        this.$set(this.ruleFrom, "ruleName", row.name);
        this.$set(this.ruleFrom, "ruleDesc", row.orDesc);
        this.$set(this.ruleFrom, "ruleStatus", row.status);
        this.$set(this.ruleFrom, "ruleType", row.ruleType);
        this.$set(this.ruleFrom, "implSql", row.implSql);
        this.$set(this.ruleFrom, "taskType", row.taskType);
        this.taskTypeLists = [{ id: row.taskId, taskName: row.taskName }];
        this.$set(this.ruleFrom, "taskId", row.taskId);
        this.$set(this.ruleFrom, "id", row.id);
      }
    },
    approveSuccess(id) {
      const formData = new FormData();
      formData.append("id", id);
      approveSuccessMethod(formData).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          this.approveProjectDialogVisible = false;
          this.approveTaskDialogVisible = false;
          this.approveRuleDialogVisible = false;
          this.$message({
            message: res.message,
            type: "success",
          });
        } else {
          this.approveProjectDialogVisible = false;
          this.approveTaskDialogVisible = false;
          this.approveRuleDialogVisible = false;
          this.$message.error(res.message);
        }
        this.getApproveList();
      });
    },
    approveFailed(id) {
      const formData = new FormData();
      formData.append("id", id);
      approveFailedMethod(formData).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          this.approveProjectDialogVisible = false;
          this.approveTaskDialogVisible = false;
          this.approveRuleDialogVisible = false;
          this.$message({
            message: res.message,
            type: "success",
          });
        } else {
          this.approveProjectDialogVisible = false;
          this.approveTaskDialogVisible = false;
          this.approveRuleDialogVisible = false;
          this.$message.error(res.message);
        }
        this.getApproveList();
      });
    },

    // 获取任务下拉列表
    getAllTask() {
      getAllTask().then((res) => {
        this.taskList = res.data;
        this.ish = false;
      });
    },
    async getTaskNameList() {
      const taskTypeListsResult = await getTaskNameList({
        taskType: this.ruleFrom.taskType,
      });
      this.taskTypeLists = taskTypeListsResult.data;
      this.ruleFrom.taskId = taskTypeListsResult.data[0].id;
    },
    taskChange() {
      this.$forceUpdate();
    },
    change() {
      this.ruleFrom.taskId = {};
      this.getTaskNameList();
    },
    deleteProject(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const formData = new FormData();
          formData.append("id", id);
          deleteProject(formData).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.$message.error(res.message);
            }
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

    deleteTaskById(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const formData = new FormData();
          formData.append("id", id);
          deleteTask(formData).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.$message.error(res.message);
            }
            this.getTaskList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },

    deleteRuleById(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const formData = new FormData();
          formData.append("id", id);
          deleteRule(formData).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.$message.error(res.message);
            }
            this.getRuleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },

    revoke(id) {
      this.$confirm("确认撤销吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const formData = new FormData();
          formData.append("id", id);
          // console.log(id);
          revoke(formData).then((res) => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success",
              });
            } else {
              this.$message.error(res.message);
            }
            this.getApproveList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },

    // 选择日期时获取日期数据
    handleDate(e) {
      this.$nextTick(() => {
        if (e == null) {
          this.dateArr = [];
        } else {
          this.$set(this, "dateArr", [e[0], e[1]]);
        }
      });
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
