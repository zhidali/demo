<!--
    /**
    * @file 城市费率编辑页面
    * @date 2019.9.17
    * @author xiebin
    */
 -->
<template>
    <div class="collocation-wrap">
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-nav">
        <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'rateSettingList' }">各城市目标费率</el-breadcrumb-item>
        <el-breadcrumb-item>城市目标费率编辑页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="rate-setting-box">
            <el-table
                :data="editorInitData"
                height="550"
                border
                style="width: 100%">
                <el-table-column
                    prop="show_txt"
                    label="业态"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="费率(%)"
                    align="center">
                        <template slot-scope="scope">
                            <Input-number
                                :value="scope.row.rate"
                                reg="twoNum"
                                @input.native="updateRateVal(scope,$event)" />
                            <label>%</label>
                        </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-button @click="cancelList">取消</el-button>
                <el-button
                    type="primary"
                    @click="saveRateInfo">
                    保存
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import apiArray from '../../api/rateSettingApi/RateList';
import InputNumber from '../../components/NumberInput';
export default {
    data() {
        return {
            // 编辑页面费率列表数据
            editorInitData: []
        }
    },
    mounted() {
        // 调用初始化费率数据方法
        this.getRateInitData();
    },
    components: {
       InputNumber 
    },
    methods: {
        // 目标费率获取初始数据
        async getRateInitData() {
            let result = await apiArray.getEditRateData(this.$route.query.cityId);
            let {data} = result;
            if (data.code === 0) {
                this.editorInitData = data.data.list;
            }
        },
        /**
         * 更新rate的val
         * @params [String] rate editorInitData数组里的原始值
         * @params [Object] e event事件 
         */
        updateRateVal(rate,e) {
            rate.row.rate = e.target.value;
        },
        // 判断费率是否为空
        rateInputIsNull() {
            let flag = true
            this.editorInitData.map(data => {
                if (data.rate === '') {
                    flag = false
                }
            })
            return flag
        },
        // 点击保存数据
        async saveRateInfo() {
            if (this.rateInputIsNull() === false) {
                this.$message.error('费率不能为空！');
                return
            }
            let params = {
                list: this.editorInitData,
                city_id: this.$route.query.cityId
            };
            let result = await apiArray.getSaveRateData(params);
            let {data} = result;
            if (data.code === 0) {
                this.$router.push({path: 'rateSettingList'});
            }
        },
        // 返回列表页
        cancelList() {
            this.$router.push({path: 'rateSettingList'});
        }
    }
}
</script>

<style lang="less" scoped>
.collocation-wrap {
    width: 100%;
    padding: 20px 30px 0;
    margin: 0 auto;
    box-sizing: border-box;
        .rate-setting-box {
            width: 100%;
            background: #fff;
            margin-top: 20px;
            padding: 20px 20px 20px 30px;
            box-sizing: border-box;
            .number-input-box {
                display: inline-block;
                width: 90%;
                margin-right: 5px;
            }
            .footer {
                text-align: center;
                width: 100%;
                margin-top: 20px;
                /deep/ .el-button {
                    width: 150px;
                }
            }
        }
}
</style>