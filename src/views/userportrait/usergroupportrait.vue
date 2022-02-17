<template>
  <div class="cust">
    <div class="group">
      <div class="group-fixed">
        <header class="head">
          <div>请择客户群体</div>
          <el-select
            v-model="userGroupId"
            size="mini"
            @change="creEchodataCustomergroup"
            :loading="slet_lod"
            :disabled="telmpateish"
          >
            <el-option
              v-for="i in pagedictsletsList.findUserGroupDropDownBo"
              :key="i.id"
              :label="i.userGroupName"
              :value="i.id"
            />
          </el-select>
          <div class="store">
            <el-button
              icon="el-icon-document"
              :disabled="!telmpateish"
              size="mini"
              type="success"
              @click="addportrait"
              >保存</el-button
            >
          </div>
        </header>
        <div v-if="userGroupIdish" class="slets1">
          <div class="tit">画像人群的筛选条件</div>
          <div>
            <div class="frame">
              <div class="frames">
                <div class="hid">
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
                            style="width: 180px; margin-right: 50px"
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
                              style="margin: 10px 10px 0 0"
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
          </div>
        </div>

        <div class="head1">
          <div>画像信息</div>
        </div>
        <div class="slets2">
          <header class="tit">
            <div>目标用户群</div>
          </header>
          <div>
            <div
              class="left"
              v-if="portrait.showprop || portrait.showprop == 0"
              :percentage="portrait.showprop"
            >
              <el-progress
                type="circle"
                v-if="portrait.showprop || portrait.showprop == 0"
                :percentage="portrait.showprop"
                :format="
                  () => {
                    return progressshow(portrait.proportion);
                  }
                "
                :width="60"
              />
              <div class="left-text">
                <span>{{ portrait.userGroupPeople }} <a>人</a></span>
                <span>在 全部用户 中占比{{ portrait.proportion }}%</span>
              </div>
            </div>
            <!-- <div class="right">
              <el-popover placement="top" trigger="click">
                <div class="clk">
                  <el-radio-group v-model="radioCustcreate" size="mini">
                    <el-radio label="1">最新版本</el-radio>
                    <br />
                    <el-radio label="2" style="margin-top: 20px">
                      指定版本
                      <el-date-picker
                        v-if="radioCustcreate == '2'"
                        v-model="createpickdata"
                        size="mini"
                        type="date"
                        style="width: 150px"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="false"
                      />
                    </el-radio>
                  </el-radio-group>
                </div>
                <div slot="reference" class="slet-text">
                  <img :src="require('@/assets/lable/u9381.svg')" />
                  <span>选择版本</span>
                </div>
              </el-popover>
              <div>计算于2021-11-07 00：28：13</div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="load" v-if="userGroupIdish">
        <el-button
          v-if="!telmpateish"
          size="mini"
          class="green"
          @click="loadtelmpate"
          >加载模板查看</el-button
        >
      </div>
      <div v-if="telmpateish" class="group-dynamic">
        <div class="add">
          <el-button size="mini" icon="el-icon-plus" @click="nottel = true"
            >添加画像信息</el-button
          >
        </div>
        <div class="cart">
          <div class="cart-tel" v-for="(item, index) in CartList" :key="index">
            <div
              v-if="item.Cartlod"
              v-loading="true"
              class="cart-lod"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.7)"
            />
            <header class="carthade">
              <div>
                <p>{{ item.CartName }}</p>
                <p>100%用户拥有 风险等级划分 标签</p>
              </div>
              <div>
                <el-select
                  v-model="item.slets"
                  placeholder=""
                  @change="getChartStatisticsData(item, index)"
                >
                  <el-option label="前5项" value="5" />
                  <el-option label="前10项" value="10" />
                  <el-option label="前15项" value="15" />
                  <el-option label="前20项" value="20" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <Piecart
                ref="c1"
                v-if="item.CartType == 4"
                :cartdata="item.data"
              ></Piecart>
              <Ther v-if="item.CartType == 3" :cartdata="item.data"></Ther>
              <Horiz v-if="item.CartType == 5" :cartdata="item.data" />
              <SolidPIE v-if="item.CartType == 6" :cartdata="item.data" />
              <LineCart v-if="item.CartType == 1" :cartdata="item.data" />
              <LineSolid
                v-if="item.CartType == 2"
                :cartdata="item.data"
              ></LineSolid>
            </div>
          </div>
          <!-- <div class="cart-tel">
            <header class="carthade">
              <div>
                <p>年龄分布</p>
                <p>100%用户拥有 年龄 标签</p>
              </div>
              <div>
                <el-select v-model="cartquery.cart2" placeholder="">
                  <el-option label="前5项" :value="1" />
                  <el-option label="前10项" :value="2" />
                  <el-option label="前15项" :value="3" />
                  <el-option label="前20项" :value="4" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <Horiz :amt="m1" />
            </div>
          </div>
          <div class="cart-tel">
            <header class="carthade">
              <div>
                <p>工作年限分布</p>
                <p>100%用户拥有 工作年限分布 标签</p>
              </div>
              <div>
                <el-select v-model="cartquery.cart3" placeholder="">
                  <el-option label="前5项" :value="1" />
                  <el-option label="前10项" :value="2" />
                  <el-option label="前15项" :value="3" />
                  <el-option label="前20项" :value="4" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <LineCart :rawanum="m1"></LineCart>
            </div>
          </div>
          <div class="cart-tel">
            <header class="carthade">
              <div>
                <p>工作年限分布</p>
                <p>100%用户拥有 工作年限分布 标签</p>
              </div>
              <div>
                <el-select v-model="cartquery.cart4" placeholder="">
                  <el-option label="前5项" :value="1" />
                  <el-option label="前10项" :value="2" />
                  <el-option label="前15项" :value="3" />
                  <el-option label="前20项" :value="4" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <LineSolid></LineSolid>
            </div>
          </div>
          <div class="cart-tel">
            <header class="carthade">
              <div>
                <p>职业与授信额度分布</p>
                <p>职业 x 授信额度</p>
              </div>
              <div>
                <el-select v-model="cartquery.cart5" placeholder="">
                  <el-option label="前5项" :value="1" />
                  <el-option label="前10项" :value="2" />
                  <el-option label="前15项" :value="3" />
                  <el-option label="前20项" :value="4" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <Ther :ther="m1" />
            </div>
          </div>
          <div class="cart-tel">
            <header class="carthade">
              <div>
                <p>职业与授信额度分布</p>
                <p>职业 x 授信额度</p>
              </div>
              <div>
                <el-select v-model="cartquery.cart5" placeholder="">
                  <el-option label="前5项" :value="1" />
                  <el-option label="前10项" :value="2" />
                  <el-option label="前15项" :value="3" />
                  <el-option label="前20项" :value="4" />
                </el-select>
              </div>
            </header>
            <div class="cart-view">
              <SolidPIE :pie="m1" />
            </div>
          </div> -->
          <!-- <el-row :gutter="10">
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>信用评分等级分布</p>
                    <p>100%用户拥有 风险等级划分 标签</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart1" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <Piecart :pie="m1" :color="color1" />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>年龄分布</p>
                    <p>100%用户拥有 年龄 标签</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart2" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <Horiz />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>工作年限分布</p>
                    <p>100%用户拥有 工作年限分布 标签</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart3" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <LineCart></LineCart>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>工作年限分布</p>
                    <p>100%用户拥有 工作年限分布 标签</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart4" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <LineSolid></LineSolid>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>职业与授信额度分布</p>
                    <p>职业 x 授信额度</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart5" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <Ther />
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="cart-tel">
                <header class="carthade">
                  <div>
                    <p>职业与授信额度分布</p>
                    <p>职业 x 授信额度</p>
                  </div>
                  <div>
                    <el-select v-model="cartquery.cart5" placeholder="">
                      <el-option label="前5项" :value="1" />
                      <el-option label="前10项" :value="2" />
                      <el-option label="前15项" :value="3" />
                      <el-option label="前20项" :value="4" />
                    </el-select>
                  </div>
                </header>
                <div class="cart-view">
                  <SolidPIE :pie="m1" :color="color1" />
                </div>
              </div>
            </el-col>
          </el-row> -->
        </div>
      </div>
    </div>
    <!-- 加载模板 -->
    <el-dialog
      :close-on-click-modal="false"
      title="加载模板查看"
      :visible.sync="loadmpateish"
      class="tel-dolig"
      @close="activecancel"
    >
      <el-alert
        title="选择模板后，会覆盖当前配置的用户画像"
        type="warning"
        show-icon
        :closable="false"
      />
      <div class="tit" @click="notusetel">不使用模板，自定义查看</div>
      <div class="act">
        <div :class="activetel[0]" @click="activetelstate(0)">
          <i class="el-icon-menu" />
          <div>
            <span>逾期风险画像模板</span>
            <span>了解用户的基本信息和逾期风险</span>
            <span>超级管理员 创建于2020-06-23 12：16：13</span>
          </div>
          <img
            v-show="activetel[0] == 'act-a1'"
            class="posicon"
            :src="require('@/assets/icon/u11648.svg')"
          />
          <img
            v-show="activetel[0] == 'act-a1'"
            class="success"
            :src="require('@/assets/icon/u11649.svg')"
            alt=""
          />
        </div>
        <div :class="activetel[1]" @click="activetelstate(1)">
          <i class="el-icon-menu" />
          <div>
            <span>授信信息画像模板</span>
            <span>了解客户的来源和授信情况</span>
            <span>超级管理员 创建于2020-06-23 12：13：09</span>
          </div>
          <img
            v-show="activetel[1] == 'act-a1'"
            class="posicon"
            :src="require('@/assets/icon/u11648.svg')"
          />
          <img
            v-show="activetel[1] == 'act-a1'"
            class="success"
            :src="require('@/assets/icon/u11649.svg')"
            alt=""
          />
        </div>
      </div>
      <div class="oper">
        <a @click="activecancel">取消</a>
        <el-button class="green" size="mini" @click="loadedtelmpart"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 不使用模板，自定义查看 -->
    <el-dialog
      title="加载模板查看"
      :visible.sync="nottel"
      :close-on-click-modal="false"
      @close="cenlact_telmpate_cart"
    >
      <div class="not-lod-tel">
        <!-- 遮罩层loding -->
        <div
          v-if="dologlod"
          v-loading="true"
          class="app-gloab-loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.7)"
        />
        <el-form
          ref="londfrom"
          :model="londtelmpatequery"
          :rules="londtelmpatequeryrule"
          size="mini"
        >
          <el-form-item prop="CartName">
            <div class="ipt from">
              <header>名称</header>
              <el-input
                v-model="londtelmpatequery.CartName"
                placeholder="请输入图表名称"
                style="width: 50%"
                clearable
              />
            </div>
          </el-form-item>
          <el-form-item prop="LabelType">
            <div class="from">
              <header>名称</header>
              <div class="act">
                <activecheck
                  :active="actish_telmp_1[0]"
                  @click="ckeckact1(0, 1)"
                >
                  <i class="el-icon-s-home"></i>
                  <a class="act-lab">自定义属性分布</a>
                </activecheck>
                <activecheck
                  :active="actish_telmp_1[1]"
                  @click="ckeckact1(1, 2)"
                >
                  <i class="el-icon-user-solid"></i>
                  <a class="act-lab">基础指标分布</a>
                </activecheck>
                <activecheck
                  :active="actish_telmp_1[2]"
                  @click="ckeckact1(2, 3)"
                >
                  <i class="el-icon-s-help"></i>
                  <a class="act-lab">事件偏好分布</a>
                </activecheck>
                <activecheck
                  :active="actish_telmp_1[3]"
                  @click="ckeckact1(3, 4)"
                >
                  <i class="el-icon-s-grid"></i>
                  <a class="act-lab">首末次特征分布</a>
                </activecheck>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="LabelName">
            <div class="from">
              <header>名称</header>
              <el-select
                v-model="londtelmpatequery.LabelName"
                placeholder="标签名称"
                size="mini"
                style="width: 20%"
                class="icon-slet-portrait"
                :loading="label_slet_lod"
                @change="getImageUse"
              >
                <el-option
                  v-for="i in findTagDropDownBoxList"
                  :key="i.id"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item prop="CartType">
            <div
              v-if="
                londtelmpatequery.LabelType == 3 ||
                londtelmpatequery.LabelType == 4
              "
              class="from"
            >
              <header>名称</header>
              <div class="act-cart-1">
                <activecheck
                  :active="actish_telmp_2[0]"
                  @click="ckeckact2(0, 1)"
                  ><i class="el-icon-share"></i>
                  <a class="act-lab">线状图</a></activecheck
                >
                <activecheck
                  :active="actish_telmp_2[1]"
                  @click="ckeckact2(1, 2)"
                >
                  <i class="el-icon-menu"></i>
                  <a class="act-lab">面积图</a>
                </activecheck>
                <activecheck
                  :active="actish_telmp_2[2]"
                  @click="ckeckact2(2, 3)"
                >
                  <i class="el-icon-s-grid"></i>
                  <a class="act-lab">热力图</a>
                </activecheck>
              </div>
            </div>
            <div v-else class="from">
              <header>图像</header>
              <div class="act-cart-1">
                <activecheck
                  :active="actish_telmp_2[0]"
                  @click="ckeckact2(0, 5)"
                  ><i class="el-icon-s-data"></i>
                  <a class="act-lab">条状图</a></activecheck
                >
                <activecheck
                  :active="actish_telmp_2[1]"
                  @click="ckeckact2(1, 4)"
                  ><i class="el-icon-refresh-left"></i>
                  <a class="act-lab">环形图</a></activecheck
                >
                <activecheck
                  :active="actish_telmp_2[2]"
                  @click="ckeckact2(2, 6)"
                  ><i class="el-icon-s-help"></i>
                  <a class="act-lab">饼图</a></activecheck
                >
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="oper">
          <a @click="cenlact_telmpate_cart">取消</a>
          <el-button class="green" size="mini" @click="telmpatedetermine"
            >确定</el-button
          >
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
import Piecart from "@/assembly/usergroupportrait/piechart.vue";
import Horiz from "@/assembly/usergroupportrait/horizontal.vue";
import Ther from "@/assembly/usergroupportrait/thermodynamicdiagram.vue";
import LineCart from "@/assembly/usergroupportrait/lineCart.vue.vue";
import LineSolid from "@/assembly/usergroupportrait/lineSolidcart.vue";
import SolidPIE from "@/assembly/usergroupportrait/solidPiecart.vue";
import activecheck from "@/assembly/createlable/activecheck.vue";
import {
  findRuleEcho,
  findUserGroupDropDownBox,
  findTagDropDownBox,
  addImageChart,
  getDataNoAdd,
  addportrait,
  getUserGroupUse,
  getImageUse,
  getChartStatisticsData,
  getUserGroupPeople,
} from "@/api/userportrait";
import { sysdict, sysdicttree } from "@/api/user";
export default {
  components: {
    Piecart,
    Ther,
    Horiz,
    activecheck,
    SolidPIE,
    LineCart,
    LineSolid,
  },
  data() {
    return {
      propsuserAttribute: {
        label: "label",
        children: "children",
        value: "value",
        emitPath: false,
      },
      dologlod: false,
      progressshow: (p) => {
        return p + "%";
      },
      //新增加载中
      lod: false,
      //选择器加载中
      slet_lod: false,
      //标签下拉框加载中
      label_slet_lod: false,
      //饼图颜色
      radioCustcreate: "1",
      createpickdata: "",
      // 客群ID
      userGroupId: "",
      userGroupIdish: false,
      // 回显数据存储
      echodatagroupList: { arr1: [], arr2: [], arr3: [] },
      // 存储所有下拉框
      // 存储所有下拉框
      pagedictsletsList: {
        tagCalLat1: [],
        tagModifyDateType: [],
        tagCalEvent: [],
        tagPredict: [],
        runStatus: [],
        updateType: [],
        finallyCalculateStatus: [],
        findUserGroupDropDownBo: [],
        userAttribute: [],
        tagCalLat4: [],
        //等于
        tagCalLat2: [],
        //历史当前
        tagCalEventType: [],
      },
      //模板是否存在
      // 模板
      telmpateish: false,
      // 加载模板
      activetel: ["", ""],
      activetelindex: null,
      loadmpateish: false,
      // 不使用模板自定义
      nottel: false,
      // 加载模板数据
      londtelmpatequery: {
        CartName: "",
        LabelType: "",
        LabelName: "",
        CartType: "",
      },
      londtelmpatequeryrule: {
        CartName: [{ required: true, message: "不能为空", trigger: "blur" }],
        LabelType: [{ required: true, message: "不能为空", trigger: "blur" }],
        LabelName: [{ required: true, message: "不能为空", trigger: "blur" }],
        CartType: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      //标签下拉框存储
      findTagDropDownBoxList: [],
      //图标列表
      CartList: [
        {
          CartName: "信用评分等级分布",
          LabelType: "",
          LabelName: "",
          CartType: "4",
          data: null,
          slets: "5",
          Cartlod: false,
        },
        {
          CartName: "年龄分布",
          LabelType: "",
          LabelName: "",
          CartType: "5",
          slets: "5",
          Cartlod: false,
          data: null,
        },
        {
          CartName: "工作年限分布",
          LabelType: "",
          LabelName: "",
          CartType: "4",
          slets: "5",
          Cartlod: false,
          data: null,
        },
        {
          CartName: "工作年限分布",
          LabelType: "",
          LabelName: "",
          CartType: "4",
          slets: "5",
          Cartlod: false,
          data: null,
        },
        {
          CartName: "职业与授信额度分布",
          LabelType: "",
          LabelName: "",
          CartType: "3",
          slets: "5",
          Cartlod: false,
          data: null,
        },
      ],
      //存储图表数据
      // 名称1
      actish_telmp_1: [false, false, false, false],
      actish_telmp_2: [false, false, false],
      userattributeindex: 0,
      userbehaviorindex: 0,
      usersequenceindex: 0,
      cartquery: {
        cart1: 1,
        cart2: 1,
        cart3: 1,
        cart4: 1,
        cart5: 1,
      },
      m1: [],
      m2: [],
      m3: [],
      //已使用标签数组
      uselabelList: [],
      //
      portrait: {},
    };
  },
  mounted() {
    this.pageslet();
    // this.creEchodataCustomergroup();
  },
  watch: {},
  methods: {
    
    //画像图表下拉框
    async getChartStatisticsData(obj, index) {
      let { CartName, LabelType, LabelName, CartType, slets } = obj;
      this.CartList[index].Cartlod = true;
      let res = await getDataNoAdd({
        options: slets,
        "imageInfoChart.charName": CartName,
        "imageInfoChart.charType": CartType,
        "imageInfoChart.tagType": LabelType,
        "imageInfoChart.tagId": LabelName,
        userGroupId: this.userGroupId,
      }).catch((err) => {
        this.CartList[index].Cartlod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.CartList[index].Cartlod = false;
      this.CartList[index].data = res.data;
    },
    // 回显数据-ok
    async creEchodataCustomergroup() {
      this.lod = true;
      let res = await getUserGroupUse({ userGroupId: this.userGroupId }).catch(
        (err) => {
          this.lod = false;
          const { response } = err;
          this.$message.error(response.data.message);
          return;
        }
      );
      this.lod = false;
      if (res.code !== 200) {
        this.userGroupIdish = false;
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.userGroupIdish = true;
      const { data } = await findRuleEcho({ userGroupId: this.userGroupId });
      const res1 = await getUserGroupPeople({ userGroupId: this.userGroupId });
      this.portrait = res1.data;
      let proportion = 0;
      let showprop = 0;
      if (res1.data.allPeople && res1.data.allPeople !== 0) {
        if (res1.data.userGroupPeople) {
          proportion = Number(
            (res1.data.userGroupPeople / res1.data.allPeople).toFixed(2)
          );
        } else {
          proportion = 0;
        }
      } else {
        if (res1.data.userGroupPeople && res1.data.userGroupPeople != 0) {
          proportion = 100;
        } else {
          proportion = 0;
        }
      }
      if (proportion > 100) {
        showprop = 100;
      } else {
        showprop = proportion;
      }
      this.portrait[`proportion`] = proportion;
      this.portrait[`showprop`] = showprop;
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
          this.echodatagroupList.arr2.forEach((i) => {
            i.statisticsThree = String(i.statisticsThree);
            i.statisticsFour = String(i.statisticsFour);
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
      console.log(data);
    },
    //判断标签名称是否可用
    async getImageUse() {
      let ish = true;
      this.uselabelList.forEach((item) => {
        if (item == this.londtelmpatequery.LabelName) {
          ish = false;
          this.londtelmpatequery.LabelName = "";
          return;
        }
      });
      if (!ish) {
        return this.$message.error("标签名称已使用，请选择其他标签");
      }
      this.$message.success("标签名称可用");
    },
    // 页面所有下拉框获取
    async pageslet() {
      if (!window.sessionStorage.getItem("slets")) {
        this.$message.error("下拉框已丢失，重新获取");
        this.$router.push({ path: "/login" });
        return;
      }
      this.slet_lod = true;
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
      };
      // this.lod = true;
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      // 总次数-总金额
      // const { data: slettagCalLat1 } = await sysdict("tagCalLat1").catch(() => {
      //   this.lod = false;
      // });
      // // 天周月
      // const { data: slettagModifyDateType } = await sysdict(
      //   "tagModifyDateType"
      // ).catch(() => {
      //   this.lod = false;
      // });
      // // 标签事件选择
      // const { data: tagCalEvent } = await sysdict("tagCalEvent").catch(() => {
      //   this.lod = false;
      // });
      // // 安全量计算
      // const { data: slettagPredict } = await sysdict("tagPredict").catch(() => {
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
      const { data: findUserGroupDropDownBo } =
        await findUserGroupDropDownBox().catch((err) => {
          this.slet_lod = false;
          const { response } = err;
          this.$message.error(response.data.message);
          return;
        });
      this.slet_lod = false;
      this.pagedictsletsList.findUserGroupDropDownBo = findUserGroupDropDownBo;
      // // this.ruleFormonelab.accordingDay = slettagModifyDateType.data[0].value;
      // //
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
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // this.ruleFormonelab.userGroupInfoLimit.estimateNum =
      //   slettagPredict.data[0].value;
    },
    //获取标签下拉框
    async findTagDropDownBox() {
      this.londtelmpatequery.LabelName = "";
      this.label_slet_lod = true;
      let { data } = await findTagDropDownBox({
        createType: this.londtelmpatequery.LabelType,
      }).catch((err) => {
        this.label_slet_lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.label_slet_lod = false;
      this.findTagDropDownBoxList = data;
    },
    //切换标签
    ckeckact1(index, type) {
      this.actish_telmp_1 = [false, false, false, false];
      this.actish_telmp_1[index] = true;
      this.londtelmpatequery.LabelType = type;
      this.actish_telmp_2 = [false, false, false];
      this.londtelmpatequery.CartType = "";
      this.findTagDropDownBox();
    },
    //切换图标
    ckeckact2(index, type) {
      this.actish_telmp_2 = [false, false, false];
      this.actish_telmp_2[index] = true;
      this.londtelmpatequery.CartType = type;
    },
    // 加载模板
    loadtelmpate() {
      this.loadmpateish = true;
    },

    // 选择客户群体下拉框
    findUserGroupDropDownBox() {},

    datak1(index, params) {},

    // 不使用模板，自定义查看
    notusetel() {
      this.activecancel();
      this.nottel = true;
    },
    loadedtelmpart() {
      if (this.activetelindex != 0 && !this.activetelindex) {
        return this.$message.error("请选择模板，或自定义模板");
      }
      this.telmpateish = true;
      this.loadmpateish = false;
      this.$nextTick(() => {
        this.CartList[0].data = [
          { tagLayerName: "高危", calculateNum: 42 },
          { tagLayerName: "中等", calculateNum: 18 },
          { tagLayerName: "良好", calculateNum: 36 },
          { tagLayerName: "较高", calculateNum: 18 },
        ];
        this.CartList[1].data = [
          { tagLayerName: "50~65", calculateNum: 42 },
          { tagLayerName: "35~50", calculateNum: 18 },
          { tagLayerName: "23~35", calculateNum: 36 },
          { tagLayerName: "-INF~23", calculateNum: 18 },
        ];
        this.CartList[2].data = [
          { tagLayerName: "工作年限在10年以上", calculateNum: 42 },
          { tagLayerName: "工作年限在5到10年", calculateNum: 18 },
          { tagLayerName: "[未知]", calculateNum: 36 },
          { tagLayerName: "工作年限在3到5年", calculateNum: 18 },
          { tagLayerName: "工作年限在1到3年", calculateNum: 45 },
        ];
        this.CartList[3].data = [
          { tagLayerName: "新一线城市", calculateNum: 42 },
          { tagLayerName: "二线城市", calculateNum: 18 },
          { tagLayerName: "四线城市", calculateNum: 36 },
          { tagLayerName: "三线城市", calculateNum: 18 },
          { tagLayerName: "一线城市", calculateNum: 28 },
          { tagLayerName: "[未知]", calculateNum: 38 },
        ];
        this.CartList[4].data = [
          { tagLayerName: "", calculateNum: 42 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 36 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
          { tagLayerName: "", calculateNum: 18 },
        ];
      });
    },
    // 确定
    telmpatedetermine() {
      this.$refs["londfrom"].validate(async (val) => {
        if (val) {
          let from = {
            options: "5",
            userGroupId: this.userGroupId,
            "imageInfoChart.charName": this.londtelmpatequery.CartName,
            "imageInfoChart.charType": this.londtelmpatequery.CartType,
            "imageInfoChart.tagId": this.londtelmpatequery.LabelName,
            "imageInfoChart.tagType": this.londtelmpatequery.LabelType,
          };
          this.dologlod = true;
          let res = await getDataNoAdd(from).catch((err) => {
            this.dologlod = false;
            const { response } = err;
            this.$message.error(response.data.message);
            return;
          });
          this.dologlod = false;
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.$message.success("新增成功");
          if (!this.telmpateish) {
            this.CartList = [];
          }
          this.CartList.push({
            CartName: this.londtelmpatequery.CartName,
            LabelType: this.londtelmpatequery.LabelType,
            LabelName: this.londtelmpatequery.LabelName,
            CartType: this.londtelmpatequery.CartType,
            data: null,
            slets: "5",
            Cartlod: false,
          });
          this.uselabelList.push(this.londtelmpatequery.LabelName);
          this.telmpateish = true;
          this.nottel = false;
          this.loadmpateish = false;
          this.$nextTick(() => {
            if (!this.CartList[this.CartList.length - 1].data) {
              this.CartList[this.CartList.length - 1].data = res.data;
            }
          });
          if (this.$refs["ruleFormonelab"] !== undefined) {
            this.$refs["londfrom"].resetFields();
          }
        }
      });
    },
    // 取消自定义模板
    cenlact_telmpate_cart() {
      if (this.$refs["londfrom"] !== undefined) {
        this.$refs["londfrom"].resetFields();
      }
      this.actish_telmp_2 = [false, false, false];
      this.actish_telmp_1 = [false, false, false, false];
      this.nottel = false;
    },
    activetelstate(v) {
      this.activetel = [];
      this.activetel[v] = "act-a1";
      this.activetelindex = v;
      if (v == 0) {
      } else if (v == 1) {
      }
    },
    activecancel() {
      this.activetel = ["", ""];
      this.activetelindex = null;
      this.loadmpateish = false;
    },
    //保存画像
    async addportrait() {
      let from = {
        userGroupId: this.userGroupId,
        imageInfoCharts: [],
      };
      this.CartList.forEach((item) => {
        from.imageInfoCharts.push({
          charName: item.CartName,
          charType: item.CartType,
          tagId: item.LabelName,
          tagType: item.LabelType,
        });
      });
      this.lod = true;
      let res = await addportrait(from).catch((err) => {
        this.lod = false;
        const { response } = err;
        this.$message.error(response.data.message);
        return;
      });
      this.lod = false;
      if (res.code !== 200) {
        return this.$message.error(res.message);
      }
      this.$message.success(res.message);
      this.$router.push({ name: "guestgroupportrait" });
    },
  },
};
</script>

<style lang="scss" scoped>
.act-lab {
  margin-left: 10px;
}
//右边
.right {
  display: flex;
  flex-direction: column;
  float: right;
  margin-left: 100px;
  font-size: 12px;
  justify-content: center;
  .slet-text {
    margin-bottom: 20px;
    color: rgb(2, 167, 240);
    cursor: pointer;
  }
}
.cust {
  padding: 20px;
  background-color: rgb(242, 242, 242);
  position: relative;
}
.group {
  background-color: #fff;
  border: 1px solid;
  padding: 20px 10px;
}
.add {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
}
.load {
  margin: 15px 20px;
}
.group-dynamic {
  min-height: 300px;

  .cart {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .cart-tel {
      width: 49.6%;
      margin-bottom: 10px;
    }
    .el-row {
      margin-bottom: 10px;
    }
  }
  .cart-tel {
    height: 400px;
    border: 1px solid rgb(215, 215, 215);
    padding: 20px 10px;
    position: relative;
    .cart-lod {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 100;
      top: 0;
      left: 0;
    }
    .carthade {
      display: flex;
    }
    .cart-view {
      width: 100%;
      height: 100%;
    }
  }
}
.carthade > div:last-child {
  display: flex;
  justify-content: flex-end;
}
.carthade > div {
  flex: 1;
  font-size: 14px;
  p:nth-child(2) {
    font-size: 12px;
    margin: 5px 0;
  }
  .el-select {
    width: 140px;
  }
}
.not-lod-tel {
  border-top: 1px solid rgb(215, 215, 215);
  padding: 20px;
  position: relative;
  .oper {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a {
      margin: 0 10px;
    }
  }
}
.not-lod-tel .from {
  header {
  }
  .act {
    width: 92%;
    display: flex;
    justify-content: space-between;
  }
  .act-cart-1 {
    display: flex;
    justify-content: space-between;
    width: 46.5%;
  }
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
::v-deep {
  .icon-slet-portrait {
    .el-input__inner {
      //如果你的style 加了scoped 需要加/deep/
      background: url("../../assets/icon/u2882.svg") no-repeat; //引入icon
      background-size: 12px 12px; //这个是图片的大小，在这里不能直接设置width  height,设置宽高其实是select的宽高，图片可能会失真只设置宽度  高度auto也行
      background-position: 6px 8px; //在input中定位置  这两个参数是x  y坐标
      padding: 0 0 0 26px; //需要设置padding 把placeholder向右移
      box-sizing: border-box;
      font-size: 14px;
    }
  }
}
::v-deep {
  .not-lod-tel {
    .ipt {
      .el-input__inner:focus {
        border-color: rgb(85, 217, 161);
      }
    }
  }
}
.group-fixed {
  background-color: rgb(247, 249, 250);
  padding: 20px;
  .head {
    display: flex;
    font-size: 15px;
    font-weight: bold;
    align-items: center;
    padding: 0 0 10px 10px;
    .el-select {
      margin: 0 10px;
    }
    .store {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .head1 {
    margin: 10px 10px;
    font-size: 15px;
  }
  .slets1 {
    padding: 10px;
    background-color: #fff;
  }
  .slets2 > div {
    display: flex;
  }
  .slets2 {
    padding: 10px 20px;

    background-color: #fff;
    .tit {
      font-size: 12px;
      display: flex;
      .tit-center {
        margin: 0 30px;
      }
    }
    .left {
      margin: 20px 0;
      display: flex;
      .left-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        a {
          font-size: 12px;
        }
        span:nth-child(2) {
          margin-top: 5px;
          font-size: 12px;
          color: rgb(170, 170, 170);
        }
      }
    }
  }
}
.tel-dolig {
  .tit {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
    color: rgb(45, 145, 255);
    font-size: 14px;
    cursor: pointer;
  }
  .act {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .act-a1 {
      border: 1px solid rgb(71, 203, 149);
    }
  }
  .act > div {
    width: 42%;
    height: 100px;
    border: 1px solid rgb(215, 215, 215);
    padding: 15px 10px;
    display: flex;
    position: relative;
    cursor: pointer;
    div {
      margin-top: 3px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      span:last-child {
        color: rgb(215, 215, 215);
      }
      span {
        margin: 2px 0;
      }
    }
    .el-icon-menu {
      font-size: 50px;
      color: rgb(170, 170, 170);
    }
    .posicon {
      position: absolute;
      top: -1px;
      right: -1px;
    }
    .success {
      position: absolute;
      top: 0;
      right: 0;
      width: 7px;
      height: 6px;
    }
  }
  .oper {
    margin-top: 20px;
    border-top: 1px solid rgb(215, 215, 215);
    padding: 10px 0 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-button {
      margin: 0 0 0 10px;
    }
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
}
::v-deep {
  .el-alert--warning.is-light {
    background-color: rgb(234, 249, 255);
  }
  .el-alert__icon.el-icon-warning {
    color: rgb(62, 133, 249);
  }
  .el-alert__title {
    color: rgb(127, 127, 127);
  }
}
.frames {
  padding: 5px;
  width: 100%;
}
.hid {
  display: flex;
  position: relative;
  width: 60%;
  ul {
    flex: 1;
    font-size: 12px;
  }
}
.green {
  background-color: rgb(80, 205, 152);
  color: #fff;
}
</style>
