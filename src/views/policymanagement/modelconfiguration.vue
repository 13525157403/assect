<template>
  <div class="cust">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <!-- -------------------模型------------------------------------ -->
      <el-tab-pane label="模型" name="model">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-input
              v-model="modelquery.name"
              size="mini"
              placeholder="模型名称"
              clearable
            />
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="dataValue1"
              size="mini"
              style="width: 360px"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="changedatavalue1"
            />
          </el-col>
          <el-col :span="3">
            <el-select
              v-model="modelquery.modelType"
              placeholder="模型类型"
              size="mini"
              clearable
            >
              <el-option label="提额" :value="1" />
              <el-option label="降额" :value="2" />
              <el-option label="提价" :value="3" />
              <el-option label="降价" :value="4" />
              <el-option label="冻结" :value="5" />
              <el-option label="清退" :value="6" />
            </el-select>
          </el-col>
          <el-col :span="11">
            <div class="right">
              <el-button type="primary" size="mini" @click="querygetlist1"
                >查询</el-button
              >
              <el-button type="primary" size="mini" @click="newcreatemodel"
                >新建模型</el-button
              >
            </div>
          </el-col>
        </el-row>
        <div class="table">
          <el-table
            :data="modeldata"
            :header-cell-style="{
              'background-color': 'rgb(70,183,173)',
              color: '#fff',
            }"
          >
            <el-table-column
              width="150"
              align="center"
              label="模型名称"
              prop="modelName"
            />
            <el-table-column
              width="150"
              align="center"
              label="模型类型"
              prop="modelType"
            >
              <template slot-scope="{ row }">
                <div>
                  <a
                    v-for="(i, m) in modeltype"
                    v-show="row.modelType == m + 1"
                    :key="m"
                    >{{ i }}</a
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="480"
              align="center"
              label="模型描述"
              prop="remark"
            />
            <el-table-column
              align="center"
              label="创建人"
              prop="createUserName"
            />
            <el-table-column
              width="200"
              align="center"
              label="创建日期"
              prop="createTime"
            />
            <el-table-column align="center" label="操作" prop="f">
              <template slot-scope="{ row }">
                <div class="oper">
                  <a @click="seemoldingparameters(row.id)">查看</a>
                  <a @click="findListByPagedelete(row.id)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pag">
          <pagination
            v-show="total1 > 0"
            :total="total1"
            :page.sync="modelquery.page"
            :limit.sync="modelquery.rows"
            @pagination="getList1"
          />
        </div>
      </el-tab-pane>
      <!-- -------------------模型------------------------------------ -->
      <!-- -------------------规则------------------------------------ -->
      <el-tab-pane label="规则" name="rule">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-input
              v-model="rulequery.ruleIdAndName"
              size="mini"
              placeholder="任务id/名称"
              clearable
            />
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="dataValue2"
              size="mini"
              style="width: 360px"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              @change="changedatavalue2"
            />
          </el-col>
          <!-- <el-col :span="3">
            <el-select
              v-model="rulequery.status"
              placeholder="规则状态"
              size="mini"
              clearable
            >
              <el-option label="有效" :value="1"></el-option>
              <el-option label="无效" :value="2"></el-option>
            </el-select>
          </el-col> -->
          <el-col :span="14">
            <div class="right">
              <el-button type="primary" size="mini" @click="getList2(true)"
                >查询</el-button
              >
              <el-button type="primary" size="mini" @click="newrule = true"
                >新建规则</el-button
              >
            </div>
          </el-col>
        </el-row>
        <div class="table">
          <el-table
            :data="ruledata2"
            :header-cell-style="{
              'background-color': 'rgb(70,183,173)',
              color: '#fff',
            }"
          >
            <el-table-column
              type="index"
              width="100"
              align="center"
              label="序号"
              prop="a"
            />
            <el-table-column width="300" label="规则名称" prop="ruleName" />
            <el-table-column width="380" label="规则描述" prop="ruleDesc" />
            <!-- <el-table-column align="center" label="规则状态" prop="status">
              <template slot-scope="{ row }">
                <div>
                  {{ row.status == 1 ? "有效" : "无效" }}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column
              width="180"
              align="center"
              label="创建时间"
              prop="createTime"
            />
            <el-table-column align="center" label="操作" prop="f">
              <template slot-scope="{ row }">
                <div class="oper">
                  <a @click="modifyrules(row)">修改</a>
                  <a @click="deleterule(row.id)">删除</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pag">
          <pagination
            v-show="total2 > 0"
            :total="total2"
            :page.sync="rulequery.page"
            :limit.sync="rulequery.rows"
            @pagination="getList2"
          />
        </div>
      </el-tab-pane>
      <!-- -------------------规则------------------------------------ -->
      <el-tab-pane label="参数" name="parameter">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-input
              v-model="parameterquery.name"
              size="mini"
              placeholder="变量名称"
              clearable
            />
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="dataValue3"
              size="mini"
              style="width: 340px"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              @change="changedatavalue3"
            />
          </el-col>

          <el-col :span="14">
            <div class="right">
              <el-button type="primary" size="mini" @click="getList3(true)"
                >查询</el-button
              >
              <el-button type="primary" size="mini" @click="newparameter = true"
                >新建参数</el-button
              >
            </div>
          </el-col>
        </el-row>
        <div class="table">
          <el-table
            :data="parameterdata3"
            :header-cell-style="{
              'background-color': 'rgb(70,183,173)',
              color: '#fff',
            }"
            :cell-style="{ 'font-size': '12px' }"
          >
            <el-table-column width="260" label="变量名称" prop="name" />
            <el-table-column width="280" label="变量含义" prop="meaning" />
            <el-table-column width="420" label="变量描述" prop="modelDesc" />
            <el-table-column
              align="center"
              label="创建日期"
              prop="createTime"
            />
            <el-table-column
              align="center"
              label="创建人"
              prop="createUserName"
            />
          </el-table>
        </div>
        <div class="pag">
          <pagination
            v-show="total3 > 0"
            :total="total3"
            :page.sync="parameterquery.page"
            :limit.sync="parameterquery.rows"
            @pagination="getList3(true)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 新建模型 -->
    <el-dialog
      title="新建模型"
      :close-on-click-modal="false"
      :visible.sync="newmodel"
      @close="cancel"
    >
      <el-form
        ref="modelfrom"
        :model="modelfrom"
        label-width="120px"
        style="width: 80%"
        size="mini"
        :rules="modelfromrule"
      >
        <el-form-item label="输入模型名称" prop="modelFileName">
          <el-input
            v-model="modelfrom.modelFileName"
            placeholder="请输入模型名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="模型类型" prop="modelType">
          <el-select v-model="modelfrom.modelType">
            <el-option label="提额" :value="1" />
            <el-option label="降额" :value="2" />
            <el-option label="提价" :value="3" />
            <el-option label="降价" :value="4" />
            <el-option label="冻结" :value="5" />
            <el-option label="清退" :value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="模型执行类型" prop="executionType">
          <el-select v-model="modelfrom.executionType">
            <el-option label="执行模型文件" value="file" />
            <el-option label="自定义代码执行" value="code" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="modelfrom.executionType == 'file'"
          ref="uploadElement"
          prop="fells"
          class="upload-img-form"
          label="文件"
        >
          <el-upload
            ref="upload"
            class="upload-img"
            action="/model-info/uploadFile"
            :on-change="filechange"
            :before-remove="removefile"
            accept=".pmml"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传pmml文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item
          v-if="modelfrom.executionType == 'code'"
          label="自定义代码执行"
          prop="modelCode"
        >
          <el-input
            v-model="modelfrom.modelCode"
            placeholder="自定义代码执行"
          />
        </el-form-item>
        <el-form-item label="请输入模型描述" prop="remark">
          <el-input
            v-model="modelfrom.remark"
            placeholder="模型描述"
            type="textarea"
            clearable
          />
        </el-form-item>
      </el-form>
      <div class="cre">
        <el-button size="mini" type="primary" @click="createnext"
          >下一步</el-button
        >
        <el-button size="mini" type="danger" plain @click="cancel"
          >取消</el-button
        >
      </div>
    </el-dialog>
    <!-- 新建规则 -->
    <el-dialog
      title="新建规则"
      :close-on-click-modal="false"
      :visible.sync="newrule"
      @close="cancelrule"
    >
      <el-form
        ref="rulelfrom"
        :model="rulefromdata"
        label-width="120px"
        style="width: 80%; margin: 0 auto"
        size="mini"
        :rules="rulefromdataverification"
      >
        <el-form-item label="规则名称" prop="ruleName">
          <el-input
            v-model="rulefromdata.ruleName"
            placeholder="请输入规则名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="规则描述" prop="ruleDesc">
          <el-input
            v-model="rulefromdata.ruleDesc"
            placeholder="请输入规则描述"
            clearable
          />
        </el-form-item>
        <el-form-item label="规则状态" prop="status">
          <el-select
            v-model="rulefromdata.status"
            placeholder="规则状态"
            clearable
          >
            <el-option label="有效" :value="1" />
            <el-option label="无效" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入SQL" prop="implSql">
          <el-input
            v-model="rulefromdata.implSql"
            placeholder="请输入SQL查询/筛选语句"
            type="textarea"
            clearable
          />
        </el-form-item>
        <div class="center">
          <el-button
            size="mini"
            type="primary"
            @click="creatrule"
            :loading="rulelod"
            >确定</el-button
          >
          <el-button size="mini" type="danger" plain @click="cancelrule"
            >取消</el-button
          >
        </div>
      </el-form>
    </el-dialog>
    <!-- 修改规则 -->
    <el-dialog
      title="修改规则"
      :visible.sync="modifyrulesnewrule"
      :close-on-click-modal="false"
    >
      <el-form
        ref="rulelfromupade"
        :model="rulefromdatarow"
        label-width="120px"
        style="width: 80%; margin: 0 auto"
        size="mini"
        :rules="rulefromdataverification"
      >
        <el-form-item label="规则名称" prop="ruleName">
          <el-input
            v-model="rulefromdatarow.ruleName"
            placeholder="请输入规则名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="规则描述" prop="ruleDesc">
          <el-input
            v-model="rulefromdatarow.ruleDesc"
            placeholder="请输入规则描述"
            clearable
          />
        </el-form-item>
        <el-form-item label="规则状态" prop="status">
          <el-select
            v-model="rulefromdatarow.status"
            placeholder="规则状态"
            clearable
          >
            <el-option label="有效" value="1" />
            <el-option label="无效" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入SQL" prop="implSql">
          <el-input
            v-model="rulefromdatarow.implSql"
            placeholder="请输入SQL查询/筛选语句"
            type="textarea"
            clearable
          />
        </el-form-item>
        <div class="center">
          <el-button size="mini" type="primary" @click="modifyrulesupdate"
            >确定</el-button
          >
          <el-button
            size="mini"
            type="danger"
            plain
            @click="modifyrulesnewrule = false"
            >取消</el-button
          >
        </div>
      </el-form>
    </el-dialog>
    <!-- 新建参数 -->
    <el-dialog
      :close-on-click-modal="false"
      title="新建参数"
      :visible.sync="newparameter"
      @close="cancelparameter"
    >
      <el-form
        ref="parameterfrom"
        :model="parameterfrom"
        label-width="120px"
        style="width: 80%; margin: 0 auto"
        size="mini"
        :rules="parameterfromrule"
      >
        <el-form-item label="变量名称" prop="name">
          <el-input
            v-model="parameterfrom.name"
            placeholder="请输入变量名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="变量含义" prop="meaning">
          <el-input
            v-model="parameterfrom.meaning"
            placeholder="请输入变量含义"
            clearable
          />
        </el-form-item>
        <el-form-item label="变量描述" prop="modelDesc">
          <el-input
            v-model="parameterfrom.modelDesc"
            placeholder="请输入变量描述"
            clearable
          />
        </el-form-item>
        <el-form-item label="取值逻辑" prop="implSql">
          <el-input
            v-model="parameterfrom.implSql"
            placeholder="请输入取值逻辑"
            type="textarea"
            clearable
          />
        </el-form-item>
        <div class="center">
          <el-button
            size="mini"
            type="primary"
            :loading="parameterlod"
            @click="creatparameter"
            >确定</el-button
          >
          <el-button size="mini" type="danger" plain @click="cancelparameter"
            >取消</el-button
          >
        </div>
      </el-form>
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
  findListByPage,
  findListByPagedelete,
  rulefindListByPage,
  addrule,
  deleterule,
  parameterfindListByPage,
  addparameter,
  findByIdrulesupdate,
} from "@/api/policymanagement";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      parameterlod: false,
      rulelod: false,
      lod: false,
      activeName: "model",
      // 模型-------------------------------------------------
      total1: 0,
      dataValue1: [],
      newmodel: false,
      // 类型
      modeltype: ["提额", "降额", "提价", "降价", "冻结", "清退"],
      // 表单
      modelfrom: {
        modelFileName: "",
        modelType: 1,
        // 模型执行类型
        executionType: "file",
        fells: null,
        remark: "",
        modelCode: "",
        modelParamIds: [],
      },
      // 第一步表单验证
      modelfromrule: {
        modelFileName: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
        executionType: {
          required: true,
        },
        modelCode: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
        modelType: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
        fells: {
          required: true,
          message: "请上传模型pmml文件",
          trigger: "blur",
        },
        remark: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      },
      modelquery: {
        name: "",
        modelType: "",
        endTime: "",
        startTime: "",
        page: 1,
        rows: 10,
      },
      // 数据
      modeldata: [],
      // 模型-------------------------------------------------

      // 规则-------------------------------------------------
      total2: 1000,
      dataValue2: [],
      rulequery: {
        ruleIdAndName: "",
        // status: "",
        startTime: "",
        endTime: "",
        page: 1,
        rows: 10,
      },
      ruledata2: [],
      newrule: false,
      // 修改规则
      rulefromdatarow: {},
      modifyrulesnewrule: false,
      // 规则表单
      rulefromdata: {
        ruleName: "",
        ruleDesc: "",
        implSql: "",
        status: "",
        taskId: 0,
      },
      // 规则表单验证
      rulefromdataverification: {
        status: { required: true, message: "不能为空", trigger: "blur" },
        ruleName: { required: true, message: "不能为空", trigger: "blur" },
        ruleDesc: { required: true, message: "不能为空", trigger: "blur" },
        implSql: { required: true, message: "不能为空", trigger: "blur" },
      },
      // 规则-------------------------------------------------

      // 参数-------------------------------------------------
      total3: 1000,
      dataValue3: [],
      parameterquery: {
        name: "",
        startTime: "",
        endTime: "",
        page: 1,
        rows: 10,
      },
      parameterdata3: [],
      // 参数表单
      parameterfrom: {
        name: "",
        meaning: "",
        modelDesc: "",
        implSql: "",
      },
      newparameter: false,
      // 参数表单验证
      parameterfromrule: {
        name: { required: true, message: "不能为空", trigger: "blur" },
        meaning: { required: true, message: "不能为空", trigger: "blur" },
        modelDesc: { required: true, message: "不能为空", trigger: "blur" },
        implSql: { required: true, message: "不能为空", trigger: "blur" },
      },
      // 参数-------------------------------------------------
    };
  },
  mounted() {
    this.getList1();
    console.log(43211);
  },
  methods: {
    // tab切换
    handleClick(v) {
      switch (this.activeName) {
        case "rule":
          this.getList2(true);
          break;
        case "parameter":
          this.getList3(true);
          break;
      }
    },
    // 模型--------------------------------------
    // 取消-第一步
    cancel() {
      if (this.$refs["modelfrom"] !== undefined) {
        this.$refs["modelfrom"].resetFields();
      }
      if (this.$refs["upload"] !== undefined) {
        this.$refs["upload"].clearFiles();
      }
      this.newmodel = false;
    },
    // 判断上传文件类型以及存储文件
    filechange(file) {
      const i = file.raw.name.lastIndexOf(".");
      const filename = file.raw.name.substr(i + 1);
      if (filename != "pmml") {
        this.modelfrom.fells = null;
        return this.$message.error("上传文件类型必须是pmml文件");
      }
      this.modelfrom.fells = file.raw;
      this.$refs["modelfrom"].validateField("fells", (v) => {});
    },
    // 删除文件
    removefile() {
      this.modelfrom.fells = null;
    },
    // 上传模型文件
    async uploadChange() {
      const fd = new FormData();
      fd.append("modelId", 8);
      fd.append("file", this.modelfrom.fells);
      const res = await uploadFilesReq(fd);
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("上传成功");
    },
    // 点击下一步表单验证
    createnext() {
      this.$refs["modelfrom"].validate((v) => {
        if (v) {
          this.$router.push({
            name: "moldingparameters",
            params: { modelfrom: this.modelfrom },
          });
        }
      });
    },
    // ------时间
    changedatavalue1() {
      if (!this.dataValue1) {
        this.modelquery.startTime = "";
        this.modelquery.endTime = "";
        return;
      }
      this.modelquery.startTime = this.dataValue1[0];
      this.modelquery.endTime = this.dataValue1[1];
    },
    // ------列表
    async getList1() {
      const { data } = await findListByPage(this.modelquery);
      this.modeldata = data.records;
      this.total1 = data.total;
      this.lod = false;
    },
    // ------查询
    // 新建模型
    newcreatemodel() {
      this.newmodel = true;
    },
    // 根据ID删除数据
    findListByPagedelete(id) {
      this.$confirm("此操作将删除该模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await findListByPagedelete({ id: id });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.getList1();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    querygetlist1() {
      this.lod = true;
      this.getList1();
    },
    // 查看入模参数
    seemoldingparameters(id) {
      this.$router.push({ name: "showfmoldingparameters", query: { id: id } });
    },
    // 模型---------------------------------------

    // 规则---------------------------------------
    // ------时间
    changedatavalue2() {
      if (!this.dataValue2) {
        this.rulequery.startTime = "";
        this.rulequery.endTime = "";
        return;
      }
      this.rulequery.startTime = this.dataValue2[0];
      this.rulequery.endTime = this.dataValue2[1];
    },
    // ------列表
    async getList2(v) {
      if (v) {
        this.lod = true;
      }
      const { data } = await rulefindListByPage(this.rulequery);
      this.lod = false;
      this.ruledata2 = data.records;
      this.total2 = data.total;
    },
    // 取消创建
    // 删除规则
    async deleterule(id) {
      this.$confirm("此操作将删除该模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleterule({ id: id });
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success("删除成功");
          this.getList2();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 创建
    creatrule() {
      this.$refs["rulelfrom"].validate(async (v) => {
        if (v) {
          this.rulelod = true;
          const res = await addrule(this.rulefromdata).catch(() => {
            this.rulelod = false;
          });
          console.log(res);
          if (res.code !== 200) {
            this.rulelod = false;
            this.$message.error(res.message);
            return;
          }
          this.$message.success("新增成功");
          this.getList2();
          if (this.$refs["rulelfrom"] !== undefined) {
            this.$refs["rulelfrom"].resetFields();
          }
          this.newrule = false;
          this.rulelod = false;
        }
      });
    },
    cancelrule() {
      if (this.$refs["rulelfrom"] !== undefined) {
        this.$refs["rulelfrom"].resetFields();
      }
      this.newrule = false;
    },
    // 修改规则
    modifyrules(row) {
      this.rulefromdatarow = {
        ruleName: row.ruleName,
        ruleDesc: row.ruleDesc,
        implSql: row.implSql,
        status: row.status,
        taskId: row.taskId,
        id: row.id,
      };
      this.modifyrulesnewrule = true;
    },
    // 规则修改
    modifyrulesupdate() {
      this.$refs["rulelfromupade"].validate(async (val) => {
        if (val) {
          const res = await findByIdrulesupdate(this.rulefromdatarow);
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.modifyrulesnewrule = false;
          this.getList2();
        }
      });
    },
    // 规则---------------------------------------

    // 参数---------------------------------------
    // ------时间
    changedatavalue3() {
      if (!this.dataValue3) {
        this.parameterquery.startTime = "";
        this.parameterquery.endTime = "";
        return;
      }
      this.parameterquery.startTime = this.dataValue3[0];
      this.parameterquery.endTime = this.dataValue3[1];
    },
    // ------列表
    async getList3(v) {
      if (v) {
        this.lod = true;
      }
      const { data } = await parameterfindListByPage(this.parameterquery);
      this.parameterdata3 = data.records;
      this.total3 = data.total;
      this.lod = false;
    },
    // 创建
    creatparameter() {
      this.$refs["parameterfrom"].validate(async (v) => {
        if (v) {
          this.parameterlod = true;
          const res = await addparameter(this.parameterfrom).catch(() => {
            this.parameterlod = false;
          });
          if (res.code !== 200) {
            this.parameterlod = false;
            return this.$message.error(res.message);
          }
          this.$message.success(res.message);
          this.cancelparameter();
          this.newparameter = false;
          this.parameterlod = false;
          this.getList3();
        }
      });
    },
    // 取消
    cancelparameter() {
      if (this.$refs["parameterfrom"] !== undefined) {
        this.$refs["parameterfrom"].resetFields();
      }
      this.newparameter = false;
    },
    // 参数---------------------------------------
  },
};
</script>

<style lang="scss" scoped>
//规则---------------------------
.center {
  width: 80%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
}
//模型---------------------------
.pag {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.right {
  float: right;
}
.table {
  margin-top: 20px;
  min-height: 400px;
}
.oper {
  a {
    margin: 0 10px;
  }
  a:nth-child(1) {
    color: rgb(2, 167, 240);
  }
}
.cre {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
//模型----------------------------
//标签页样式
::v-deep {
  .tabs {
    .el-tabs__active-bar {
      background-color: rgb(128, 128, 255) !important;
    }
    .el-tabs__item:hover {
      color: rgb(128, 128, 255) !important;
    }
    .is-active {
      color: rgb(128, 128, 255) !important;
    }
  }
}
//标签页样式
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30001;
}
.cust {
  padding: 20px;
}
</style>
