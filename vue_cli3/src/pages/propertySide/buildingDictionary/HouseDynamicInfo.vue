<!--
    @name: 楼盘动态信息模块
    @description: 楼盘动态信息模块
    @author: 贺伟
    @date: 2019-11-13
-->
<template>
    <div class="house-info">
        <div class="info-title">
            <h3 class="title">楼盘动态信息</h3>
        </div>
        <!--表单部分开始-->
        <el-form
            ref="houseForm"
            :model="houseForm"
            :label-width="labelWidth">
            <el-form-item label="楼盘销售状态：">
                <el-radio-group
                    @change="saleStatusChange"
                    v-model="houseForm.saleStatus">
                    <el-radio
                        v-for="(ele, idx) in houseSaleStatus"
                        :key="idx"
                        :label="ele.id">
                        {{ele.text}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="楼盘单价类型：">
                <el-radio-group
                    @change="(val) => typeChange(1, val)"
                    v-model="houseForm.univalenceType">
                    <el-radio
                        v-for="ele in priceType"
                        :key="ele.id"
                        :label="ele.id">
                        {{ele.text}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="单价："
                v-if="houseForm.univalenceType !== -1 && houseForm.univalenceType !== ''">
                <div
                    class="univalence-box flex-box"
                    :key="3"
                    v-if="houseForm.univalenceType == 3">
                    <el-form-item
                        prop="univalence"
                        :rules="houseFormRules.univalence">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.univalence"
                            :minVal="0.0001"
                            :maxVal="99.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元起</span>
                </div>
                <div
                    class="univalence-box flex-box"
                    :key="2"
                    v-if="houseForm.univalenceType == 2">
                    <el-form-item
                        prop="univalence"
                        :rules="houseFormRules.univalence">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.univalence"
                            :minVal="0.0001"
                            :maxVal="99.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                </div>
                <div
                    class="univalence-box flex-box"
                    key="4"
                    v-if="houseForm.univalenceType == 4">
                    <el-form-item
                        prop="univalenceStart"
                        :rules="houseFormRules.univalenceStart">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.univalenceStart"
                            :minVal="0.0001"
                            :maxVal="99.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                        -- &nbsp;
                    <el-form-item
                        prop="univalenceEnd"
                        :rules="houseFormRules.univalenceEnd">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.univalenceEnd"
                            :minVal="0.0001"
                            :maxVal="99.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                </div>
            </el-form-item>
            <el-form-item label="楼盘总价类型：">
                <el-radio-group
                    @change="(val) => typeChange(2, val)"
                    v-model="houseForm.totalPriceType">
                    <el-radio
                        v-for="ele in totalPriceType"
                        :key="ele.id"
                        :label="ele.id">
                        {{ele.text}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="总价："
                v-if="houseForm.totalPriceType !== -1 && houseForm.totalPriceType !== ''">
                <div
                    v-if="houseForm.totalPriceType == 2"
                    class="univalence-box flex-box">
                    <el-form-item
                        prop="totolPrice"
                        :rules="houseFormRules.totolPrice">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.totolPrice"
                            :minVal="0.0001"
                            :maxVal="99998.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元起</span>
                </div>
                <div
                    v-if="houseForm.totalPriceType == 3"
                    class="univalence-box flex-box">
                    <el-form-item
                        prop="totolPrice"
                        :rules="houseFormRules.totolPrice">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.totolPrice"
                            :minVal="0.0001"
                            :maxVal="99998.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                </div>
                <div
                    v-if="houseForm.totalPriceType == 4"
                    class="univalence-box flex-box">
                    <el-form-item
                        prop="totolPriceStart"
                        :rules="houseFormRules.totolPriceStart">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.totolPriceStart"
                            :minVal="0.0001"
                            :maxVal="99998.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                        -- &nbsp;
                    <el-form-item
                        prop="totolPriceEnd"
                        :rules="houseFormRules.totolPriceEnd">
                        <number-input
                            class="num-input"
                            v-model.number="houseForm.totolPriceEnd"
                            :minVal="0.0001"
                            :maxVal="99998.9999"
                            reg="fourNum">
                        </number-input>
                    </el-form-item>
                    <span class="unit">万元</span>
                </div>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <!--放量计划类型部分开始-->
        <el-form
            ref="releasePlan"
            :model="releasePlan"
            :label-width="labelWidth">
            <el-form-item
                label="放量计划类型："
                :rules="planTypeReqire"
                prop="planType">
                <el-select
                    v-model="releasePlan.planType"
                    clearable
                    @change="(val) => typeChange(3, val)"
                    @clear="clearType('plan')"
                    placeholder="请选择">
                    <el-option
                        v-for="item in volumeType"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="放量时间："
                :rules="planTimeReqire"
                prop="planTime">
                <building-dictionary-select
                    class="ten-day-input"
                    :need-default="false"
                    :sourceDate="planSourceDate"
                    @getCallbackDate="(timeObj) => updateThisTime('releasePlan', timeObj)"
                    v-model="releasePlan.planTime"/>
            </el-form-item>
            <el-form-item
                prop="relevanceHouses"
                label="关联户型：">
                <el-select
                    class="mult-select"
                    multiple
                    clearable
                    v-model="releasePlan.relevanceHouses"
                    @focus="$emit('houseFocus')"
                    placeholder="请选择">
                    <el-option
                        v-for="item in relatedHouseTypeList"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini">
                <el-checkbox
                    @change="relativePlanChange"
                    v-model="isCanNotRelativePlan">无法关联到户型，仅知道涉及到的面积段或面积</el-checkbox>
            </el-form-item>
            <el-form-item
                v-if="isCanNotRelativePlan"
                label="面积段：">
                <template
                    v-for="(item, idx) in releasePlan.areaSection">
                    <div
                        class="area-box flex-box"
                        :key="idx + 'mult'"
                        v-if="item.showArea">
                        <el-form-item
                            :prop="'areaSection.' + idx + '.areaStart'"
                            :rules="releaseFormRules.areaStart">
                            <number-input
                                class="num-input"
                                v-model.number="item.areaStart"
                                :minVal="0.01"
                                :maxVal="99998.99"
                                reg="twoNum">
                            </number-input>
                        </el-form-item>
                        <span class="unit">㎡ - </span>
                        <el-form-item
                            :prop="'areaSection.' + idx + '.areaEnd'"
                            :rules="releaseFormRules.areaEnd">
                            <number-input
                                class="num-input"
                                v-model.number="item.areaEnd"
                                :minVal="0.01"
                                :maxVal="99998.99"
                                reg="twoNum">
                            </number-input>
                        </el-form-item>
                        <span class="unit">㎡</span>
                        <el-button
                            type="primary"
                            size="small"
                            @click="cancleArea(item, idx)">
                            取消区间
                        </el-button>
                        <el-button
                            class="btn-del"
                            type="text"
                            @click="deleteArea('releasePlan', idx)">
                            删除
                        </el-button>
                    </div>
                    <div
                        class="area-box flex-box"
                        :key="idx + 'single'"
                        v-if="!item.showArea">
                        <el-form-item
                            :prop="'areaSection.' + idx + '.areaSingle'"
                            :rules="releaseFormRules.areaSingle">
                            <number-input
                                class="num-input single-area"
                                v-model.number="item.areaSingle"
                                :minVal="0.01"
                                :maxVal="99998.99"
                                reg="twoNum">
                            </number-input>
                        </el-form-item>
                        <span class="unit">㎡</span>
                        <el-button
                            type="primary"
                            size="small"
                            @click="addArea(item, idx)">
                            增加区间
                        </el-button>
                        <el-button
                            class="btn-del"
                            type="text"
                            @click="deleteArea('releasePlan', idx)">
                            删除
                        </el-button>
                    </div>
                </template>
                <el-button
                    type="primary"
                    size="small"
                    @click="addAreaSection('releasePlan')">
                    增加多个面积段
                </el-button>
                <div class="msg">
                    <i class="el-icon-warning"></i>
                    <span>如果存在多个面积段请录入多个面积段。</span>
                </div>
            </el-form-item>
            <el-form-item
                prop="relevanceHouses"
                label="关联楼栋：">
                <el-select
                    class="mult-select"
                    multiple
                    clearable
                    @focus="$emit('buildingFocus')"
                    v-model="releasePlan.relevanceBuilding"
                    placeholder="请选择">
                    <el-option
                        v-for="item in relatedBuilding"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
                <div class="relative">
                    <el-button
                        type="primary"
                        size="small"
                        @click="toAddBuilding('plan')">
                        + 楼栋
                    </el-button>
                    <span>找不到所需楼栋可点击取添加</span>
                </div>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <!--交房模块部分开始-->
        <el-form
            ref="handRoom"
            :model="handRoom"
            :label-width="labelWidth">
            <el-form-item
                prop="types"
                :rules="handHomeTypeReqire"
                label="交房时间类型：">
                <el-select
                    v-model="handRoom.types"
                    clearable
                    @change="(val) => typeChange(4, val)"
                    @clear="clearType('room')"
                    placeholder="请选择">
                    <el-option
                        v-for="item in liveDateType"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="交房时间："
                prop="time"
                :rules="handHomeTimeReqire">
                <building-dictionary-select
                    class="ten-day-input"
                    :need-default="false"
                    :sourceDate="homeSourceDate"
                    @getCallbackDate="(timeObj) => updateThisTime('handRoom', timeObj)"
                    v-model="handRoom.time"/>
            </el-form-item>
            <el-form-item label="关联楼栋：">
                <el-select
                    class="mult-select"
                    clearable
                    multiple
                    v-model="handRoom.relevanceBuilding"
                    @focus="$emit('buildingFocus')"
                    placeholder="请选择">
                    <el-option
                        v-for="item in relatedBuilding"
                        :key="item.id"
                        :label="item.text"
                        :value="item.id">
                    </el-option>
                </el-select>
                <div class="relative">
                    <el-button
                        type="primary"
                        size="small"
                        @click="toAddBuilding('room')">
                        + 楼栋
                    </el-button>
                    <span @click="validForm()">找不到所需楼栋可点击取添加</span>
                </div>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item
                :rules="handRoomRules.discountRule"
                prop="discount"
                label="折扣优惠：">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="handRoom.discount">
                </el-input>
                <!-- <div
                    class="el-form-item__error"
                    v-show="showDiscountMsg">
                    最多可输入100字
                </div> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import NumberInput from '@/components/NumberInput';
    import BuildingDictionarySelect from './components/BuildingDictionarySelect';
    import { commonFun } from "@/assets/js/utils/utils";
    // 标签都不选状态
    const noStatus = {
        id: -1,
        text: '暂不清楚'
    };
    const curYear = new Date().getFullYear();
    export default {
        name: 'HouseDynamicInfo',
        components: {
            NumberInput,
            BuildingDictionarySelect
        },
        props: {
            // 楼盘销售状态
            saleStatus: {
                type: Array,
                default: () => []
            },
            // 楼盘单价类型
            priceType: {
                type: Array,
                default: () => []
            },
            // 楼盘总价类型
            totalPriceType: {
                type: Array,
                default: () => []
            },
            // 放量计划类型
            volumeType: {
                type: Array,
                default: () => []
            },
            // 交房时间类型
            liveDateType: {
                type: Array,
                default: () => []
            },
            // 关联楼栋下拉
            relatedBuilding: {
                type: Array,
                default: () => []
            },
            // 关联户型下拉
            relatedHouseTypeList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                // 放量时间默认值
                planSourceDate: {
                    type: 1,
                    year: curYear
                },
                // 交房时间默认值
                homeSourceDate: {
                    type: 2,
                    year: curYear
                },
                // 存储一些状态关联值
                relevanceStatus: {
                    // 放量计划是否展示面积段
                    showPlanArea: true,
                    // 交房时间是否展示面积段
                    showHomeArea: true
                },
                // 表单label宽度
                labelWidth: '120px',
                // 放量计划是否无法关联到户型
                isCanNotRelativePlan: false,
                // 楼盘信息表单
                houseForm: {
                    // 销售状态
                    saleStatus: '',
                    // 单价类型
                    univalenceType: '',
                    // 单价 底价或均价
                    univalence: '',
                    // 单价区间开始值
                    univalenceStart: '',
                    // 单价区间结束值
                    univalenceEnd: '',
                    // 楼盘总价类型
                    totalPriceType: '',
                    // 总价 底价或均价
                    totolPrice: '',
                    // 总价区间起始
                    totolPriceStart: '',
                    // 总价区间结束
                    totolPriceEnd: ''
                },
                // 放量计划表单
                releasePlan: {
                    // 放量计划类型
                    planType: '',
                    // 放量计划时间
                    planTime: '',
                    // 关联户型
                    relevanceHouses: [],
                    // 面积段
                    areaSection: [
                        {
                            // 单个值
                            areaSingle: '',
                            areaStart: '',
                            areaEnd: '',
                            // 是否显示此面积区间还是单个面积值
                            showArea: true
                        }
                    ],
                    // 关联楼栋
                    relevanceBuilding: []
                },
                // 交房时间表单
                handRoom: {
                    // 交房时间类型
                    types: '',
                    // 交房时间
                    time: '',
                    // 关联楼栋
                    relevanceBuilding: [],
                    // 折扣优惠
                    discount: ''
                },
                // 楼盘信息表单验证规则
                houseFormRules: {
                    univalence: [
                        { required: true, message: '请输入单价', trigger: 'blur' }
                    ],
                    univalenceStart: [
                        { required: true, message: '请输入起始单价', trigger: 'blur' }
                    ],
                    univalenceEnd: [
                        { required: true, message: '请输入结束单价', trigger: 'blur' }
                    ],
                    totolPrice: [
                        { required: true, message: '请输入总价', trigger: 'blur' }
                    ],
                    totolPriceStart: [
                        { required: true, message: '请输入起始总价', trigger: 'blur' }
                    ],
                    totolPriceEnd: [
                        { required: true, message: '请输入结束总价', trigger: 'blur' }
                    ]
                },
                // 放量计划表单验证规则
                releaseFormRules: {
                    areaSingle: [{ required: true, message: '请输入面积', trigger: 'blur' }],
                    areaStart: [{ required: true, message: '请输入起始面积段', trigger: 'blur' }],
                    areaEnd: [{ required: true, message: '请输入结束面积段', trigger: 'blur' }]
                },
                // 交房时间表单验证规则
                handRoomRules: {
                    areaSingle: [{ required: true, message: '请输入面积', trigger: 'blur' }],
                    areaStart: [{ required: true, message: '请输入面积段', trigger: 'blur' }],
                    areaEnd: [{ required: true, message: '请输入面积段', trigger: 'blur' }],
                    discountRule: [
                        { max: 100, message: '最多输入100个汉字', trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            // 放量计划类型验证
            planTypeReqire() {
                // 如果放量计划时间不为空则需要校验放量计划和放量时间的匹配 以放量和已加推 放量时间需要小于等于当前日期 预计开盘和预计加推 反之
                return this.releasePlan.planTime !== '' ? { validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请选择放量计划类型'));
                    } else {
                        // 取月份
                        const prevMonth = this.releasePlan.month || 13;
                        // 获取当前月多一个月前一天的时间来获取本月时间
                        const prevDate = new Date(this.releasePlan.year, prevMonth).getTime() - 24 * 60 * 60 * 1000;
                        // 获取本月的最后一天
                        // 如果时旬 则取旬对应的日期
                        let day;
                        if (this.releasePlan.Period && this.releasePlan.Period !== 3) {
                            day = this.releasePlan.Period * 10;
                        } else {
                            day = new Date(prevDate).getDate();
                        }
                        const timeVal = new Date(this.releasePlan.year, prevMonth - 1, this.releasePlan.day || day);
                        // const timeVal = new Date(`${this.releasePlan.year}/${this.releasePlan.month}/${this.releasePlan.day}`);
                        if ([1, 2].includes(value) && timeVal > new Date()) {
                            callback(new Error('当前放量时间与选择的放量计划类型不匹配'));
                            return;
                        }
                        if ([3, 4].includes(this.releasePlan.planType) && timeVal <= new Date()) {
                            callback(new Error('当前放量时间与选择的放量计划类型不匹配'));
                            return;
                        }
                        callback();
                    }
                },
                trigger: 'change' } : { required: false, trigger: 'change' };
            },
            // 放量时间验证
            planTimeReqire() {
                // 如果放量计划不为空 需要校验和计划类型匹配度 规则同放量计划类型
                return this.releasePlan.planType !== '' ? { validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入放量时间'));
                    } else {
                        // 取月份
                        const prevMonth = this.releasePlan.month || 13;
                        // 获取当前月多一个月前一天的时间来获取本月时间
                        const prevDate = new Date(this.releasePlan.year, prevMonth).getTime() - 24 * 60 * 60 * 1000;
                        // 获取本月的最后一天
                        // 如果时旬 则取旬对应的日期
                        let day;
                        if (this.releasePlan.Period && this.releasePlan.Period !== 3) {
                            day = this.releasePlan.Period * 10;
                        } else {
                            day = new Date(prevDate).getDate();
                        }
                        const timeVal = new Date(this.releasePlan.year, prevMonth - 1, this.releasePlan.day || day);
                        if ([1, 2].includes(this.releasePlan.planType) && timeVal > new Date()) {
                            callback(new Error('当前放量计划类型下放量时间不得大于当前日期'));
                            return;
                        }
                        if ([3, 4].includes(this.releasePlan.planType) && timeVal <= new Date()) {
                            callback(new Error('当前放量计划类型下放量时间必须大于当前日期'));
                            return;
                        }
                        callback();
                    }
                },
                trigger: 'change' } : { required: false, trigger: 'change' };
            },
            // 交房时间类型验证
            handHomeTypeReqire() {
                // 如果交房时间不为空则需要校验交房时间类型和交房时间的匹配 如果类型是交房时间 需要交房时间小于等于当前日期 预计交房时间反之
                return this.handRoom.time !== '' ? { validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请选择交房时间类型'));
                    } else {
                        // 取月份
                        const prevMonth = this.handRoom.month || 13;
                        // 获取当前月多一个月前一天的时间来获取本月时间
                        const prevDate = new Date(this.handRoom.year, prevMonth).getTime() - 24 * 60 * 60 * 1000;
                        // 获取本月的最后一天
                        // 如果时旬 则取旬对应的日期
                        let day;
                        if (this.handRoom.Period && this.handRoom.Period !== 3) {
                            day = this.handRoom.Period * 10;
                        } else {
                            day = new Date(prevDate).getDate();
                        }
                        const timeVal = new Date(this.handRoom.year, prevMonth - 1, this.handRoom.day || day);
                        // const timeVal = new Date(`${this.handRoom.year}/${this.handRoom.month}/${this.handRoom.day}`);
                        if (value == 1 && timeVal <= new Date()) {
                            callback(new Error('当前交房时间与选择的交房时间类型不匹配'));
                            return;
                        }
                        if (value == 2 && timeVal > new Date()) {
                            callback(new Error('当前交房时间与选择的交房时间类型不匹配'));
                            return;
                        }
                        callback();
                    }
                },
                trigger: 'change' } : { required: false, trigger: 'change' };
            },
            // 交房时间验证
            handHomeTimeReqire() {
                return this.handRoom.types !== '' ? { validator: (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入交房时间'));
                    } else {
                        // 取月份
                        const prevMonth = this.handRoom.month || 13;
                        // 获取当前月多一个月前一天的时间来获取本月时间
                        const prevDate = new Date(this.handRoom.year, prevMonth).getTime() - 24 * 60 * 60 * 1000;
                        // 获取本月的最后一天
                        // 如果时旬 则取旬对应的日期
                        let day;
                        if (this.handRoom.Period && this.handRoom.Period !== 3) {
                            day = this.handRoom.Period * 10;
                        } else {
                            day = new Date(prevDate).getDate();
                        }
                        const timeVal = new Date(this.handRoom.year, prevMonth - 1, this.handRoom.day || day);
                        // 预计交房时间
                        if (this.handRoom.types == 1 && timeVal <= new Date()) {
                            callback(new Error('当前交房时间类型下交房时间必须大于当前日期'));
                            return;
                        }
                        // 交房时间
                        if (this.handRoom.types == 2 && timeVal > new Date()) {
                            callback(new Error('当前交房时间类型下交房时间不得大于当前日期'));
                            return;
                        }
                        callback();
                    }
                },
                trigger: 'change' } : { required: false, trigger: 'change' };
            },
            /**
             * 楼盘销售状态推入暂不清楚
             * @return {Boolean} 返回拼装好的数组
             */
            houseSaleStatus() {
                // 深拷贝传过来的数组
                const status = JSON.parse(JSON.stringify(this.saleStatus));
                // 将暂不清楚选项推入
                status.push(noStatus);
                return status;
            }
        },
        methods: {
            /**
             * 清空下拉框回调方法 清楚日期选择的值
             * @param {String} type 清空的类型时计划 还是交房
             */
            clearType(type) {
                const clear = {
                    year: '',
                    month: '',
                    day: '',
                    Period: ''
                };
                if (type === 'plan') {
                    Object.assign(this.releasePlan, clear);
                } else if (type === 'room') {
                    Object.assign(this.handRoom, clear);
                }
            },
            /**
             * 楼盘单价类型变化是清空已编辑的值
             * @param {String} type 类型 1为楼盘单价类型 2为楼盘总价类型 3为放量计划类型 4为交房时间类型
             * @param {String} val 变化的值
             */
            typeChange(type, val) {
                if (type === 1) {
                    // 重置单价
                    this.houseForm.univalence = '';
                    this.houseForm.univalenceStart = '';
                    this.houseForm.univalenceEnd = '';
                } else if (type === 2) {
                    // 重置总价
                    this.houseForm.totolPrice = '';
                    this.houseForm.totolPriceStart = '';
                    this.houseForm.totolPriceEnd = '';
                } else if (type === 3) {
                    // 重置放量计划时间
                    this.releasePlan.planTime = '';
                } else if (type === 4) {
                    // 重置交房时间
                    this.handRoom.time = '';
                }
            },
            /**
             * 是否关联户型切换 如果没有数据则推一条
             * @param {String} type 类型 1为楼盘单价类型 2为楼盘总价类型
             * @param {String} val 变化的值
             */
            relativePlanChange(val) {
                // 如果面积段为空数组时 添加一个空项
                if (this.releasePlan.areaSection.length === 0) {
                    this.releasePlan.areaSection.push({
                        areaSingle: '',
                        areaStart: '',
                        areaEnd: '',
                        showArea: true
                    });
                }
            },
            /**
             * 该组件表单提交校验处理，父组件调用此方法校验此模块表单是否通过校验
             * @return {Object} 验证后的对象
             */
            validForm() {
                const validArr = ['houseForm', 'releasePlan', 'handRoom'];
                // 获取需要提交的表单字段
                const formDatas = this.getSubmitData();
                let valid = {
                    // 标识是否验证成功
                    successful: false,
                    // 表单信息
                    formInfo: '',
                    // 获取该表单是否都为空，如果为空返回true, 否则返回false 供父组件调用判断
                    isEmpty: this.isEmpty(formDatas)
                }
                // 校验区间值
                const {
                    // 起始单价
                    univalenceStart,
                    // 结束单价
                    univalenceEnd,
                    // 起始总价
                    totolPriceStart,
                    // 结束总价
                    totolPriceEnd
                } = this.houseForm;
                // 如果起始值和结束值均不为'' 再进行前后值比较
                if (univalenceStart !== '' && univalenceEnd !== '' && univalenceStart > univalenceEnd) {
                    this.$message.error('起始单价应小于结束单价！');
                    return valid;
                }
                // 如果起始值和结束值均不为'' 再进行前后值比较
                if (totolPriceStart !== '' && totolPriceEnd !== '' && totolPriceStart > totolPriceEnd) {
                    this.$message.error('起始总价应小于结束总价！');
                    return valid;
                }
                // 判断面积段中是否有前后值不匹配的项
                const areaErr = this.releasePlan.areaSection.find(ele => {
                    return ele.areaStart > ele.areaEnd;
                });
                if (areaErr !== undefined && areaErr.areaStart !== '' && areaErr.areaEnd !== '') {
                    this.$message.error('放量计划面积段起始值应小于结束值！');
                    return valid;
                }
                // 循环校验三个表单 将校验结果返回来储存以便后面验证
                const validRes = validArr.map(ele => this.validsingleForm(ele));
                // 如果全部验证通过修改返回的状态和数据
                if (!validRes.includes(false)) {
                    valid.successful = true;
                    valid.formInfo = formDatas;
                }
                return valid;
            },
            /**
             *  检查对象元素每个值是否都为空
             * @param {Object} 需要校验的数据
             * @return {Boolean} 是否全部为空
             */
            isEmpty(data) {
                let empty = true;
                // 将函数提出 解决多次走isEmpty导致值覆盖问题
                (function callee(obj) {
                    Object.keys(obj).find(ele => {
                        if (typeof obj[ele] !== "object") {
                            if (obj[ele] !== undefined && obj[ele] !== '') {
                                empty = false;
                                return true;
                            }
                        } else if (obj[ele].constructor === Array) {
                            obj[ele].forEach(item => {
                                callee(item);
                            });
                        } else if (typeof obj[ele] === "object") {
                            callee(obj[ele]);
                        }
                    })
                })(data);
                return empty;
            },
            /**
             * 获取该组件需要提交的表单数据
             * @return {Object} 组装好的字段信息
             */
            getSubmitData() {
                // 楼盘表单对象
                const houseForm = this.houseForm;
                // 放量计划表单对象
                const releasePlan = this.releasePlan;
                // 交房表单对象
                const handRoom = this.handRoom;
                return {
                    // 单价类型
                    project_price_type: houseForm.univalenceType,
                    project_min_price: houseForm.univalenceType === 4 ? houseForm.univalenceStart : houseForm.univalence,
                    project_max_price: houseForm.univalenceType === 4 ? houseForm.univalenceEnd : houseForm.univalence,
                    project_total_price_type: houseForm.totalPriceType,
                    project_min_total_price: houseForm.totalPriceType === 4 ? houseForm.totolPriceStart : houseForm.totolPrice,
                    project_max_total_price: houseForm.totalPriceType === 4 ? houseForm.totolPriceEnd : houseForm.totolPrice,
                    project_status: houseForm.saleStatus,
                    // 放量计划
                    volume_data: {
                        type: releasePlan.planType,
                        date_year: releasePlan.year,
                        date_month: releasePlan.month,
                        date_day: releasePlan.day,
                        date_ten: releasePlan.Period,
                        house_type_ids: releasePlan.relevanceHouses,
                        building_ids: releasePlan.relevanceBuilding,
                        // 面积段
                        area_list: releasePlan.areaSection ? releasePlan.areaSection.map(ele => {
                            return {
                                area: ele.areaSingle,
                                min_area: ele.areaStart,
                                max_area: ele.areaEnd
                            }
                        }) : []
                    },
                    // 交房计划
                    staging_data: {
                        type: handRoom.types,
                        date_year: handRoom.year,
                        date_month: handRoom.month,
                        date_day: handRoom.day,
                        date_ten: handRoom.Period,
                        house_type_ids: handRoom.relevanceHouses,
                        building_ids: handRoom.relevanceBuilding,
                        // 面积段
                        area_list: handRoom.areaSection ? handRoom.areaSection.map(ele => {
                            return {
                                area: ele.areaSingle,
                                min_area: ele.areaStart,
                                max_area: ele.areaEnd
                            }
                        }) : []
                    },
                    // 折扣优惠
                    rate: handRoom.discount.trim()
                }
            },
            /**
             * 更新表单对象里面对应的时间值
             * @param {String} formRef 表单对应的ref值
             * @param {Object} obj 旬组件传回的时间对象
             */
            updateThisTime(formRef, obj) {
                // 将旬组件传回的对象合并到对应的表单大对象上
                Object.assign(this[formRef], obj);
                if (formRef === 'handRoom') {
                    Object.assign(this.homeSourceDate, obj);
                } else if (formRef === 'releasePlan') {
                    Object.assign(this.planSourceDate, obj);
                }
            },
            /**
             * 公共埋点方法
             * @param {String} para 埋点ID
             * @param {Object} config 埋点扩展子字段
             */
            setTrack(para, config) {
                // 如果有扩展字段不为空 添加page相关参数
                let conf = {};
                if (config) {
                    // 合并配置
                    Object.assign(conf, {
                        fromPage: 'p_change_log',
                        toPage: 'p_change_log'
                    }, config);
                }
                commonFun.setTrackMenu(para, conf);
            },
            /**
             * 切换楼盘销售状态埋点
             * @param {String} value 变化的值
             */
            saleStatusChange(value) {
                this.setTrack(5908, {
                    project_status: value,
                    toPage: ''
                });
            },
            /**
             * 表单校验公共方法
             * @param {String} formName 表单对应的ref
             * @return {Promise} 验证的promise
             */
            validsingleForm(formName) {
                let res = false;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        res = true;
                    }
                });
                return res;
            },
            /**
             * 取消区间
             * @param {Object} item 面积模块数据
             * @param {Number} index 模块索引
             */
            cancleArea(item, index) {
                // 增加取消区间清空值
                item.areaSingle = '';
                item.areaStart = '';
                item.areaEnd = '';
                item.showArea = false;
            },
            /**
             * 增加区间
             * @param {Object} item 面积模块数据
             * @param {Number} index 模块索引
             */
            addArea(item, index) {
                // 增加取消区间清空值
                item.areaSingle = '';
                item.areaStart = '';
                item.areaEnd = '';
                item.showArea = true;
            },
            /**
             * 删除对应面积段
             * @param {String} ref 所属表单
             * @param {Number} index 所在数据索引
             */
            deleteArea(ref, index) {
                this.$confirm('一旦删除则无法恢复确认是否删除！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this[ref].areaSection.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 增加面积段
             * @param {String} ref 所属表单
             */
            addAreaSection(ref) {
                if (this[ref].areaSection.length >= 10) {
                    this.$message('系统已经无力增加了！如果想添加增多的话，可提交完毕一条后再发布的一条新的信息！');
                    return;
                }
                this[ref].areaSection.push({
                    areaSingle: '',
                    areaStart: '',
                    areaEnd: '',
                    showArea: true
                });
            },
            /**
             * 跳转到新增楼栋页面
             * @param {type} 模块类型
             */
            toAddBuilding(type) {
                let track = {
                    event: 'e_click_add_building',
                    fromModule: 'm_project_change_log',
                    toPage: 'p_add_building'
                };
                if (type === 'plan') {
                    // 放量计划跳转埋点
                    track.timeType = 1;
                } else if (type === 'room') {
                    // 交房时间埋点
                    track.timeType = 2;
                }
                this.setTrack(5909, track);
                window.open(`/index.php?r=cj-building%2Fedit&project_id=${this.$route.query.projectId}`);
            }
        }
    }
</script>

<style lang="less" scoped>
    .house-info{
        .flex-box{
            display: flex;
            .num-input{
                width: 110px;
                &.single-area{
                    width: 200px;
                }
            }
            .unit{
                width: 42px;
                margin: 0 5px;
            }
        }
        .info-title{
            border-bottom: 1px solid #dcdfe6;
            padding: 5px 0 15px;
            margin-bottom: 15px;
        }
        .btn-del{
            color: #ff0000;
        }
        .msg{
            color: #e6a23c
        }
        .area-box{
            margin: 0 0 15px;
            .el-button{
                height: fit-content;
            }
        }
        .ten-day-input{
            width: 200px;
        }
        .el-select.mult-select{
            width: 60%;
            min-width: 200px;
        }
    }
</style>