<template>
  <div class="lab">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="dwk1">
          <div class="col">
            标签状态:
            <el-select
              v-model="queryhead.status"
              size="mini"
              style="width: 120px"
              clearable
              placeholder="不限"
              @change="sletchangtagtree"
            >
              <el-option
                v-for="item in allslets.tagStatus"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="col">
            创建方式:
            <el-select
              v-model="createTypeList"
              size="mini"
              style="width: 240px"
              :class="animt"
              multiple
              placeholder="不限"
              @change="actselectlist"
            >
              <el-option
                v-for="item in allslets.tagCreateType"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
              <!-- <el-option
                v-for="i in creation"
                :key="i.val"
                :label="i.lable"
                :value="i.val"
              /> -->
            </el-select>
          </div>
          <div class="col">
            更新方式:
            <el-select
              v-model="queryhead.modifyType"
              size="mini"
              style="width: 120px"
              placeholder="不限"
              clearable
              @change="sletchangtagtree"
            >
              <el-option
                v-for="item in allslets.tagModifyType"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="col">
            最后计算状态:
            <el-select
              v-model="queryhead.lastCalculateStatus"
              size="mini"
              style="width: 120px"
              clearable
              placeholder="不限"
              @change="sletchangtagtree"
            >
              <el-option
                v-for="item in allslets.tagLastCalculateStatus"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="last">
            <el-button size="mini" @click="crelab">创建标签</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="dwk2">
          <div class="dwk2-such">
            <el-input
              v-model="queryhead.key"
              class="such"
              @input="sletchangtagtree"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </div>

          <el-tree
            :data="treelist"
            :props="treelistprops"
            default-expand-all
            @node-click="changetree"
          >
            <span slot-scope="{ data, node }" class="custom-tree-node">
              <span class="position">
                <div v-if="node.level == 1" class="border" />
                <div v-if="node.level == 2" class="border1" />
                <img
                  v-if="node.level === 1"
                  class="one-icon"
                  :src="require('@/assets/icon/u11885.svg')"
                >
                <img
                  v-if="node.level == 2"
                  class="two-icon"
                  :src="require('@/assets/icon/u11885.svg')"
                >
                <img
                  v-if="node.level == 3"
                  :src="require('@/assets/icon/u11888.svg')"
                >
                {{ data.label }}
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="19">
        <div class="card">
          <el-card v-if="!tagBasicdata.id" class="dwk3"> 暂无数据 </el-card>
          <el-card
            v-else
            class="dwk3"
            :class="tagBasicdata.status == 0 ? 'bor-color-a1' : 'bor-color-a2'"
          >
            <div class="title">
              <i
                class="el-icon-success a1"
                :class="tagBasicdata.status == 0 ? 'a1' : 'a2'"
              />

              <span>{{
                tagBasicdata.status == 0 ? "正常运行" : "已停用"
              }}</span>
              <ul>
                <li>{{ tagBasicdata.modifyTypeValue }}更新</li>
                <li>
                  {{ tagBasicdata.createTypeValue }}
                </li>
                <li>用户名称:{{ tagBasicdata.createUserName }}</li>
              </ul>
            </div>
            <div class="tit1">{{ labelnameshow }}</div>
            <div class="tit2">
              <p>{{ tagBasicdata.remark }}</p>
              <p>
                <el-popover placement="bottom" trigger="click">
                  <div
                    v-if="tagBasicdata.status == 1"
                    class="clk"
                    @click="modifylablestatus"
                  >
                    <i class="el-icon-switch-button" /> 启用
                  </div>
                  <div v-else class="clk" @click="modifylablestatus">
                    <i class="el-icon-switch-button" /> 停用
                  </div>

                  <div
                    v-if="tagBasicdata.modifyType == 'manual'"
                    class="clk"
                    @click="manualUpdate"
                  >
                    <i class="el-icon-refresh-left" />更新
                  </div>
                  <div class="clk" @click="downloadlabel">
                    <i class="el-icon-download" />下载
                  </div>
                  <div slot="reference" class="slet">&hellip;</div>
                </el-popover>
              </p>
            </div>
            <div class="tit3">
              通过自定义的规则，将用户划分为{{
                tagBasicdata.tagLayerSize
              }}个分层，分别为
              <span
                v-for="(i, m) in tagBasicdata.tagLayerNameList"
                :key="m"
                style="cursor: pointer"
                @click="layeredshow"
              >{{ i }}</span>
              <img
                style="cursor: pointer"
                :src="require('@/assets/icon/u11997.svg')"
                alt=""
                @click="layeredshow"
              >
            </div>
          </el-card>
          <el-card
            v-if="!calculatequery1.tagId && !calculatequery.tagId"
            class="dwk4"
          >暂无数据</el-card>
          <el-card v-else class="dwk4">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="标签人数分布" name="labelnumber">
                <div>
                  <div
                    v-if="calculatedata.sum == 0 || calculatedata.sum"
                    class="hader"
                  >
                    <div>{{ calculatedata.sum }}人</div>
                    <div>
                      <span>&bull;</span>基准时间{{
                        calculatedata.baseTime
                      }}，计算完成于 {{ calculatedata.calculateTime }}
                    </div>
                  </div>
                  <div v-if="calculatecart.length == 0">暂无数据</div>
                  <div v-else class="cart">
                    <Cart1
                      :reg="regish"
                      :amt="calculatecart"
                      :height="cartheight"
                    />
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="标签历史详情" name="labelhistory">
                <div v-if="calculatecart1.length == 0">暂无数据</div>
                <div v-else>
                  <div class="cart">
                    <Cart2
                      :reg="regish1"
                      :amt="calculatecart1"
                      :height="cartheight1"
                    />
                  </div>
                  <div>
                    <el-table
                      :data="caltabulardata"
                      style="width: 100%; margin: 20px 0"
                      :header-cell-style="{
                        color: 'rgb(127,127,127)',
                        'font-size': '12px',
                        'font-weight': '400',
                        background: 'rgb(245,248,252)',
                        height: '30px',
                      }"
                      @sort-change="sortchange"
                    >
                      <el-table-column
                        min-width="240"
                        align="center"
                        sortable="custom"
                        label="标签名称"
                        prop="tagLayerName"
                      />
                      <el-table-column
                        v-for="(i, m) in timedata"
                        :key="m"
                        min-width="200"
                        align="center"
                        sortable="custom"
                        :label="i"
                        prop="tagLayerData"
                      >
                        <template slot-scope="{ row, $index }">
                          <div>
                            <span v-if="$index == 0">
                              {{ row.tagLayerData[m] }}
                            </span>
                            <span v-else>{{
                              row.tagLayerData[m]
                                ? row.tagLayerData[m].countNum
                                : 0
                            }}</span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <header v-if="activeName == 'labelnumber'">
              <i
                class="el-icon-s-data"
                :class="coloricon[0]"
                @click="hactcolor(0)"
              />
              <i
                class="el-icon-s-data"
                :class="coloricon[1]"
                @click="hactcolor(1)"
              />
              <el-select
                v-model="calculatequery.limit"
                size="mini"
                style="width: 100px"
                placeholder="请选择"
                @change="calculatelastData"
              >
                <el-option label="5项" :value="5" />
                <el-option label="10项" :value="10" />
                <el-option label="15项" :value="15" />
                <el-option label="20项" :value="20" />
              </el-select>
              <el-select
                v-model="calculatequery.sort"
                size="mini"
                style="width: 130px"
                placeholder="请选择"
                @change="calculatelastData"
              >
                <el-option label="按人数升序" value="ASC" />
                <el-option label="按人数降序" value="DESC" />
              </el-select>
            </header>
            <header v-else>
              <i
                class="el-icon-s-data"
                :class="coloricon1[0]"
                @click="hactcolor1(0)"
              />
              <i
                class="el-icon-s-data"
                :class="coloricon1[1]"
                @click="hactcolor1(1)"
              />
              <el-select
                v-model="calculatequery1.limit"
                size="mini"
                style="width: 80px"
                placeholder="请选择"
                @change="calculatehistoryData"
              >
                <el-option label="5项" :value="5" />
                <el-option label="10项" :value="10" />
                <el-option label="15项" :value="15" />
                <el-option label="20项" :value="20" />
              </el-select>
              <el-select
                v-model="calculatequery1.sort"
                size="mini"
                style="width: 115px"
                placeholder="请选择"
                @change="calculatehistoryData"
              >
                <el-option label="按人数升序" value="ASC" />
                <el-option label="按人数降序" value="DESC" />
              </el-select>
              <el-date-picker
                v-model="datavalue"
                size="mini"
                style="width: 330px"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="datavaluehandle"
              />
            </header>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 树形--ok -->
    <!-- 创建标签初始弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="通过哪种方式进行标签的创建?"
      :visible.sync="createlableish"
      @close="removeData"
    >
      <div class="crete">
        <div :class="crelabbordcolor[0]" @click="createlable(0)">
          <img :src="require('@/assets/lable/u12404.png')" alt="">
          <div>
            <div>自定义标签值</div>
            <div>自定义每个标签值的名称以及计算规则,将人群划分为多个分层</div>
          </div>
        </div>
        <div :class="crelabbordcolor[1]" @click="createlable(1)">
          <img :src="require('@/assets/lable/u12407.png')" alt="">
          <div>
            <div>基础指标值</div>
            <div>将用户完成事件的次数等指标的计算结果作为标签值</div>
          </div>
        </div>
        <div :class="crelabbordcolor[2]" @click="createlable(2)">
          <img :src="require('@/assets/lable/u12406.png')" alt="">
          <div>
            <div>首次末次特征</div>
            <div>
              将用户首次或未次完成事件的时间距额今日的天数或事件的属性作为标签值
            </div>
          </div>
        </div>
        <div :class="crelabbordcolor[3]" @click="createlable(3)">
          <img :src="require('@/assets/lable/u12405.png')" alt="">
          <div>
            <div>事件偏好属性</div>
            <div>
              将用户完成事件按照某个属性进行分组排序，使用排名前几个的分组作为标签值
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 创建用户标签 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建用户标签"
      :visible.sync="creonelab"
      @close="visidclosefrom"
    >
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
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
      <div>
        <el-form
          ref="ruleFormonelab"
          :model="ruleFormonelab"
          :rules="rulesonelab"
          label-width="100px"
          style="width: 60%; margin: 0 100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标签名称: " prop="name">
            <el-input
              v-model="ruleFormonelab.name"
              size="mini"
              clearable
              @change="tagNameUsedjudge"
            />
          </el-form-item>
          <el-form-item label="分类:" prop="parentId">
            <el-cascader
              v-model="ruleFormonelab.parentId"
              size="mini"
              :options="labelclassification"
            />
          </el-form-item>
          <el-form-item label="更新方式:" prop="modifyType">
            <div class="act">
              <el-radio-group
                v-model="ruleFormonelab.modifyType"
                size="small"
                @change="ckeckact"
              >
                <el-radio label="routine" border>例行</el-radio>
                <el-radio label="manual" border>手动</el-radio>
              </el-radio-group>
            </div>
            <div v-show="actish[0]" style="margin: 5px 0">
              按
              <el-select
                v-model="ruleFormonelab.modifyDateType"
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
              <el-form-item v-if="pickish" prop="modifyDateCustom">
                <el-date-picker
                  v-if="pickish"
                  v-model="ruleFormonelab.modifyDateCustom"
                  size="mini"
                  type="date"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickdataoption"
                />
              </el-form-item>
            </div>
            <div v-show="actish[1]">标签生成后，点击“更新”进行数据的更新。</div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="ruleFormonelab.remark"
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
    <!-- 基础指标 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建用户标签"
      class="cretors"
      :visible.sync="basicindicators"
      @close="resetindicators"
    >
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="基本信息" />
          <el-step title="规则配置" />
        </el-steps>
      </div>

      <div
        v-if="basicindlod"
        v-loading="true"
        style="
          position: absolute;
          height: 72%;
          width: 95%;
          top: 24%;
          z-index: 1000;
        "
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      />
      <div class="titslet">
        <el-form ref="datatimefrom" :model="basicinquery">
          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="calStartDate"
          >
            <Pickdata :close="closedata" @change="databasicinquerytime" />
          </el-form-item>
        </el-form>
        <el-select
          v-model="basicinquery.calEvent"
          size="mini"
          placeholder="事件"
          @change="sleteventcustom(basicinquery.calEvent, 2, 'calLat1')"
        >
          <el-option
            v-for="i in allslets.tagCalEvent"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
        <el-select
          v-model="basicinquery.calEventType"
          size="mini"
          placeholder="事件选择纬度"
        >
          <el-option
            v-for="i in sletsEvent.calLat1current"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div>
        <el-select
          v-if="sletsEvent.calLat1"
          v-model="basicinquery.calLat1"
          size="mini"
          placeholder="统计维度"
        >
          <el-option
            v-for="i in sletsEvent.calLat1"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div class="box1">
        将标签按:<el-select
          v-model="basicinquery.calRangeType"
          style="margin: 0 6px"
          size="mini"
          placeholder="统计维度"
          @change="sletscalRangeType"
        >
          <el-option
            v-for="i in allslets.tagCalRangeType"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </div>
      <div>
        <el-table
          :data="layered"
          :header-cell-style="{
            background: 'rgb(245, 248, 252)',
            height: '20px',
            'font-size': '14px',
            'font-weight': 'normal',
            border: 0,
          }"
          :cell-style="{
            border: 0,
          }"
        >
          <el-table-column label="分层" prop="name">
            <template slot-scope="{ row }">
              <div>
                <el-input v-model="row.name" size="mini" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="300"
            label="区间值 （金额字段单位：分）"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <div v-if="basicinquery.calRangeType == 1" class="interval">
                {{ $index == 0 ? "[" : "(" }}
                <el-input
                  v-model.number="row.calRangeMin"
                  size="mini"
                  style="width: 40%"
                  :disabled="row.disabled1"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-input
                  v-model.number="row.calRangeMax"
                  size="mini"
                  style="width: 40%"
                  :disabled="row.disabled2"
                  @input="inputvalidation(row.index)"
                  @change="inputchangvalidation(row.index)"
                >
                  <template slot="append">%</template> </el-input>]
              </div>

              <div v-else class="interval">
                {{ $index == 0 ? "[" : "(" }}
                <el-input
                  v-model.number="row.calRangeMin"
                  size="mini"
                  style="width: 30%"
                  placeholder=""
                />
                <el-input
                  v-model.number="row.calRangeMax"
                  size="mini"
                  style="width: 30%"
                  placeholder=""
                />]
                <a
                  style="margin: 0 10px"
                  @click="deletedata($index, layered)"
                >删除</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="basicinquery.calRangeType == 1"
            align="center"
            label="数值"
            prop="num"
          />
          <el-table-column align="center" label="用户数" prop="sum" />
        </el-table>
      </div>
      <div class="add" @click="addsection">+增加区间</div>
      <div class="estim">
        <header>预估人数</header>
        <div>
          <el-select v-model="estimatednumber" size="mini" placeholder="">
            <el-option
              v-for="i in allslets.tagPredict"
              :key="i.id"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
          <el-button
            type="primary"
            size="mini"
            @click="estimate"
          >预估</el-button>
        </div>
      </div>
      <div class="foot">
        <a @click="cancel('basicindicators')">取消</a>
        <el-button
          class="green"
          size="mini"
          :disabled="!basicindicators"
          @click="establish"
        >创建</el-button>
        <el-button
          size="mini"
          @click="previous('basicindicators')"
        >上一步</el-button>
      </div>
    </el-dialog>
    <!-- 首末次特正 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建用户标签"
      :visible.sync="firstandlast"
      @close="rejustfastandlast"
    >
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="基本信息" />
          <el-step title="规则配置" />
        </el-steps>
      </div>
      <el-form
        ref="fromfirstandlastquery"
        v-loading="fastandlastlod"
        :model="firstandlastquery"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <div class="fastlast">
          <el-form-item
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calStartDate"
          >
            <Pickdata :close="close" @change="datak1" />
          </el-form-item>
          <span>完成</span>
          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="calEvent"
          >
            <el-select
              v-model="firstandlastquery.calEvent"
              class="icon-slet"
              style="width: 150px; margin-right: 10px"
              size="mini"
              @change="
                sleteventcustom(firstandlastquery.calEvent, 3, 'calLat3')
              "
            >
              <el-option
                v-for="i in allslets.tagCalEvent"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calEventType"
          >
            <el-select
              v-model="firstandlastquery.calEventType"
              style="width: 100px"
              size="mini"
            >
              <el-option
                v-for="i in sletsEvent.calLat3current"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="fastlast">
          <el-form-item
            v-if="sletsEvent.calLat3"
            ref="calLat1"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calLat1"
          >
            <el-select
              v-model="firstandlastquery.calLat1"
              style="width: 120px; margin-right: 10px"
              size="mini"
            >
              <el-option
                v-for="i in sletsEvent.calLat3"
                :key="i.id"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="tagLayerType"
          >按照
            <el-select v-model="firstandlastquery.tagLayerType" size="mini">
              <el-option
                v-for="item1 in allslets.tagLayerType"
                :key="item1.id"
                :label="item1.label"
                :value="item1.value"
              />
            </el-select>
            执行分层
          </el-form-item>
        </div>
        <div class="estim" style="width: 95%; margin: 0 auto">
          <header>预估人数</header>
          <div>
            <el-select v-model="estimatednumber" size="mini" placeholder="">
              <el-option
                v-for="i in allslets.tagPredict"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
            <el-button
              type="primary"
              size="mini"
              @click="fromfirstandestimate"
            >预估</el-button>
          </div>
          <div
            v-if="esitimfastandlast"
            style="max-height: 200px; overflow: auto; width: 50%"
          >
            <el-table :data="esitimfastandlast">
              <el-table-column label="名称" prop="tagLayerNamePredict" />
              <el-table-column label="人数" prop="calculateNum" />
            </el-table>
          </div>
          <div class="foot">
            <a @click="cancel('firstandlast')">取消</a>
            <el-button
              class="green"
              size="mini"
              :disabled="!firstandlast"
              @click="fromfirstandestimate('cre')"
            >创建</el-button>
            <el-button
              size="mini"
              @click="previous('firstandlast')"
            >上一步</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 事件偏好 -->
    <el-dialog
      :close-on-click-modal="false"
      title="创建用户标签"
      :visible.sync="eventpreference"
      @close="crerqeustfrom"
    >
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="基本信息" />
          <el-step title="规则配置" />
        </el-steps>
      </div>
      <el-form
        ref="eventpreference"
        v-loading="eventlod"
        :model="eventpreferencequery"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <div class="fastlast">
          <el-form-item
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calStartDate"
          >
            <Pickdata :close="close" @change="datak2" />
          </el-form-item>
          <span>完成</span>
          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="calEvent"
          >
            <el-select
              v-model="eventpreferencequery.calEvent"
              class="icon-slet"
              style="width: 150px; margin-right: 10px"
              size="mini"
              @change="
                sleteventcustom(eventpreferencequery.calEvent, 4, 'calLat4')
              "
            >
              <el-option
                v-for="i in allslets.tagCalEvent"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calEventType"
          >
            <el-select
              v-model="eventpreferencequery.calEventType"
              style="width: 100px"
              size="mini"
            >
              <el-option
                v-for="i in sletsEvent.calLat4current"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="fastlast">
          <el-form-item
            v-if="sletsEvent.calLat4"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calLat1"
          >
            <el-select
              v-model="eventpreferencequery.calLat1"
              style="width: 120px; margin-right: 10px"
              size="mini"
            >
              <el-option
                v-for="i in sletsEvent.calLat4"
                :key="i.id"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
            prop="calLat2"
          >
            <el-select
              v-model="eventpreferencequery.calLat2"
              size="mini"
              style="width: 120px; margin-right: 10px"
            >
              <el-option
                v-for="i in sletsEvent.calLat4fast"
                :key="i.id"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="calLat3"
          >
            前
            <el-input
              v-model="eventpreferencequery.calLat3"
              size="mini"
              style="width: 65px; margin: 0 10px"
              placeholder=""
            />名
          </el-form-item>

          <el-form-item
            :rules="[
              { required: true, message: '不能为空', trigger: 'change' },
            ]"
            prop="tagLayerType"
          >
            &nbsp; 按照
            <el-select
              v-model="eventpreferencequery.tagLayerType"
              placeholder=""
              size="mini"
              style="width: 120px; margin: 0 10px"
            >
              <el-option
                v-for="i in allslets.tagLayerType"
                :key="i.id"
                :label="i.label"
                :value="i.value"
              />
            </el-select>
            执行分层
          </el-form-item>
        </div>
        <div class="estim" style="width: 95%; margin: 0 auto">
          <header>预估人数</header>
          <div>
            <el-select v-model="estimatednumber" size="mini" placeholder="">
              <el-option
                v-for="i in allslets.tagPredict"
                :key="i.id"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
            <el-button
              type="primary"
              size="mini"
              @click="eventpreferencefrom"
            >预估</el-button>
          </div>
          <div
            v-if="esitimeventlove"
            style="max-height: 200px; overflow: auto; width: 50%"
          >
            <el-table :data="esitimeventlove">
              <el-table-column label="名称" prop="tagLayerNamePredict" />
              <el-table-column label="人数" prop="calculateNum" />
            </el-table>
          </div>
          <div class="foot">
            <a @click="crerqeustfrom">取消</a>
            <el-button
              class="green"
              size="mini"
              :disabled="!eventpreference"
              @click="eventpreferencefrom('cre')"
            >创建</el-button>
            <el-button
              size="mini"
              @click="previous('eventpreference')"
            >上一步</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 自定义 -->
    <el-dialog
      title="创建用户标签"
      :visible.sync="custom"
      :close-on-click-modal="false"
    >
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="steps">
        <el-steps :active="2" align-center>
          <el-step title="基本信息" />
          <el-step title="规则配置" />
        </el-steps>
      </div>
      <div class="tag">
        <div
          v-for="(i, m) in tagnamelist"
          :key="m"
          :class="bordercolortag[m]"
          @click="activetag(m)"
        >
          {{ i }}
        </div>
        <div @click="addlayered">+ 添加分层</div>
      </div>
      <div class="frame">
        <div
          v-for="(i, m) in tagquerylist"
          v-show="tagdataish[m]"
          :key="m"
          class="frames"
        >
          <el-input v-model="i.name" size="mini" placeholder="分层名称" />

          <el-input
            v-model="i.describe"
            size="mini"
            placeholder="可输入分层描述"
          />
          <div class="hid">
            <img :src="require('@/assets/lable/u12682.svg')" alt="">
            <a>且</a>
            <ul>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(1, i.querychildren1, m)"
                  />
                  <span>添加属性</span>
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
                    <p>
                      <el-cascader
                        v-model="item.slet_quota_0"
                        :options="allslets.userAttribute"
                        :props="propsuserAttribute"
                        size="mini"
                        @change="
                          sleteventcustomcustone(item.slet_quota_0, 1, index, m)
                        "
                      />
                    </p>
                    <p>
                      <el-select
                        v-model="item.calEventType"
                        size="mini"
                        style="margin-left: 10px"
                      >
                        <el-option
                          v-for="item1 in item.slets2"
                          :key="item1.id"
                          :label="item1.label"
                          :value="item1.value"
                        />
                      </el-select>
                    </p>
                    <p>
                      <el-select v-model="item.slet_0" size="mini">
                        <el-option
                          v-for="item1 in item.slets1"
                          :key="item1.id"
                          :label="item1.label"
                          :value="item1.value"
                        />
                      </el-select>
                    </p>
                    <p>
                      <el-input
                        v-model="item.input_0"
                        size="mini"
                        style="width: 80px; margin: 0 10px 0 0"
                      />
                    </p>

                    <p>
                      <i class="el-icon-edit" />

                      <el-popover placement="top" width="300" trigger="hover">
                        <el-table
                          empty-text="暂无提示"
                          :data="item.slets4"
                          style="border: 0"
                          :header-cell-style="{ border: 0 }"
                        >
                          <el-table-column
                            v-if="item.slets4.length != 0"
                            label=" 提示信息"
                            prop="label"
                          />
                          <el-table-column
                            v-if="item.slets4.length != 0"
                            label="输入值示例"
                            prop="value"
                          />
                        </el-table>
                        <i
                          slot="reference"
                          class="el-icon-question"
                          style="cursor: pointer"
                          @click="tips"
                        />
                      </el-popover>
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(2, i.querychildren2, m)"
                  />
                  <span>添加行为</span>
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
                        style="width: 340px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      />
                    </div>

                    <el-select
                      v-model="item.slet_y_0"
                      style="width: 150px"
                      size="mini"
                    >
                      <el-option
                        v-for="item2 in allslets.tagCalLat4"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      />
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
                        v-for="item_slet in allslets.tagCalEvent"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.calEventType"
                      style="width: 120px"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="item_slet in item.slets3"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.slet_frequency_0"
                      cal-event-type
                      style="width: 120px; margin: 10px 0"
                      size="mini"
                    >
                      <el-option
                        v-for="item_slet in item.slets1"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.slet_judge_0"
                      style="width: 120px"
                      size="mini"
                    >
                      <el-option
                        v-for="item2 in item.slets2"
                        :key="item2.id"
                        :label="item2.item2"
                        :value="item2.value"
                      />
                    </el-select>
                    <el-input
                      v-model="item.input_frequency_0"
                      class="k6"
                      size="mini"
                      style="margin: 10px 0"
                    />
                  </div>
                </div>
              </li>
              <li>
                <div class="add-plus">
                  <i
                    class="el-icon-plus"
                    @click="usersatisfactionadd(3, i.querychildren3, m)"
                  />
                  <span>添加序列</span>
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
                    <div
                      style="display: flex; width: 100%; align-items: center"
                    >
                      <el-date-picker
                        v-model="item.pick_data_0"
                        size="mini"
                        type="daterange"
                        style="width: 350px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      />
                      <i
                        class="el-icon-plus plus-oper"
                        @click="addslets(item.slet_loan_0)"
                      />
                      <span>添加事件</span>
                    </div>
                    <div
                      v-for="(scotem, n) in item.slet_loan_0"
                      :key="n"
                      class="event-dime"
                    >
                      <!-- <el-select
                        v-model="scotem.dimension"
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="item_slet in allslets.tagCalEventType"
                          :key="item_slet.id"
                          :label="item_slet.label"
                          :value="item_slet.value"
                        />
                      </el-select> -->
                      <el-select
                        v-model="scotem.event"
                        class="icon-slet"
                        size="mini"
                      >
                        <el-option
                          v-for="slet in allslets.tagCalEvent"
                          :key="slet.id"
                          :value="slet.value"
                          :label="slet.label"
                        />
                      </el-select>
                      <i
                        v-show="n != 0"
                        class="el-icon-minus minus-oper"
                        @click="delslets(item.slet_loan_0, n)"
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
          <el-select v-model="estimatednumber" size="mini" placeholder="">
            <el-option
              v-for="i in allslets.tagPredict"
              :key="i.id"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
          <el-button
            type="primary"
            size="mini"
            @click="estimatecustom"
          >预估</el-button>
        </div>
        <div
          v-if="estimatecustomization"
          style="width: 50%; height: 200px; overflow: auto"
        >
          <el-table :data="estimatecustomization">
            <el-table-column label="名称" prop="tagLayerNamePredict" />
            <el-table-column label="人数" prop="calculateNum" />
          </el-table>
        </div>
        <div class="foot">
          <a @click="cancel('custom')">取消</a>
          <el-button
            class="green"
            :disabled="!custom"
            size="mini"
            @click="customcreate"
          >创建</el-button>
          <el-button size="mini" @click="previous('custom')">上一步</el-button>
        </div>
      </div>
      <div
        v-if="customlod"
        v-loading="true"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
        class="custlod"
      />
    </el-dialog>
    <!-- 自定义回显 -->
    <el-dialog title="自定义标签" :visible.sync="customdatashow">
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
        style="margin-bottom: 20px"
      />
      <div class="tag">
        <div
          v-for="(i, m) in showdatastoreList.customList.customVo"
          :key="m"
          :class="bordercolortag[m]"
          @click="activetag(m)"
        >
          {{ i.name }}
        </div>
        <div style="display: none" />
      </div>
      <div
        v-loading="customlod"
        class="frame"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)"
      >
        <div
          v-for="(i, m) in showdatastoreList.customList.customVo"
          v-show="tagdataish[m]"
          :key="m"
          class="frames"
        >
          <el-input v-model="i.name" size="mini" placeholder="分层名称" />
          <el-input
            v-model="i.description"
            size="mini"
            placeholder="可输入分层描述"
          />
          <div class="hid">
            <img :src="require('@/assets/lable/u12682.svg')" alt="">
            <a>且</a>
            <ul>
              <li>
                <div
                  v-for="(item, index) in i.attributeList"
                  :key="index"
                  class="attr1"
                >
                  <p>
                    <span>用户属性满足</span>
                  </p>
                  <div>
                    <p>
                      <el-cascader
                        v-model="item.calEvent"
                        :options="allslets.userAttribute"
                        :props="propsuserAttribute"
                        size="mini"
                        disabled
                      />
                    </p>
                    <p>
                      <el-select
                        v-model="item.calEventType"
                        size="mini"
                        disabled
                        style="margin-left: 10px"
                      >
                        <el-option
                          v-for="item1 in allslets.tagCalEventType"
                          :key="item1.id"
                          :label="item1.label"
                          :value="item1.value"
                        />
                      </el-select>
                    </p>
                    <p>
                      <el-select v-model="item.calLat2" size="mini" disabled>
                        <el-option
                          v-for="item1 in allslets.tagCalLat2"
                          :key="item1.id"
                          :label="item1.label"
                          :value="item1.value"
                        />
                      </el-select>
                    </p>
                    <p>
                      <el-input
                        v-model="item.calLat3"
                        size="mini"
                        style="width: 80px; margin: 0 10px 0 0"
                        disabled
                      />
                    </p>

                    <p />
                  </div>
                </div>
              </li>
              <li>
                <div
                  v-for="(item, index) in i.actionList"
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
                        type="daterange"
                        style="width: 340px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </div>

                    <el-select
                      v-model="item.calLat4"
                      style="width: 150px"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item2 in allslets.tagCalLat4"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.calEvent"
                      class="icon-slet"
                      style="width: 160px"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item_slet in allslets.tagCalEvent"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.calEventType"
                      style="width: 120px"
                      placeholder="请选择"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item_slet in allslets.tagCalEventType"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.calLat2"
                      style="width: 120px; margin: 10px 0"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item_slet in allslets.tagCalLat2"
                        :key="item_slet.id"
                        :label="item_slet.label"
                        :value="item_slet.value"
                      />
                    </el-select>
                    <el-select
                      v-model="item.calLat1"
                      style="width: 120px"
                      size="mini"
                      disabled
                    >
                      <el-option
                        v-for="item2 in allslets.tagCalLat1"
                        :key="item2.id"
                        :label="item2.label"
                        :value="item2.value"
                      />
                    </el-select>
                    <el-input
                      v-model="item.calLat3"
                      class="k6"
                      size="mini"
                      style="margin: 10px 0"
                      disabled
                    />
                  </div>
                </div>
              </li>
              <li>
                <div
                  v-for="(item, index) in i.behaviorList"
                  :key="index"
                  class="attr3"
                >
                  <p>
                    <span>行为序列</span>
                  </p>
                  <div>
                    <div
                      style="display: flex; width: 100%; align-items: center"
                    >
                      <el-date-picker
                        v-model="item.pickdata"
                        size="mini"
                        type="daterange"
                        style="width: 350px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        disabled
                      />
                    </div>
                    <div
                      v-for="(scotem, n) in item.calEventSpilt"
                      :key="n"
                      class="event-dime"
                    >
                      <el-select
                        v-model="item.calEventSpilt[n]"
                        class="icon-slet"
                        size="mini"
                        disabled
                      >
                        <el-option
                          v-for="slet in allslets.tagCalEvent"
                          :key="slet.id"
                          :value="slet.label"
                          :label="slet.label"
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
    <!-- 基础指标回显 -->
    <el-dialog title="基础指标" :visible.sync="hierarchicaldataecho">
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="titslet">
        <el-date-picker
          v-model="showdatastoreList.basicindicators.pickdata"
          size="mini"
          type="daterange"
          style="width: 340px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          disabled
        />
        <el-select
          v-model="showdatastoreList.basicindicators.calEvent"
          size="mini"
          placeholder="事件"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalEvent"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
        <el-select
          v-model="showdatastoreList.basicindicators.calEventType"
          disabled
          size="mini"
          placeholder="事件选择纬度"
        >
          <el-option
            v-for="i in allslets.tagCalEventType"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="showdatastoreList.basicindicators.calLat1"
          disabled
          size="mini"
          placeholder="统计维度"
        >
          <el-option
            v-for="i in allslets.tagCalLat1"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div class="box1">
        将标签按:<el-select
          v-model="showdatastoreList.basicindicators.calRangeType"
          disabled
          style="margin: 0 6px"
          size="mini"
          placeholder="统计维度"
        >
          <el-option
            v-for="i in allslets.tagCalRangeType"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
      </div>
      <div>
        <el-table
          :data="showdatastoreList.basicindicators.subVoList"
          :header-cell-style="{
            background: 'rgb(245, 248, 252)',
            height: '20px',
            'font-size': '14px',
            'font-weight': 'normal',
            border: 0,
          }"
          :cell-style="{
            border: 0,
          }"
        >
          <el-table-column label="分层" prop="name">
            <template slot-scope="{ row }">
              <div>
                <el-input v-model="row.name" size="mini" disabled />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="300"
            label="区间值 （金额字段单位：分）"
            align="center"
          >
            <template slot-scope="{ row }">
              <div
                v-if="showdatastoreList.basicindicators.calRangeType == 1"
                class="interval"
              >
                [
                <el-input
                  v-model.number="row.calRangeMin"
                  disabled
                  size="mini"
                  style="width: 40%"
                >
                  <template slot="append">%</template>
                </el-input>
                <el-input
                  v-model.number="row.calRangeMax"
                  size="mini"
                  style="width: 40%"
                  disabled
                >
                  <template slot="append">%</template> </el-input>]
              </div>
              <div v-else class="interval">
                [
                <el-input
                  v-model.number="row.calRangeMin"
                  disabled
                  size="mini"
                  style="width: 30%"
                />
                <el-input
                  v-model.number="row.calRangeMax"
                  size="mini"
                  style="width: 30%"
                  disabled
                />]
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 首末次回显 -->
    <el-dialog title="首末次特征" :visible.sync="fastandlastshow">
      <div class="fastlast">
        <el-date-picker
          v-model="showdatastoreList.characteristicsList.pickdata"
          size="mini"
          type="daterange"
          style="width: 340px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          disabled
        />
        <span>完成</span>
        <el-select
          v-model="showdatastoreList.characteristicsList.calEvent"
          class="icon-slet"
          style="width: 150px; margin-right: 10px"
          size="mini"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalEvent"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>

        <el-select
          v-model="showdatastoreList.characteristicsList.calEventType"
          style="width: 100px"
          size="mini"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalEventType"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div class="fastlast">
        <el-select
          v-model="showdatastoreList.characteristicsList.calLat1"
          disabled
          style="width: 120px; margin-right: 10px"
          size="mini"
        >
          <el-option
            v-for="i in allslets.tagCalLat1"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
        &nbsp; 按照&nbsp;
        <el-select
          v-model="showdatastoreList.characteristicsList.tagLayerType"
          disabled
          size="mini"
        >
          <el-option
            v-for="item1 in allslets.tagLayerType"
            :key="item1.id"
            :label="item1.label"
            :value="item1.value"
          />
        </el-select>
        &nbsp; 执行分层
      </div>
    </el-dialog>
    <!-- 事件偏好回显 -->
    <el-dialog title="事件偏好" :visible.sync="eventpreferenceshow">
      <el-alert
        title="例行标签计算规则中若包含今日数据，则会推迟至明日凌晨进行计算"
        type="warning"
        show-icon
        :closable="false"
      />

      <div class="fastlast event-show">
        <el-date-picker
          v-model="showdatastoreList.eventpreferenceList.pickdata"
          size="mini"
          type="daterange"
          style="width: 340px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          disabled
        />

        <span>完成</span>

        <el-select
          v-model="showdatastoreList.eventpreferenceList.calEvent"
          class="icon-slet"
          style="width: 150px; margin-right: 10px"
          size="mini"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalEvent"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>

        <el-select
          v-model="showdatastoreList.eventpreferenceList.calEventType"
          style="width: 100px"
          size="mini"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalEventType"
            :key="i.id"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </div>
      <div class="fastlast">
        <el-select
          v-model="showdatastoreList.eventpreferenceList.calLat1"
          style="width: 120px; margin-right: 10px"
          size="mini"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalLat1"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>

        <el-select
          v-model="showdatastoreList.eventpreferenceList.calLat2"
          placeholder=""
          size="mini"
          style="width: 120px"
          disabled
        >
          <el-option
            v-for="i in allslets.tagCalLat2"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>

        前
        <el-input
          v-model="showdatastoreList.eventpreferenceList.calLat3"
          disabled
          size="mini"
          style="width: 65px"
          placeholder=""
        />名 &nbsp; 按照
        <el-select
          v-model="showdatastoreList.eventpreferenceList.tagLayerType"
          disabled
          placeholder=""
          size="mini"
          style="width: 120px; margin: 0 10px"
        >
          <el-option
            v-for="i in allslets.tagLayerType"
            :key="i.id"
            :label="i.label"
            :value="i.value"
          />
        </el-select>
        执行分层
      </div>
    </el-dialog>
    <!-- 遮罩层loding -->
    <div
      v-if="lod"
      v-loading="true"
      class="app-loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
    />
  </div>
</template>

<script>
import Cart1 from '@/assembly/lablecart/lablecartheck.vue'
import Cart2 from '@/assembly/lablecart/htortycart.vue'
import activecheck from '@/assembly/createlable/activecheck.vue'
import Pickdata from '@/assembly/createlable/pickdata.vue'
import {
  selecttagTree,
  tagBasic,
  calculatelastData,
  calculatehistoryData,
  tagNameUsedjudge,
  predictestimate,
  createpredict,
  custompredict,
  customtagcreate,
  manualUpdatelable,
  modifylablestatus,
  selectcalLat1,
  character,
  preferencecreate,
  preferencepredictevevt,
  characterpredict,
  tagSettingshow,
  downloadlabel,
  tagSettingshow2,
  tagSettingshow3,
  selectTips
} from '@/api/userportrait'
import { sysdict, sysdicttree, sysdictlist } from '@/api/user'

export default {
  components: {
    Cart1,
    Cart2,
    activecheck,
    Pickdata
  },
  data() {
    return {
      basicindlod: false,
      eventlod: false,
      fastandlastlod: false,
      customlod: false,
      propsuserAttribute: {
        label: 'label',
        children: 'children',
        value: 'value',
        emitPath: false
      },
      propsuserAttribute: {
        label: 'label',
        children: 'children',
        value: 'value',
        emitPath: false
      },
      close: false,
      labelnameshow: '',
      lod: false,
      // 分层数据回显
      // 自定义
      customdatashow: false,
      // 基础指标
      hierarchicaldataecho: false,
      // 首末次
      fastandlastshow: false,
      // 事件偏好
      eventpreferenceshow: false,
      // 回显数据存储
      showdatastoreList: {
        customList: {},
        basicindicators: {},
        characteristicsList: {},
        eventpreferenceList: {}
      },
      // 新建分层
      tagnamelist: ['分层1', '分层2'],
      layeredindex: 2,
      bordercolortag: ['tagb1', ''],
      tagdataish: [true, false],
      slet_loan_event: [{ event: '' }],
      tagquerylist: [
        {
          sort: 1,
          name: '分层1',
          describe: '',
          userattributeindex: 0,
          userbehaviorindex: 0,
          usersequenceindex: 0,
          querychildren1: [
            {
              slet_quota_0: '',
              slet_0: '',
              input_0: '',
              sort: 0,
              calEventType: '',
              // 下拉框存储
              slets1: [],
              slets2: [],
              slets4: []
            }
          ],
          querychildren2: [
            {
              pick_data_0: [],
              slet_y_0: '',
              slet_apply_0: '',
              slet_frequency_0: '',
              slet_judge_0: '',
              calEventType: '',
              input_frequency_0: '',
              sort: 0,
              // 下拉框存储
              slets1: [],
              slets2: [],
              slets3: []
            }
          ],
          querychildren3: [
            {
              pick_data_0: [],
              slet_loan_0: [{ event: '', id: 'srtyt1', dimension: '' }],
              sort: 0,

              // 下拉框存储
              slets1: [],
              slets2: []
            }
          ]
        },
        {
          sort: 2,
          name: '分层2',
          describe: '',
          userattributeindex: 0,
          userbehaviorindex: 0,
          usersequenceindex: 0,
          querychildren1: [
            {
              slet_quota_0: '',
              slet_0: '',
              input_0: '',
              sort: 0,
              calEventType: '',
              // 下拉框存储
              slets1: [],
              slets2: [],
              slets4: []
            }
          ],
          querychildren2: [
            {
              pick_data_0: [],
              slet_y_0: '',
              slet_apply_0: '',
              slet_frequency_0: '',
              slet_judge_0: '',
              input_frequency_0: '',
              calEventType: '',
              sort: 0,
              // 下拉框存储
              slets1: [],
              slets2: [],
              slets3: []
            }
          ],
          querychildren3: [
            {
              pick_data_0: [],
              // slet_apply_0: "",
              slet_loan_0: [{ event: '', id: 'skyt1', dimension: '' }],
              sort: 0,

              // 下拉框存储
              slets1: [],
              slets2: []
            }
          ]
        }
      ],
      // 自定义
      // estimatednumber: "",
      closedata: false,
      // 新建分层
      format: 1,
      lablecreindex: null,
      crelabbordcolor: ['b2', 'b2', 'b2', 'b2'],
      createlableish: false,
      creonelab: false,
      stepsactive: 1,
      ishslet: true,
      datavalue: [],
      regish: false,
      regish1: true,
      activeName: 'labelnumber',
      // 标签管理-标签树-查询
      queryhead: {
        status: '',
        createTypeList: '',
        modifyType: '',
        lastCalculateStatus: '',
        key: ''
      },
      // 标签人数数据
      calculatequery: {
        limit: 5,
        sort: 'DESC',
        tagId: null
      },
      // 标签历史数据
      calculatequery1: {
        endDate: '',
        startDate: '',
        limit: 5,
        sort: 'DESC',
        tagId: null
      },
      // 标签人数数据保存
      calculatedata: {},
      calculatedata1: [],
      // 图表数据
      calculatecart: [],
      calculatecart1: [],
      // 标签人数图表
      cartheight: '240px',
      cartheight1: '240px',
      // 数据分层表
      sletlayered: '',
      // 创建方式标签数组
      createTypeList: [],
      // 分层表格数据
      caltabulardata: [],
      // 标签时间
      timedata: [],
      // 标签基本数据
      tagBasicdata: {},
      actish: [false, false],
      actish1: [false, false],
      coloricon: ['ci1', ''],
      coloricon1: ['', 'ci1'],
      animt: '',
      amtish: false,
      creation: [
        { val: 1, lable: '自定义标签值' },
        { val: 2, lable: '基础指标值' },
        { val: 3, lable: '首末次特征' },
        { val: 4, lable: '事件偏好属性' }
      ],
      treelist: [
        {
          label: '静态标签',
          id: 1,
          children: [
            {
              label: '基本特征',
              id: 101,
              children: null
            },
            {
              label: '位置特征',
              id: 102,
              children: null
            },
            {
              label: '设备特征',
              id: 103,
              children: null
            },
            {
              label: '兴趣特征',
              id: 104,
              children: null
            },
            {
              label: '兴趣特征',
              id: 105,
              children: null
            }
          ]
        },
        {
          label: '动态标签',
          id: 2,
          children: [
            {
              label: '消费特征',
              id: 204,
              children: null
            },
            {
              label: '行为特征',
              id: 206,
              children: null
            },
            {
              label: '社交特征',
              id: 207,
              children: null
            }
          ]
        }
      ],
      treelistprops: {
        label: 'label',
        children: 'children'
      },
      //
      rulesonelab: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        parentId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        modifyDateType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        modifyDateCustom: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      actdom: '',
      // 公用第一步表单数据
      ruleFormonelab: {
        name: '',
        parentId: '',
        // 天，周，月，自定义
        modifyDateType: 'day',
        modifyType: 'routine',
        // 备注
        remark: '',
        // 自定义时间
        modifyDateCustom: ''
      },
      pickdataoption: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      pickish: false,
      // 自定义弹框
      custom: false,
      // 自定义弹框
      // 事件偏好
      eventpreference: false,
      // 事件偏好数据
      eventpreferencequery: {
        calStartDate: '',
        calEvent: '',
        calEndDate: '',
        calLat1: '',
        calLat2: '',
        calLat3: '',
        createType: 4,
        tagLayerType: '',
        calEventType: ''
      },
      // 事件偏好
      // 首末次特正
      firstandlast: false,
      // 首末次特征数据
      firstandlastquery: {
        calStartDate: '',
        calEvent: '',
        calEndDate: '',
        calLat1: '',
        createType: 3,
        tagLayerType: '',
        calEventType: ''
      },
      // 首末次特正
      // 基础指标
      basicindicators: false,
      // 基础指标-数据表单
      basicinquery: {
        calEvent: '',
        calLat1: '',
        createType: '2',
        calStartDate: '',
        calEndDate: '',
        calRangeType: '',
        calEventType: ''
      },
      // 分层数据
      layered: [
        {
          index: 0,
          name: '分层1',
          calRangeMin: 0,
          calRangeMax: '',
          disabled1: true,
          disabled2: false,
          sort: 1,
          num: '',
          sum: ''
        },
        {
          name: '分层2',
          index: 1,
          calRangeMin: '',
          calRangeMax: '',
          disabled1: true,
          disabled2: true,
          sort: 2,
          num: '',
          sum: ''
        },
        {
          index: 2,
          name: '分层3',
          calRangeMin: '',
          calRangeMax: '100',
          disabled1: true,
          disabled2: true,
          sort: 3,
          num: '',
          sum: ''
        }
      ],
      sectionindex: 3,
      // 预估人数
      estimatednumber: '',
      // 基础指标--完结
      // 下拉框-标签分类
      labelclassification: [],
      // 自定义-数据
      layerList: [],
      // 所有下拉框
      allslets: {
        // 总次数-总金额
        tagCalLat1: [],
        // 按百分比-按数值
        tagCalRangeType: [],
        // 事件
        tagCalEvent: [],
        // 按全量计算
        tagPredict: [],
        // 事件选择
        tagCalEventType: [],
        // 省份
        tagLayerType: [],
        // 树形事件
        userAttribute: [],
        // 做过没做过
        tagCalLat4: [],
        // 大于不等于
        tagCalLat2: [],
        // 首末次
        tagLayerType1: [],
        // 正常运行
        tagStatus: [],
        // 创建方式
        tagCreateType: [],
        // 手动例行
        tagModifyType: [],
        // 成功失败计算中
        tagLastCalculateStatus: []
      },
      // 事件选择下拉维度
      sletsEvent: {
        calLat1: null,
        calLat2: null,
        calLat3: null,
        calLat4: null,
        calLat4fast: null,
        calLat2fast: null,
        calLat3fast: null,
        calLat1fast: null,
        calLat4current: null,
        calLat2current: null,
        calLat3current: null,
        calLat1current: null
      },
      validatefromlayeredish: false,
      // 预估-事件偏好
      esitimeventlove: null,
      // 预估-首末次特征
      esitimfastandlast: null,
      // 自定义预估
      estimatecustomization: null,
      //
      top: 0,
      tipsList: []
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.datavalue = [start, end]
    this.sletchangtagtree()
    this.sletall()
    window.addEventListener('scroll', this.scrollEventloding, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEventloding)
  },
  methods: {
    // 重置所有数据
    removeData() {
      this.tagquerylist = this.$options.data().tagquerylist
      this.ruleFormonelab = this.$options.data().ruleFormonelab
      this.eventpreferencequery = this.$options.data().eventpreferencequery
      this.layered = this.$options.data().layered
      this.basicinquery = this.$options.data().basicinquery
      this.firstandlastquery = this.$options.data()
    },
    // 自定义数据重置
    customdatafast() {
      this.tagquerylist = this.$options.data().tagquerylist
      this.tagnamelist = ['分层1', '分层2']
      this.layeredindex = 2
      this.bordercolortag = ['tagb1', '']
      this.tagdataish = [true, false]
    },
    // 提示信息
    tips() {},
    async sleteventcustomcustone(data, id, index, m) {
      this.tagquerylist[m].querychildren1[index].slet_0 = ''
      this.tagquerylist[m].querychildren1[index].calEventType = ''
      this.customlod = true
      const res2 = await tagSettingshow3(data, id).catch(() => {
        this.customlod = false
      })
      const res1 = await tagSettingshow2(data, id, 1).catch(() => {
        this.customlod = false
      })
      const res3 = await selectTips(data).catch(() => {
        this.customlod = false
      })
      this.customlod = false
      this.tagquerylist[m].querychildren1[index].slets1 = res1.data
      this.tagquerylist[m].querychildren1[index].slets2 = res2.data
      this.tagquerylist[m].querychildren1[index].slets4 = res3.data
    },
    // 树形事件
    // handleChange(data, id) {},
    // 根据事件下拉框选择下拉维度-自定义
    async sleteventcustomcust(data, id, index, m) {
      this.tagquerylist[m].querychildren2[index].calEventType = ''
      this.tagquerylist[m].querychildren2[index].slet_frequency_0 = ''
      this.tagquerylist[m].querychildren2[index].slet_judge_0 = ''
      this.customlod = true
      const res1 = await selectcalLat1(data, id).catch(() => {
        this.customlod = false
      })
      const res2 = await tagSettingshow2(data, id, 0).catch(() => {
        this.customlod = false
      })
      const res3 = await tagSettingshow3(data, id).catch(() => {
        this.customlod = false
      })
      this.customlod = false
      this.tagquerylist[m].querychildren2[index].slets1 = res1.data
      this.tagquerylist[m].querychildren2[index].slets2 = res2.data
      this.tagquerylist[m].querychildren2[index].slets3 = res3.data
    },
    // 根据事件下拉框选择下拉维度
    async sleteventcustom(data, id, name) {
      this.eventlod = true
      this.fastandlastlod = true
      this.basicindlod = true
      const res2 = await tagSettingshow2(data, id, 0).catch(() => {
        this.fastandlastlod = false
        this.eventlod = false
        this.basicindlod = false
      })
      const res1 = await selectcalLat1(data, id).catch(() => {
        this.fastandlastlod = false
        this.eventlod = false
        this.basicindlod = false
      })
      const res3 = await tagSettingshow3(data, id).catch(() => {
        this.fastandlastlod = false
        this.eventlod = false
        this.basicindlod = false
      })
      this.fastandlastlod = false
      this.eventlod = false
      this.basicindlod = false
      if (res1.code !== 200) {
        return this.$message.error(res1.message)
      }
      if (res2.code !== 200) {
        return this.$message.error(res2.message)
      }
      if (res3.code !== 200) {
        return this.$message.error(res2.message)
      }
      this.sletsEvent[name] = res1.data
      this.sletsEvent[`${name}fast`] = res2.data
      this.sletsEvent[`${name}current`] = res3.data
      this.eventpreferencequery.calLat2 = ''
      this.basicinquery.calEventType = ''
      this.basicinquery.calLat1 = ''
      this.eventpreferencequery.calLat1 = ''
      this.eventpreferencequery.calEventType = ''
      this.firstandlastquery.calEventType = ''
      this.firstandlastquery.calLat1 = ''
    },
    // 下载标签
    async downloadlabel() {
      this.lod = true
      const res = await downloadlabel(this.calculatequery.tagId).catch(
        (err) => {
          this.lod = false
          const { message, response } = err
          if (response.status == 403) {
            this.$message.error('权限不足')
          } else {
            this.$message.error(response.data.message)
          }
          return
        }
      )
      this.lod = false
      if (res.code !== 200) {
        return this.$message.errorres.message
      }
      const blob = new Blob([res], {
        type: 'application/vnd.ms-excel'
      }) // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
      const url = window.URL.createObjectURL(blob) // 3.创建一个临时的url指向blob对象
      // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
      const a = document.createElement('a')
      a.href = url
      a.download = '标签.xls'
      a.click()
      // 5.释放这个临时的对象url
      window.URL.revokeObjectURL(url)
    },
    changetree({ id, label, level }) {
      if (level != 3) return
      this.labelnameshow = label
      this.calculatequery1.startDate = this.datavalue[0]
      this.calculatequery1.endDate = this.datavalue[1]
      this.calculatequery.tagId = id
      this.calculatequery1.tagId = id
      this.tagBasic(id)
      this.calculatelastData()
      this.calculatehistoryData()
    },
    // 分层回显
    async layeredshow() {
      this.lod = true
      const { data } = await tagSettingshow(this.calculatequery.tagId).catch(
        (err) => {
          const { response } = err
          this.lod = false
          this.$message.error(response.data.message)
          return
        }
      )
      this.lod = false
      switch (data.createType) {
        case 1:
          data.customVo.forEach((item) => {
            item.actionList.forEach((i) => {
              i['pickdata'] = [i.calStartDate, i.calEndDate]
            })
            item.behaviorList.forEach((i) => {
              i['pickdata'] = [i.calStartDate, i.calEndDate]
            })
          })
          this.showdatastoreList.customList = data

          this.customdatashow = true
          break
        case 2:
          this.showdatastoreList.basicindicators = data.uioVo
          this.showdatastoreList.basicindicators['pickdata'] = [
            data.uioVo.calStartDate,
            data.uioVo.calEndDate
          ]
          this.hierarchicaldataecho = true
          break
        case 3:
          this.showdatastoreList.characteristicsList = data.characterVo
          this.fastandlastshow = true
          this.showdatastoreList.characteristicsList['pickdata'] = [
            data.characterVo.calStartDate,
            data.characterVo.calEndDate
          ]
          break
        case 4:
          this.showdatastoreList.eventpreferenceList = data.preferenceVo
          this.showdatastoreList.eventpreferenceList['pickdata'] = [
            data.preferenceVo.calStartDate,
            data.preferenceVo.calEndDate
          ]
          this.eventpreferenceshow = true
          break
      }
    },

    // 校验值
    intercalRangeMinnubber(min, max) {
      if (max < min) {
        this.$message.error('最大值必须大于等与最小值')
      }
    },
    // 删除
    deletedata(v, m) {
      m.splice(v, 1)
    },
    // 事件偏好-创建
    async createeventpreferenc() {
      const from = {
        parentId: this.ruleFormonelab.parentId[1],
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark,
        ...this.eventpreferencequery
      }
      this.eventlod = true
      const res = await preferencecreate(from).catch((err) => {
        this.eventlod = false
        const { response } = err
        this.$message.error(response.data.message)
        return
      })
      if (res.code !== 200) {
        this.eventlod = false
        return this.$message.error(res.message)
      }
      this.eventpreference = false
      this.$message.success(res.message)
      this.eventpreferencequery = this.$options.data().eventpreferencequery
      this.visidclosefrom()
      this.resetindicators()
      this.crerqeustfrom()
      this.basicinquery = this.$options.data().basicinquery
      this.creonelab = false
      this.createlableish = false
      this.estimatednumber = this.allslets.tagPredict[0].value
      this.sletchangtagtree()
      this.esitimeventlove = null
      this.eventlod = false
    },
    // 事件偏好属性-校验
    eventpreferencefrom(cre) {
      if (isNaN(this.eventpreferencequery.calLat3 - 0)) {
        return this.$message.error('前X名必须是数字')
      }
      this.$refs['eventpreference'].validate((val) => {
        if (val) {
          if (cre == 'cre') {
            this.createeventpreferenc()
          } else {
            this.preferencepredictevevt()
          }
        }
      })
    },
    // 时间偏好-表单重置
    crerqeustfrom() {
      if (this.$refs['eventpreference'] !== undefined) {
        this.$refs['eventpreference'].resetFields()
      }
      this.close = Math.random() + new Date()
      this.eventpreferencequery = this.$options.data().eventpreferencequery
      this.eventpreference = false
      this.esitimeventlove = null
    },
    // 预估-时间偏好
    async preferencepredictevevt() {
      const from = {
        parentId: this.ruleFormonelab.parentId[1],
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark,
        ...this.eventpreferencequery
      }
      this.lod = true
      const { data } = await preferencepredictevevt(
        from,
        this.estimatednumber
      ).catch((err) => {
        const { response } = err
        this.lod = false
        this.$message.error(response.data.message)
        return
      })
      this.lod = false
      this.esitimeventlove = data
    },
    // 首摸次-表单验证
    fromfirstandestimate(met) {
      this.$refs['fromfirstandlastquery'].validate((val) => {
        if (val) {
          if (met == 'cre') {
            this.createfastandlast()
          } else {
            this.characterpredict()
          }
        }
      })
    },
    // 首次模特正-创建
    async createfastandlast() {
      const from = {
        parentId: this.ruleFormonelab.parentId[1],
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark,
        ...this.firstandlastquery
      }
      this.fastandlastlod = true
      const res = await character(from).catch((err) => {
        this.fastandlastlod = false
        const { response } = err
        this.$message.error(response.data.message)
        return
      })
      if (res.code !== 200) {
        this.fastandlastlod = false
        return this.$message.error(res.message)
      }
      this.firstandlast = false
      this.$message.success(res.message)
      this.firstandlastquery = this.$options.data().firstandlastquery
      this.visidclosefrom()
      this.resetindicators()
      this.rejustfastandlast()
      this.basicinquery = this.$options.data().basicinquery
      this.creonelab = false
      this.createlableish = false
      this.estimatednumber = this.allslets.tagPredict[0].value
      this.sletchangtagtree()
      this.esitimfastandlast = null
      this.fastandlastlod = false
    },
    // 首末次-预估
    async characterpredict() {
      const from = {
        parentId: this.ruleFormonelab.parentId[1],
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark,
        ...this.firstandlastquery
      }
      this.fastandlastlod = true
      const { data } = await characterpredict(from, this.estimatednumber).catch(
        (err) => {
          this.fastandlastlod = false
          const { response } = err
          this.$message.error(response.data.message)
          return
        }
      )
      this.fastandlastlod = false
      this.esitimfastandlast = data
    },
    // 首末次重置
    rejustfastandlast() {
      if (this.$refs['fromfirstandlastquery'] !== undefined) {
        this.$refs['fromfirstandlastquery'].resetFields()
      }
      this.close = Math.random() + new Date()
      this.firstandlastquery = this.$options.data().firstandlastquery
      this.esitimfastandlast = null
    },
    // 自定义-新增事件
    addslets(m) {
      if (m.length > 1) {
        return this.$message.error('最多有两个事件')
      }
      m.push({ event: '', dimension: '' })
    },
    // 自定义-删除事件
    delslets(m, index) {
      if (index == 0) return
      m.splice(index, 1)
    },
    // 启停用
    async modifylablestatus() {
      this.lod = true
      const res = await modifylablestatus(this.calculatequery.tagId).catch(
        (err) => {
          this.lod = false
          const { response } = err
          this.$message.error(response.data.message)
          return
        }
      )
      this.lod = false
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
      this.tagBasic(this.calculatequery.tagId)
    },
    // 手动更新
    async manualUpdate() {
      this.lod = true
      const res = await manualUpdatelable(this.calculatequery.tagId).catch(
        (err) => {
          this.lod = false
          const { response } = err
          this.$message.error(response.data.message)
          return
        }
      )
      this.lod = false
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.calculatehistoryData()
      this.$message.success('更新成功')
    },
    // 判断是否按百分比
    sletscalRangeType(val) {
      if (val == this.allslets.tagCalRangeType[0].value) {
        this.layered = this.$options.data().layered
      } else {
        this.layered = this.$options.data().layered
        this.layered.forEach((item) => {
          item.calRangeMin = ''
          item.calRangeMax = ''
        })
      }
    },
    async sletchangtagtree() {
      this.lod = true
      const { data } = await selecttagTree(this.queryhead)
      this.treelist = data.children
      this.lod = false
      this.labelclassification = []
      data.children.forEach((i, m) => {
        this.labelclassification.push({
          value: i.id,
          label: i.label,
          children: []
        })
        i.children.forEach((item) => {
          this.labelclassification[m].children.push({
            value: item.id,
            label: item.label
          })
        })
      })
    },
    actselectlist(v) {
      this.queryhead.createTypeList = ''
      v.map((i) => {
        this.queryhead.createTypeList += i + ','
      })
      if (v.length > 1) {
        this.animt = 'animt1'
        this.amtish = true
      } else if (v.length <= 1 && this.amtish) {
        this.animt = 'animt2'
        this.amtish = false
      }
      this.lod = true
      this.sletchangtagtree()
    },

    // 获取标签基础信息
    async tagBasic(id) {
      const res = await tagBasic(id)
      this.lod = false
      this.activeName = 'labelnumber'
      this.tagBasicdata = res.data
    },
    // 获取标签人数分布
    async calculatelastData() {
      this.lod = true
      const { data } = await calculatelastData(this.calculatequery).catch(
        () => {
          this.lod = false
        }
      )
      this.lod = false
      if (data) {
        this.calculatedata = data
        if (data.tagLayerData) {
          this.calculatecart = data.tagLayerData
          if (data.tagLayerData.length < 3) {
            return (this.cartheight = '240px')
          }
          this.cartheight = data.tagLayerData.length * 80 + 'px'
        } else {
          this.calculatecart = []
        }
      }
    },
    // 标签历史详情
    async calculatehistoryData() {
      this.lod = true
      const res = await calculatehistoryData(this.calculatequery1).catch(() => {
        this.lod = false
      })
      this.lod = false
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      if (!res.data) return
      this.calculatedata1 = res.data
      this.timedata = []
      this.calculatecart1 = []
      this.caltabulardata = [{ tagLayerName: '全部', tagLayerData: [] }]
      if (res.data.length == 0) {
        return
      }
      res.data[0].tagLayerData.forEach((i, m) => {
        this.calculatecart1.push({
          countNum: 0,
          countType: i.countDate
        })
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[j].tagLayerData[m]) {
            this.calculatecart1[m].countNum +=
              res.data[j].tagLayerData[m].countNum
          } else {
            this.calculatecart1[m].countNum += 0
          }
        }
      })
      res.data.forEach((i, m) => {
        this.caltabulardata.push({
          tagLayerName: i.tagLayerName,
          tagLayerData: i.tagLayerData
        })
      })
      this.calculatecart1.forEach((i) => {
        this.caltabulardata[0].tagLayerData.push(i.countNum)
        this.timedata.push(i.countType)
      })
      if (this.calculatecart1.length < 3) {
        this.cartheight1 = '240px'
      } else {
        this.cartheight1 = this.calculatecart1.length * 80 + 'px'
      }
    },
    // 时间数据处理
    datavaluehandle(v) {
      if (v) {
        this.calculatequery1.startDate = v[0]
        this.calculatequery1.endDate = v[1]
        this.calculatehistoryData()
      } else {
        this.calculatequery1.startDate = ''
        this.calculatequery1.endDate = ''
      }
    },
    handleClick(v) {
      if (this.activeName == 'labelhistory') {
        this.ishslet = false
        this.calculatehistoryData()
      } else {
        this.ishslet = true
        this.calculatelastData()
      }
    },
    hactcolor(v) {
      this.coloricon = []
      this.coloricon[v] = 'ci1'
      if (v == 0) {
        if (this.activeName == 'labelnumber') {
          this.regish = false
        } else {
          this.regish1 = false
        }
      } else {
        if (this.activeName == 'labelnumber') {
          this.regish = true
        } else {
          this.regish1 = true
        }
      }
    },
    // 校验标签名称
    async tagNameUsedjudge() {
      this.lod = true
      const res = await tagNameUsedjudge({
        tagName: this.ruleFormonelab.name
      }).catch((err) => {
        // this.$message.error(err.message);
        this.lod = false
        return
      })
      if (!res) return
      this.lod = false
      this.$message.success(res.message)
    },
    hactcolor1(v) {
      this.coloricon1 = []
      this.coloricon1[v] = 'ci1'
      if (v == 0) {
        if (this.activeName == 'labelnumber') {
          this.regish = false
        } else {
          this.regish1 = false
        }
      } else {
        if (this.activeName == 'labelnumber') {
          this.regish = true
        } else {
          this.regish1 = true
        }
      }
    },
    sortchange(v) {
      console.log(v)
    },
    crelab() {
      this.createlableish = true
    },
    createlable(v) {
      this.crelabbordcolor = ['b2', 'b2', 'b2', 'b2']
      this.crelabbordcolor[v] = 'b1'
      this.lablecreindex = v
      this.creonelab = true
      this.$nextTick(() => {
        this.actish = [false, false]
        this.actish[0] = true
      })
    },
    // 手动例行
    ckeckact() {
      let index = null
      if (this.ruleFormonelab.modifyType == 'routine') {
        index = 0
      } else {
        index = 1
      }
      this.actish = [false, false]
      this.actish[index] = true
    },
    // 第一步的表单验证
    nextcreate() {
      this.$refs['ruleFormonelab'].validate((v) => {
        if (v) {
          switch (this.lablecreindex) {
            case 0:
              this.custom = true
              break
            case 1:
              this.basicindicators = true
              break
            case 2:
              this.firstandlast = true
              break
            case 3:
              this.eventpreference = true
              break
          }
        }
      })
    },
    // 基础指标-时间处理
    databasicinquerytime(v) {
      if (v) {
        this.basicinquery.calStartDate = String(v[0]).slice(0, 10)
        this.basicinquery.calEndDate = String(v[1]).slice(0, 10)
      } else {
        this.basicinquery.calStartDate = ''
        this.basicinquery.calEndDate = ''
      }
    },
    // 输入校验
    inputvalidation(v) {
      if (this.basicinquery.calRangeType == 2) {
        if (!this.layered[v + 1]) return
        this.layered[v + 1].calRangeMin = this.layered[v].calRangeMax
        this.layered[v + 1].disabled2 = false
        return
      }
      if (isNaN(this.layered[v].calRangeMax)) {
        return this.$message.error('请输入100以下数字区间')
      }
      if (!this.layered[v + 1]) return
      if (this.layered[v].calRangeMax <= this.layered[v].calRangeMin) return
      this.layered[v + 1].calRangeMin = this.layered[v].calRangeMax
      this.layered[v + 1].disabled2 = false
    },
    // 值校验
    inputchangvalidation(v) {
      const max = this.layered[v].calRangeMax
      const min = this.layered[v].calRangeMin
      if (max < min) {
        this.layered[v].calRangeMax = ''
        return this.$message.error('最大值必须大于最小值')
      }
      if (this.basicinquery.calRangeType == 2) return
      if (isNaN(max) || max > 100 || max < 0) {
        this.layered[v].calRangeMax = ''
        return this.$message.error('请输入0以上100以下数字区间')
      }
      if (v == 0 && max < min) {
        this.layered[v].calRangeMax = ''
        return this.$message.error('第一个最大值不得小于最小值')
      }
      if (max <= min) {
        this.layered[v].calRangeMax = ''
        return this.$message.error('数值必须大于最小值')
      }
    },
    // 校验
    validatefromlayered() {
      let ish1 = true
      let ish2 = false
      let ish3 = true
      for (const key in this.basicinquery) {
        if (key !== 'createType') {
          if (!this.basicinquery[key] || this.basicinquery[key] == '') {
            ish3 = false
            return this.$message.error('请选择下拉选项或时间')
          }
        }
      }
      console.log(this.layered)
      this.layered.forEach((i) => {
        if (i.calRangeMax == '' && i.calRangeMax != 0) {
          ish1 = false
          const dom = document.getElementsByClassName('el-message')[0]
          if (!dom) {
            this.$message.error('请填写完整已存在的区间')
          }
          return
        }
        if (i.calRangeMax < i.calRangeMin) {
          ish1 = false
          const dom = document.getElementsByClassName('el-message')[0]
          if (!dom) {
            this.$message.error('最大值必须大于等于最小值')
          }
          return
        }
      })

      this.$refs['datatimefrom'].validate((v) => {
        if (v) {
          ish2 = true
        }
      })
      if (ish1 && ish2 && ish3) return (this.validatefromlayeredish = true)
      return (this.validatefromlayeredish = false)
    },
    // 数据处理--基础指标
    dataestimatebasicin() {
      this.basicinquery.createType = 2
      const from = {
        ...this.basicinquery,
        layerList: [],
        parentId: this.ruleFormonelab.parentId[1],
        modifyType: this.ruleFormonelab.modifyType,
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark
      }
      this.layered.forEach((item) => {
        from.layerList.push({
          name: item.name,
          calRangeMin: item.calRangeMin,
          calRangeMax: item.calRangeMax,
          sort: item.sort
        })
      })
      return from
    },
    // 预估-基础指标
    async estimate() {
      this.validatefromlayered()
      if (!this.validatefromlayeredish) return
      const addForm = this.dataestimatebasicin()
      this.basicindlod = true
      const res = await predictestimate(addForm, this.estimatednumber).catch(
        (err) => {
          const { response } = err
          this.basicindlod = false
          this.$message.error(response.data.message)
          return
        }
      )

      if (res.code !== 200) {
        this.basicindlod = false
        this.$message.error(res.message)
        return
      }
      this.basicindlod = false
      if (res.data) {
        res.data.forEach((i) => {
          this.layered.forEach((item) => {
            if (item.sort == i.sortPredict) {
              item.num = i.calRangeMinPredict + '-' + i.calRangeMaxPredict
              item.sum = i.calculateNum
            }
          })
        })
      }
    },
    sletchange() {
      if (this.ruleFormonelab.modifyDateType == 'custom') {
        this.pickish = true
      } else {
        this.pickish = false
      }
    },
    addsection() {
      if (
        this.basicinquery.calRangeType == this.allslets.tagCalRangeType[1].value
      ) {
        this.sectionindex++
        const name = '分层' + this.sectionindex
        return this.layered.push({
          index: this.sectionindex - 1,
          name: name,
          calRangeMin: '',
          calRangeMax: '',
          disabled1: true,
          disabled2: false,
          sort: this.sectionindex,
          num: '',
          sum: ''
        })
      }
      const lastNum = this.layered[this.layered.length - 1].calRangeMax
      if (lastNum >= 100) return this.$message.error('已经达到最大区间')
      if (lastNum == '' || !lastNum) {
        return this.$message.error('请先输入未填入区间')
      }
      this.sectionindex++
      const name = '分层' + this.sectionindex
      this.layered.push({
        index: this.sectionindex - 1,
        name: name,
        calRangeMin: lastNum,
        calRangeMax: '100',
        disabled1: true,
        disabled2: false,
        sort: this.sectionindex,
        num: '',
        sum: ''
      })
    },
    // 取消-基础指标创建
    cancel(v) {
      this[v] = false
      this.customdatafast()
    },
    resetindicators() {
      this.layered = this.$options.data().layered
      this.basicinquery = this.$options.data().basicinquery
      this.closedata = Math.random()
      if (this.$refs['datatimefrom'] !== undefined) {
        this.$refs['datatimefrom'].resetFields()
      }
      this.basicinquery.calRangeType = this.allslets.tagCalRangeType[0].value
    },
    // 创建-基础指标创建
    async establish() {
      this.validatefromlayered()
      if (!this.validatefromlayeredish) return
      const addForm = this.dataestimatebasicin()
      this.basicindlod = true
      const res = await createpredict(addForm).catch((err) => {
        this.basicindlod = false
        const { response } = err
        this.$message.error(response.data.message)
        return
      })
      if (res.code !== 200) {
        this.basicindlod = false
        this.$message.error(res.message)
        return
      }
      this.basicindicators = false
      this.$message.success(res.message)
      this.visidclosefrom()
      this.resetindicators()
      this.basicinquery = this.$options.data().basicinquery
      this.creonelab = false
      this.createlableish = false
      this.sletchangtagtree()
      this.basicindlod = false
    },
    // 上一步-基础指标创建
    previous(v) {
      if (v == 'basicindicators') {
        this.resetindicators()
      }
      this[v] = false
    },
    // 清除表单
    visidclosefrom() {
      if (this.$refs['ruleFormonelab'] !== undefined) {
        this.$refs['ruleFormonelab'].resetFields()
      }
      // this.removeData();
      this.ruleFormonelab.remark = ''
    },
    // 添加分层
    addlayered() {
      this.layeredindex++
      const name = '分层' + this.layeredindex
      this.tagnamelist.push(name)
      this.tagdataish.push(false)
      this.bordercolortag.push('')
      this.tagquerylist.push({
        sort: this.layeredindex,
        name: name,
        describe: '',
        userattributeindex: 0,
        userbehaviorindex: 0,
        usersequenceindex: 0,
        querychildren1: [
          {
            slet_quota_0: '',
            slet_0: '',
            input_0: '',
            calEventType: '',
            // 下拉框存储
            slets1: [],
            slets2: [],
            slets4: [],
            sort: ''
          }
        ],
        querychildren2: [
          {
            pick_data_0: [],
            slet_y_0: '',
            slet_apply_0: '',
            slet_frequency_0: '',
            slet_judge_0: '',
            input_frequency_0: '',
            calEventType: '',
            // 下拉框存储
            slets1: [],
            slets2: [],
            slets3: [],
            sort: ''
          }
        ],
        querychildren3: [
          {
            pick_data_0: [],
            slet_loan_0: [{ event: '', dimension: '' }],
            sort: '',
            // 下拉框存储
            slets1: [],
            slets2: []
          }
        ]
      })
    },
    activetag(v) {
      this.tagdataish = []
      this.tagdataish[v] = true
      this.bordercolortag = []
      this.bordercolortag[v] = 'tagb1'
    },
    // 时间事件
    datak1(val) {
      if (!val) {
        this.firstandlastquery.calStartDate = ''
        this.firstandlastquery.calEndDate = ''
        return
      }
      this.firstandlastquery.calStartDate = String(val[0]).slice(0, 10)
      this.firstandlastquery.calEndDate = String(val[1]).slice(0, 10)
    },
    datak2(val) {
      if (!val) {
        this.eventpreferencequery.calStartDate = ''
        this.eventpreferencequery.calEndDate = ''
        return
      }
      this.eventpreferencequery.calStartDate = String(val[0]).slice(0, 10)
      this.eventpreferencequery.calEndDate = String(val[1]).slice(0, 10)
    },
    // 表单校验
    fromcustom() {
      let pack = true
      this.tagquerylist.forEach((i) => {
        if (!i.name || i.name == '') {
          return (pack = false)
        }
        i.querychildren1.forEach((item, index) => {
          for (const key in item) {
            if (key != 'sort') {
              if (
                item[key] !== 0 &&
                key != 'slets1' &&
                key != 'slets2' &&
                key != 'slets4'
              ) {
                if (!item[key] || item[key] == '' || item[key].length == 0) {
                  pack = false
                  return
                }
              }
            }
          }
        })
        i.querychildren2.forEach((item, index) => {
          for (const key in item) {
            if (key != 'sort') {
              if (
                item[key] !== 0 &&
                key != 'slets1' &&
                key != 'slets2' &&
                key != 'slets3'
              ) {
                if (!item[key] || item[key] == '' || item[key].length == 0) {
                  pack = false
                  return
                }
              }
            }
          }
        })
        i.querychildren3.forEach((item, index) => {
          item.slet_loan_0.forEach((s) => {
            if (s.event == '') {
              pack = false
              return
            }
          })
          for (const key in item) {
            if (key != 'sort') {
              if (item[key] !== 0 && key != 'slets1' && key != 'slets2') {
                if (!item[key] || item[key] == '' || item[key].length == 0) {
                  pack = false
                  return
                }
              }
            }
          }
        })
      })
      if (pack) return true
      this.$message.error('所有的分层数据必填,请填写完整')
      return false
    },
    // 自定义-数据处理
    customdataprocessing() {
      const from = {
        createType: 1,
        parentId: this.ruleFormonelab.parentId[1],
        modifyType: this.ruleFormonelab.modifyType,
        name: this.ruleFormonelab.name,
        modifyType: this.ruleFormonelab.modifyType,
        modifyDateType: this.ruleFormonelab.modifyDateType,
        remark: this.ruleFormonelab.remark,
        layerList: []
      }
      this.tagquerylist.forEach((i, m) => {
        from.layerList.push({
          actionList: [],
          behaviorList: [],
          attributeList: [],
          name: i.name,
          sort: m + 1,
          description: i.describe
        })
        i.querychildren1.forEach((item, index) => {
          from.layerList[m].attributeList.push({
            calEvent: String(item.slet_quota_0),
            // (根据创建方式不同)：输入值
            calLat3: item.input_0,
            // 根据创建方式不同
            calLat2: String(item.slet_0),
            sort: index + 1,
            calEventType: item.calEventType
          })
        })
        i.querychildren2.forEach((item, index) => {
          from.layerList[m].actionList.push({
            calEndDate: String(item.pick_data_0[1]).slice(0, 10),
            calStartDate: String(item.pick_data_0[0]).slice(0, 10),
            calEvent: String(item.slet_apply_0),
            calLat1: String(item.slet_frequency_0),
            calLat2: String(item.slet_judge_0),
            calLat3: item.input_frequency_0,
            calLat4: String(item.slet_y_0),
            sort: index + 1,
            calEventType: item.calEventType
          })
        })
        i.querychildren3.forEach((item, index) => {
          let eve = ''
          item.slet_loan_0.forEach((a, b) => {
            if (b == item.slet_loan_0.length - 1) {
              eve += a.event + ''
            } else {
              eve += a.event + ','
            }
          })
          from.layerList[m].behaviorList.push({
            calEndDate: String(item.pick_data_0[1]).slice(0, 10),
            calStartDate: String(item.pick_data_0[0]).slice(0, 10),
            sort: index + 1,
            calEvent: eve
          })
        })
      })
      console.log(from)
      return from
    },
    // 自定义-预估
    async estimatecustom() {
      const vis = this.fromcustom()
      if (!vis) return
      const from = this.customdataprocessing()
      this.customlod = true
      const { data } = await custompredict(from, this.estimatednumber).catch(
        (err) => {
          const { response } = err
          this.customlod = false
          this.$message.error(response.data.message)
          return
        }
      )
      this.customlod = false
      this.estimatecustomization = data
    },
    async customcreate() {
      const vis = this.fromcustom()
      if (!vis) return
      this.customlod = true
      const from = this.customdataprocessing()
      const res = await customtagcreate(from).catch((err) => {
        this.customlod = false
        const { response } = err
        this.$message.error(response.data.message)
        return
      })
      if (res.code !== 200) {
        this.customlod = false
        this.$message.error(res.message)
        return
      }
      this.custom = false
      this.visidclosefrom()
      this.resetindicators()
      this.tagquerylist = this.$options.data().tagquerylist
      this.basicindicators = false
      this.creonelab = false
      this.createlableish = false
      this.$message.success(res.message)
      this.sletchangtagtree()
      this.estimatecustomization = null
      this.customlod = false
    },
    usersatisfactiondel(i, m) {
      m.splice(i, 1)
    },
    usersatisfactionadd(i, m, index) {
      switch (i) {
        case 1:
          this.tagquerylist[index].userattributeindex++
          const j1 = this.tagquerylist[index].userattributeindex
          m.push({
            slet_quota_0: '',
            slet_0: '',
            input_0: '',
            sort: j1,
            calEventType: '',
            // 下拉框存储
            slets1: [],
            slets2: [],
            slets4: []
          })
          break
        case 2:
          this.tagquerylist[index].userbehaviorindex++
          const j2 = this.tagquerylist[index].userbehaviorindex
          m.push({
            pick_data_0: [],
            slet_y_0: '',
            slet_apply_0: '',
            slet_frequency_0: '',
            slet_judge_0: '',
            input_frequency_0: '',
            sort: j2,
            calEventType: '',
            // 下拉框存储
            slets1: [],
            slets2: [],
            slets3: []
          })
          break
        case 3:
          this.tagquerylist[index].usersequenceindex++
          const j3 = this.tagquerylist[index].usersequenceindex
          m.push({
            pick_data_0: [],
            slet_loan_0: [{ event: '', dimension: '' }],
            sort: j3,

            // 下拉框存储
            slets1: [],
            slets2: []
          })
          break
      }
    },
    // 获取所有下拉框
    async sletall() {
      // this.lod = true;
      if (!window.sessionStorage.getItem('slets')) {
        this.$message.error('下拉框已丢失，重新获取')
        this.$router.push({ path: '/login' })
        return
      }
      const {
        userAttribute,
        tagCalEventType,
        tagCalLat1,
        tagCalLat2,
        tagCalLat4,
        // tagModifyDateType,
        tagCalEvent,
        tagPredict,
        // runStatus,
        tagStatus,
        // updateType,
        // finallyCalculateStatus,
        tagLayerType,
        tagCalRangeType,
        tagCreateType,
        tagModifyType,
        tagLastCalculateStatus
      } = JSON.parse(window.sessionStorage.getItem('slets'))
      // const { data: tagCalLat1 } = await sysdict("tagCalLat1").catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagCalRangeType } = await sysdict("tagCalRangeType").catch(
      //   () => {
      //     this.lod = false;
      //   }
      // );
      // const { data: tagCalEvent } = await sysdict("tagCalEvent").catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagPredict } = await sysdict("tagPredict").catch(() => {
      //   this.lod = false;
      // });
      // const { data: tagLayerType } = await sysdict("tagLayerType").catch(() => {
      //   this.lod = false;
      // });
      // const { data: userAttribute } = await sysdicttree("userAttribute").catch(
      //   () => {
      //     this.lod = false;
      //   }
      // );
      // const { data: tagCalEventType } = await sysdict("tagCalEventType").catch(
      //   () => {
      //     this.lod = false;
      //   }
      // );
      // const { data: tagCalLat4 } = await sysdict("tagCalLat4").catch(() => {
      //   this.lod = false;
      // });
      // this.lod = false;
      //
      console.log(tagCalRangeType)
      this.allslets.tagCalLat1 = tagCalLat1
      //
      this.allslets.tagCalRangeType = tagCalRangeType
      this.basicinquery.calRangeType = tagCalRangeType[0].value
      //
      this.allslets.tagCalEvent = tagCalEvent
      //
      this.allslets.tagPredict = tagPredict

      this.estimatednumber = tagPredict[0].value

      this.estimatednumbercustom = tagPredict[0].value
      //
      this.allslets.tagCalEventType = tagCalEventType
      //
      this.allslets.tagLayerType = tagLayerType
      //
      this.allslets.userAttribute = userAttribute
      //
      this.allslets.tagCalLat2 = tagCalLat2
      this.allslets.tagCalLat4 = tagCalLat4
      this.allslets.tagStatus = tagStatus
      this.allslets.tagCreateType = tagCreateType
      this.allslets.tagModifyType = tagModifyType
      this.allslets.tagLastCalculateStatus = tagLastCalculateStatus
    }
  }
}
</script>

<style lang="scss" scoped>
.custlod {
  position: absolute;
  width: 95%;
  height: 78%;
  top: 20%;
  left: 2.5%;
  z-index: 1000;
}
.el-table::before {
  height: 0;
}
.event-dime {
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
}
.plus-oper {
  margin: 0px 10px;
  background: rgb(71, 203, 149);
  color: #fff;
  width: 12px;
  height: 12px;
}
.minus-oper {
  margin: 20px 10px;
  background: rgb(168, 168, 168);
  color: #fff;
}
::v-deep {
  .el-radio {
    margin-right: 5px;
  }
}
.cart {
  width: 100%;
  height: 100%;
}
//遮罩层loding
.app-loading {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 30001;
}
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 20px;
  }
}
.add-plus {
  padding: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .el-icon-plus {
    color: #fff;
    background-color: rgb(71, 203, 149);
    margin: 0 3px;
  }
}
.fastlast {
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    margin: 0 10px;
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
.el-icon-minus {
  border: 1px solid;
  cursor: pointer;
}
.el-icon-plus {
  cursor: pointer;
}
.attr1 > p {
  margin-bottom: 10px;
  span:nth-child(3) {
    float: right;
  }
}
.attr1 {
  padding: 10px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
}
.attr1 > div {
  display: flex;
  .el-select {
    width: 120px;
    margin-right: 10px;
  }
  .el-input {
    width: 120px;
    margin-right: 10px;
  }
  .el-icon-edit {
    font-size: 20px;
    margin-top: 5px;
  }
}
.attr2 {
  height: 110px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
  p {
    margin: 10px;
    .el-icon-plus {
      float: right;
      color: #fff;
      background-color: rgb(71, 203, 149);
      margin: 0 3px;
    }
    span:nth-child(3) {
      float: right;
      margin: 0 3px;
    }
  }
  div {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    padding: 0 6px;
    .k6 {
      width: 80px;
    }
    span {
      height: 28px;
      display: inline-block;
      line-height: 48px;
    }
  }
}
.attr3 {
  padding: 15px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-bottom: 10px;
  p {
    margin-bottom: 10px;
    .el-icon-minus {
      margin: 0 3px;
    }
    .el-icon-plus {
      float: right;
      color: #fff;
      background-color: rgb(71, 203, 149);
      margin: 0 3px;
    }
    span:nth-child(3) {
      float: right;
      margin: 0 3px;
    }
  }
  div {
    display: flex;
    flex-wrap: wrap;

    .k6 {
      width: 80px;
    }
    span {
      height: 28px;
      display: inline-block;
      line-height: 28px;
    }
  }
}
.attr3 > div {
  display: flex;
  flex-wrap: wrap;
  .k6 {
    width: 80px;
  }
  span {
    height: 28px;
    display: inline-block;
    line-height: 28px;
  }
}
.hid {
  display: flex;
  position: relative;
  img {
    width: 3px;
    height: 300px;
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
    height: 300px;
    overflow-y: auto;
    font-size: 12px;
  }
}
.tag {
  display: flex;
  flex-wrap: wrap;
}
.tag > div {
  cursor: pointer;
  margin: 5px;
  width: 100px;
  padding: 5px 10px;
  text-align: center;
  border-radius: 500px;
  border: 1px solid rgb(170, 170, 170);
}
.tag > div:last-child {
  border-style: dashed;
}
.tagb1 {
  border-color: rgb(66, 129, 242) !important;
  color: rgb(66, 129, 242);
}
.tagtabs {
  cursor: pointer;
}
.frame {
  margin: 20px 0;
  height: 400px;
  border: 1px solid rgb(223, 223, 223);
  padding: 5px;
}
.frames {
  width: 100%;
  height: 100%;
  .el-input {
    margin-bottom: 10px;
  }
}
.estim {
  header {
    padding: 30px 0 10px 0;
  }
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
.add {
  margin: 15px 0;
  color: rgb(2, 167, 240);
  cursor: pointer;
}
.interval {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.titslet {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  .el-select {
    margin: 0 10px;
    width: 120px;
  }
}
.box1 {
  margin: 20px 0;
  .el-select {
    width: 120px;
  }
}
::v-deep {
  .el-dialog {
    margin-bottom: 150px;
  }
}
.next {
  width: 100%;
  margin: 50px 0 0 0;
  padding: 10px 0 10px 0;
  border-top: 1px solid rgb(204, 204, 204);
  .el-button {
    float: right;
    background-color: rgb(80, 205, 152);
    color: #fff;
  }
}
.steps {
  margin: 20px 0;
  width: 100%;
  .el-steps {
    width: 50%;
    margin: 0 auto;
  }
}
::v-deep {
  .steps {
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
  .el-alert__title {
    color: rgb(127, 127, 127);
  }
}
.crete {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.crete > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 110px;
  width: 45%;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 3px;
  img {
    width: 80px;
    height: 80px;
  }
}
.crete > div > div {
  padding: 10px;
  div:nth-child(1) {
    font-size: 16px;
    margin: 0 0 20px 0;
  }
}
.act {
  display: flex;
  width: 220px;
  justify-content: space-between;
}
.b1 {
  border: 1px solid rgb(76, 205, 105);
}
.b2 {
  border: 1px solid rgb(235, 235, 235);
}

.hader {
  font-size: 14px;
  display: flex;
  div:nth-child(1) {
    font-size: 18px;
    margin: 0 5px;
    color: rgb(127, 127, 127);
  }
  div {
    display: flex;
    align-items: center;
  }
  span {
    color: rgb(76, 205, 105);
    font-size: 35px;
  }
}

.slet {
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 20px;
  font-size: 30px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgb(170, 170, 170);
}

::v-deep {
  .dwk4 .el-tabs__active-bar {
    background-color: rgb(71, 203, 149) !important;
  }
  .dwk4 .el-tabs__item:hover {
    color: rgb(71, 203, 149) !important;
  }
  .dwk4 .is-active {
    color: rgb(71, 203, 149) !important;
  }
}

.clk {
  border: 1px solid;
  cursor: pointer;
  margin: 5px 0;
  border-radius: 3px;
  height: 30px;
  display: flex;
  align-items: center;
  i {
    margin: 0 10px;
  }
}

.tit2 {
  width: 100%;
  margin: 0 10px;
  font-size: 14px;
  padding-right: 20px;
  color: rgb(127, 127, 127);
  display: flex;
  justify-content: space-between;
}
.tit3 {
  margin: 40px 0 0 10px;
  font-size: 14px;
  height: 20px;
  display: flex;
  align-items: center;
  color: rgb(127, 127, 127);
  span {
    margin: 0 5px;
    font-weight: 800;
    color: #000;
  }
  img {
    margin-left: 30px;
  }
}
div,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
.tit1 {
  font-size: 20px;
  font-weight: 900;
  margin: 10px 0;
}
.title {
  width: 100%;
  color: rgb(127, 127, 127);
  font-size: 14px;
  i {
    font-size: 20px;
    margin-right: 5px;
  }
  ul {
    list-style: none;
    float: right;
    display: flex;
    li {
      margin: 0 5px;
    }
  }
}
.a1 {
  color: rgb(71, 203, 149);
}
.a2 {
  color: rgb(127, 127, 127);
}
.animt1 {
  animation-name: lang;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
.animt2 {
  animation-name: smalle;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
@keyframes smalle {
  0% {
    width: 420px;
  }
  100% {
    width: 240px;
  }
}
@keyframes lang {
  0% {
    width: 240px;
  }
  100% {
    width: 420px;
  }
}
.lab {
  padding: 20px 10px;
  background-color: rgb(242, 242, 242);
  position: relative;
}

.dwk1 {
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  height: 50px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  .col {
    margin-right: 20px;
  }
  .last {
    flex: 1;
    .el-button {
      float: right;
      background-color: rgb(80, 205, 152);
      color: #fff;
    }
  }
}
::v-deep {
  .dwk2 {
    .el-card__body {
      padding: 20px 0;
    }
  }
}
.dwk2 {
  .dwk2-such {
    padding: 0 20px;
  }
  height: 720px;
  .el-tree {
    padding-left: 10px;
    width: 100%;
    height: 600px;
    overflow-y: auto;
  }
}
.dwk3 {
  height: 200px;
}
.dwk4 {
  min-height: 350px;
  position: relative;
  header {
    position: absolute;
    display: flex;
    align-items: center;
    top: 24px;
    right: 20px;
    .el-icon-s-data {
      padding: 5px;
      color: rgb(127, 127, 127);
      border-radius: 3px;
      margin: 0 5px;
      cursor: pointer;
    }
    i:nth-child(1) {
      transform: rotateZ(90deg);
    }
    .el-select {
      margin: 0 5px;
    }
  }
}
.ci1 {
  color: #fff !important;
  background-color: rgb(71, 203, 149);
}
.el-row {
  margin-bottom: 20px;
}
.card {
  .bor-color-a1 {
    border-left: 5px solid rgb(80, 205, 152);
  }
  .bor-color-a2 {
    border-left: 5px solid rgb(127, 127, 127);
  }
  .el-card {
    margin-bottom: 20px;
  }
}
.one-icon {
  width: 23px;
  height: 19px;
}
.two-icon {
  width: 17px;
  height: 15px;
}
.position {
  position: relative;
  margin: 10px 0;
}
.border {
  position: absolute;
  top: 6%;
  left: 3%;
  width: 19px;
  height: 2px;
  background-color: #fff;
}
.border1 {
  position: absolute;
  top: 30%;
  left: 0;
  width: 17px;
  height: 1px;
  background-color: #fff;
}
.el-tree {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-icon-search:before {
  font-size: 24px;
}
.event-show {
  margin-top: 20px;
}
</style>
