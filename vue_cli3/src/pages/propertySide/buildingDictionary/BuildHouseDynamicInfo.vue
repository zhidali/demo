<!--
    @file: 户型楼栋信息更新模块
    @description: 户型楼栋信息更新模块
    @author: xiebin
    @date: 2019-11-14
-->
<template>
    <div class="dynamic-info-box">
        <div class="title-content">
            <h3>户型楼栋动态信息</h3>
            <p>【只有新增/编辑具体户型才算作户型任务更新哦】</p>
        </div>
        <div class="form-content-box">
            <div class="add-house" >
                <div
                    v-for="(data, ind) in houseInfo"
                    :key="ind">
                    <!-- 新增户型 -->
                    <div v-if="data.type === 'houseType'">
                        <div
                            v-for="item in data.addHouse"
                            :key="item.id">
                            <el-form
                                :model="item.houseFormList"
                                :ref="'ruleForm'+data.id"
                                :rules="item.rules"
                                label-width="100px"
                                :validate-on-rule-change="false">
                                <el-form-item
                                    label="户型编号:"
                                    prop="houseIdVal">
                                    <el-input
                                    v-model.trim="item.houseFormList.houseIdVal"
                                    placeholder="存在编号即可输入编号，不知道时输入面积即可"
                                    class="house-id"
                                    maxlength="20"
                                    minlength="1">
                                    </el-input>
                                    <el-button
                                        type="danger"
                                        @click="delAddHouseTag(houseInfo, ind, 'ruleForm' + data.id)">
                                        删除
                                    </el-button>
                                </el-form-item>
                                <el-form-item
                                    label="厅室描述:"
                                    required
                                    :show-message="false"
                                    :error="''">
                                    <div class="hall-style">
                                    <el-col :span="4">
                                        <el-form-item prop="roomVal">
                                            <num-input
                                                v-model="item.houseFormList.roomVal"
                                                minVal="1"
                                                maxVal="20"
                                                @blur="houseRoomLinkage(item.houseFormList.roomVal, item.houseFormList, item.rulesReg)">
                                            </num-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">
                                        室
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item>
                                            <num-input
                                                v-model="item.houseFormList.hallVal"
                                                minVal="0"
                                                maxVal="20">
                                            </num-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">
                                        厅
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item>
                                            <num-input
                                                v-model="item.houseFormList.kitchenVal"
                                                minVal="0"
                                                maxVal="20">
                                            </num-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">
                                        厨
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item>
                                            <num-input
                                                v-model="item.houseFormList.guardVal"
                                                minVal="0"
                                                maxVal="20">
                                            </num-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">
                                        卫
                                    </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    label="户型居室:"
                                    :error="item.rulesReg.houseTypeErrorTexts"
                                    :show-message="item.rulesReg.houseTypeErrorText"
                                    :required="item.rulesReg.houseTypeErrorRequired">
                                    <el-select
                                        v-model="item.houseFormList.houseRoomVal"
                                        placeholder="请选择"
                                        @change="houseTypeChange(item.houseFormList, item.rulesReg, $event)">
                                        <el-option
                                            v-for="item in roomType"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                    <!-- prop="salStatusVal" -->
                                <el-form-item
                                    label="销售状态:"
                                    :error="item.rulesReg.salErrorTexts"
                                    :show-message="item.rulesReg.salErrorText"
                                    :required="item.rulesReg.salErrorRequired">
                                    <el-radio-group
                                        v-model="item.houseFormList.salStatusVal"
                                        @change="salChangeStatus(item.houseFormList, item.rulesReg, $event)">
                                        <el-radio
                                            v-for="item in saleStatus"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="户型类型:"
                                    v-if="houseTag.length > 1 ? true : false">
                                    <el-radio-group v-model="item.houseFormList.houseTagVal">
                                        <el-radio
                                            v-for="item in houseTag"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="面积类型:"
                                    :error="item.rulesReg.areaErrorTexts"
                                    :show-message="item.rulesReg.areaErrorText"
                                    :required="item.rulesReg.areaErrorRequired">
                                    <el-checkbox-group
                                        v-model="item.houseFormList.checkBoxListVal"
                                        @change="clearInputVal(item.houseFormList, item.rulesReg, $event)">
                                        <el-checkbox label="0">建筑面积</el-checkbox>
                                        <el-checkbox label="1">套内面积</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item
                                    label="建筑面积:"
                                    v-show="item.houseFormList.checkBoxListVal.includes('0') || (item.houseFormList.checkBoxListVal.includes('0') && item.houseFormList.checkBoxListVal.includes('1'))">
                                    <num-input
                                        v-model="item.houseFormList.buildingAreaVal"
                                        minVal="1"
                                        maxVal="99999"
                                        reg="twoNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>㎡
                                </el-form-item>
                                <el-form-item
                                    label="套内面积:"
                                    v-show="item.houseFormList.checkBoxListVal.includes('1') || (item.houseFormList.checkBoxListVal.includes('0') && item.houseFormList.checkBoxListVal.includes('1'))">
                                    <num-input
                                        v-model="item.houseFormList.insideAreaVal"
                                        minVal="1"
                                        maxVal="99999"
                                        reg="twoNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>㎡
                                </el-form-item>
                                <el-form-item
                                    label="单价:"
                                    prop="singlePriceVal">
                                    <num-input
                                        v-model="item.houseFormList.singlePriceVal"
                                        minVal="0.0001"
                                        maxVal="99.9999"
                                        reg="fourNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>万元
                                </el-form-item>
                                <el-form-item
                                    label="总价:"
                                    prop="allPriceVal">
                                    <num-input
                                        v-model="item.houseFormList.allPriceVal"
                                        reg="fourNum"
                                        class="in-stock"
                                        minVal="0.0001"
                                        maxVal="99998.9999">
                                    </num-input>万元
                                </el-form-item>
                                <el-form-item label="">
                                    <div class="message">
                                        <i class="el-icon-warning"></i>
                                        <span>面积和价格如果确定是同一个户型的区间值，则均可录入为区间值中的最小值</span>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    label="在售余量:">
                                    约<num-input
                                        v-model="item.houseFormList.inStockMarginVal"
                                        minVal="0"
                                        maxVal="99999"
                                        reg="parseInt"
                                        class="in-stock">
                                    </num-input>套
                                </el-form-item>
                                <el-form-item
                                    label="余量标签:"
                                    v-show="item.houseFormList.salStatusVal === 3 ? false : true">
                                    <el-radio-group v-model="item.houseFormList.marginTagVal">
                                        <el-radio
                                            v-for="item in marginTagList"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="户型图:">
                                    <!-- 上传图片组件 -->
                                    <img-upload
                                        :ref="'upload' + item.houseFormList.imgListRefs"
                                        :uploadId="'upLoadId' + ind">
                                    </img-upload>
                                </el-form-item>
                                <el-form-item
                                    label="关联楼栋:">
                                    <el-select
                                        v-model="item.houseFormList.projectBuildingval"
                                        placeholder="请选择"
                                        multiple
                                        @focus="focusBuildingInfo">
                                        <el-option
                                            v-for="item in projectBuildList"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="toAddBuilding('addHouse')">
                                        +楼栋
                                    </el-button>
                                    <span>找不到所需楼栋可点击取添加</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <!-- 面积段 -->
                    <div v-if="data.type === 'areaType'">
                        <div v-for="item in data.addHouse"
                            :key="item.id">
                            <el-form
                                :model="item.houseFormList"
                                :ref="'ruleForm' + data.id"
                                :rules="item.rules"
                                label-width="100px"
                                :validate-on-rule-change="false">
                                <el-form-item
                                    label="面积段:"
                                    required
                                    :show-message="false"
                                    :error="''">
                                <el-col
                                    :span="15"
                                    v-if="item.houseFormList.areaDelInterval">
                                    <el-form-item prop="areaSegmentVal">
                                            <num-input
                                                v-model="item.houseFormList.areaSegmentVal"
                                                minVal="1"
                                                maxVal="99998.99"
                                                reg="twoNum"
                                                class="el-area-ipt">
                                            </num-input>㎡
                                        </el-form-item>
                                </el-col>
                                    <!-- 面积段区间输入框 -->
                                    <span class="interval-box" v-if="item.houseFormList.areaAddInterval">
                                        <el-form-item prop="minAreaSegmentVal">
                                            <num-input
                                                v-model="item.houseFormList.minAreaSegmentVal"
                                                minVal="1"
                                                maxVal="99998.99"
                                                reg="twoNum"
                                                class="num-el-input">
                                            </num-input>㎡ - 
                                        </el-form-item>
                                        <el-form-item prop="maxAreaSegmentVal">
                                            <num-input
                                                v-model="item.houseFormList.maxAreaSegmentVal"
                                                minVal="1"
                                                maxVal="99998.99"
                                                reg="twoNum"
                                                class="num-el-input">
                                            </num-input>㎡
                                        </el-form-item>
                                    </span>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="addAreaInterval(item.houseFormList, 'areaMargin')">
                                        {{item.houseFormList.areaAddIntervalText}}
                                    </el-button>
                                    <el-button
                                        type="danger"
                                        @click="delAddHouseTag(houseInfo, ind, 'ruleForm' + data.id)">
                                        删除
                                        </el-button>
                                </el-form-item>
                                    <!-- prop="salStatusVal" -->
                                <el-form-item
                                    label="销售状态:"
                                    :error="item.rulesReg.salErrorTexts"
                                    :show-message="item.rulesReg.salErrorText"
                                    :required="item.rulesReg.salErrorRequired">
                                    <el-radio-group
                                        v-model="item.houseFormList.salStatusVal"
                                        @change="salChangeStatus(item.houseFormList, item.rulesReg, $event)">
                                        <el-radio
                                            v-for="item in saleStatus"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="单价:">
                                    <span class="single-val-box" v-show="item.houseFormList.delInterval">
                                        <el-form-item
                                            :error="item.rulesReg.singleErrorTexts"
                                            :show-message="item.rulesReg.singleErrorText"
                                            :required="item.rulesReg.singleErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.singlePriceVal"
                                                minVal="0.0001"
                                                maxVal="99.9999"
                                                reg="fourNum"
                                                class="el-area-ipt"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元
                                        </el-form-item>
                                    </span>
                                    <!-- 单价区间 -->
                                    <span class="interval-box" v-show="item.houseFormList.addInterval">
                                         <!-- prop="minSinglePriceVal" -->
                                        <el-form-item
                                            :error="item.rulesReg.minSingleErrorTexts"
                                            :show-message="item.rulesReg.minSingleErrorText"
                                            :required="item.rulesReg.minSingleErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.minSinglePriceVal"
                                                minVal="0.0001"
                                                maxVal="99.9999"
                                                reg="fourNum"
                                                class="num-el-input"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元 - 
                                        </el-form-item>
                                        <el-form-item
                                            :error="item.rulesReg.maxSingleErrorTexts"
                                            :show-message="item.rulesReg.maxSingleErrorText"
                                            :required="item.rulesReg.maxSingleErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.maxSinglePriceVal"
                                                minVal="0.0001"
                                                maxVal="99.9999"
                                                reg="fourNum"
                                                class="num-el-input"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元
                                        </el-form-item>
                                    </span>
                                    <!-- 单价增加区间按钮 -->
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="addAreaInterval(item.houseFormList, 'singlePrice', item.rules)">
                                        {{item.houseFormList.addIntervalText}}
                                    </el-button>
                                </el-form-item>
                                <!-- 总价 -->
                                <el-form-item
                                    label="总价:">
                                    <span
                                        class="single-val-box"
                                        v-show="item.houseFormList.allPriceDelInterval">
                                        <el-form-item
                                            :error="item.rulesReg.allErrorTexts"
                                            :show-message="item.rulesReg.allErrorText"
                                            :required="item.rulesReg.allErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.allPriceVal"
                                                minVal="0.0001"
                                                maxVal="99998.9999"
                                                reg="fourNum"
                                                class="el-area-ipt"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元
                                        </el-form-item>
                                    </span>
                                    <span class="interval-box" v-show="item.houseFormList.allPriceAddInterval">
                                        <el-form-item
                                            :error="item.rulesReg.minAllErrorTexts"
                                            :show-message="item.rulesReg.minAllErrorText"
                                            :required="item.rulesReg.minAllErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.minAllPriceVal"
                                                minVal="0.0001"
                                                maxVal="99998.9999"
                                                reg="fourNum"
                                                class="num-el-input"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元 - 
                                        </el-form-item>
                                        <el-form-item
                                            :error="item.rulesReg.maxAllErrorTexts"
                                            :show-message="item.rulesReg.maxAllErrorText"
                                            :required="item.rulesReg.maxAllErrorRequired">
                                            <num-input
                                                v-model="item.houseFormList.maxAllPriceVal"
                                                minVal="0.0001"
                                                maxVal="99998.9999"
                                                reg="fourNum"
                                                class="num-el-input"
                                                @blur="IntervalRequiredFirst(item.rules, item.houseFormList, item.rulesReg)">
                                            </num-input>万元
                                        </el-form-item>
                                    </span>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="addAreaInterval(item.houseFormList,'allPrice')">
                                        {{item.houseFormList.allPriceAddIntervalText}}
                                    </el-button>
                                </el-form-item>
                                <el-form-item>
                                    <div class="message">
                                        <i class="el-icon-warning"></i>
                                        <span>单价和总价为2必填1</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="关联楼栋">
                                    <el-select
                                        v-model="item.houseFormList.projectBuildingval"
                                        placeholder="请选择"
                                        multiple
                                        @focus="focusBuildingInfo">
                                        <el-option
                                            v-for="item in projectBuildList"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>                                    
                                    </el-select>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="toAddBuilding('erarHosue')">
                                        +楼栋
                                    </el-button>
                                    <span>找不到所需楼栋可点击取添加</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <!-- 编辑户型 -->
                    <div v-if="data.type === 'editHouseType'">
                        <div 
                            v-for="item in data.addHouse"
                            :key="item.id">
                            <el-form
                                :model="item.houseFormList"
                                :ref="'ruleForm' + data.id"
                                :rules="item.rules"
                                label-width="100px"
                                :validate-on-rule-change="false">
                                <el-form-item label="户型编号:">
                                    <span>{{item.houseFormList.houseIdText}}</span>
                                    <el-button
                                        type="danger"
                                        class="btn-del"
                                        @click="delAddHouseTag(houseInfo, ind, 'ruleForm' + data.id)">
                                        删除
                                    </el-button>
                                </el-form-item>
                                    <!-- prop="salStatusVal" -->
                                <el-form-item
                                    label="销售状态:"
                                    :error="item.rulesReg.salErrorTexts"
                                    :show-message="item.rulesReg.salErrorText"
                                    :required="item.rulesReg.salErrorRequired">
                                    <el-radio-group
                                        v-model="item.houseFormList.salStatusVal"
                                        @change="salChangeStatus(item.houseFormList, item.rulesReg, $event)">
                                        <el-radio
                                            v-for="item in saleStatus"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="面积类型:"
                                    :error="item.rulesReg.areaErrorTexts"
                                    :show-message="item.rulesReg.areaErrorText"
                                    :required="item.rulesReg.areaErrorRequired">
                                    <el-checkbox-group
                                        v-model="item.houseFormList.checkBoxListVal"
                                        @change="clearInputVal(item.houseFormList, item.rulesReg, $event)">
                                        <el-checkbox label="0">建筑面积</el-checkbox>
                                        <el-checkbox label="1">套内面积</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item
                                    label="建筑面积:"
                                    v-show="item.houseFormList.checkBoxListVal.includes('0') || (item.houseFormList.checkBoxListVal.includes('0') && item.houseFormList.checkBoxListVal.includes('1'))">
                                    <num-input
                                        v-model="item.houseFormList.buildingAreaVal"
                                        minVal="1"
                                        maxVal="99999"
                                        reg="twoNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>㎡
                                </el-form-item>
                                <el-form-item
                                    label="套内面积:"
                                    v-show="item.houseFormList.checkBoxListVal.includes('1') || (item.houseFormList.checkBoxListVal.includes('0') && item.houseFormList.checkBoxListVal.includes('1'))">
                                    <num-input
                                        v-model="item.houseFormList.insideAreaVal"
                                        minVal="1"
                                        maxVal="99999"
                                        reg="twoNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>㎡
                                </el-form-item>
                                <el-form-item
                                    label="单价:"
                                    prop="singlePriceVal">
                                    <num-input
                                        v-model="item.houseFormList.singlePriceVal"
                                        minVal="0.0001"
                                        maxVal="99.9999"
                                        reg="fourNum"
                                        class="in-stock"
                                        @blur="calculationAllPrice(item.houseFormList, item.rulesReg)">
                                    </num-input>万元
                                </el-form-item>
                                <el-form-item
                                    label="总价:"
                                    prop="allPriceVal">
                                    <num-input
                                        v-model="item.houseFormList.allPriceVal"
                                        reg="fourNum"
                                        class="in-stock"
                                        minVal="0.0001"
                                        maxVal="99998.9999">
                                    </num-input>万元
                                </el-form-item>
                                <el-form-item>
                                    <div class="message">
                                        <i class="el-icon-warning"></i>
                                        <span>面积和价格如果确定是同一个户型的区间值，则均可录入为区间值中的最小值</span>
                                    </div>
                                </el-form-item>
                                <el-form-item
                                    label="在售余量:">
                                    约<num-input
                                        v-model="item.houseFormList.inStockMarginVal"
                                        minVal="0"
                                        maxVal="99999"
                                        reg="parseInt"
                                        class="in-stock">
                                    </num-input>套
                                </el-form-item>
                                <el-form-item
                                    label="余量标签:"
                                    v-show="item.houseFormList.salStatusVal === 3 ? false : true">
                                    <el-radio-group v-model="item.houseFormList.marginTagVal">
                                        <el-radio
                                            v-for="item in marginTagList"
                                            :key="item.id"
                                            :label="item.id">
                                            {{item.text}}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item
                                    label="关联楼栋:">
                                    <el-select
                                        v-model="item.houseFormList.projectBuildingval"
                                        placeholder="请选择"
                                        multiple
                                        @focus="focusBuildingInfo">
                                        <el-option
                                            v-for="item in projectBuildList"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id">
                                        </el-option>                                    
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="toAddBuilding('editorHosue')">
                                        +楼栋
                                    </el-button>
                                    <span>找不到所需楼栋可点击取添加</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <el-divider></el-divider>
                </div>
            </div>
        </div>
        <div class="btn-box">
            <el-select
                class="house-select"
                v-model="relatedHouseTypeVal"
                placeholder="请选择已有户型"
                value-key="text"
                @change="houseSelectData"
                @focus="houseUnique">
                <el-option
                    v-for="item in houseTagList"
                    :key="item.id"
                    :label="item.text"
                    :value="item">
                </el-option>
            </el-select>
            <el-button
                type="primary"
                @click="editHouse"
                :disabled="this.relatedHouseTypeVal.id === '' ? true : false">
                编辑具体户型
            </el-button>
            <el-button
                type="primary"
                @click="addHouse">
                +增加户型
            </el-button>
            <el-button
                type="primary"
                @click="addArea">
                +增加面积段
            </el-button>
        </div>
    </div>
</template>

<script>
import NumInput from '../../../components/NumberInput';
import ImgUpload from './components/ImageUpload';
import { commonFun } from "@/assets/js/utils/utils";
export default {
    name: 'BuildHouseDynamicInfo',
    components: {
        NumInput,
        ImgUpload
    },
    props: {
        // 销售状态
        saleStatus: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 城市
        belongCity: {
            type: String,
            default: ''
        },
        // 户型标签
        houseTag: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 在售余量
        marginTagList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 关联楼栋
        projectBuildList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 关联户型
        relatedHouseTypeList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 户型居室下拉
        roomType: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 弹窗传过来的户型
        editorHouseInfolist: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 价格校验弹窗传过来的户型Id
        houseId: {
            type: String,
            default: ''
        },
    },
    watch: {
        // 户型下拉列表参数
       'relatedHouseTypeList': function(val) {
           this.houseTagList = val;
       },
        // 弹窗报错后传入的户型props参数
       'editorHouseInfolist': function(val) {
           if (val) {
                // 过滤掉页面上新增和正在编辑的模块
               let uniqueArr = this.houseInfo.filter(item => {
                   return item.type === 'editHouseType' || item.type === 'houseType';
                });
                let arrList = [];
                let houseTypeList = [];
                uniqueArr.forEach((element,index) => {
                    arrList.push(element.addHouse[0].houseFormList);
                });
                houseTypeList = val.filter(item => !arrList.some(ele => ele.houseId === Number(item.houseId)));
                houseTypeList.forEach(item => {
                    this.houseTagText = item.text;
                    this.houseTagID = item.id;
                    this.oldPrice = item.price;
                    this.editHouse();
                });
        }
       },
       'houseId': function(val) {
            if (val) {
                let hosueList = this.houseInfo.filter(item => item.id == Number(val));
                hosueList.forEach(item => {
                    this.$set(item.addHouse[0].houseFormList, 'houseTypeFlag', 2);
                });
            }
       }
    },
    data() {
        return {
            // 录入
            refsNum: 0,
            // 户型标签列表
            houseTagList: [],
            // 编辑具体户型下拉val
            relatedHouseTypeVal: {
                id: '',
                text: '',
                price: ''
            },
            // 表单ID
            houseInfoKeyId: 0,
            // 表单
            houseInfo: []  
        }
    },
    mounted() {
        // 是否重楼盘分级任务详情页跳进来
        this.isProjectLevelPage();
    },
    methods: {
        /**
         * 清除校验户型居室状态
         * @param {object} rulesReg 当前模块校验参数列表
         */
        notHouseTypeChange(rulesReg) {
            rulesReg.houseTypeErrorTexts = '';
            rulesReg.houseTypeErrorText = false;
            rulesReg.houseTypeErrorRequired = true;
        },
        /**
         * 校验户型居室状态
         * @param {object} itemval 当前模块参数列表
         * @param {object} rulesReg 当前模块校验参数列表
         * @param {object} val 当前checkbox改变后的值
         */
        houseTypeChange(itemVal, rulesReg, val) {
            let flag = true;
            if (itemVal.houseRoomVal === '') {
                rulesReg.houseTypeErrorTexts = '请选择户型居室';
                rulesReg.houseTypeErrorText = true;
                rulesReg.houseTypeErrorRequired = true;
                flag = false;
            } else {
                rulesReg.houseTypeErrorTexts = '';
                rulesReg.houseTypeErrorText = false;
                rulesReg.houseTypeErrorRequired = true;
                flag = true;
            }
            return flag;
        },
        /**
         * 校验销售状态
         * @param {object} itemval 当前模块参数列表
         * @param {object} rulesReg 当前模块校验参数列表
         * @param {object} val 当前checkbox改变后的值
         */
        salChangeStatus(itemVal, rulesReg, val) {
            let flag = true;
            if (itemVal.salStatusVal === '') {
                rulesReg.salErrorTexts = '请选择销售状态';
                rulesReg.salErrorText = true;
                rulesReg.salErrorRequired = true;
                flag = false;
            } else {
                rulesReg.salErrorTexts = '';
                rulesReg.salErrorText = false;
                rulesReg.salErrorRequired = true;
                flag = true;
            }
            return flag;
        },
        /**
         * 清除销售校验状态
         * @param {object} itemval 当前模块参数列表
         * @param {object} rulesReg 当前模块校验参数列表
         * @param {object} val 当前checkbox改变后的值
         */
        notSalChangeStatus(itemVal, rulesReg, val) {
                rulesReg.salErrorTexts = '';
                rulesReg.salErrorText = false;
                rulesReg.salErrorRequired = true;
        },
        /**
         * 切换checkbox清空输入框
         * @param {object} itemval 当前模块参数列表
         * @param {object} rulesReg 当前模块校验参数列表
         * @param {object} val 当前checkbox改变后的值
         */
        clearInputVal(itemVal, rulesReg, val) {
            let {buildingAreaVal, insideAreaVal, allPriceVal} = itemVal;
            if (val.includes('0')) {
                this.$set(itemVal, 'insideAreaVal', '');
                this.$set(itemVal, 'allPriceVal', '');
                rulesReg.areaErrorTexts = '';
                rulesReg.areaErrorText = false;
                rulesReg.areaErrorRequired = false;
            } else if (val.includes('1')) {
                this.$set(itemVal, 'buildingAreaVal', '');
                this.$set(itemVal, 'allPriceVal', '');
                rulesReg.areaErrorTexts = '';
                rulesReg.areaErrorText = false;
                rulesReg.areaErrorRequired = false;
            } else if (val.length === 0) {
                this.$set(itemVal, 'insideAreaVal', '');
                this.$set(itemVal, 'buildingAreaVal', '');
                this.$set(itemVal, 'allPriceVal', '');
                rulesReg.areaErrorTexts = '请选择面积类型';
                rulesReg.areaErrorText = true;
                rulesReg.areaErrorRequired = true;
            } else if (val.length > 0) {
                rulesReg.areaErrorTexts = '';
                rulesReg.areaErrorText = false;
                rulesReg.areaErrorRequired = false;
            }
        },
        /**
         * 总计自动计算  单价*面积优先建筑面积/重庆城市要反过来
         * @param {object} itemVal 当前模块参数
         * @param {object} rulesReg 当前模块校验参数
         */
        calculationAllPrice(itemVal, rulesReg) {
            let {
                // 建筑面积
                buildingAreaVal,
                // 套内面积
                insideAreaVal,
                singlePriceVal,
                allPriceVal,
                // 面积类型复选框
                checkBoxListVal
            } = itemVal;
            if ((buildingAreaVal !== '' && singlePriceVal !== '') || (insideAreaVal !== '' && singlePriceVal !== '')) {
                if (buildingAreaVal !== '' && insideAreaVal !== '') {
                    if (this.belongCity === '20000050') {
                        allPriceVal = (insideAreaVal * singlePriceVal).toFixed(4);
                        this.$set(itemVal, 'allPriceVal', allPriceVal)
                    } else {
                        allPriceVal = (buildingAreaVal * singlePriceVal).toFixed(4);
                        this.$set(itemVal, 'allPriceVal', allPriceVal)
                    }
                } else if (buildingAreaVal !== '' && insideAreaVal === '') {
                    allPriceVal = (buildingAreaVal * singlePriceVal).toFixed(4);
                    this.$set(itemVal, 'allPriceVal', allPriceVal)
                } else {
                    allPriceVal = (insideAreaVal * singlePriceVal).toFixed(4);
                    this.$set(itemVal, 'allPriceVal', allPriceVal)
                }
            }
            // 自定义校验
            this.areaSingleReg(itemVal, rulesReg);
        },
        /**
         * 自定义面积类型不校验
         * @param {object} itemVal 当前模块参数
         * @param {object} rulesReg 当前模块校验参数
         */
        notAreaSingleReg(itemVal, rulesReg) {
            rulesReg.areaErrorTexts = '';
            rulesReg.areaErrorText = false;
            rulesReg.areaErrorRequired = false;
        },
        /**
         * 自定义面积类型校验
         * @param {object} itemVal 当前模块参数
         * @param {object} rulesReg 当前模块校验参数
         */
        areaSingleReg(itemVal, rulesReg) {
            let {
                // 建筑面积
                buildingAreaVal,
                // 套内面积
                insideAreaVal,
                // 面积类型复选框
                checkBoxListVal
            } = itemVal;
            let flag = false;
            if (checkBoxListVal.includes('1') && checkBoxListVal.includes('0')) {
                if(insideAreaVal === '' && buildingAreaVal === '') {
                    rulesReg.areaErrorTexts = '套内面积和建筑面积二必填一';
                    rulesReg.areaErrorText = true;
                    rulesReg.areaErrorRequired = true;
                    flag = true;
                } else {
                    rulesReg.areaErrorTexts = '';
                    rulesReg.areaErrorText = false;
                    rulesReg.areaErrorRequired = true;
                    flag = false;
                }
            } else if (checkBoxListVal.includes('0')) {
                if(buildingAreaVal === '') {
                    rulesReg.areaErrorTexts = '建筑面积不能为空';
                    rulesReg.areaErrorText = true;
                    rulesReg.areaErrorRequired = true;
                    flag = true;
                } else {
                    rulesReg.areaErrorTexts = '';
                    rulesReg.areaErrorText = false;
                    rulesReg.areaErrorRequired = true;
                    flag = false;
                }
            } else if (checkBoxListVal.includes('1')) {
                if(insideAreaVal === '') {
                    rulesReg.areaErrorTexts = '套内面积不能为空';
                    rulesReg.areaErrorText = true;
                    rulesReg.areaErrorRequired = true;
                    flag = true;
                } else {
                    rulesReg.areaErrorTexts = '';
                    rulesReg.areaErrorText = false;
                    rulesReg.areaErrorRequired = true;
                    flag = false;
                }
            } else if (checkBoxListVal.length === 0) {
                rulesReg.areaErrorTexts = '请选择面积类型';
                rulesReg.areaErrorText = true;
                rulesReg.areaErrorRequired = true;
                flag = true;
            } else {
                flag = false;
            }
            return flag;
        },
        // 关联楼栋获取焦点重新获取关联楼栋
        focusBuildingInfo() {
            this.$emit('buildFocus');
        },
        /**
         * 公共埋点方法
         * @param {string} trackid 埋点ID
         * @param {object}} para 埋点拓展字段
         */
        setTrack(trackId, para) {
            commonFun.setTrackMenu(trackId, para);
        },
        // 是否冲楼盘分级任务详情页跳进来
        isProjectLevelPage() {
            let {
                houseTypeId,
                houseTypeNum,
                houseTypePrice
            } = this.$route.query;
            if (houseTypeId && houseTypeNum) {
                this.houseTagText = houseTypeNum;
                this.houseTagID = houseTypeId;
                this.oldPrice = houseTypePrice;
                this.editHouse();
            }
        },
        /**
         * 户型居室联动
         * @param {string} roomVal 室的val
         * @param {object} item 当前的户型所在的对象
         */
        houseRoomLinkage(roomVal, item, rulesReg) {
            if (roomVal <= 1) {
            } else if (roomVal <= 5) {
                this.notHouseTypeChange(rulesReg);
                this.$set(item, 'houseRoomVal', Number(roomVal));
            } else {
                this.notHouseTypeChange(rulesReg);
                this.$set(item, 'houseRoomVal', 5);
            }
        },
        // 表单提交校验
        formSubmitValidate() {
            return new Promise((resolve, reject) => {
                let arr = [];
                let regForm = (formName, itemVal) => {
                    var result = new Promise((resolve, reject) => {
                        // 提交的时候验证面积段模块的二必填一校验
                        // 面积段单价总价模块flag
                        let flags = true;
                        let flagsArr = [];
                        // 面积类型模块flag
                        let areaFlag = false;
                        let areaFalgArr = [];
                        // 销售状态模块flag
                        let salFalg = true;
                        let allFalgArr = [];
                        // 户型居室模块flag
                        let houseTypeFalg = true;
                        let houseTypeFalgArr = [];
                        let senRequiredList = this.houseInfo.filter(item => item.type === 'areaType');
                        senRequiredList.find(item => {
                            flags = this.IntervalRequiredFirst(item,item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                            salFalg = this.salChangeStatus(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                            flagsArr.push(flags);
                            allFalgArr.push(salFalg);
                        })
                        let areaRequiredList = this.houseInfo.filter(item => {
                            return item.type === 'editHouseType' || item.type === 'houseType'
                        });
                        areaRequiredList.find(item => {
                            areaFlag = this.areaSingleReg(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                            salFalg = this.salChangeStatus(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                            houseTypeFalg = this.houseTypeChange(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                            areaFalgArr.push(areaFlag);
                            allFalgArr.push(salFalg);
                            houseTypeFalgArr.push(salFalg);
                        })
                        this.$refs[formName][0].validate(valid => { 
                            if (valid && !flagsArr.includes(false) && !areaFalgArr.includes(true) && !allFalgArr.includes(false) && !houseTypeFalgArr.includes(false)) {
                                resolve(itemVal);
                            } else {
                                reject();
                            }
                        })
                    })
                    arr.push(result);
                }
                // 整个表单校验
                let saveData = {};
                let id;
                for (let i = 0; i < this.houseInfo.length; i++) {
                    id = this.houseInfo[i].id;
                    regForm('ruleForm' + id, this.houseInfo[i]);
                }
                // 统一执行
                Promise.all(arr).then((result)=>{
                    let flag = true;
                    for (let i = 0; i< result.length; i++) {
                        // 室的val
                        let houseVal = Number(result[i].addHouse[0].houseFormList.roomVal);
                        // 户型居室下拉val
                        let houseRoomVal = result[i].addHouse[0].houseFormList.houseRoomVal;
                        // 户型销售状态
                        let houseStausVal = result[i].addHouse[0].houseFormList.salStatusVal;
                        // 在售余量
                        let houseInStockVal = result[i].addHouse[0].houseFormList.inStockMarginVal;
                        // 编辑户型编号
                        let houseIdTextVal = result[i].addHouse[0].houseFormList.houseIdText;
                        // 新增户型编号
                        let houseIdValue = result[i].addHouse[0].houseFormList.houseIdVal;
                        let id = result[i].id;
                        let {
                            // 建筑面积
                            buildingAreaVal,
                            // 套内面积
                            insideAreaVal,
                            singlePriceVal,
                            allPriceVal,
                            hallVal,
                            kitchenVal,
                            guardVal,
                            // 单价
                            minSinglePriceVal,
                            maxSinglePriceVal,
                            // 总价
                            minAllPriceVal,
                            maxAllPriceVal,
                            // 面积段
                            minAreaSegmentVal,
                            maxAreaSegmentVal
                            } = result[i].addHouse[0].houseFormList;
                            // 校验户型居室联动
                            if ((houseVal > 1 || (houseVal === 1 && (houseRoomVal !== 0 && houseRoomVal !== 7 ))) && houseVal <= 5 && houseVal !== houseRoomVal) {
                                this.addMessageDialog('厅室描述和户型居室不匹配，请确认检查信息！');
                                flag = false;
                                break;
                            } else if (houseVal > 1 && houseVal > 5 && houseRoomVal !== 5) {
                                this.addMessageDialog('厅室描述和户型居室不匹配，请确认检查信息！');
                                flag = false;
                                break;
                            } else if (houseInStockVal !== '' && Number(houseStausVal) === 3 && Number(houseInStockVal) > 0) {
                                this.addMessageDialog(`${houseIdValue || houseIdTextVal}销售状态和在售余量不自冾`);
                                flag = false;
                                break;
                            } else if (houseInStockVal !== '' && (Number(houseStausVal) === 2 || Number(houseStausVal) === 4) && Number(houseInStockVal) <= 0) {
                                this.addMessageDialog(`${houseIdValue || houseIdTextVal}销售状态和在售余量不自冾`);
                                flag = false;
                                break;
                            } else if ((minAreaSegmentVal !== '' && maxAreaSegmentVal !== '') && Number(minAreaSegmentVal) >= Number(maxAreaSegmentVal)) {
                                // 校验面积段区间值
                                this.blurMarginIpt(result[i].addHouse[0].houseFormList, 'areaMargin');
                                flag = false;
                                break;
                            } else if ((minSinglePriceVal !== '' && maxSinglePriceVal !== '') && Number(minSinglePriceVal) >= Number(maxSinglePriceVal)) {
                                // 校验单价区间值
                                this.blurMarginIpt(result[i].addHouse[0].houseFormList, 'singlePrice');
                                flag = false;
                                break;
                            } else if ((minAllPriceVal !== '' && maxAllPriceVal !== '') && Number(minAllPriceVal) >= Number(maxAllPriceVal)) {
                                // 校验总价区间值
                                this.blurMarginIpt(result[i].addHouse[0].houseFormList, 'allPrice');
                                flag = false;
                                break;
                            }
                    }
                    if (flag) {
                        resolve(saveData = {
                            successful: true,
                            formInfo: {
                                house_type: this.formSubmitKeysComversion()
                                }
                        })
                    }
                })
                .catch(() => {
                    resolve(saveData = {
                        successful: false,
                        formInfo: '',
                        domScrollTop: this.$refs['ruleForm' + id]
                    })
                })
                // 当户型楼栋信息和楼盘动态信息都为空的时候
                if (this.houseInfo.length <= 0) {
                    resolve(saveData= {
                        successful: true,
                        formInfo: {
                            house_type: this.formSubmitKeysComversion()
                        },
                        isEmpty: true
                    })
                }
            })
        },
        /**
         * 提示message框
         * @param {string} message 消息提示
         */
        addMessageDialog(message, confim='确定', cancel='取消') {
            this.$confirm(message, '提示', {
                confirmButtonText: confim,
                cancelButtonText: cancel,
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已确认'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        // 表单验证成功提交字段转换
        formSubmitKeysComversion() {
            let houseList = [];
            let submitList = [];
            this.houseInfo.forEach(item => {
                // 添加type到字段列表中
                item.addHouse[0].houseFormList.type = item.type;
                item.addHouse[0].houseFormList.houseId = item.id;
                houseList.push(item.addHouse[0].houseFormList);
            })
            houseList.map((item, index) => { 
                let submitKeys = {};
                // type类型
                submitKeys.type = item.type || '';
                // 户型id
                submitKeys.house_type_id = item.houseTypeId || '';
                // 户型编号
                submitKeys.house_type_num = item.houseIdVal || item.houseIdText || '';
                // 面积段无区间值
                submitKeys.area = item.areaSegmentVal || '';
                // 面积段区间最小值
                submitKeys.min_area = item.minAreaSegmentVal || '';
                // 面积段区间最大值
                submitKeys.max_area = item.maxAreaSegmentVal || '';
                // 室
                submitKeys.layout_shi = item.roomVal || '';
                // 厅
                submitKeys.layout_ting = item.hallVal || '';
                // 厨
                submitKeys.layout_chu = item.kitchenVal || '';
                // 卫
                submitKeys.layout_wei = item.guardVal || '';
                // 户型居室
                submitKeys.room_type = item.houseRoomVal || '';
                // 户型销售状态
                submitKeys.status = item.salStatusVal || '';
                // 户型类型
                submitKeys.building_type = item.houseTagVal || '';
                // 建筑面积
                submitKeys.acreage = item.buildingAreaVal || '';
                // 套内面积
                submitKeys.ac_acreage = item.insideAreaVal || '';
                // 户型无区间单价值
                submitKeys.price = item.singlePriceVal || '';
                // 户型单价区间最小值
                submitKeys.min_price = item.minSinglePriceVal || '';
                // 户型单价区间最大值
                submitKeys.max_price = item.maxSinglePriceVal || '';
                // 户型无区间总价值
                submitKeys.total_price = item.allPriceVal || '';
                // 户型总价区间最小值
                submitKeys.min_total_price = item.minAllPriceVal || '';
                // 户型总价区间最大值
                submitKeys.max_total_price = item.maxAllPriceVal || '';
                // 户型在售余量
                submitKeys.house_on_sale_num = item.inStockMarginVal || '';
                // 户型余量标签
                submitKeys.house_on_sale_tag = item.marginTagVal || '';
                // 户型图
                submitKeys.imgs = (item.type === 'houseType' ? this.$refs['upload' + item.imgListRefs][0].getUrlList() : []) || [];
                // 关联楼栋值
                submitKeys.building_ids = item.projectBuildingval || [];
                // 原价
                submitKeys.oldPrice = item.oldPrice || '';
                // 是否校验
                submitKeys.house_type_flag = item.houseTypeFlag || '';
                // id
                submitKeys.house_id = item.houseId || '';

                submitList.push(submitKeys);
            })
            return submitList
        },         
        /**
         * 单价总价无区间校验二必填一
         * @param {object} rules 校验规则
         * @param {object} item 当前模块的参数列表
         * @param {object} rulesReg 自定义校验规则参数
         */
        requiredFirst(rules, item, rulesReg) {
            let flag= true;
            if (item.allPriceVal === '' && item.singlePriceVal === '' && item.addIntervalText === '增加区间') {
                // 无区间校验方法
                this.notIntevalRules(rulesReg);
                // 单价区间校验方法
                this.singleIntervalMetod(rulesReg);
                // 总价区间校验方法
                this.allIntervalMthod(rulesReg);
                flag = false;
            } else if (item.allPriceVal == '' && item.singlePriceVal !== '') {
                // 无区间不校验方法
                this.notIntevalNoRules(rulesReg);
                // 单价区间不校验方法
                this.noSingleInterval(rulesReg);
                // 总价区间校验方法
                this.noAllInterval(rulesReg);
                flag = true;
            } else if (item.allPriceVal !== '' && item.singlePriceVal === '') {
                // 无区间不校验方法
                this.notIntevalNoRules(rulesReg);
                // 单价区间校验方法
                this.noSingleInterval(rulesReg);
                // 总价区间不校验方法
                this.noAllInterval(rulesReg);
                flag = true;
            } else {
                flag = false;
            }
            return flag;
        },
        /**
         * 区间失去焦点校验二必填一/区间校验
         * @param {object} rules 校验规则
         * @param {object} item 当前模块的参数列表
         * @param {object} rulesReg 自定义校验规则参数
         */
        IntervalRequiredFirst(rules, item, rulesReg) {
            let flag = true;
            if ((item.minAllPriceVal === '' 
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')
                && (item.minSinglePriceVal === '' 
                && item.maxSinglePriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== '' 
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')
                && (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal === ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')
                && (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal === ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')
                && (item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal === ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')
                && (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.minSinglePriceVal === ''
                && item.maxSinglePriceVal !== ''
                && item.singlePriceVal === '')
                || (item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal === ''
                && item.minAllPriceVal === ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal == ''
                && item.singlePriceVal === '')
                || (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal !== ''
                && item.minAllPriceVal === ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.minSinglePriceVal === ''
                && item.maxSinglePriceVal == ''
                && item.singlePriceVal !== '')
                || (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal === ''
                && item.minAllPriceVal === ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal !== '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal === ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal !== ''
                && item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal == ''
                && item.singlePriceVal === '')
                || (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal !== ''
                && item.minAllPriceVal === ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal !== ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal === ''
                && item.singlePriceVal === '')
                || (item.minSinglePriceVal === ''
                && item.maxSinglePriceVal !== ''
                && item.minAllPriceVal !== ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else if ((item.minAllPriceVal !== ''
                && item.maxAllPriceVal === ''
                && item.allPriceVal === ''
                && item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal !== ''
                && item.singlePriceVal === '')
                || (item.minSinglePriceVal !== ''
                && item.maxSinglePriceVal !== ''
                && item.minAllPriceVal === ''
                && item.maxAllPriceVal !== ''
                && item.allPriceVal === ''
                && item.singlePriceVal === '')) {
                this.allNeedValidate(rulesReg);
                flag = false;
            } else {
                // 无区间不校验方法
                this.notIntevalNoRules(rulesReg);
                // 单价区间不校验方法
                this.noSingleInterval(rulesReg);
                // 总价区间校验方法
                this.noAllInterval(rulesReg);
                flag = true;
            }
            return flag
        },
        /**
         * 需要全部校验
         * @param {object} rulesReg 自定义校验规则参数
         */
        allNeedValidate(rulesReg) {
            // 无区间校验方法
            this.notIntevalRules(rulesReg);
            // 单价区间校验方法
            this.singleIntervalMetod(rulesReg);
            // 总价区间校验方法
            this.allIntervalMthod(rulesReg);
        },
        /**
         * 无区间校验方法
         * @param {object} rulesReg 自定义校验规则参数
         */
        notIntevalRules(rulesReg) {
            // 是否必填
            rulesReg.singleErrorRequired = true;
            rulesReg.allErrorRequired = true;
            // 错误信息内容
            rulesReg.singleErrorTexts = '单价总价二必填一';
            rulesReg.allErrorTexts = '单价总价二必填一';
            // 是否显示错误信息
            rulesReg.singleErrorText = true;
            rulesReg.allErrorText = true;
        },
        /**
         * 无区间不校验方法
         * @param {object} rulesReg 自定义校验规则参数
         */
        notIntevalNoRules(rulesReg) {
            // 是否必填
            rulesReg.singleErrorRequired = false;
            rulesReg.allErrorRequired = false;
            // 错误信息内容
            rulesReg.singleErrorTexts = '';
            rulesReg.allErrorTexts = '';
            // 是否显示错误信息
            rulesReg.singleErrorText = false;
            rulesReg.allErrorText = false;
        },
        /**
         * 单价区间不校验方法
         * @param {object} rulesReg 自定义校验规则参数
         */
        noSingleInterval(rulesReg) {
            // 单间区间价格错误信息是否显示
            rulesReg.minSingleErrorText = false;
            rulesReg.maxSingleErrorText = false;
            // 单间区间价格是否必填
            rulesReg.minSingleErrorRequired = false;
            rulesReg.maxSingleErrorRequired = false;
            // 单间区间价格错误信息内容
            rulesReg.minSingleErrorTexts = '';
            rulesReg.maxSingleErrorTexts = '';
        },
        // 单价区间校验方法
        singleIntervalMetod(rulesReg) {
            // 单间区间价格错误信息是否显示
            rulesReg.minSingleErrorText = true;
            rulesReg.maxSingleErrorText = true;
            // 单间区间价格是否必填
            rulesReg.minSingleErrorRequired = true;
            rulesReg.maxSingleErrorRequired = true;
            // 单间区间价格错误信息内容
            rulesReg.minSingleErrorTexts = '请输入单价最小值';
            rulesReg.maxSingleErrorTexts = '请输入单价最大值';
        },
        /**
         * 总价区间不校验方法
         * @param {object} rulesReg 自定义校验规则参数
         */
        noAllInterval(rulesReg) {
            // 总价区间价格错误信息是否显示
            rulesReg.minAllErrorText = false;
            rulesReg.maxAllErrorText = false;
            // 总价区间价格是否必填
            rulesReg.minAllErrorRequired = false;
            rulesReg.maxAllErrorRequired = false;
            // 总价区间价格错误信息内容
            rulesReg.minAllErrorTexts = '';
            rulesReg.maxAllErrorTexts = '';
        },
        /**
         * 总价区间校验方法
         * @param {object} rulesReg 自定义校验规则参数
         */
        allIntervalMthod(rulesReg) {
            // 总价区间价格错误信息是否显示
            rulesReg.minAllErrorText = true;
            rulesReg.maxAllErrorText = true;
            // 总价区间价格是否必填
            rulesReg.minAllErrorRequired = true;
            rulesReg.maxAllErrorRequired = true;
            // 总价区间价格错误信息内容
            rulesReg.minAllErrorTexts = '请输入总价最小值';
            rulesReg.maxAllErrorTexts = '请输入总价最大值';
        },
        /**
         * 增加区间
         * @param {object} rules 校验规则
         * @param {object} itemVal 当前模块的参数列表
         * @param {object} itemText 点击的模块
         */
        addAreaInterval(itemVal, itemText, rules) {
            if (itemText === 'singlePrice') {
                if (itemVal.addIntervalText === '增加区间') {
                    // 清空单价的值
                    itemVal.singlePriceVal = '';
                    itemVal.addInterval = true;
                    itemVal.delInterval = false;
                    itemVal.addIntervalText = '取消区间';
                } else {
                    itemVal.minSinglePriceVal = '';
                    itemVal.maxSinglePriceVal = '';
                    itemVal.addInterval = false;
                    itemVal.delInterval = true;
                    itemVal.addIntervalText = '增加区间';
                }
            } else if (itemText === 'allPrice') {
                if (itemVal.allPriceAddIntervalText === '增加区间') {
                    // 清空单价的值
                    itemVal.allPriceVal = '';
                    itemVal.allPriceAddInterval = true;
                    itemVal.allPriceDelInterval = false;
                    itemVal.allPriceAddIntervalText = '取消区间';
                } else {
                    itemVal.minAllPriceVal = '';
                    itemVal.maxAllPriceVal = '';
                    itemVal.allPriceAddInterval = false;
                    itemVal.allPriceDelInterval = true;
                    itemVal.allPriceAddIntervalText = '增加区间';
                }
            } else if (itemText === 'areaMargin') {
                if (itemVal.areaAddIntervalText === '增加区间') {
                    // 清空无区间的值
                    itemVal.areaSegmentVal = '';
                    itemVal.areaAddInterval = true;
                    itemVal.areaDelInterval = false;
                    itemVal.areaAddIntervalText = '取消区间';
                } else {
                    itemVal.minAreaSegmentVal = '';
                    itemVal.maxAreaSegmentVal = '';
                    itemVal.areaAddInterval = false;
                    itemVal.areaDelInterval = true;
                    itemVal.areaAddIntervalText = '增加区间';
                }
            }
        },
        /**
         * 校验区间值最大值不能小于最小值
         * @param {obejct} itemVal 当前模块参数列表
         * @param {object} type 点击的模块
         */
        blurMarginIpt(itemVal, type) {
            if (type === 'singlePrice') {
                // if (itemVal.minSinglePriceVal >= itemVal.maxSinglePriceVal) {
                    this.$message({
                        message: '户型-单价区间最小值不能大于等于最大值！',
                        type: 'error'
                    })
                // }
            } else if (type === 'allPrice') {
                // if (itemVal.minAllPriceVal >= itemVal.maxAllPriceVal) {
                    this.$message({
                        message: '户型-面积段总价区间最小值不能大于等于最大值！',
                        type: 'error'
                    })
                // }
            } else if (type === 'areaMargin') {
                // if (itemVal.minAreaSegmentVal >= itemVal.maxAreaSegmentVal) {
                    this.$message({
                        message: '户型-面积段区间最小值不能大于等于最大值！',
                        type: 'error'
                    })
                // }
            }
        },
        /**
         * 户型发生改变的时候
         * @param {array} changeVal 当前选中的select值
         */
        houseSelectData(changeVal) {
            this.setTrack('5910');
            this.houseTagText = changeVal.text;
            this.houseTagID = changeVal.id;
            this.oldPrice = changeVal.price;
        },
        // 添加户型
        addHouse() {
            this.refsNum ++;
            this.houseInfoKeyId ++;
            // 埋点
            this.setTrack('5912', {});
            let obj = {
                id: this.houseInfoKeyId,
                type: 'houseType',
                addHouse: [
                    {
                        houseFormList: {
                            // 户型编号
                            houseIdVal: '',
                            // 厅室描述
                            roomVal: '',
                            hallVal: '',
                            kitchenVal: '',
                            guardVal: '',
                            // 户型居室下拉
                            houseRoomVal: '',
                            houseRoomOpations: '',
                            // 销售状态单选
                            salStatusVal: '',
                            // 户型标签单选
                            houseTagVal: '',
                            // 面积类型
                            checkBoxListVal: [],
                            // 建筑面积
                            buildingAreaVal: '',
                            // 套内面积
                            insideAreaVal: '',
                            // 单价
                            singlePriceVal: '',
                            // 总价
                            allPriceVal: '',
                            // 在售余量
                            inStockMarginVal: '',
                            // 余量标签单选
                            marginTagVal: '',
                            // 关联楼栋下拉
                            projectBuildingval: '',
                            // 上传图片过滤标识
                            imgListRefs: this.refsNum,
                            // 是否继续校验面积价格自洽
                            houseTypeFlag: 1,
                        },
                        rulesReg: {
                            // 面积类型
                            areaErrorTexts: '',
                            areaErrorText: false,
                            areaErrorRequired: true,
                            // 销售状态
                            salErrorTexts: '',
                            salErrorText: false,
                            salErrorRequired: true,
                            // 户型居室状态
                            houseTypeErrorTexts: '',
                            houseTypeErrorText: false,
                            houseTypeErrorRequired: true
                        },
                        id: this.houseInfoKeyId,
                        rules: {
                            // 户型编号
                            houseIdVal: [
                                { required: true, message: '请输入户型编号', trigger: 'blur' },
                                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                            ],
                            // 厅室描述校验
                            roomVal: [
                                { required: true, message: '请输入几室', trigger: 'blur' }
                            ],
                            // 户型居室校验
                            houseRoomVal: [
                                { required: true, message: '请选择户型居室', trigger: 'change' }
                            ],
                            // 销售状态校验
                            salStatusVal: [
                                { required: true, message: '请选择销售状态', trigger: 'change' }
                            ],
                            // 面积类型校验
                            checkBoxListVal: [
                                { required: true, message: '请选择面积类型', trigger: 'change' }
                            ],
                            // 单价校验
                            singlePriceVal: [
                                { required: true, message: '请输入单价', trigger: 'blur' }
                            ],
                            // 总价校验
                            allPriceVal: [
                                { required: true, message: '请输入总价', trigger: 'blur' }
                            ],
                        }
                    }
                ]
            };
            this.houseInfo.push(obj);
        },
        // 添加面积段
        addArea() {
            // 埋点
            this.setTrack('5913', {});
            this.houseInfoKeyId ++;
            let obj = {
                type: 'areaType',
                id: this.houseInfoKeyId,
                addHouse: [
                    {
                        houseFormList: {
                            // 面积段val
                            areaSegmentVal: '',
                            // 面积段区间最小值
                            minAreaSegmentVal: '',
                            // 面积段区间最大值
                            maxAreaSegmentVal: '',
                            // 销售状态单选
                            salStatusVal: '',
                            // 面积段输入框删除区间
                            areaDelInterval: false,
                            // 面积段输入框增加区间
                            areaAddInterval: true,
                            // 面积段输入框区间文案
                            areaAddIntervalText: '取消区间',
                            // 单价val
                            singlePriceVal: '',
                            // 单价区间最小值
                            minSinglePriceVal: '',
                            // 单价区间最大值
                            maxSinglePriceVal: '',
                            // 单价输入框增加区间
                            addInterval: true,
                            // 单价输入框删除区间
                            delInterval: false,
                            // 单价输入框区间文案
                            addIntervalText: '取消区间',
                            // 总价val
                            allPriceVal: '',
                            // 总价区间最小值
                            minAllPriceVal: '',
                            // 总价区间最大值
                            maxAllPriceVal: '',
                            // 总价输入框增加区间
                            allPriceAddInterval: true,
                            // 总价输入框删除区间
                            allPriceDelInterval: false,
                            // 总价输入框区间文案
                            allPriceAddIntervalText: '取消区间',
                            // 关联楼栋下拉
                            projectBuildingval: '',
                        },
                        id: this.houseInfoKeyId,
                        rulesReg: {
                            // 价格错误信息是否显示
                            singleErrorText: false,
                            allErrorText: false,
                            // 价格是否必填
                            singleErrorRequired: true,
                            allErrorRequired: true,
                            // 价格错误信息内容
                            allErrorTexts: '',
                            singleErrorTexts: '',
                            // 单价区间价格错误信息是否显示
                            minSingleErrorText: false,
                            maxSingleErrorText: false,
                            // 单价区间价格是否必填
                            minSingleErrorRequired: false,
                            maxSingleErrorRequired: false,
                            // 单价区间价格错误信息内容
                            minSingleErrorTexts: '',
                            maxSingleErrorTexts: '',
                            // 总价区间价格错误信息是否显示
                            minAllErrorText: false,
                            maxAllErrorText: false,
                            // 总价区间价格是否必填
                            minAllErrorRequired: false,
                            maxAllErrorRequired: false,
                            // 总价区间价格错误信息内容
                            minAllErrorTexts: '',
                            maxAllErrorTexts: '',
                            // 销售状态
                            salErrorTexts: '',
                            salErrorText: false,
                            salErrorRequired: true
                        },
                        rules: {
                            salStatusVal: [
                                { required: true, message: '请选择销售状态', trigger: 'change' }
                            ],
                            areaSegmentVal: [
                                { required: true, message: '请输入面积', trigger: 'blur' }
                            ],
                            minAreaSegmentVal: [
                                { required: true, message: '请输入最小区间面积', trigger: 'blur' }
                            ],
                            maxAreaSegmentVal: [
                                { required: true, message: '请输入最大区间面积', trigger: 'blur' }
                            ],
                            singlePriceVal: [
                                { required: false, message: '单价总价二必填一', trigger: 'blur' }
                            ],
                            minSinglePriceVal: [
                                { required: true, message: '请输入单价最小值', trigger: 'blur' }
                            ],
                            maxSinglePriceVal: [
                                { required: true, message: '请输入单价最大值', trigger: 'blur' }
                            ],
                            allPriceVal: [
                                { required: true, message: '单价总价二必填一', trigger: 'blur' }
                            ],
                            minAllPriceVal: [
                                { required: true, message: '请输入总价最小值', trigger: 'blur' }
                            ],
                            maxAllPriceVal: [
                                { required: true, message: '请输入总价最大值', trigger: 'blur' }
                            ]
                        }
                    }
                ]
            };
            this.houseInfo.push(obj);
        },
        // 编辑户型
        editHouse() {
            // 埋点
            this.setTrack('5911', {});
            this.houseInfoKeyId ++;
            let obj = {
                id: this.houseInfoKeyId,
                type: 'editHouseType',
                addHouse: [
                    {
                        houseFormList: {
                            // 户型编号文案
                            houseIdText: this.houseTagText,
                            // 户型id
                            houseTypeId: this.houseTagID,
                            // 销售状态单选
                            salStatusVal: '',
                            // 面积类型
                            checkBoxListVal: [],
                            // 建筑面积
                            buildingAreaVal: '',
                            // 套内面积
                            insideAreaVal: '',
                            // 单价
                            singlePriceVal: '',
                            // 总价
                            allPriceVal: '',
                            // 原价
                            oldPrice: this.oldPrice,
                            // 在售余量
                            inStockMarginVal: '',
                            // 余量标签
                            marginTagVal: '',
                            // 关联楼栋下拉
                            projectBuildingval: '',
                            buildingAraeIsShow: false,
                            // 是否继续校验面积价格自洽
                            houseTypeFlag: 1,

                        },
                        id: this.houseInfoKeyId,
                        rulesReg: {
                            // 面积类型
                            areaErrorTexts: '',
                            areaErrorText: false,
                            areaErrorRequired: true,
                            // 销售状态
                            salErrorTexts: '',
                            salErrorText: false,
                            salErrorRequired: true
                        },
                        rules: {
                            // 销售状态校验
                            salStatusVal: [
                                { required: true, message: '请选择销售状态', trigger: 'change' }
                            ],
                            // 单价校验
                            singlePriceVal: [
                                { required: true, message: '请输入单价', trigger: 'blur' }
                            ],
                            // 总价校验
                            allPriceVal: [
                                { required: true, message: '请输入总价', trigger: 'blur' }
                            ],
                        }
                    }
                ]
            };
            this.houseInfo.push(obj);
            // 添加完成之后清空编辑户型下拉框
            this.relatedHouseTypeVal = {
                id: '',
                text: ''
            }
        },
        /**
         * 删除新增户型模块
         * @param {object} itemVal 当前模块的参数列表
         * @param {number} index 当前模块的index
         */
        delAddHouseTag(itemVal, index, refss) {
            // this.$refs[refss][0].clearValidate();
            // 提交的时候验证面积段模块的二必填一校验
            let senRequiredList = this.houseInfo.filter(item => item.type === 'areaType');
            senRequiredList.forEach(item => {
                this.notSalChangeStatus(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                // 无区间不校验方法
                this.notIntevalNoRules(item.addHouse[0].rulesReg);
                // 单价区间不校验方法
                this.noSingleInterval(item.addHouse[0].rulesReg);
                // 总价区间校验方法
                this.noAllInterval(item.addHouse[0].rulesReg);
            });
            let areaRequiredList = this.houseInfo.filter(item => {
                return item.type === 'editHouseType' || item.type === 'houseType'
            });
            areaRequiredList.forEach(item => {
                this.notAreaSingleReg(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                this.notSalChangeStatus(item.addHouse[0].houseFormList, item.addHouse[0].rulesReg);
                this.notHouseTypeChange(item.addHouse[0].rulesReg);
            })
            this.$confirm('一旦删除则无法恢复确认是否删除！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    itemVal.splice(index, 1);
                    // 重新请求关联户型接口赋值
                    this.$emit('resetPush');
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
            });
        },
        // 
        /**
         * 跳转到新增楼栋页面/埋点
         * @param {string} type 当前点击的是哪个模块
         */
        toAddBuilding(type) {
            if (type === 'addHouse') {
                this.setTrack('5914',{
                    house_operatetype: 'addhouse'
                });
            } else if (type === 'editorHosue') {
                this.setTrack('5914',{
                    house_operatetype: 'edithouse'
                });
            } else if (type === 'erarHosue') {
                this.setTrack('5914',{
                    house_operatetype: 'housearea'
                });
            }
            window.open(`/index.php?r=cj-building%2Fedit&project_id=${this.$route.query.projectId}`);
        },
        /**
         * 过滤户型下拉的重复选项
         */
        houseUnique (){
            let uniqueArr = this.houseInfo.filter(item => item.type === 'editHouseType');
            let arrList = [];
            let houseTypeList = {};
            uniqueArr.forEach((element,index) => {
                arrList.push(element.addHouse[0].houseFormList);
            });
            this.houseTagList = this.relatedHouseTypeList.filter(item => !arrList.some(ele => ele.houseIdText === item.text));
        },
    }
}
</script>

<style lang="less" scoped>
.dynamic-info-box {
    margin-top: 15px;
    .title-content {
        display: flex;
        flex-direction: row;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        p {
            margin-top: 1px;
            color: red;
        }
    }
    .form-content-box {
        .add-house {
            margin-bottom: 50px;
            .hall-style {               
                /deep/ .el-col-2 {
                    text-align: center;
                }
            }
            /deep/ .btn-del {
                margin-left: 100px;
            }
            /deep/ .in-stock {
                width: 87%;
                margin: 0 10px;
                display: inline-block;
            }
            /deep/ .house-id {
                width: 80%;
                margin-right: 10px;
            }
            /deep/ .el-area-ipt {
                width: 92%;
                margin-right: 10px;
                display: inline-block;
            }
            .single-val-box {
                width: 64%;
                display: inline-block;
                /deep/ .el-area-ipt {
                    width: 85%;
                }
            }
            .interval-box {
                /deep/ .el-form-item {
                    display: inline-block;
                }
                /deep/ .num-el-input {
                    width: 140px;
                    margin-right: 10px;
                    display: inline-block;
                }
            }
            .message {
                color: #e6a23c;
            }
        }
    }
    .btn-box {
        /deep/ .house-select {
            margin-right: 20px;
        }
    }
}
</style>