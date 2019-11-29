<!--
    /**
    * @file 城市费率列表
    * @date 2019.9.17
    * @author xiebin
    */
 -->
<template>
    <div class="collocation-wrap">
        <!--面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-nav">
        <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>各城市目标费率</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 费率列表 -->
        <div class="rate-setting-box">
            <el-table
                :data="rateList"
                border
                style="width: 100%">
                <el-table-column
                    prop="city_id_name"
                    label="城市"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="业态及目标费率"
                    align="center">
                    <template slot-scope="scope">
                            <p
                            v-for="(item, index) in scope.row.project_type_and_rate"
                            :key="index">
                            {{item}}
                            </p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="update_datetime_str"
                    label="更新时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="updator_str"
                    label="更新人"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="jumpEditPage(scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :page-count="pageData.pageTotal"
                :page-size="pageData.defaultPageSize"
                :current-page="currentPage"
                hide-on-single-page="true"
                @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import apiArray from '../../api/rateSettingApi/RateList';
export default {
    data() {
        return {
            // 费率数据列表
            rateList: [],
            // 页码参数
            pageData: {},
            // 当前页码
            currentPage: 0,
        }
    },
    mounted() {
        // 费率列表接口调用
        this.getRateInfoData();
    },
    methods: {
        /**
         * 获取费率列表数据请求
         * @params [number] pageNum 当前页码
         */
        async getRateInfoData(pageNum) {
            let result = await apiArray.getRateListData(pageNum);
            let {data} = result;
            if (data.code === 0) {
                this.rateList = data.data.list;
                this.pageData = data.data.pages;
            }
        },
        /**
         * 页码改变时触发
         * @params [number] val 当前页码
         */
        currentChange(val) {
            this.getRateInfoData(val - 1);
        },
        /** 跳转到编辑页面
         *  @params row [Object] 点击当前行的数据
         */
        jumpEditPage(row) {
            this.$router.push({
                path: 'rateEditSetting',
                query: {cityId: row.city_id}
            });
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
            /deep/ .el-pagination {
                text-align: center;
                margin-top: 20px;
            }
        }
}
</style>