<template>
    <div class="crawl-wrap">
        <!--面包屑导航-->
        <el-breadcrumb
            separator-class="el-icon-d-arrow-right"
            class="bread-nav"
        >
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>中指数据数据抓取</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-wrap">
            <!--form表单-->
            <el-form
                :model="crawlForm"
                ref="crawlForm"
                :rules="rules"
                class="crawl-form"
            >
                <h2 class="headline">抓取内容</h2>
                <el-form-item
                    prop="bandChecked"
                    class="one-level"
                >
                    <el-checkbox v-model="crawlForm.bandChecked">土地信息</el-checkbox>
                </el-form-item>
                <el-form-item
                    v-show="crawlForm.bandChecked"
                    label-width="66px"
                    label="城市"
                    prop="bandCity"
                    class="two-level"
                >
                    <el-select
                        v-model="crawlForm.bandCity"
                        multiple
                        clearable
                        @change="cityChange($event,'bandSlt')"
                        ref="bandSlt"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in bandCityOps"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="dealChecked"
                    class="one-level"
                >
                    <el-checkbox v-model="crawlForm.dealChecked">成交数据</el-checkbox>
                </el-form-item>
                <el-form-item
                    v-show="crawlForm.dealChecked"
                    label-width="66px"
                    label="城市"
                    prop="dealCity"
                    class="two-level"
                >
                    <el-select
                        v-model="crawlForm.dealCity"
                        multiple
                        clearable
                        @change="cityChange($event,'dealSlt')"
                        ref="dealSlt"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in dealCityOps"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <div
                    v-if="showRequireInfo"
                    class="msg-require"
                >{{requireCont}}</div>

                <h2 class="headline">账号登陆</h2>
                <el-form-item
                    label="账号"
                    prop="account"
                    label-width="108px"
                    class="fix-width"
                >
                    <el-input
                        v-model="crawlForm.account"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="令牌动态口令"
                    prop="psw"
                    label-width="108px"
                    class="fix-width"
                >
                    <el-input
                        show-password
                        v-model="crawlForm.psw"
                        maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="btn-submit"
                        @click="onSubmit('crawlForm')"
                    >提交</el-button>
                </el-form-item>
            </el-form>
            <!--抓取记录-->
            <div class="crawl-record">
                <p
                    class="record-item"
                    v-for="(item, index) in reverseLogMsg"
                    :key="index"
                >
                    <span class="record-time">{{item.create_datetime}}：</span>
                    <span class="record-detail">{{item.content}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getLandCity, // 获取城市信息接口
        loginCreis, // 中指数据登录接口
        getCrawlLog // 获取爬取日志
    } from '@/api/houseManage';
    import dataStorage from '@/utils/dataStorage';
    export default {
        name: 'LandCrawl',
        data() {
            return {
                crawlForm: {
                    // 表单form对象
                    bandChecked: true, // 土地信息checkbox
                    dealChecked: true, // 成交数据checkbox
                    bandCity: [], // 土地信息城市选择值
                    dealCity: [], // 成交数据城市选择值
                    account: '', // 账号
                    psw: '' // 密码
                },
                requireCont: '上述信息为二选一', // 土地和成交城市提示信息
                rules: {
                    // 校验规则
                    bandCity: [{ type: 'array', required: true, message: '此项为必填', trigger: 'change' }],
                    dealCity: [{ type: 'array', required: true, message: '此项为必填', trigger: 'change' }],
                    account: [{ required: true, message: '此项为必填', trigger: 'blur' }],
                    psw: [{ required: true, message: '此项为必填', trigger: 'blur' }]
                },
                bandCityOps: [], // 土地城市数据
                dealCityOps: [], // 成交信息城市数据
                logMsg: [] // 日志信息
            };
        },
        computed: {
            // 是否展示土地和成交数据二选一提示
            showRequireInfo() {
                return !(this.crawlForm.bandChecked || this.crawlForm.dealChecked);
            },
            reverseLogMsg() {
                return this.logMsg.slice().reverse();
            }
        },
        watch: {
            'crawlForm.bandChecked': function(val, old) {
                if (!val) {
                    this.getCityData(1); // 重新选中时展示全部
                }
            },
            'crawlForm.dealChecked': function(val, old) {
                if (!val) {
                    this.getCityData(2); // 重新选中时展示全部
                }
            }
        },
        created() {
            this.queryErrCount = 0; // 初始化轮询错误数量
            this.logId = 0; // 初始化logid
            this.havePoll = false; // 是否已经开始轮询
            this.bandCityStg = null; // 土地城市存储
            this.dealCityStg = null; // 交易信息城市存储
            this.getCityData(1); // 初始化获取土地城市信息
            this.getCityData(2); // 初始化获取交易信息城市信息
            this.getLogOnce(0); // 初始化获取最新的爬取日志
        },
        methods: {
            // 获取土地城市信息和成交数据城市信息
            getCityData(type) {
                const typeRelation = {
                    // 定义类型和数据对应关系 数组第一项未this上城市信息key 第二项为本地存储key
                    '1': ['bandCityOps', 'bandCityStg'],
                    '2': ['dealCityOps', 'dealCityStg']
                };
                // 如果本地存在以及你个存储的值且为超过过期时间则用本地缓存 否则重新请求数据并保存
                if (dataStorage.getStorage([typeRelation[type][1]]) && dataStorage.isFresh([typeRelation[type][1]])) {
                    const cacheData = dataStorage.getStorage([typeRelation[type][1]]).oData; // 获取缓存信息
                    this[typeRelation[type][0]] = cacheData;
                    const newData = cacheData.slice();
                    newData.shift(); // 删除第一项为全部的值
                    this.setCityDefaultData(newData, type); // 设置选中默认值
                } else {
                    const _this = this;
                    // 获取城市信息
                    getLandCity(type)
                        .then(({ data }) => {
                            if (data.code === 0) {
                                let datas = data.data;
                                this.setCityDefaultData(datas, type);
                                if (datas[1].id !== 0) {
                                    // 如果为0则表示为全部 没有就推进去
                                    datas.unshift({ id: 0, text: '全部' });
                                }
                                _this[typeRelation[type][1]] = dataStorage.setStorage([typeRelation[type][1]], datas); // 存进本地
                                _this[typeRelation[type][0]] = datas;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            },
            // 赋值选中城市信息
            setCityDefaultData(oriData, type) {
                if (type === 1) {
                    this.crawlForm.bandCity = oriData.map(ele => ele.id);
                } else if (type === 2) {
                    this.crawlForm.dealCity = oriData.map(ele => ele.id);
                }
            },
            // change筛选全部
            cityChange(vals, ref) {
                const relation = {
                    // 定义ref和对应数据的对应关系
                    bandSlt: ['bandCityOps', 'bandCity'],
                    dealSlt: ['dealCityOps', 'dealCity']
                };
                if (vals[vals.length - 1] === 0) {
                    // 如果选择的是全部则将其余全部数据赋值
                    const options = this[relation[ref][0]].map(ele => {
                        if (ele.id !== 0) {
                            return ele.id;
                        }
                    });
                    this.crawlForm[relation[ref][1]] = options;
                    this.$refs[ref].blur();
                }
            },
            // form 表单提交
            onSubmit(formName) {
                this.$refs[formName].validate((valid, obj) => {
                    if (this.showRequireInfo) {
                        this.$message({
                            message: '抓取内容至少选择一项！',
                            type: 'warning'
                        });
                        return false;
                    }
                    if (valid) {
                        // 更换logid 取当前最大值
                        this.postDataAndCrawlInfo(); // 验证通过进行登录
                    } else {
                        this.$message({
                            message: '请检查必填项是否填写完毕',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            // 提交表单数据开始抓取
            postDataAndCrawlInfo() {
                const _this = this;
                const { bandCity, dealCity, account, psw } = this.crawlForm;
                const options = {
                    land_city_ids: _this.crawlForm.bandChecked ? bandCity : [],
                    deal_city_ids: _this.crawlForm.dealChecked ? dealCity : [],
                    username: account,
                    password: psw
                };
                loginCreis(options)
                    .then(({ data }) => {
                        // 无论成功失败都需要调取日志接口
                        setTimeout(() => {
                            this.logId = 0;
                            this.getLogOnce(this.logId); // 每次提交后主动查询一次日志
                        }, 5000);
                        // 提交成功后开始轮询抓取日志 当logid大于0表示已经有轮询在跑，不再重复轮询
                        if (!_this.havePoll) {
                            _this.queryCrawlLog();
                        }
                        _this.$message({
                            message: data.msg,
                            type: 'warning'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 轮询抓取日志
            queryCrawlLog() {
                this.havePoll = true;
                setTimeout(() => {
                    if (this.queryErrCount < 10) {
                        const _this = this;
                        getCrawlLog(this.logId)
                            .then(({ data }) => {
                                if (data.code === 0) {
                                    // 如果状态为0 则需要覆盖之前已有数据
                                    // 执行操作
                                    const datas = data.data;
                                    if (JSON.stringify(datas) !== '{}') {
                                        _this.logMsg.push(...datas);
                                        _this.logId = datas[datas.length - 1].id; // 将id最大值赋值
                                    }
                                    _this.queryCrawlLog(_this.logId);
                                }
                            })
                            .catch(err => {
                                _this.queryErrCount++;
                                _this.queryCrawlLog(_this.logId);
                                console.log(err);
                            });
                    } else {
                        this.logId = 0;
                        this.$message({
                            message: '获取登录状态失败，请稍后再试',
                            type: 'error'
                        });
                    }
                }, 1000 * 30);
            },
            // 单次初次日志获取
            getLogOnce(id) {
                const _this = this;
                getCrawlLog(id)
                    .then(({ data }) => {
                        if (data.code === 0) {
                            // 执行操作
                            const datas = data.data;
                            _this.logMsg = [];
                            if (JSON.stringify(datas) !== '{}') {
                                _this.logMsg = datas;
                                _this.logId = datas[datas.length - 1].id; // 将id最大值赋值
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style lang="less" scoped>
.crawl-wrap {
    padding: 20px 30px 0;
    .main-wrap {
        display: flex;
        justify-content: space-between;
        .crawl-form {
            margin: 15px 0;
            background-color: #fff;
            flex: 1;
            padding: 6px 15px;
            .headline {
                font-weight: bold;
            }
            .msg-require {
                color: #f56c6c;
                font-size: 12px;
                line-height: 1;
                margin-bottom: 10px;
                padding-left: 20px;
            }
            .el-form-item {
                margin: 5px auto 15px;
                /deep/ .el-form-item__content {
                    overflow: visible;
                }
                .el-select {
                    width: 400px;
                }
            }
            .one-level {
                padding-left: 15px;
                /deep/ .el-checkbox__label {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .fix-width {
                margin-top: 20px;
                .el-input {
                    width: 400px;
                }
            }
            .two-level {
                padding-left: 40px;
            }
            .btn-submit {
                margin-left: 200px;
                margin-top: 25px;
            }
        }
        .crawl-record {
            padding: 10px 15px;
            margin: 15px 0 10px;
            background-color: #fff;
            flex: 1;
            max-height: 533px;
            overflow-y: auto;
            margin-left: 15px;
            .record-item {
                line-height: 2;
            }
        }
    }
}
</style>
