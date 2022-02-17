<template>
  <div class="cust">
    <el-row>
      <el-col :span="3">
        <div class="slets">
          <span>策略名称:</span>
          <el-input
            v-model="listdataquery.name"
            size="mini"
            style="width: 95px"
            placeholder="无"
            clearable
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="slets">
          <span>所属项目:</span>
          <el-select
            v-model="listdataquery.projectId"
            size="mini"
            style="width: 150px"
            placeholder="不限"
            clearable
          >
            <el-option label="规则创建" :value="1" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="slets">
          <span>策略类型:</span>
          <el-select
            v-model="listdataquery.type"
            size="mini"
            style="width: 95px"
            placeholder="不限"
            clearable
          >
            <el-option label="提额" :value="1" />
            <el-option label="降额" :value="2" />
            <el-option label="提价" :value="3" />
            <el-option label="降价" :value="4" />
            <el-option label="冻结" :value="5" />
            <el-option label="清退" :value="6" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="slets">
          <span>策略状态:</span>
          <el-select
            v-model="listdataquery.isEnable"
            size="mini"
            style="width: 90px"
            placeholder="不限"
            clearable
          >
            <el-option label="启用中" :value="1" />
            <el-option label="已停用" :value="0" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" class="green" @click="getList">查询</el-button>
      </el-col>
      <el-col :span="9">
        <div class="lastslet">
          <el-checkbox-group v-model="createUserId" @change="checkboxmi">
            <el-checkbox true-label="1" false-label="0" label="仅我创建" />
          </el-checkbox-group>
          <el-input
            v-model="listdataquery.createUserName"
            placeholder="搜索创建者"
            size="mini"
            class="such"
            clearable
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
          <el-button size="mini" @click="createusergroupsh">创建</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="table">
      <el-table
        :data="strategyList"
        :header-cell-style="{
          'font-size': '12px',
          'font-weight': 'normal',
          color: '#000',
          background: 'rgb(238,241,246)',
        }"
        :cell-style="{ 'font-size': '12px' }"
      >
        <el-table-column
          label="策略名称"
          align="center"
          width="120"
          prop="name"
        />
        <el-table-column label="所属项目" align="center" prop="projectName" />
        <el-table-column label="策略类型" align="center" prop="typeValue" />
        <el-table-column label="策略描述" align="center" prop="remark" />
        <el-table-column
          label="发布时间"
          width="150"
          align="center"
          prop="createTime"
        />
        <el-table-column label="发布人" align="center" prop="createUserName" />
        <el-table-column
          label="累计客户数"
          align="center"
          prop="cumulativeCustomer"
        />
        <el-table-column
          label="执行周期"
          align="center"
          prop="executionCycleValue"
        />
        <el-table-column
          label="更新日期"
          width="150"
          align="center"
          prop="modifyTime"
        />
        <el-table-column
          label="操作"
          width="260"
          align="center"
          prop="isEnable"
        >
          <template slot-scope="{ row }">
            <div class="operation">
              <div v-if="row.isEnable == 1" @click="monitoringreport(row.id)">
                <img :src="require('@/assets/icon/u438.svg')" alt="" />
                <span>监控报表</span>
              </div>
              <div v-else class="p2">
                <img :src="require('@/assets/icon/u439.svg')" alt="" />
                <span>监控报表</span>
              </div>
              <div v-if="row.isEnable == 1" @click="startenable(row.id)">
                <a class="step">&bull;</a>
                <span>启/停用</span>
              </div>
              <div v-else @click="stepenable(row.id)">
                <a class="opern">&bull;</a>

                <span>启/停用</span>
              </div>
              <div @click="seeviewreport(row.id)">
                <i
                  class="el-icon-search"
                  style="margin: 0 3px; font-size: 12px"
                />
                <span>查看</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pag">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listdataquery.page"
        :limit.sync="listdataquery.rows"
        @pagination="getList"
      />
    </div>
    <!-- 创建策略第一步 -->
    <el-dialog
      :close-on-click-modal="false"
      title="新建策略"
      :visible.sync="establish"
      @close="establishclose"
    >
      <el-alert
        title="例行策略计算规则中不包含当日数据，当日数据推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div>
        <el-form
          ref="establishfrom"
          :model="establishfromdata"
          :rules="estfromrules"
          label-width="100px"
          style="width: 60%; margin: 20px 0"
        >
          <el-form-item label="策略名称" size="mini" prop="name">
            <el-input
              v-model="establishfromdata.name"
              placeholder="请输入策略名称"
            />
          </el-form-item>
          <el-form-item label="策略描述" size="mini" prop="remark">
            <el-input
              v-model="establishfromdata.remark"
              placeholder="请输入策略描述"
            />
          </el-form-item>
          <el-form-item label="所属项目" size="mini" prop="projectId">
            <el-select v-model="establishfromdata.projectId">
              <el-option
                v-for="i in project"
                :key="i.id"
                :label="i.projectName"
                :value="i.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="策略类型" size="mini" prop="type">
            <el-select v-model="establishfromdata.type">
              <el-option label="提额" :value="1" />
              <el-option label="降额" :value="2" />
              <el-option label="提价" :value="3" />
              <el-option label="降价" :value="4" />
              <el-option label="冻结" :value="5" />
              <el-option label="清退" :value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="执行周期" prop="executionCycle">
            <div style="font-size: 12px">
              按
              <el-select
                v-model="establishfromdata.executionCycle"
                size="mini"
                style="width: 120px"
                @change="sletchange"
              >
                <el-option label="天" value="day" />
                <el-option label="周" value="week" />
                <el-option label="月" value="month" />
                <el-option label="自定义" value="custom" />
              </el-select>
              计算 标签每日凌晨更新
              <el-form-item v-if="pickish" prop="customTime">
                <el-date-picker
                  v-if="pickish"
                  v-model="establishfromdata.customTime"
                  size="mini"
                  style="width: 200px"
                  type="date"
                  range-separator="-"
                  :picker-options="pickdataoption"
                />
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div style="margin: 0 40px">
          <el-checkbox-group v-model="establishfromdata.isEnable">
            <el-checkbox true-label="1" false-label="0" label="启用监控报表" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="next">
        <el-button size="mini" @click="nextcreate">下一步</el-button>
      </div>
    </el-dialog>
    <!-- 创建策略第二步 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建策略"
      :visible.sync="createpolicish"
      @close="closecreatepolicy"
    >
      <el-alert
        title="策略执行先后按顺序编号依次执行，如当前节点无数据则停止执行策略"
        type="warning"
        show-icon
        :closable="false"
      />
      <div
        v-if="createlod"
        v-loading="true"
        style="position: absolute;width: 95%;left: 2.5%;height: 86%;top:12%"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      ></div>
      <!-- 规则 -->
      <div class="rule">
        <header>规则</header>
        <ul>
          <li v-for="(item, index) in createpolicydata" :key="index">
            <i class="el-icon-close" @click="closelistdata(index)" />
            <div class="title">
              <div>顺序{{ index - 0 + 1 }}</div>
              <div v-if="!item.modelRuleId">
                <i class="icon-green">&bull;</i>
                <span>规则创建</span>
                <el-select
                  v-model="item.modelRuleId"
                  style="width: 140px"
                  size="mini"
                  @change="sletchangrulename(item.modelRuleId, index)"
                >
                  <el-option
                    v-for="i in rulename"
                    :key="i.id"
                    :label="i.ruleName"
                    :value="i.id"
                  />
                </el-select>
              </div>
            </div>
            <div v-if="item.modelRuleId" class="create">
              <i class="icon-green">&bull;</i>
              <span style="width: 75px">{{ item.name }}</span>
              <span>规则创建日期:</span>
              <span
                ><el-date-picker
                  v-model="item.time"
                  size="mini"
                  style="width: 220px"
                  type="daterange"
                  range-separator="-"
                  readonly
              /></span>
              <span>规则创建人:</span>
              <span>
                <el-input
                  v-model="item.cerateUserName"
                  disabled
                  size="mini"
                  style="width: 100px"
                  placeholder=""
                />
              </span>
              <img
                :src="require('@/assets/icon/u507.svg')"
                alt=""
                @click="sortpolicydatalist(index)"
              />
            </div>
            <div v-if="item.modelRuleId" class="describe">
              <span>规则描述:</span>
              <el-input v-model="item.ruleDesc" size="mini" disabled />
            </div>
            <a
              v-if="item.modelRuleId"
              v-show="!item.ish"
              class="base"
              @click="referencevalue(index)"
              >填充基准值</a
            >
            <!-- 建模样本 -->
            <div v-if="item.ish" class="crenodel">
              <i>&bull;</i>
              <span style="width: 68px">建模样本</span>
              <span>总人数</span>
              <el-input
                v-model.number="item.totalNumber"
                placeholder=""
                size="mini"
              />
              <span>通过人数</span>
              <el-input
                v-model.number="item.passedNumber"
                placeholder=""
                size="mini"
              />
              <span>通过率</span>
              <el-input
                :value="modelsample(item.totalNumber, item.passedNumber)"
                placeholder=""
                size="mini"
                disabled
              />
            </div>
          </li>
        </ul>
        <div class="add">
          <el-button size="mini" class="green" @click="addcreatenodelist"
            >新增节点</el-button
          >
        </div>
      </div>
      <!-- 模型 -->
      <div class="cremodel">
        <header>模型</header>
        <div class="model1">
          <span>模型名称</span>
          <el-select
            v-model="modeldata.modelId"
            size="mini"
            placeholder="选择额度模型名称"
            @change="sletchangemodelname"
          >
            <el-option
              v-for="i in modelname"
              :key="i.id"
              :label="i.modelName"
              :value="i.id"
            />
          </el-select>
          <div v-if="modeldata.modelId" :key="'mod1'">
            <span>评分阈值</span>
            <el-input
              v-model.number="modeldata.source"
              size="mini"
              placeholder=""
            />
            <span>模型创建人</span>
            <el-input
              v-model="modeldata.createUserName"
              size="mini"
              disabled
              placeholder=""
            />
          </div>
        </div>
        <div v-if="modeldata.modelId" :key="'mod2'" class="mod2">
          <span>模型描述</span>
          <el-input
            v-model="modeldata.remark"
            size="mini"
            placeholder=""
            disabled
          />
        </div>
        <div
          v-if="modeldata.modelId"
          v-show="!sampledataish"
          :key="'mod3'"
          class="mod3"
          @click="fillsampledataish"
        >
          填充样本数据
        </div>
        <div v-if="sampledataish" :key="'mod4'" class="mod4">
          <i>&bull;</i>
          <span>建模样本</span>
          <span>样本总人数</span>
          <el-input
            v-model.number="modeldata.totolNumber"
            style="width: 80px"
            size="mini"
            placeholder=""
          />
        </div>
        <ul v-if="sampledataish" :key="'mod5'" class="mod5">
          <li v-for="(i, m) in modelinterval" :key="m">
            <div>
              <span>评分区间{{ m - 0 + 1 }}</span>
              <span>[ </span>
              <el-input
                v-model="i.startScore"
                style="width: 60px"
                size="mini"
                :disabled="i.k1ish"
                placeholder=""
              />

              <el-input
                v-model.number="i.endScore"
                style="width: 60px"
                size="mini"
                :disabled="i.k2ish"
                placeholder=""
                @blur="modelqendScore(i.endScore, m, i.startScore)"
              /><span>]</span>
            </div>
            <div>
              <span>区间总人数</span>
              <el-input
                v-model.number="i.intervalNumber"
                style="width: 60px"
                size="mini"
                placeholder=""
              />
            </div>
            <div>
              <span>占比</span>
              <el-input
                style="width: 80px"
                size="mini"
                :value="modelsample(modeldata.totolNumber, i.intervalNumber)"
                :disabled="i.k4ish"
                placeholder=""
              />
            </div>
          </li>
          <li>
            <el-button size="mini" type="primary" @click="increaseinterval"
              >增加区间</el-button
            >
          </li>
        </ul>
      </div>
      <!-- 额度 -->
      <div class="quota">
        <header>额度</header>
        <ul class="quota-scor size">
          <li v-for="(i, m) in quotamockdata" :key="m">
            <div>评分区间{{ m - 0 + 1 }}:</div>
            <a>[</a>
            <div class="mod6">
              <el-input
                v-model="i.startScore"
                :disabled="i.k1ish"
                size="mini"
                style="width: 56px"
                placeholder=""
              />
              <el-input
                v-model.number="i.endScore"
                :disabled="i.k2ish"
                size="mini"
                style="width: 56px"
                placeholder=""
                @blur="sectionqendScore(i.endScore, m, i.startScore)"
              />
            </div>
            <a>]</a>
            <span>额度为</span>
            <a>{</a>
            <div class="mod6">
              <el-select
                v-model="i.currentCredit"
                placeholder=""
                size="mini"
                style="width: 120px"
              >
                <el-option label="当前授信额度" :value="1" />
              </el-select>
              <el-select
                v-model="i.computingMethod"
                class="operation"
                placeholder=""
                size="mini"
                style="width: 50px"
              >
                <el-option label="x" value="ride" />
                <el-option label="÷" value="divide" />
                <el-option label="+" value="add" />
                <el-option label="-" value="reduce" />
              </el-select>
              <el-input
                v-model="i.computingCoefficient"
                size="mini"
                style="width: 50px"
                placeholder=""
              />
              <span class="sep">,</span>
              <el-input
                v-model.number="i.removeAmount"
                style="width: 55px"
                size="mini"
                placeholder=""
              />
            </div>
            <a>}</a>
            <div>
              <el-select
                v-model="i.valueType"
                style="width: 60px; margin: 0 2px"
                size="mini"
                placeholder=""
              >
                <el-option label="min" value="min" />
                <el-option label="max" value="max" />
              </el-select>
            </div>
            <i class="el-icon-close" @click="closesection(m)" />
          </li>
          <li class="add-section">
            <el-button class="green" size="mini" @click="addsection"
              >增加区间</el-button
            >
          </li>
        </ul>
      </div>
      <div class="foot">
        <a @click="cancelcreation">取消</a>
        <el-button class="green" size="mini" @click="createstrategy"
          >完成创建</el-button
        >
      </div>
      
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
import Pagination from "@/components/Pagination";
import {
  strategyfindListByPage,
  updateIsEnable,
  addstrategy,
} from "@/api/policymanagement";
import { rulefindListByPage, findListByPage } from "@/api/policymanagement";
import { getAllProject } from "@/api/projectInfo";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      createlod:false,
      lod: false,
      // 额度
      quotamockdata: [
        {
          startScore: 0,
          endScore: "",
          currentCredit: 1,
          valueType: "min",
          computingMethod: "add",
          computingCoefficient: 0.6,
          removeAmount: 10000,
          k1ish: true,
          k2ish: false,
        },
        {
          startScore: "",
          endScore: "",
          currentCredit: 1,
          valueType: "min",
          computingMethod: "add",
          computingCoefficient: 0.6,
          removeAmount: 10000,
          k1ish: true,
          k2ish: true,
        },
        {
          startScore: "",
          endScore: "",
          currentCredit: 1,
          valueType: "min",
          computingMethod: "add",
          computingCoefficient: 0.6,
          removeAmount: 10000,
          k1ish: true,
          k2ish: true,
        },
      ],
      // 额度
      total: 0,
      createUserId: "",
      listdataquery: {
        name: "",
        projectId: "",
        type: "",
        isEnable: "",
        createUserName: "",
        createUserId: "",
        page: 1,
        rows: 10,
      },
      strategyList: [],
      // ++++++++++++++++++++
      // 创建
      establish: false,
      // 项目下拉框
      project: [],
      // 创建表单数据
      estfromrules: {
        // 第一步表单--0k
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        remark: [{ required: true, message: "不能为空", trigger: "blur" }],
        projectId: [{ required: true, message: "不能为空", trigger: "change" }],
        type: [{ required: true, message: "不能为空", trigger: "change" }],
        executionCycle: [
          { required: true, message: "不能为空", trigger: "change" },
        ],
        customTime: [
          { required: true, message: "不能为空", trigger: "change" },
        ],
        // 第一步表单--0k
      },
      establishfromdata: {
        // 第一步表单--0k
        name: "",
        remark: "",
        projectId: "",
        type: 1,
        executionCycle: "day",
        customTime: "",
        isEnable: 0,
        // 第一步表单--0k
        // 规则
        ruleConfigs: [],
        // 额度
        quotaConfigs: [],
        // 模型
        modelConfigs: {},
      },
      // 时间限制
      pickdataoption: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      // 按自定义下拉框
      pickish: false,
      // //创建第二步
      // 获取规则名称
      rulename: [],
      // 获取模型名称
      modelname: [],
      createpolicish: false,
      // /////第二步数据-规则
      // 规则顺序
      createpolicydata: [
        {
          name: "",
          modelRuleId: "",
          time: [],
          ruleDesc: "",
          cerateUserName: "",
          totalNumber: "",
          passedNumber: "",
          ish: false,
          createTime: "",
          modifyTime: "",
        },
      ],
      // 第二步数据-规则
      // 填充基准值
      fillbasevalue: false,
      // //创建第二步
      // 创建
      // 模型数据
      modeldata: {
        modelId: "",
        createTime: "",
        modelSampleConfigs: [],
        modifyTime: "",
        source: "",
        createUserName: "",
        remark: "",
        totolNumber: "",
      },
      // 模型区间
      modelinterval: [
        {
          startScore: 0,
          endScore: "",
          intervalNumber: "",
          proportion: "",
          k1ish: true,
          k2ish: false,
          k4ish: true,
        },
        {
          startScore: "",
          endScore: "",
          intervalNumber: "",
          proportion: "",
          k1ish: true,
          k2ish: true,
          k4ish: true,
        },
        {
          startScore: "",
          endScore: "",
          intervalNumber: "",
          proportion: "",
          k1ish: true,
          k2ish: true,
          k4ish: true,
        },
      ],
      sampledataish: false,
    };
  },
  computed: {
    modelsample() {
      return (totalval, sectionval) => {
        if (!totalval || totalval == 0 || totalval == "") {
          return "";
        }
        return ((sectionval / totalval) * 100).toFixed(2) + "%";
      };
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 报表页面
    async getList() {
      this.lod = true;
      const { data } = await strategyfindListByPage(this.listdataquery);
      this.lod = false;
      this.total = data.total;
      this.strategyList = data.records;
    },
    // 仅我
    checkboxmi(v) {
      console.log(v);
      if (v == "1") {
        this.listdataquery.createUserId = JSON.parse(
          window.sessionStorage.getItem("sessionUser")
        ).userId;
      } else {
        this.listdataquery.createUserId = null;
      }
    },
    // 启停用
    startenable(id) {
      this.$confirm("确认停用该策略吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await updateIsEnable({ id: id, isEnable: 0 });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.getList();
        })
        .catch((err) => {});
    },
    // 启停用
    stepenable(id) {
      this.$confirm("确认启用该策略吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await updateIsEnable({ id: id, isEnable: 1 });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.getList();
        })
        .catch((err) => {});
    },
    // 创建弹框
    async createusergroupsh() {
      if (this.project.length == 0) {
        this.lod = true;
        const { data } = await getAllProject();
        this.lod = false;
        this.project = data;
      }
      this.establish = true;
    },
    // -----------------------------------------
    // 天、月...下拉框
    sletchange() {
      if (this.establishfromdata.executionCycle == "custom") {
        this.pickish = true;
      } else {
        this.pickish = false;
      }
    },
    // 下一步表单验证
    nextcreate() {
      this.$refs["establishfrom"].validate(async (v) => {
        if (v) {
          this.establishfromdata;
          if (this.rulename.length == 0) {
            this.lod = true;
            const { data } = await rulefindListByPage({ rows: 9999, page: 1 });
            this.rulename = data.records;
          }
          if (this.modelname.length == 0) {
            this.lod = true;
            const { data } = await findListByPage({ rows: 9999, page: 1 });
            this.modelname = data.records;
          }
          this.lod = false;
          this.createpolicish = true;
        }
      });
    },
    // 选择规则名称
    sletchangrulename(id, index) {
      this.rulename.forEach((i) => {
        if (i.id == id) {
          this.$set(this.createpolicydata[index], "name", i.ruleName);
          this.$set(this.createpolicydata[index], "time", [
            i.createTime,
            i.modifyTime,
          ]);

          this.$set(this.createpolicydata[index], "createTime", i.createTime);
          this.$set(this.createpolicydata[index], "modifyTime", i.modifyTime);
          this.$set(this.createpolicydata[index], "ruleDesc", i.ruleDesc);
        }
      });
    },
    // 删除节点
    closelistdata(v) {
      this.createpolicydata.splice(v, 1);
    },
    // 新增节点
    addcreatenodelist() {
      this.createpolicydata.push({
        name: "",
        modelRuleId: "",
        time: [],
        ruleDesc: "",
        cerateUserName: "",
        totalNumber: "",
        passedNumber: "",
        ish: false,
        createTime: "",
        modifyTime: "",
      });
    },
    // 排序上移一位
    sortpolicydatalist(v) {
      if (v <= 0) {
        return;
      }
      const a = this.createpolicydata[v];
      this.createpolicydata[v] = this.createpolicydata[v - 1];
      this.$set(this.createpolicydata, v, this.createpolicydata[v - 1]);
      this.$set(this.createpolicydata, v - 1, a);
    },
    // 填充基准值
    referencevalue(v) {
      this.createpolicydata[v].ish = true;
    },
    // ---ok
    // 模型名称
    sletchangemodelname(value) {
      console.log(value);
      this.modelname.forEach((i) => {
        if (value == i.id) {
          this.modeldata.createTime = i.createTime;
          this.modeldata.modifyTime = i.modifyTime;
          this.modeldata.createUserName = i.createUserName;
          this.modeldata.remark = i.remark;
        }
      });
    },
    // 模型区间
    modelqendScore(val, bol, statervalue) {
      if (val < statervalue || val == "-" || isNaN(val)) {
        this.$message.error("结束分数一定要比开始分数大");
        if (this.modelinterval[bol + 1]) {
          this.modelinterval[bol + 1].k2ish = true;
        }
        this.modelinterval[bol].endScore = "";
        return;
      }
      if (this.modelinterval[bol + 1]) {
        if (val) {
          this.modelinterval[bol + 1].k2ish = false;
          this.modelinterval[bol + 1].startScore = val;
        } else {
          this.modelinterval[bol + 1].k2ish = true;
        }
      }
    },
    increaseinterval() {
      const endval = this.modelinterval[this.modelinterval.length - 1].endScore;
      if (endval) {
        this.modelinterval.push({
          startScore: endval,
          endScore: "",
          intervalNumber: "",
          proportion: "",
          k1ish: true,
          k2ish: false,
          k4ish: true,
        });
      } else {
        this.modelinterval.push({
          startScore: "",
          endScore: "",
          intervalNumber: "",
          proportion: "",
          k1ish: true,
          k2ish: true,
          k4ish: true,
        });
      }
    },

    sectionqendScore(val, bol, statervalue) {
      if (val - 0 < statervalue - 0 || val == "-" || isNaN(val - 0)) {
        this.$message.error("结束分数一定要比开始分数大");
        if (this.quotamockdata[bol + 1]) {
          this.quotamockdata[bol + 1].k2ish = true;
        }
        this.quotamockdata[bol].endScore = "";
        return;
      }
      if (this.quotamockdata[bol + 1]) {
        if (val) {
          this.quotamockdata[bol + 1].k2ish = false;
          this.quotamockdata[bol + 1].startScore = val;
        } else {
          this.quotamockdata[bol + 1].k2ish = true;
        }
      }
    },
    // 增加额度区间
    addsection() {
      const endval = this.quotamockdata[this.quotamockdata.length - 1].endScore;
      if (endval) {
        this.quotamockdata.push({
          startScore: endval,
          endScore: "",
          currentCredit: 1,
          valueType: "min",
          computingMethod: "add",
          computingCoefficient: 0.6,
          removeAmount: 10000,
          k1ish: true,
          k2ish: false,
        });
      } else {
        this.quotamockdata.push({
          startScore: "",
          endScore: "",
          currentCredit: 1,
          valueType: "min",
          computingMethod: "add",
          computingCoefficient: 0.6,
          removeAmount: 10000,
          k1ish: true,
          k2ish: true,
        });
      }
    },
    // 删除额度区间
    closesection(v) {
      const startval = this.quotamockdata[v + 1];
      if (startval && v != 0) {
        startval.startScore = this.quotamockdata[v - 1].endScore;
        startval.endScore = "";
      }
      this.quotamockdata.splice(v, 1);
    },
    fillsampledataish() {
      this.sampledataish = true;
    },
    cancelcreation() {
      this.createpolicish = false;
    },
    // 关闭窗口，重置数据
    closecreatepolicy() {
      // 重置数据
      this.quotamockdata = this.$options.data().quotamockdata;
      this.modeldata = this.$options.data().modeldata;
      this.createpolicydata = this.$options.data().createpolicydata;
      this.modelinterval = this.$options.data().modelinterval;
      this.createpolicydata = this.$options.data().createpolicydata;
    },
    // 重置表单
    establishclose() {
      if (this.$refs["establishfrom"] !== undefined) {
        this.$refs["establishfrom"].resetFields();
      }
    },
    // 数据处理
    dataprocessing() {
      console.log(this.createpolicydata, this.modelinterval);
      this.modeldata.modelSampleConfigs = [];
      this.modelinterval.forEach((item) => {
        this.modeldata.modelSampleConfigs.push({
          totolNumber: this.modeldata.totolNumber,
          startScore: item.startScore,
          endScore: item.endScore,
          intervalNumber: item.intervalNumber,
        });
      });

      for (let i = this.createpolicydata.length; i >= 0; i--) {
        if (this.createpolicydata[i]) {
          if (
            !this.createpolicydata[i].modelRuleId ||
            this.createpolicydata[i].modelRuleId == ""
          ) {
            this.createpolicydata.splice(i, 1);
          }
        }
      }
      this.establishfromdata.ruleConfigs = this.createpolicydata;
      this.establishfromdata.ruleConfigs.forEach((item, index) => {
        item["sortNumber"] = index + 1;
      });
      this.establishfromdata.modelConfigs = this.modeldata;
      this.establishfromdata.quotaConfigs = this.quotamockdata;
      console.log(this.establishfromdata);
    },
    // 创建
    async createstrategy() {
      this.dataprocessing();
      this.createlod = true;
      const res = await addstrategy(this.establishfromdata).catch(()=>{
        this.createlod = false;
      });
      if (res.code !== 200) {
        this.createlod = false;
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.createpolicish = false;
      this.establish = false;
      this.createlod = false;
      this.getList();
    },
    // 监控报表
    monitoringreport(id) {
      this.$router.push({ name: "monitoringreport", query: { id: id } });
    },
    // 查看明细
    seeviewreport(id) {
      this.$router.push({ name: "seeviewreport", query: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.mod5 {
  li:last-child {
    float: right;
    margin-right: 25%;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      margin: 0 3px;
    }
  }
  margin-left: 20px;
}
.mod5 > li > div {
  margin-right: 20px;
}
.mod4 {
  display: flex;
  align-items: center;
  margin-left: 20px;
  span {
    margin: 0 5px;
  }
  i {
    font-size: 35px;
    color: rgb(2, 167, 240);
  }
}
.quota {
  width: 95%;
  margin: 20px auto;
  border: 1px solid rgb(223, 223, 223);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  font-size: 12px;
  header {
    margin: 10px;
    display: flex;
  }
  .quota-scor {
    width: 100%;
    li {
      width: 100%;
      margin: 10px 0;
      display: flex;
      align-items: center;
      span {
        margin: 0 2px;
      }
      .el-icon-close {
        cursor: pointer;
        background-color: rgb(76, 205, 105);
        color: #fff;
      }
    }
  }
}
.add-section {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.size {
  a {
    height: 30px;
    line-height: 35px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
}
.mod6 {
  display: flex;
  .el-input {
    margin: 0 4px;
  }
  .el-select {
    margin: 0 4px;
  }
}
.sep {
  transform: translateY(10px);
}
::v-deep {
  .quota-scor {
    .el-input__inner {
      padding: 5px !important;
      margin: 0 !important;
    }
  }
}
::v-deep {
  .operation {
    .el-input__inner {
      font-size: 20px;
    }
  }
}
.cremodel {
  width: 95%;
  margin: 20px auto;
  border: 1px solid rgb(223, 223, 223);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  font-size: 12px;
  .model1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 20px;
    div {
      display: flex;
      align-items: center;
      span {
        margin: 0 5px 0 30px;
      }
      .el-input {
        width: 80px;
      }
    }
  }
  .mod3 {
    width: 100%;
    text-align: right;
    font-size: 14px;
    padding-right: 60px;
    color: rgb(2, 167, 240);
    cursor: pointer;
  }
  .mod2 {
    display: flex;
    margin: 10px 0 10px 20px;
    align-items: center;

    .el-input {
      width: 82.75%;
    }
  }
  header {
    margin: 10px;
    display: flex;
  }
}
.add {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}

.rule {
  width: 95%;
  height: 450px;
  margin: 20px auto;
  border: 1px solid rgb(223, 223, 223);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  font-size: 12px;
  header {
    margin: 10px;
    display: flex;
  }
  ul {
    width: 100%;
    li {
      margin-bottom: 10px;
      padding: 6px;
      position: relative;
      border: 1px solid rgb(223, 223, 223);
      .el-icon-close {
        position: absolute;
        right: 10px;
        top: 6px;
        color: #fff;
        background-color: rgb(76, 205, 105);
        cursor: pointer;
      }
      .crenodel {
        display: flex;
        align-items: center;
        margin: 20px 0 10px 0;
        span {
          margin: 0 3px;
        }
        span:nth-child(n + 3) {
          margin-left: 10px;
        }
        i {
          font-size: 26px;
          color: rgb(2, 167, 240);
          margin: 0 3px;
        }
        .el-input {
          width: 80px;
        }
      }
    }
  }
}
.base {
  position: absolute;
  right: 12%;
  top: 70px;
  color: rgb(2, 167, 240);
  font-size: 13px;
}
.describe {
  display: flex;
  align-items: center;
  margin: 6px 124px;
  .el-input {
    width: 220px;
    margin: 0 5px;
  }
}
.title {
  display: flex;
  align-items: center;
  div {
    margin-right: 10px;
    display: flex;
    align-items: center;
    span {
      margin: 0 5px;
    }
  }
}
.icon-green {
  font-size: 26px;
  color: rgb(76, 205, 105);
  margin: 0 3px;
}
.create {
  display: flex;
  align-items: center;
  img {
    margin: 0 10px;
    cursor: pointer;
  }
  span {
    margin: 0 3px;
  }
}
.next {
  width: 100%;
  margin: 100px 0 0 0;
  padding: 10px 0 10px 0;
  border-top: 1px solid rgb(204, 204, 204);
  .el-button {
    float: right;
    background-color: rgb(80, 205, 152);
    color: #fff;
  }
}
::v-deep {
  .el-form-item__label {
    font-size: 12px;
    font-weight: 500;
  }
}
.slets {
  display: flex;
  font-size: 12px;
  align-items: center;
  span {
    margin-right: 6px;
  }
}
.el-icon-search::before {
  font-size: 12px !important;
  margin: 0 3px !important;
}
.operation {
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-right: 10px;
  }

  .p2 {
    cursor: no-drop;
  }
  span {
    margin: 0 3px;
  }

  a {
    font-size: 36px;
  }
}

.opern {
  color: rgb(76, 205, 105);
}
.step {
  color: rgb(245, 154, 35);
}
::v-deep .el-alert__title {
  color: rgb(127, 127, 127);
}
::v-deep {
  .steps {
    margin: 20px 0;
    width: 100%;
    .el-steps {
      width: 50%;
      margin: 0 auto;
    }
    .el-step__title {
      font-size: 12px !important;
      color: #000 !important;
      font-weight: normal;
    }
    .el-step__head.is-finish {
      color: #fff !important;
      .el-step__icon,
      .is-text {
        border: 0;
        background-color: rgb(71, 203, 149);
      }
    }
    .el-step__head.is-process {
      color: rgb(204, 204, 204) !important;
      .el-step__icon,
      .is-text {
        border: 2px solid rgb(204, 204, 204);
      }
    }
  }
}
::v-deep {
  .el-pagination.is-background .el-pager li:not(.disabled) {
    background-color: #fff; // 进行修改未选中背景和字体
    border-radius: 3px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(76, 205, 105); // 进行修改选中项背景和字体
    color: #fff;
    border-radius: 3px;
  }
}
.pag {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.table {
  min-height: 400px;
  margin-top: 20px;
}
.tab-people {
  div {
    display: flex;
    justify-content: center;
  }
  i {
    font-size: 30px;
    margin: 0 3px;
    color: rgb(76, 205, 105);
  }
}
.tab-group {
  .el-icon-success {
    color: rgb(71, 203, 149);
  }
  span {
    color: rgb(1, 142, 202);
  }
}
.tab-col-icon {
  cursor: pointer;
  i {
    margin: 0 3px;
  }
}
.such {
  width: 180px;
  margin: 0 10px;
}

.lastslet {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-button {
    background-color: rgb(80, 205, 152);
    color: #fff;
  }
}
.cust {
  padding: 20px;
}

::v-deep .el-dialog {
  margin-bottom: 200px;
}
.green {
  background-color: rgb(80, 205, 152);
  color: #fff;
  border: 0;
}
.foot {
  margin: 0 auto;
  width: 95%;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
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
