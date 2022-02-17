<template>
  <div class="cust">
    <el-row>
      <el-col :span="3">
        <div class="slets">
          <span>运行状态:</span>
          <el-select
            v-model="listdataquery.runStatus"
            size="mini"
            style="width: 95px"
            placeholder="不限"
            clearable
          >
            <el-option
              v-for="i in pagedictsletsList.runStatus"
              :key="i.id"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="slets">
          <span>创建方式:</span>
          <el-select
            v-model="listdataquery.createType"
            size="mini"
            style="width: 95px"
            placeholder="不限"
            clearable
          >
            <el-option label="规则创建" :value="1" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="slets">
          <span>更新方式:</span>
          <el-select
            v-model="listdataquery.updateType"
            size="mini"
            style="width: 95px"
            placeholder="不限"
            clearable
          >
            <el-option
              v-for="i in pagedictsletsList.updateType"
              :key="i.id"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="slets">
          <span>最后计算状态:</span>
          <el-select
            v-model="listdataquery.finallyCalculateStatus"
            size="mini"
            style="width: 120px"
            placeholder="不限"
            clearable
          >
            <el-option
              v-for="i in pagedictsletsList.finallyCalculateStatus"
              :key="i.id"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" class="green" @click="getquerylist"
          >查询</el-button
        >
      </el-col>
      <el-col :span="9">
        <div class="lastslet">
          <el-checkbox-group
            v-model="listdataquery.loginAccount"
            @change="checkboxmi"
          >
            <el-checkbox true-label="1" false-label="0" label="仅我创建" />
          </el-checkbox-group>

          <el-input
            v-model="listdataquery.nameOrCreatePeople"
            placeholder="搜索分群名称/创建者"
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
        :data="listrecordsdata"
        :header-cell-style="{
          'font-size': '12px',
          'font-weight': 'normal',
          color: '#000',
          background: 'rgb(238,241,246)',
        }"
        :cell-style="{ 'font-size': '12px' }"
        @sort-change="sortchange"
      >
        <el-table-column
          label="分群"
          width="240"
          prop="userGroupName"
          sortable="custom"
        >
          <template slot-scope="{ row }">
            <div
              class="tab-group"
              style="cursor: pointer"
              @click="creEchodataCustomergroup(row)"
            >
              <div v-if="row.userGroupName">
                <i class="el-icon-success" />
                <span>{{ row.userGroupName }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          sortable="custom"
          label="人数"
          width="200"
          align="center"
          prop="peopleNum"
        >
          <template slot-scope="{ row }">
            <div class="tab-people">
              <div>{{ row.peopleNum ? row.peopleNum : 0 }}人</div>
              <div v-if="row.createTime">
                <i>&bull;</i>
                <span>{{ row.lastTime ? row.lastTime : "0000" }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建方式"
          align="center"
          prop="createTypeValue"
        />
        <el-table-column label="创建者" align="center" prop="createPeople" />
        <el-table-column label="更新方式" align="center" prop="updateTypeValue">
          <template slot-scope="{ row }">
            <div class="tab-col-icon">
              <div v-if="row.updateTypeValue == '手动'">
                <i class="el-icon-thumb" /><span>{{
                  row.updateTypeValue
                }}</span>
              </div>
              <div v-else>
                <i class="el-icon-refresh-left" /><span>{{
                  row.updateTypeValue
                }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" prop="f">
          <template slot-scope="{ row }">
            <div class="tab-col-icon">
              <a
                v-if="row.updateTypeValue == '手动'"
                @click="manualupade(row.id)"
              >
                <i class="el-icon-thumb" />
                <span>更新</span>
              </a>
              <a v-else />
              <a @click="stope(row.id)">
                <i
                  class="el-icon-switch-button"
                  :style="{
                    color:
                      row.runStatus == 1
                        ? 'rgb(250,205,145)'
                        : 'rgb(76,205,105)',
                  }"
                />
                <span>{{ row.runStatus == 1 ? "停用" : "启用" }}</span>
              </a>
              <!-- <a v-else>
                <i class="el-icon-switch-button"></i>
                <span>停用</span>
              </a> -->
              <a @click="expertcustom(row.id)">
                <i class="el-icon-printer" />
                <span>导出</span>
              </a>
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
    <!-- 创建用户分群 -->
    <!-- 第一步弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建用户分群"
      :visible.sync="createusergroups"
      @close="resetform"
    >
      <el-alert
        title="例行分群计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="1" align-center>
          <el-step title="基本信息" />
          <el-step title="规则配置" />
        </el-steps>
      </div>
      <div
        v-loading="namelod"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <el-form
          ref="ruleFormonelab"
          :model="ruleFormonelab"
          :rules="rulesonelab"
          label-width="100px"
          style="width: 60%; margin: 0 100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分类显示名:" prop="userGroupName">
            <el-input
              v-model="ruleFormonelab.userGroupName"
              clearable
              size="mini"
              @change="nameNotRepeat"
            />
          </el-form-item>
          <el-form-item label="更新方式:" prop="updateType">
            <div class="act">
              <el-radio-group
                v-model="ruleFormonelab.updateType"
                size="small"
                @change="ckeckact"
              >
                <el-radio label="1" border>例行</el-radio>
                <el-radio label="2" border>手动</el-radio>
              </el-radio-group>
            </div>
            <div v-if="actish[0]" style="margin: 5px 0">
              按
              <el-select
                v-model="ruleFormonelab.accordingDay"
                size="mini"
                style="width: 120px"
                @change="sletchange"
              >
                <el-option
                  v-for="i in pagedictsletsList.tagModifyDateType"
                  :key="i.id"
                  :label="i.label"
                  :value="i.value"
                />
              </el-select>

              计算 标签每日凌晨更新
              <el-form-item v-if="pickish" label="" prop="implementDay">
                <el-date-picker
                  v-model="ruleFormonelab.implementDay"
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </div>
            <div v-show="actish[1]">标签生成后，点击“更新”进行数据的更新。</div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="ruleFormonelab.userGroupDesc"
              type="textarea"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="next">
        <el-button size="mini" @click="nextcreate">下一步</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="创建用户分群"
      :visible.sync="createusercust"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <el-alert
        title="例行分群计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="基本信息" />
          <el-step title="分群规则" />
        </el-steps>
      </div>
      <div
        v-if="customlod"
        v-loading="true"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
        style="
          position: absolute;
          width: 95%;
          left: 2.5%;
          top: 21%;
          height: 76%;
          z-index: 1000;
        "
      ></div>
      <div class="frame">
        <div
          v-for="(i, m) in tagquerylist"
          v-show="tagdataish[m]"
          :key="m"
          class="frames"
        >
          <div class="hid">
            <img :src="require('@/assets/lable/u12682.svg')" alt="" />
            <a>且</a>
            <ul>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(1, i.querychildren1)"
                  />
                  <span>添加</span>
                </div>
                <div
                  v-for="(item, index) in i.querychildren1"
                  :key="index"
                  class="attr1"
                >
                  <p>
                    <i
                      class="el-icon-minus"
                      @click="usersatisfactiondel(index, i.querychildren1)"
                    />
                    <span>用户属性满足</span>
                  </p>
                  <div>
                    <el-cascader
                      v-model="item.slet_quota_0"
                      :options="pagedictsletsList.userAttribute"
                      @change="
                        sleteventcustomcustone(item.slet_quota_0, 1, index, m)
                      "
                      :props="propsuserAttribute"
                      size="mini"
                    />
                    <el-select v-model="item.event_dimension" size="mini">
                      <el-option
                        v-for="item1 in item.slets2"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-select v-model="item.slet_0" size="mini">
                      <el-option
                        v-for="item1 in item.slets1"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-model="item.input_0"
                      size="mini"
                      style="width: 80px"
                    />

                    <i class="el-icon-edit" />

                    <el-popover placement="top" width="300" trigger="hover">
                      <el-table
                        empty-text="暂无提示"
                        :data="item.slets3"
                        style="border: 0"
                        :header-cell-style="{ border: 0 }"
                      >
                        <el-table-column
                          v-if="item.slets3.length != 0"
                          label=" 提示信息"
                          prop="label"
                        ></el-table-column>
                        <el-table-column
                          v-if="item.slets3.length != 0"
                          label="输入值示例"
                          prop="value"
                        ></el-table-column>
                      </el-table>
                      <i
                        slot="reference"
                        class="el-icon-question"
                        style="cursor: pointer"
                      />
                    </el-popover>
                  </div>
                </div>
              </li>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(2, i.querychildren2)"
                  />
                  <span>添加</span>
                </div>
                <div
                  v-for="(item, index) in i.querychildren2"
                  :key="index"
                  class="attr2"
                >
                  <p>
                    <i
                      class="el-icon-minus"
                      @click="usersatisfactiondel(index, i.querychildren2)"
                    />
                    <span>用户行为满足</span>
                  </p>
                  <div>
                    <div>
                      <el-date-picker
                        v-model="item.pick_data_0"
                        size="mini"
                        type="daterange"
                        style="width: 340px; margin-right: 10px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']"
                      />
                    </div>
                    <el-select
                      v-model="item.slet_y_0"
                      style="width: 150px"
                      size="mini"
                    >
                      <el-option
                        v-for="item2 in pagedictsletsList.tagCalLat4"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      ></el-option>
                    </el-select>

                    <el-select
                      v-model="item.slet_apply_0"
                      class="icon-slet"
                      style="width: 160px"
                      size="mini"
                      @change="
                        sleteventcustomcust(item.slet_apply_0, 1, index, m)
                      "
                    >
                      <el-option
                        v-for="i in pagedictsletsList.tagCalEvent"
                        :key="i.id"
                        :label="i.label"
                        :value="i.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.slet_judge_0"
                      style="width: 100px"
                      size="mini"
                    >
                      <el-option
                        v-for="item2 in item.slets3"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.event_dimension"
                      size="mini"
                      style="width: 100px"
                    >
                      <el-option
                        v-for="item2 in item.slets1"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.slet_frequency_0"
                      style="width: 100px"
                      size="mini"
                    >
                      <el-option
                        v-for="i in item.slets2"
                        :key="i.id"
                        :label="i.label"
                        :value="i.value"
                      />
                    </el-select>

                    <el-input
                      v-model="item.input_frequency_0"
                      class="k6"
                      style="width: 80px"
                      size="mini"
                    />
                  </div>
                </div>
              </li>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(3, i.querychildren3)"
                  />
                  <span>添加</span>
                </div>
                <div
                  v-for="(item, index) in i.querychildren3"
                  :key="index"
                  class="attr3"
                >
                  <p>
                    <i
                      class="el-icon-minus"
                      @click="usersatisfactiondel(index, i.querychildren3)"
                    />
                    <span>行为序列</span>
                  </p>
                  <div>
                    <div style="margin-right: 200px">
                      <el-date-picker
                        v-model="item.pick_data_0"
                        size="mini"
                        type="daterange"
                        style="width: 340px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']"
                      />

                      <i
                        class="el-icon-plus plus-oper"
                        @click="addslets(item.slet_loan_0)"
                      />
                      添加事件
                    </div>

                    <div
                      v-for="(itemselt, indexslet) in item.slet_loan_0"
                      :key="indexslet"
                      class="slet-loan"
                    >
                      <el-select
                        v-model="itemselt.event"
                        class="icon-slet"
                        style="width: 150px"
                        size="mini"
                      >
                        <el-option
                          v-for="i in pagedictsletsList.tagCalEvent"
                          :key="i.id"
                          :label="i.label"
                          :value="i.value"
                        />
                      </el-select>
                      <i
                        v-show="indexslet != 0"
                        class="el-icon-minus minus-oper"
                        @click="delslets(item.slet_loan_0, indexslet)"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="estim">
        <header>预估人数</header>
        <div>
          <el-select
            v-model="ruleFormonelab.userGroupInfoLimit.estimateNum"
            size="mini"
            placeholder=""
          >
            <el-option
              v-for="i in pagedictsletsList.tagPredict"
              :key="i.id"
              :value="i.value"
              :label="i.label"
            />
          </el-select>
          <el-button type="primary" size="mini" @click="estimate"
            >预估</el-button
          >
          <div
            v-if="estimateNumpople || estimateNumpople == 0"
            style="margin: 10px 0"
          >
            预估人数：{{ estimateNumpople }}
          </div>
        </div>
        <div>
          <header>人数限制</header>
          <div>
            <el-checkbox-group
              v-model="ruleFormonelab.limit"
              @change="restrictedpopulation"
            >
              <el-checkbox
                true-label="1"
                false-label="0"
                label="限制人群返回数量"
              />
            </el-checkbox-group>
          </div>
          <div class="choice">
            <span>按</span>
            <el-select
              v-model="ruleFormonelab.userGroupInfoLimit.limitType"
              size="mini"
              style="width: 80px"
              placeholder=""
              @change="attributesleth"
            >
              <el-option label="随机" :value="1" />
              <el-option label="属性" :value="2" />
            </el-select>

            <el-cascader
              v-if="ruleFormonelab.userGroupInfoLimit.limitType == 2"
              v-model="ruleFormonelab.userGroupInfoLimit.event"
              :options="pagedictsletsList.userLimit"
              :props="propsuserAttribute"
              size="mini"
              @change="cascader"
            />

            <el-select
              v-if="ruleFormonelab.userGroupInfoLimit.limitType == 2"
              v-model="ruleFormonelab.userGroupInfoLimit.descNum"
              size="mini"
              style="width: 120px"
            >
              <el-option
                v-for="item in pagedictsletsList.sort"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>返回</span>
            <el-input
              v-model.number="ruleFormonelab.userGroupInfoLimit.peopleNum"
              size="mini"
              style="width: 80px"
            />
            <span>人</span>
          </div>
        </div>
        <div class="foot">
          <a @click="cancel('createusercust')">取消</a>
          <el-button
            class="green"
            size="mini"
            :disabled="customlod"
            @click="establish"
            >创建</el-button
          >
          <el-button size="mini" @click="previous('createusercust')"
            >上一步</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- 回显 -->
    <el-dialog
      title="用户分群"
      :visible.sync="echodatagroup"
      :close-on-click-modal="false"
    >
      <el-alert
        title="例行分群计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="frame">
        <div class="frames">
          <div class="hid">
            <img :src="require('@/assets/lable/u12682.svg')" alt="" />
            <a>且</a>
            <ul>
              <li>
                <div
                  v-for="(item, index) in echodatagroupList.arr1"
                  :key="index"
                  class="attr1"
                >
                  <p>
                    <span>用户属性满足</span>
                  </p>

                  <div>
                    <el-cascader
                      v-model="item.events"
                      :options="pagedictsletsList.userAttribute"
                      disabled
                      :props="propsuserAttribute"
                      size="mini"
                    />
                    <el-select
                      v-model="item.statisticsFive"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item1 in pagedictsletsList.tagCalEventType"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.statisticsOne"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item1 in pagedictsletsList.tagCalLat2"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-model="item.statisticsTwo"
                      disabled
                      size="mini"
                    />

                    <i class="el-icon-edit" />
                  </div>
                </div>
              </li>
              <li>
                <div
                  v-for="(item, index) in echodatagroupList.arr2"
                  :key="index"
                  class="attr2"
                >
                  <p>
                    <span>用户行为满足</span>
                  </p>
                  <div>
                    <div>
                      <el-date-picker
                        v-model="item.pickdata"
                        size="mini"
                        type="datetimerange"
                        style="width: 340px; margin-right: 10px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="false"
                        disabled
                      />
                    </div>

                    <el-select
                      v-model="item.statisticsThree"
                      style="width: 180px"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item2 in pagedictsletsList.tagCalLat4"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.events"
                      class="icon-slet"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="i in pagedictsletsList.tagCalEvent"
                        :key="i.id"
                        :label="i.label"
                        :value="i.value"
                      />
                    </el-select>

                    <el-select
                      v-model="item.statisticsFive"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item1 in pagedictsletsList.tagCalEventType"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.statisticsFour"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item1 in pagedictsletsList.tagCalLat1"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-select
                      v-model="item.statisticsOne"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item1 in pagedictsletsList.tagCalLat2"
                        :key="item1.id"
                        :label="item1.label"
                        :value="item1.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-model="item.statisticsTwo"
                      disabled
                      class="k6"
                      style="width: 80px"
                      size="mini"
                    />
                  </div>
                </div>
              </li>
              <li>
                <div
                  v-for="(item, index) in echodatagroupList.arr3"
                  :key="index"
                  class="attr3"
                >
                  <p>
                    <span>行为序列</span>
                  </p>
                  <div>
                    <div style="margin-right: 200px">
                      <el-date-picker
                        v-model="item.pickdata"
                        size="mini"
                        type="datetimerange"
                        style="width: 340px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        disabled
                      />
                    </div>
                    <div class="slet-loan">
                      <el-select
                        v-for="(i, m) in item.eve"
                        :key="m"
                        v-model="i.event"
                        class="icon-slet"
                        size="mini"
                        disabled
                      >
                        <el-option
                          v-for="i in pagedictsletsList.tagCalEvent"
                          :key="i.id"
                          :label="i.label"
                          :value="i.value"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
import activecheck from "@/assembly/createlable/activecheck.vue";
import Pickdata from "@/assembly/createlable/pickdata.vue";
import Pagination from "@/components/Pagination";
import { sysdict, sysdicttree } from "@/api/user";
import {
  getUserGroupByPage,
  stopEnable,
  manualUpdate,
  exportgroupinfo,
  createUserGroup,
  estimateGroup,
  findRuleEcho,
  tagSettingshow2,
  tagSettingshow3,
  selectcalLat1,
  nameNotRepeat,
  selectTips,
} from "@/api/userportrait";
export default {
  components: {
    Pagination,
    // eslint-disable-next-line vue/no-unused-components
    activecheck,
    // eslint-disable-next-line vue/no-unused-components
    Pickdata,
  },
  data() {
    return {
      customlod: false,
      propsuserAttribute: {
        label: "label",
        children: "children",
        value: "value",
        emitPath: false,
      },
      propsuserAttributepople: {
        label: "label",
        children: "children",
        value: "value",
      },
      lod: false,
      total: 0,
      // 列表查询参数
      listdataquery: {
        runStatus: "",
        createType: "",
        updateType: "",
        finallyCalculateStatus: "",
        loginAccount: "",
        nameOrCreatePeople: "",
        page: 1,
        rows: 10,
        orDesc: true,
        orSort: 3,
      },
      // 查询得到的参数
      listrecordsdata: [],
      // 创建用户分群
      createusergroups: false,

      actish: [false, false],
      pickish: false,
      pickdataoption: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      ruleFormonelab: {
        userGroupName: "",
        // 更新方式
        updateType: "1",
        // 描述
        userGroupDesc: "",
        // 天，周，月，自定义
        accordingDay: "day",
        // 自定义时间
        implementDay: "",
        // 第二步数组
        // 属性
        userAttributes: [],
        // 行为
        userBehaviors: [],
        // 序列
        userSequences: [],
        // 预估
        userGroupInfoLimit: {
          estimateNum: "",
          limitType: 1,
          peopleNum: null,
          descNum: "",
          event: "",
        },
        // 人数限制
        limit: "",
      },
      // 预估人数
      estimateNumpople: null,
      rulesonelab: {
        userGroupName: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
        updateType: [{ required: true, message: "不能为空", trigger: "blur" }],
        implementDay: [
          { required: true, message: "不能为空", trigger: "blur" },
        ],
      },
      // 创建用户分群第二步
      createusercust: false,
      // 新建分层
      // 多余-----------------
      tagnamelist: ["分层1", "分层2"],
      layeredindex: 2,
      bordercolortag: ["tagb1", ""],
      tagdataish: [true, false],
      // 多余-----------------
      tagquerylist: [
        {
          name: "分层1",
          describe: "",
          querychildren1: [
            {
              slet_quota_0: "",
              slet_0: "",
              input_0: "",
              event_dimension: "",
              slets1: [],
              slets2: [],
              slets3: [],
            },
          ],
          querychildren2: [
            {
              pick_data_0: [],
              slet_y_0: "",
              slet_apply_0: "",
              slet_frequency_0: "",
              slet_judge_0: "",
              input_frequency_0: "",
              event_dimension: "",
              slets1: [],
              slets2: [],
              slets3: [],
            },
          ],
          querychildren3: [
            {
              pick_data_0: [],
              slet_loan_0: [{ event: "", event_dimension: "" }],
              slets1: [],
              slets2: [],
              slets3: [],
            },
          ],
        },
      ],
      userattributeindex: 0,
      userbehaviorindex: 0,
      usersequenceindex: 0,
      // 新建分层
      // 按属性/随机
      attributeslet: false,
      // 按全量计算按钮
      estimatednumber: 1,
      // 存储所有下拉框
      pagedictsletsList: {
        tagCalLat1: [],
        tagModifyDateType: [],
        tagCalEvent: [],
        tagPredict: [],
        runStatus: [],
        updateType: [],
        finallyCalculateStatus: [],
        userAttribute: [],
        tagCalLat4: [],
        //等于
        tagCalLat2: [],
        //历史当前
        tagCalEventType: [],
        sort: [],
        userLimit: [],
      },
      // 数据校验
      datarulusish: null,
      // 回显数据
      echodatagroup: false,
      // 回显数据存储
      echodatagroupList: { arr1: [], arr2: [], arr3: [] },
      namelod: false,
      nameish: false,
      parantid: "",
    };
  },
  mounted() {
    this.getList();
    this.pageslet();
  },
  methods: {
    cascader() {
      this.pagedictsletsList.userLimit.forEach((item) => {
        item.children.forEach((i) => {
          if (i.value == this.ruleFormonelab.userGroupInfoLimit.event) {
            this.ruleFormonelab["limitTable"] = item.value;
            this.parantid = item.value;
          }
        });
      });
    },
    //判断名称是否可用
    async nameNotRepeat() {
      this.namelod = true;
      let res = await nameNotRepeat({
        name: this.ruleFormonelab.userGroupName,
      }).catch(() => {
        this.namelod = false;
      });
      if (res.code !== 200) {
        this.$message.error(res.message);
        return;
      }
      this.nameish = true;
      this.namelod = false;
      this.$message.success(res.message);
    },
    async sleteventcustomcustone(data, id, index, m) {
      this.tagquerylist[m].querychildren1[index].slet_0 = "";
      this.tagquerylist[m].querychildren1[index].event_dimension = "";
      this.customlod = true;
      const res2 = await tagSettingshow3(data, id).catch(() => {
        this.customlod = false;
      });
      const res1 = await tagSettingshow2(data, id, 1).catch(() => {
        this.customlod = false;
      });
      const res3 = await selectTips(data).catch(() => {
        this.customlod = false;
      });

      this.customlod = false;
      this.tagquerylist[m].querychildren1[index].slets1 = res1.data;
      this.tagquerylist[m].querychildren1[index].slets2 = res2.data;
      this.tagquerylist[m].querychildren1[index].slets3 = res3.data;
    },
    //树形事件
    // handleChange(data, id) {},
    // 根据事件下拉框选择下拉维度-自定义
    async sleteventcustomcust(data, id, index, m) {
      this.tagquerylist[m].querychildren2[index].event_dimension = "";
      this.tagquerylist[m].querychildren2[index].slet_frequency_0 = "";
      this.tagquerylist[m].querychildren2[index].slet_judge_0 = "";
      this.customlod = true;
      const res1 = await selectcalLat1(data, id).catch(() => {
        this.customlod = false;
      });
      const res2 = await tagSettingshow2(data, id, 0).catch(() => {
        this.customlod = false;
      });
      const res3 = await tagSettingshow3(data, id).catch(() => {
        this.customlod = false;
      });
      this.customlod = false;
      this.tagquerylist[m].querychildren2[index].slets1 = res1.data;
      this.tagquerylist[m].querychildren2[index].slets2 = res2.data;
      this.tagquerylist[m].querychildren2[index].slets3 = res3.data;
    },
    // 回显数据
    async creEchodataCustomergroup(row) {
      const { data } = await findRuleEcho({ userGroupId: row.id });
      if (!data) return;
      this.echodatagroupList = { arr1: [], arr2: [], arr3: [] };
      data.forEach((item) => {
        if (item.credit == "1") {
          this.echodatagroupList.arr1.push(item);
        }
        if (item.credit == "2") {
          this.echodatagroupList.arr2.push({
            ...item,
            pickdata: [item.startTime, item.endTime],
          });
          this.echodatagroupList.arr2.forEach((item) => {
            item.statisticsThree = String(item.statisticsThree);
            item.statisticsFour = String(item.statisticsFour);
          });
        }
        if (item.credit == "3") {
          const arr = item.events.split(",");
          const arr2 = [];
          arr.forEach((i) => {
            arr2.push({ event: i });
          });
          this.echodatagroupList.arr3.push({
            ...item,
            pickdata: [item.startTime, item.endTime],
            eve: arr2,
          });
        }
      });
      this.echodatagroup = true;
    },
    // 仅我创建
    checkboxmi(v) {
      console.log(this.listdataquery.loginAccount, v);
    },
    // 查询--ok
    getquerylist() {
      this.lod = true;
      this.getList();
    },
    // 分页查看列表--0k
    async getList() {
      const { data } = await getUserGroupByPage(this.listdataquery).catch(
        () => {
          this.lod = false;
        }
      );
      this.listrecordsdata = data.records;
      this.total = data.total;
      this.lod = false;
    },
    // 导出--ok
    async expertcustom(id) {
      const res = await exportgroupinfo({ id: id });
      const blob = new Blob([res], {
        type: "application/vnd.ms-excel",
      }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement("a");
      a.href = url;
      a.download = "客群人员信息.xls";
      a.click();
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url);
    },
    // 启停用--ok
    async stope(id) {
      const from = new FormData();
      from.append("id", id);
      this.lod = true;
      const res = await stopEnable(from);
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.getList();
    },
    // 手动更新--ok
    async manualupade(id) {
      const from = new FormData();
      from.append("id", id);
      const res = await manualUpdate(from);
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.lod = true;
      this.getList();
    },
    // 更新方式--ok
    ckeckact(val) {
      this.actish = [false, false];
      this.actish[this.ruleFormonelab.updateType - 1] = true;
      if (val == 2) {
        this.ruleFormonelab.accordingDay = "";
      } else {
        this.ruleFormonelab.accordingDay = "day";
      }
    },
    // 自定义
    sletchange() {
      console.log(this.ruleFormonelab.accordingDay);
      if (this.ruleFormonelab.accordingDay === "custom") {
        this.pickish = true;
      } else {
        this.pickish = false;
      }
    },
    // 重置表单及数据
    resetform() {
      if (this.$refs["ruleFormonelab"] !== undefined) {
        this.$refs["ruleFormonelab"].resetFields();
      }
    },
    // 下一步表单验证
    nextcreate() {
      this.$refs["ruleFormonelab"].validate(async (v) => {
        if (v) {
          this.namelod = true;
          let res = await nameNotRepeat({
            name: this.ruleFormonelab.userGroupName,
          }).catch((err) => {
            this.namelod = false;
            return;
          });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.namelod = false;
          this.$message.success(res.message);
          this.createusercust = true;
        }
      });
    },
    // 删除某一项- -按钮
    usersatisfactiondel(i, m) {
      m.splice(i, 1);
      console.log(this.tagquerylist);
    },
    // 添加某一项- +按钮
    usersatisfactionadd(i, m) {
      switch (i) {
        case 1:
          this.userattributeindex++;
          m.push({
            slet_quota_0: "",
            slet_0: "",
            input_0: "",
            event_dimension: "",
            slets1: [],
            slets2: [],
            slets3: [],
          });
          break;
        case 2:
          this.userbehaviorindex++;
          m.push({
            pick_data_0: [],
            slet_y_0: "",
            slet_apply_0: "",
            slet_frequency_0: "",
            slet_judge_0: "",
            input_frequency_0: "",
            event_dimension: "",
            slets1: [],
            slets2: [],
            slets3: [],
          });
          break;
        case 3:
          this.usersequenceindex++;
          m.push({
            pick_data_0: [],
            // slet_apply_0: "",
            slet_loan_0: [{ event: "" }],
            slets1: [],
            slets2: [],
            slets3: [],
          });
          break;
      }
    },
    // 数据处理
    dataprocessing() {
      this.ruleFormonelab.userAttributes = [];
      this.ruleFormonelab.userBehaviors = [];
      this.ruleFormonelab.userSequences = [];
      const { querychildren1, querychildren2, querychildren3 } =
        this.tagquerylist[0];
      querychildren1.forEach((item, index) => {
        this.ruleFormonelab.userAttributes.push({
          credit: "1",
          statisticsOne: item.slet_0,
          statisticsTwo: item.input_0,
          events: item.slet_quota_0,
          statisticsFive: item.event_dimension,
        });
      });
      querychildren2.forEach((item, index) => {
        this.ruleFormonelab.userBehaviors.push({
          credit: "2",
          statisticsOne: item.slet_frequency_0,
          statisticsTwo: item.input_frequency_0,
          endTime: item.pick_data_0[1] ? item.pick_data_0[1] : "",
          startTime: item.pick_data_0[0] ? item.pick_data_0[0] : "",
          statisticsThree: item.slet_y_0,
          statisticsFour: item.event_dimension,
          events: item.slet_apply_0,
          statisticsFive: item.slet_judge_0,
        });
      });
      querychildren3.forEach((item, index) => {
        let eve = "";
        let dime = "";
        item.slet_loan_0.forEach((i, m) => {
          if (m == item.slet_loan_0.length - 1) {
            eve += i.event;
            dime += i.event_dimension;
          } else {
            if (i.event) {
              eve += i.event + ",";
              dime += i.event_dimension + ",";
            }
          }
        });
        this.ruleFormonelab.userSequences.push({
          credit: "3",
          endTime: item.pick_data_0[1] ? item.pick_data_0[1] : "",
          startTime: item.pick_data_0[0] ? item.pick_data_0[0] : "",
          events: eve,
          // statisticsFive: dime,
        });
      });
    },
    // 时间选择器
    datak1(v) {},
    // 取消创建
    cancel(v) {
      this[v] = false;
      this.tagquerylist = this.$options.data().tagquerylist;
      this.estimateNumpople = null;
      this.ruleFormonelab.userGroupInfoLimit =
        this.$options.data().ruleFormonelab.userGroupInfoLimit;
      this.ruleFormonelab.userGroupInfoLimit.estimateNum =
        this.pagedictsletsList.tagPredict[0].value;
    },
    // 数据校验
    datarulus() {
      let pack = true;
      console.log(this.tagquerylist);
      this.tagquerylist.forEach((i) => {
        i.querychildren1.forEach((item, index) => {
          for (let key in item) {
            if (key != "sort") {
              if (item[key] !== 0 && key != "slets3") {
                if (!item[key] || item[key] == "" || item[key].length == 0) {
                  pack = false;
                  return;
                }
              }
            }
          }
        });
        i.querychildren2.forEach((item, index) => {
          for (let key in item) {
            if (key != "sort") {
              if (item[key] !== 0) {
                if (!item[key] || item[key] == "" || item[key].length == 0) {
                  pack = false;
                  return;
                }
              }
            }
          }
        });
        i.querychildren3.forEach((item, index) => {
          item.slet_loan_0.forEach((s) => {
            if (s.event == "") {
              pack = false;
              return;
            }
          });
          for (let key in item) {
            if (key != "sort") {
              if (
                item[key] !== 0 &&
                key != "slets1" &&
                key != "slets2" &&
                key != "slets3"
              ) {
                if (!item[key] || item[key] == "" || item[key].length == 0) {
                  pack = false;
                  return;
                }
              }
            }
          }
        });
      });
      if (pack) return true;
      this.$message.error("所有的分层数据必填,请填写完整");
      return false;
    },
    // 创建
    async establish() {
      if (!this.datarulus()) return;
      this.dataprocessing();
      this.customlod = true;
      const res = await createUserGroup(this.ruleFormonelab).catch(() => {
        this.customlod = false;
      });
      if (res.code !== 200) {
        this.customlod = false;
        this.$message.error(res.message);
        return 
      }
      this.$message.success(res.message);
      this.createusercust = false;
      this.createusergroups = false;
      this.resetform();
      this.tagquerylist = this.$options.data().tagquerylist;
      this.ruleFormonelab = this.$options.data().ruleFormonelab;
      this.estimateNumpople = null;
      this.ruleFormonelab.userGroupInfoLimit.estimateNum =
      this.pagedictsletsList.tagPredict[0].value;
      this.getquerylist();
      this.customlod = false;
    },
    // 上一步
    previous(v) {
      this[v] = false;
    },
    // 预估按钮
    async estimate() {
      if (!this.datarulus()) return;
      this.dataprocessing();
      const from = {
        estimateNum: this.ruleFormonelab.userGroupInfoLimit.estimateNum,
        userAttributes: this.ruleFormonelab.userAttributes,
        userBehaviors: this.ruleFormonelab.userBehaviors,
        userSequences: this.ruleFormonelab.userSequences,
      };
      this.customlod = true;
      const { data } = await estimateGroup(from).catch(() => {
        this.customlod = false;
      });
      this.customlod = false;
      this.estimateNumpople = data;
    },
    // 限制人群返回数量
    restrictedpopulation() {
      console.log(this.ruleFormonelab.limit);
    },
    // 按属性/随机
    attributesleth(v) {
      if (v === 2) {
        this.attributeslet = true;
      } else {
        this.attributeslet = false;
      }
    },
    // 创建第一步
    createusergroupsh() {
      this.createusergroups = true;
      this.$nextTick(() => {
        this.actish = [false, false];
        this.actish[0] = true;
      });
    },
    // 排序
    sortchange(v) {
      switch (v.prop) {
        case "userGroupName":
          this.listdataquery.orSort = 1;
          break;
        case "peopleNum":
          this.listdataquery.orSort = 2;
          break;
      }
      switch (v.order) {
        case "ascending":
          this.listdataquery.orDesc = false;
          break;
        case "descending":
          this.listdataquery.orDesc = true;
          break;
      }
      this.getList();
    },
    // 添加下拉框
    addslets(m) {
      if (m.length > 1) {
        return this.$message.error("每组序列最多有两个事件");
      }
      m.push({ event: "", event_dimension: "" });
    },
    // 删除下拉框
    delslets(m, index) {
      m.splice(index, 1);
    },
    // 页面所有下拉框获取
    async pageslet() {
      if (!window.sessionStorage.getItem("slets")) {
        this.$message.error("下拉框已丢失，重新获取");
        this.$router.push({ path: "/login" });
        return;
      }
      this.lod = true;
      let {
        userAttribute,
        tagCalEventType,
        tagCalLat1,
        tagCalLat2,
        tagCalLat4,
        tagModifyDateType,
        tagCalEvent,
        tagPredict,
        runStatus,
        updateType,
        finallyCalculateStatus,
        sort,
        userLimit,
      } = JSON.parse(window.sessionStorage.getItem("slets"));
      this.pagedictsletsList = {
        userAttribute,
        tagCalEventType,
        tagCalLat1,
        tagCalLat2,
        tagCalLat4,
        tagModifyDateType,
        tagCalEvent,
        tagPredict,
        runStatus,
        updateType,
        finallyCalculateStatus,
        sort,
        userLimit,
      };
      //+++++++++++++++++++++++++++++++++++++++++++++
      // // 总次数-总金额
      // const { data: slettagCalLat1 } = await sysdict("tagCalLat1").catch(() => {
      //   this.lod = false;
      // });
      // // 天周月
      // const { data: tagModifyDateType } = await sysdict(
      //   "tagModifyDateType"
      // ).catch(() => {
      //   this.lod = false;
      // });
      // // 标签事件选择
      // const { data: tagCalEvent } = await sysdict("tagCalEvent").catch(() => {
      //   this.lod = false;
      // });
      // // 安全量计算
      // const { data: tagPredict } = await sysdict("tagPredict").catch(() => {
      //   this.lod = false;
      // });
      // // 正常运行
      // const { data: runStatus } = await sysdict("runStatus").catch(() => {
      //   this.lod = false;
      // });
      // // 更新方式--例行-手动
      // const { data: sletupdateType } = await sysdict("updateType").catch(() => {
      //   this.lod = false;
      // });
      // // 最后计算状态
      // const { data: finallyCalculateStatus } = await sysdict(
      //   "finallyCalculateStatus"
      // ).catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagCalLat2 } = await sysdict("tagCalLat2").catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagCalLat4 } = await sysdicttree("tagCalLat4").catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagCalEventType } = await sysdicttree(
      //   "tagCalEventType"
      // ).catch(() => {
      //   this.lod = false;
      // });

      // //数型数据
      // const { data: userAttribute } = await sysdicttree("userAttribute").catch(
      //   () => {
      //     this.lod = false;
      //   }
      // );
      // //+++++++++++++++++++++++++++++++++++++++++++++
      this.lod = false;
      this.ruleFormonelab.userGroupInfoLimit.estimateNum = tagPredict[0].value;
      this.ruleFormonelab.accordingDay = tagModifyDateType[0].value;
      // this.pagedictsletsList.tagCalLat1 = slettagCalLat1;
      // this.pagedictsletsList.tagModifyDateType = slettagModifyDateType;
      // this.pagedictsletsList.tagCalEvent = tagCalEvent;
      // this.pagedictsletsList.tagPredict = slettagPredict;
      // this.pagedictsletsList.runStatus = runStatus;
      // this.pagedictsletsList.updateType = sletupdateType;
      // this.pagedictsletsList.finallyCalculateStatus = finallyCalculateStatus;
      // //
      // this.pagedictsletsList.userAttribute = userAttribute;
      // //
      // this.pagedictsletsList.tagCalLat4 = tagCalLat4;
      // //
      // this.pagedictsletsList.tagCalLat2 = tagCalLat2;
      // //
      // this.pagedictsletsList.tagCalEventType = tagCalEventType;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table::before {
  height: 0;
}
.plus-oper {
  color: #fff;
  background-color: rgb(71, 203, 149);
  margin: 0 3px;
  cursor: pointer;
}
.minus-oper {
  margin: 20px 10px;
  background: rgb(168, 168, 168);
  color: #fff;
  cursor: pointer;
}
::v-deep {
  .el-radio {
    margin-right: 5px;
  }
}
.slet-loan {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  .el-select {
    width: 160px;
    margin-right: 10px;
  }
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
.slets {
  display: flex;
  font-size: 12px;
  align-items: center;
  span {
    margin-right: 6px;
  }
}
.choice {
  margin: 20px 0;

  span {
    margin: 0 5px 0 0;
  }
}
::v-deep {
  .icon-slet {
    .el-input__inner {
      //如果你的style 加了scoped 需要加/deep/
      background: url("../../assets/lable/u12660.svg") no-repeat; //引入icon
      background-size: 16px 14px; //这个是图片的大小，在这里不能直接设置width  height,设置宽高其实是select的宽高，图片可能会失真只设置宽度  高度auto也行
      background-position: 4px 6px; //在input中定位置  这两个参数是x  y坐标
      padding: 0 0 0 26px; //需要设置padding 把placeholder向右移
      box-sizing: border-box;
      font-size: 14px;
    }
  }
}
.add-plus {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  .el-icon-plus {
    color: #fff;
    background-color: rgb(71, 203, 149);
    margin: 0 3px;
    cursor: pointer;
  }
}
.el-icon-minus {
  border: 1px solid;
}

.frame {
  margin: 20px 0;
  height: 360px;
  border: 1px solid rgb(223, 223, 223);
  padding: 5px;
}
.frames {
  width: 100%;
  height: 100%;
}
.estim {
  header {
    margin: 30px 0 10px 0;
  }
}
.hid {
  display: flex;
  position: relative;
  img {
    width: 3px;
    height: 335px;
    margin: 0 10px;
  }
  a {
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 0.6%;
    background-color: rgb(217, 239, 232);
    color: rgb(129, 203, 210);
  }
  ul {
    flex: 1;
    height: 340px;
    overflow-y: auto;
    font-size: 12px;
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
.a1 {
  color: rgb(71, 203, 149);
}
.a2 {
  color: rgb(250, 205, 145);
}
.act {
  display: flex;
  width: 220px;
  justify-content: space-between;
}

.attr1 {
  height: 80px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
  p {
    margin: 10px;
    .el-icon-minus {
      margin: 0 3px;
      cursor: pointer;
    }
    .el-icon-plus {
      float: right;
      color: #fff;
      background-color: rgb(71, 203, 149);
      margin: 0 3px;
      cursor: pointer;
    }
    span:nth-child(3) {
      float: right;
      margin: 0 3px;
      cursor: pointer;
    }
  }
  div {
    display: flex;
    align-items: center;
    padding: 1px 4.5px;
    .el-select {
      width: 120px;
    }
    .el-input {
      width: 150px;
      margin: 0;
    }
    .el-icon-edit {
      font-size: 20px;
      margin: 5px;
    }
  }
}
.attr2 {
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
  p {
    margin: 10px;
    .el-icon-minus {
      margin: 0 3px;
      cursor: pointer;
    }
    .el-icon-plus {
      float: right;
      color: #fff;
      background-color: rgb(71, 203, 149);
      margin: 0 3px;
      cursor: pointer;
    }
    span:nth-child(3) {
      float: right;
      margin: 0 3px;
      cursor: pointer;
    }
  }
}

.attr2 > div {
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px 10px;
  align-content: space-around;
  .k6 {
    width: 80px;
  }
  .el-input,
  .el-select {
    margin-right: 10px;
    width: 120px;
  }

  span {
    height: 28px;
    display: inline-block;
    line-height: 28px;
  }
}
.attr3 {
  padding-bottom: 15px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
  p {
    margin: 10px;
    .el-icon-minus {
      margin: 0 3px;
      cursor: pointer;
    }
    .el-icon-plus {
      float: right;
      color: #fff;
      background-color: rgb(71, 203, 149);
      margin: 0 3px;
      cursor: pointer;
    }
    span:nth-child(3) {
      float: right;
      margin: 0 3px;
      cursor: pointer;
    }
  }
}
.attr3 > div {
  display: flex;
  flex-wrap: wrap;
  padding: 0 14px;
  .k6 {
    width: 80px;
  }
  span {
    height: 28px;
    display: inline-block;
    line-height: 28px;
  }
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
  display: flex;
  justify-content: center;
  a {
    flex: 1;
  }
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
.foot {
  margin: 80px 0 5px 0;
  width: 100%;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  .green {
    background-color: rgb(80, 205, 152);
    color: #fff;
    margin: 0 10px;
  }
  .el-button {
    float: right;
  }
}
.green {
  background-color: rgb(80, 205, 152);
  color: #fff;
  border: 0;
}
</style>
