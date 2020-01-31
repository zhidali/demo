<!--
 * @author: zhengchao
 * @Date: 2019-10-23 10:00:00
 * @description: 服务管理员业务管理--投诉管理
 -->
<template>
    <div
        class="el-row"
        v-loading.fullscreen.lock="contentLoading"
    >
        <el-col
            :span="24"
            class="content-main"
        >
            <el-breadcrumb
                class="bread-crumb-box"
                separator-class="el-icon-arrow-right"
            >
                <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
                <el-breadcrumb-item>投诉管理</el-breadcrumb-item>
            </el-breadcrumb>
            <!--搜索区域-->
            <div class="v-box form-table-box">
                <div class="hd">
                    <h2>投诉管理</h2>
                </div>
                <div class="bd">
                    <div class="order-search">
                        <!--查询需求-->
                        <ul class="s-query">
                            <li>
                                <div class="th">城市：</div>
                                <div class="td">
                                    <el-select
                                        v-model="searchData.cityId"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in cityList"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li>
                                <div class="th">标题：</div>
                                <div class="td">
                                    <el-input v-model="searchData.title"></el-input>
                                </div>
                            </li>
                            <li>
                                <div class="th">被举报员工：</div>
                                <div class="td">
                                    <el-input v-model="searchData.employeeName"></el-input>
                                </div>
                            </li>
                            <li>
                                <div class="th">订单ID：</div>
                                <div class="td">
                                    <el-input v-model="searchData.orderId"></el-input>
                                </div>
                            </li>
                            <li>
                                <div class="th">举报人姓名：</div>
                                <div class="td">
                                    <el-input v-model="searchData.customerName"></el-input>
                                </div>
                            </li>
                            <li>
                                <div class="th">举报人联系方式：</div>
                                <div class="td">
                                    <el-input v-model="searchData.customerMobile"></el-input>
                                </div>
                            </li>
                            <li>
                                <div class="th">问题发生时间：</div>
                                <div class="td">
                                    <el-date-picker
                                        v-model="searchData.complaintTime"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        prefix-icon="date-tip-logo"
                                    >
                                    </el-date-picker>
                                </div>
                            </li>
                            <li>
                                <div class="th">处理进度：</div>
                                <div class="td">
                                    <el-select
                                        v-model="searchData.handleStatus"
                                        filterable
                                    >
                                        <el-option
                                            v-for="item in progress"
                                            :key="item.id"
                                            :label="item.text"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li
                                class="auto margin-scale"
                                v-if="complainChannels.length > 0"
                            >
                                <div class="th">举报途径：</div>
                                <div class="td">
                                    <el-checkbox-group v-model="searchData.complaintChannel">
                                        <el-checkbox
                                            v-for="(channel, index) in complainChannels"
                                            :key="'channel-' + index"
                                            :label="channel.id"
                                        >{{channel.text}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-area">
                        <el-button @click="resetSearch">重置</el-button>
                        <el-button
                            type="primary"
                            @click="tableSearch(1)"
                        >搜索</el-button>
                    </div>
                </div>
            </div>
            <!--表格展示区域-->
            <div class="v-box form-table-box">
                <div class="bd">
                    <div
                        class="search-result box-relative"
                        :class="{ 'has-padding':tableList.length === 0 }"
                    >
                        <div class="batch-btn-area">
                            <el-button
                                type="primary"
                                v-if="showExport"
                                @click="exportContent"
                            >导出</el-button>
                            <el-button
                                type="primary"
                                v-if="showCreate"
                                @click="createComplain"
                            >新建</el-button>
                        </div>
                        <fixed-ordinary-table
                            :tableData="tableList"
                            :paging="true"
                            :limit="limit"
                            :totalCount="dataSum"
                            :tableLabel="tableLabel"
                            @pageUpdate="pageUpdate"
                            :fixedCol="true"
                            @callBackEvent="changeComplain"
                            :canCenter="'center'"
                            :richTxts="richTxt"
                        ></fixed-ordinary-table>
                    </div>
                </div>
            </div>
        </el-col>
        <!-- 客户投诉处理弹窗 -->
        <el-dialog
            title="客户投诉处理"
            :visible.sync="showDialog"
            custom-class="complain-dialog-wrap"
            center
            :show-close="false"
        >
            <div class="complain-dialog-cnt">
                <div class="form-box">
                    <div class="box-left">
                        <p>投诉标题：</p>
                    </div>
                    <div class="box-right">
                        <p>{{dialogData.tit}}</p>
                    </div>
                </div>
                <div class="form-box">
                    <div class="box-left">
                        <p>举报内容：</p>
                    </div>
                    <div class="box-right">
                        <p>{{dialogData.cnt}}</p>
                    </div>
                </div>
                <div class="form-box">
                    <div class="box-left">
                        <p>被举报员工：</p>
                    </div>
                    <div class="box-right">
                        <p>{{dialogData.employeeName}}</p>
                    </div>
                </div>
                <div class="form-box">
                    <div class="box-left">
                        <p>问题发生时间：</p>
                    </div>
                    <div class="box-right">
                        <p>{{dialogData.complaintTime}}</p>
                    </div>
                </div>
                <p>请填写处理结果：</p>
                <el-input
                    type="textarea"
                    v-model="complainResult"
                    maxlength="300"
                    show-word-limit
                ></el-input>
                <p class="dialog-tips">{{dialogTips}}</p>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="showDialog = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="updateComplaint"
                >提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { FixedOrdinaryTable } from '@/components';
    import performanceApi from './api/riskManageApi';
    import { getCity } from '@/api/commonApi';
    import { commonFun } from '@/assets/js/utils/utils';
    import { COMPLAIN_PROGRESS, COMPLAIN_CHANNELS_INCLUD_ONLINE } from './config/config';
    import { mapState } from 'vuex';
    import moment from 'moment';
    export default {
        name: 'ComplainList',
        data() {
            return {
                // 表格数据
                tableList: [],
                // 当前第几页
                page: 1,
                // 一共多少条数据
                dataSum: 0,
                // 表格每页多少条数据
                limit: 20,
                // 表头数据
                tableLabel: [],
                // 页面加载loading
                contentLoading: true,
                // 城市数据
                cityList: [],
                // 处理进度
                progress: COMPLAIN_PROGRESS,
                // 举报途径
                complainChannels: COMPLAIN_CHANNELS_INCLUD_ONLINE,
                // 搜索条件
                searchData: {
                    // 城市id
                    cityId: '',
                    // 标题
                    title: '',
                    // 被投诉员工姓名
                    employeeName: '',
                    // 订单ID
                    orderId: '',
                    // 投诉人姓名
                    customerName: '',
                    // 投诉人联系方式（手机号）
                    customerMobile: '',
                    // 投诉发生事件段
                    complaintTime: [],
                    // 投诉途径
                    complaintChannel: [],
                    // 处理结果
                    handleStatus: ''
                },
                // 展示弹窗
                showDialog: false,
                // 弹窗类型
                dialogType: '',
                // 投诉弹窗内容
                dialogData: {
                    // 标题
                    tit: '',
                    // 投诉发生时间
                    complaintTime: '',
                    // 被投诉员工
                    employeeName: '',
                    // 投诉内容
                    cnt: '',
                    // 处理结果
                    handleResult: ''
                },
                // 处理结果 v-model
                complainResult: '',
                /**
                 * 表格自定义渲染函数（传入表格组件）
                 *  {
                 *      // 图片、音频的相关的prop
                 *      media:['prop'],
                 *      // 文字的相关 prop
                 *      rtxt:{
                 *          // prop名：{type:'有回调函数的字段@callBackEvent',fn:(表格数据,行数据){渲染表格数据函数 }}
                 *          'prop':{type:'outerfilterFn',fn:(prop,row)=>{ return {type:'prop',text:'文本'} }},
                 *          // prop名：{type:'无回调函数的字段'}
                 *          'prop':{type:'outerfilter',fn:(prop,row)=>{}},
                 *      }
                 *  }
                 */
                richTxt: {
                    media: ['voucher_data'],
                    rtxt: {
                        operation: {
                            type: 'outerfilterFn',
                            fn: function(data, row) {
                                if (row.handle_result == '' && data.audit_auth) {
                                    return [{ text: '审核', type: 'audit_auth' }];
                                } else if (row.handle_result != '' && data.update_auth) {
                                    return [{ text: '修改', type: 'update_auth' }];
                                }
                            }
                        },
                        customer_contact: {
                            type: 'outerfilter',
                            fn: function(data) {
                                let arr = [];
                                data.forEach(val => {
                                    if (val.customer_mobile != '' && val.customer_mobile != undefined) {
                                        arr.push({ text: '电话：' + val.customer_mobile });
                                    } else if (val.customer_email != '' && val.customer_email != undefined) {
                                        arr.push({ text: '邮箱：' + val.customer_email });
                                    } else if (val.customer_qq != '' && val.customer_qq != undefined) {
                                        arr.push({ text: 'qq：' + val.customer_qq });
                                    } else if (val.customer_wechat != '' && val.customer_wechat != undefined) {
                                        arr.push({ text: 'wechat：' + val.customer_wechat });
                                    }
                                });
                                return arr;
                            }
                        }
                    }
                },
                // 显示新建投诉按钮
                showCreate: false,
                // 显示导出列表按钮
                showExport: false,
                // 弹窗内投诉提示内容 为‘’ 不显示
                dialogTips: ''
            };
        },
        components: {
            FixedOrdinaryTable
        },
        created() {
            // 城市数据初始化
            try {
                this.getCityList();
            } catch (err) {
                console.log(err)
            }
        },
        mounted() {
            this.$nextTick(() => {
                // 表格数据初始化
                this.tableSearch(this.page)
                    .then(() => {
                        // 关闭表格loading
                        this.contentLoading = false;
                    })
                    .catch(error => {
                        // 关闭表格loading
                        this.contentLoading = false;
                        console.log(error);
                    });
            });
        },
        methods: {
            // 获取分页点击参数
            pageUpdate(para) {
                this.page = para;
                this.tableSearch(this.page);
            },
            // 获取表格数据/导出数据的查询条件数据
            getSearchData() {
                let searchData = {
                    page: this.page,
                    city_id: this.searchData.cityId == -1 ? '' : this.searchData.cityId,
                    title: this.searchData.title,
                    employee_name: this.searchData.employeeName,
                    order_id: this.searchData.orderId,
                    customer_name: this.searchData.customerName,
                    customer_mobile: this.searchData.customerMobile,
                    complaint_time_start: this.searchData.complaintTime[0] ? this.searchData.complaintTime[0] : '',
                    complaint_time_end: this.searchData.complaintTime[1] ? this.searchData.complaintTime[1] : '',
                    handle_status: this.searchData.handleStatus,
                    complaint_channel: ''
                };
                // 举报途径由数组改为用,连接的字符串
                if (this.searchData.complaintChannel && this.searchData.complaintChannel.length != 0) {
                    searchData.complaint_channel = this.searchData.complaintChannel.join(',');
                }
                return searchData;
            },
            /**
             * @description: 获取表格数据
             * @param {number} paraPage 表格的页数
             * @return:
             */
            async tableSearch(paraPage) {
                let params = this.getSearchData();
                // 给表格组件赋值
                try {
                    let result = await performanceApi.getComplaintList(params);
                    let { data } = result;
                    if (data.code === 0) {
                        this.tableList = data.data ? data.data.list : [];
                        this.tableLabel = data.data ? data.data.fields : [];
                        this.dataSum = commonFun.matchFigure(data.data ? data.data.total : 0) ? parseInt(data.data.total) : 0;
                        this.showCreate = data.data && data.data.auth && data.data.auth.create ? data.data.auth.create : false;
                        this.showExport = data.data && data.data.auth && data.data.auth.export ? data.data.auth.export : false;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // 置空事件
            resetSearch() {
                this.searchData = {
                    cityId: '',
                    title: '',
                    employeeName: '',
                    orderId: '',
                    customerName: '',
                    customerMobile: '',
                    complaintTime: '',
                    complaintChannel: [],
                    handleStatus: ''
                };
                this.page = 1;
                this.tableSearch(this.page);
            },
            // 获取城市下拉
            async getCityList() {
                let cityList = await getCity(1);
                let { data } = cityList;
                if (data.code === 0) {
                    this.cityList = data.data;
                }
            },
            // 导出列表
            exportContent() {
                if (this.dataSum > 3000) {
                    this.$message.error('超出导出数据的最大限制，不能导出哦！');
                    return false;
                } else if (this.dataSum == 0) {
                    this.$message.error('没有数据，不能导出！');
                    return false;
                }
                try {
                    let params = this.getSearchData();
                    params.is_export = 1;
                    let url = '/backend-api/complaint/list?';
                    Object.keys(params).map((item, i) => {
                        if (params[item] != '' && params[item] != null && params[item] != undefined) {
                            if (i !== 0) {
                                url += '&' + item + '=' + params[item];
                            } else {
                                url += item + '=' + params[item];
                            }
                        }
                    });
                    // console.log(url)
                    window.location.href = url;
                } catch (error) {
                    console.log(error);
                }
            },
            // 创建新投诉
            createComplain() {
                this.$router.push({ path: '/performance/complain' });
            },
            /**
             * @description: 表格处理回调函数
             * @param {Object} row 当前表格行数据
             * @param {any}} val 当前单元格数据
             * @return:
             */
            async changeComplain(row, val) {
                if (val == 'audit_auth' || val == 'update_auth') {
                    let { data } = await performanceApi.getComplaintDetail({ id: row.id });
                    if (data.code == 0) {
                        this.showDialog = true;
                        this.dialogType = val;
                        let popCnt = data.data;
                        this.dialogData = {
                            tit: popCnt.title,
                            complaintTime: popCnt.complaint_time,
                            employeeName: popCnt.employee_name,
                            cnt: popCnt.content,
                            handleResult: popCnt.handle_result,
                            id: popCnt.id
                        };
                        this.complainResult = popCnt.handle_result;
                    }
                }
            },
            // 处理投诉/更新投诉
            async updateComplaint() {
                // 判断提交时 结果数据无数据不执行提交功能 而执行 关闭窗口
                if (!commonFun.trim(this.complainResult) || commonFun.trim(this.complainResult) === '') {
                    this.dialogTips = '处理结果不能为空！';
                    return false;
                } else if (commonFun.trim(this.complainResult).length > 300) {
                    this.dialogTips = '处理结果最多输入300个字！';
                    return false;
                }
                let params = {
                    id: this.dialogData.id,
                    handle_result: commonFun.trim(this.complainResult)
                };
                let { data } = await performanceApi.updateComplaint(params);
                if (data.code == 0) {
                    this.showDialog = false;
                    this.clearComplaintDialogData();
                    this.tableSearch();
                    let _tips = '审核成功';
                    if (this.dialogType === 'update_auth') {
                        _tips = '修改成功';
                    }
                    this.$message(_tips);
                    this.dialogType = '';
                }
            },
            // 初始化审核/修改弹窗数据
            clearComplaintDialogData() {
                this.showDialog = false;
                this.dialogData = {
                    tit: '',
                    complaintTime: '',
                    employeeName: '',
                    cnt: '',
                    handleResult: '',
                    id: ''
                };
                this.complainResult = '';
            }
        },
        watch: {
            complainResult: function(val, oldval) {
                this.dialogTips = '';
            }
        }
    };
</script>

<style scoped>
.content-main {
    padding: 0 15px;
}
.form-table-box {
    background-color: #fff;
}
.form-table-box .filter-link-more {
    float: right;
    padding: 9px 20px;
    margin-top: 6px;
}
.form-table-box .order-search > .s-query > li .td {
    min-height: 40px;
}
.order-search {
    overflow: hidden;
}
.order-search >>> .el-date-editor,
.order-search >>> .el-select {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
}
.order-search >>> .el-select .el-input {
    height: 40px;
}
.order-search >>> .el-select .el-input__inner {
    height: 40px !important;
}
.order-search >>> .el-range-input {
    background-color: #fff;
    font-size: 12px;
    line-height: 32px;
}
.order-search >>> .el-date-editor .el-range-separator {
    font-size: 12px;
}
.order-search .fixHeight {
    height: 40px;
}
.order-search >>> .el-date-editor .date-tip-logo {
    display: none;
}
.order-search >>> .el-checkbox {
    font-weight: normal;
}
.order-search .s-query > li.margin-scale {
    margin-bottom: 0;
}
.s-query > li.long-column {
    width: 360px;
}
.s-query > li.margin-next {
    margin-left: 20px;
}
.form-tip-box {
    color: #999;
}
.form-table-box .batch-btn-area {
    text-align: right;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 10;
}
.search-result{
    position: relative;
}
.batch-form-box >>> .el-form-item {
    margin-bottom: 0;
}
.box-relative {
    position: relative;
}
.box-absolute {
    position: absolute;
}
.el-row >>> .complain-dialog-wrap {
    font-size: 14px;
}
.el-row >>> .complain-dialog-wrap .complain-dialog-cnt p {
    font-size: 14px;
    margin-bottom: 8px;
}
.el-row >>> .complain-dialog-wrap .complain-dialog-cnt .form-box {
    display: -webkit-box;
    display: flex;
}
.el-row >>> .complain-dialog-wrap .complain-dialog-cnt .form-box .box-left {
    flex: 0 1 100px;
}
.dialog-tips {
    margin-top: 10px;
    font-size: 12px;
    color: #f56c6c;
}
.has-padding{
    padding-top:24px;
}
</style>
