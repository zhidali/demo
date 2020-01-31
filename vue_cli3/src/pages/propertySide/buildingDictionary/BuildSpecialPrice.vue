<!--
    @file: 特价房源模块
    @description: 特价房源模块
    @date: 2019-11-14
    @updater: xiejiaxin xiebin
-->
<template>
    <div class="special-price-box">
        <div class="title-content">
            <h3>特价房源</h3>
        </div>
        <div class="form-content-box">
            <el-form
                label-width="100px">
                <el-form-item label="特价房描述:">
                    <el-input
                        v-model="specialHouseDes"
                        placeholder="请输入">
                    </el-input>
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="expireTimeOption">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div class="special-room-info">
                <h4>特价房信息</h4>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="房号"
                        width="180">
                        <template slot-scope="scope">
                            <el-input
                                v-model="scope.row.houseNum"
                                minlength="1"
                                maxlength="15">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="面积(㎡)"
                        width="100">
                        <template slot-scope="scope">
                            <num-input
                                v-model="scope.row.acreage"
                                minVal="1"
                                maxVal="99999"
                                reg="twoNum">
                            </num-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="150">
                        <template slot="header" slot-scope="scope">
                            <p>原总价</p>
                            <p>(万元)</p>
                        </template>
                        <template slot-scope="scope">
                            <num-input
                                v-model="scope.row.price"
                                minVal="1"
                                maxVal="99999"
                                reg="fourNum">
                            </num-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="150">
                        <template slot="header" slot-scope="scope">
                            <p>优惠总价</p>
                            <p>(万元)</p>
                        </template>
                        <template slot-scope="scope">
                            <num-input
                                v-model="scope.row.specialPrice"
                                minVal="1"
                                maxVal="99999"
                                reg="fourNum">
                            </num-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="70">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="removeLine(scope.row, scope.$index, tableData)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button
                    type="primary"
                    class="btn-add-speical-room"
                    @click="addSpeicalRoom">
                    增加特价房
                </el-button>
            </div>
            <!-- 特价房图片 -->
            <div class="specia-photo-box">
                <div class="photo-text">
                    <h4>特价房图片</h4>
                    <span>文件比较多仅录入图片</span>
                </div>
                    <img-upload
                        ref="speciaPrice"
                        uploadId="speciaPriceId">
                    </img-upload>
            </div>
        </div>
    </div>
</template>

<script>
import NumInput from '../../../components/NumberInput';
import ImgUpload from './components/ImageUpload';
export default {
    name: 'BuildSpecialPrice',
    components: {
        NumInput,
        ImgUpload
    },
    data() {
        return {
            // 特价房信息
            specialHouseDes: '',
            // 结束时间
            endTime: '',
            expireTimeOption: {
                disabledDate(date) {
			          	//disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
						return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
				}
            },
            // 表格数据
            tableData: [
                {
                    // 房号
                    houseNum: '',
                    // 面积
                    acreage: '',
                    // 原总价
                    price: '',
                    // 优惠价格
                    specialPrice: ''
                }
            ]
        }
    },
    methods: {
        /**
         * 点击删除当前行
         * @params index [number] 当前点击行的index
         * @params deleteName [number] 要操作的数组
         */
        removeLine (row, index, deleteName) {
            this.$confirm('一旦删除则无法恢复确认是否删除！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    if (index !== -1) {
                        deleteName.splice(index, 1)
                    }
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
        // 添加
        addSpeicalRoom() {
            this.tableData.push({
                houseNum: '',
                acreage: '',
                price: '',
                specialPrice: ''
            });
        },
        // 提交数据
        saveDataList() {
            let specialInfoList = [];
            let saveInfoList = {};
            this.tableData.forEach(item => {
                let arrList = {
                    // 房号
                   house_num: item.houseNum,
                    // 面积
                   acreage: item.acreage,
                    // 原总价   
                   price: item.price,
                    // 优惠总价
                   special_price: item.specialPrice,
                };
                specialInfoList.push(arrList);
            });
            // 数据转换
            saveInfoList = {
                // 特价房概述
                desc: this.specialHouseDes,
                end_datetime_specific: this.endTime,
                detail: specialInfoList,
                imgs: this.$refs['speciaPrice'].getUrlList()
            };
            return {
                successful: true,
                formInfo: {
                    special: saveInfoList
                }
            };
        },
    }
}
</script>

<style lang="less" scoped>
.special-price-box {
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
        .special-room-info {
            /deep/ .btn-add-speical-room {
                margin-top: 20px;
            }
        }
        .specia-photo-box {
            margin-top: 30px;
        }
        .photo-text {
            display: flex;
            flex-direction: row;
            h4 {
                margin-right: 20px;
            }
            span {
                font-size: 12px;
                margin-top: 2px;
            }
        }
    }
}
</style>