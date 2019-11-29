<!--
    @name: 多楼盘编辑页面
    @description: 多楼盘资料编辑页面
    @author: wangshuaixue
    @date: 2019-09-17
-->
<template>
    <div class="more-share-box" v-loading="isLoading" element-loading-text="拼命加载中">
        <!--中间编辑内容区-->
        <div class="edit-wrapper option">
            <div class="center-content">
                <!--客户需求-->
                <div class="edit-box" v-show="currentIndex==0">
                    <div class="edit-title">
                        <div class="step">1</div>
                        <div class="txt">第一步：请填写客户需求，编辑后将同步至客户需求及右侧的展示</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[0].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">您的购房需求</div>
                        <div class="bd house-need" v-if="userRequire">
                            <div class="desc">备注：为空或者设置为不展示的，将不在右侧展示</div>
                            <table class="table">
                                <thead class="head">
                                    <tr>
                                        <th class="title">客户需求</th>
                                        <th class="con">填写信息</th>
                                        <th class="swith">设置展示</th>
                                    </tr>
                                </thead>
                                <tbody class="body" v-if="userRequire">
                                    <tr>
                                        <td class="title">总价预算</td>
                                        <td class="con" v-if="totalPrice">
                                            <div class="min-item">
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(totalPrice.value_min, 'total_price', 'value_min')"
                                                    v-model="totalPrice.value_min"
                                                ></el-input>
                                                <span class="input-unit">万</span>
                                            </div>
                                            <div
                                                class="line"
                                                v-if="totalPrice ? totalPrice.isMore : false"
                                            ></div>
                                            <div
                                                class="max-item"
                                                v-if="totalPrice ? totalPrice.isMore : false"
                                            >
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(totalPrice.value_max, 'total_price', 'value_max')"
                                                    v-model.number="totalPrice.value_max"
                                                ></el-input>
                                                <span class="input-unit">万</span>
                                            </div>
                                            <div
                                                class="unit-operate"
                                                v-if="totalPrice"
                                                @click="changeArea(totalPrice, 'value_max')"
                                            >{{checkarea(totalPrice.isMore)}}</div>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.total_price"
                                                v-model="userRequire.total_price.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">首付预算</td>
                                        <td class="con" v-if="firstPrice">
                                            <div class="min-item">
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(firstPrice.value_min, 'first_price', 'value_min')"
                                                    v-model="firstPrice.value_min"
                                                ></el-input>
                                                <span class="input-unit">万</span>
                                            </div>
                                            <div
                                                class="line"
                                                v-if="firstPrice ? firstPrice.isMore : false"
                                            ></div>
                                            <div
                                                class="max-item"
                                                v-if="firstPrice ? firstPrice.isMore : false"
                                            >
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(firstPrice.value_max, 'first_price', 'value_max')"
                                                    v-model="firstPrice.value_max"
                                                ></el-input>
                                                <span class="input-unit">万</span>
                                            </div>
                                            <div
                                                class="unit-operate"
                                                v-if="firstPrice"
                                                @click="changeArea(firstPrice, 'value_max')"
                                            >{{checkarea(firstPrice.isMore)}}</div>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.first_price"
                                                v-model="userRequire.first_price.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">面积</td>
                                        <td class="con" v-if="acreage">
                                            <div class="min-item">
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(acreage.value_min, 'acreage', 'value_min')"
                                                    v-model="acreage.value_min"
                                                ></el-input>
                                                <span class="input-unit">平米</span>
                                            </div>
                                            <div
                                                class="line"
                                                v-if="acreage ? acreage.isMore : false"
                                            ></div>
                                            <div
                                                class="max-item"
                                                v-if="acreage ? acreage.isMore : false"
                                            >
                                                <el-input
                                                    type="text"
                                                    @input="intagerInput(acreage.value_max, 'acreage', 'value_max')"
                                                    v-model="acreage.value_max"
                                                ></el-input>
                                                <span class="input-unit">平米</span>
                                            </div>
                                            <div
                                                class="unit-operate"
                                                v-if="acreage"
                                                @click="changeArea(acreage, 'value_max')"
                                            >{{checkarea(acreage.isMore)}}</div>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.acreage"
                                                v-model="userRequire.acreage.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">业态</td>
                                        <td class="con" v-if="userRequire.project_type">
                                            <el-radio-group
                                                v-model="userRequire.project_type.value"
                                            >
                                                <el-radio
                                                    :label="projectType.value"
                                                    v-for="(projectType, index) in typeList"
                                                    :key="'projectType' + index"
                                                >{{projectType.name}}</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.project_type"
                                                v-model="userRequire.project_type.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">购房资质</td>
                                        <td class="con" v-if="userRequire.qualifications">
                                            <el-radio-group
                                                v-model="userRequire.qualifications.value"
                                            >
                                                <el-radio
                                                    :label="qualification.value"
                                                    v-for="(qualification, index) in qualificationList"
                                                    :key="'qualification-' + index"
                                                >{{qualification.name}}</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.qualifications"
                                                v-model="userRequire.qualifications.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">户型</td>
                                        <td class="con" v-if="userRequire.house_type">
                                            <el-checkbox-group
                                                v-model="userRequire.house_type.value"
                                            >
                                                <el-checkbox
                                                    :label="houseType.value"
                                                    v-for="(houseType, index) in houseTypeList"
                                                    :key="'houseType-' + index"
                                                >{{houseType.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.house_type"
                                                v-model="userRequire.house_type.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">购房目的</td>
                                        <td class="con" v-if="userRequire.purchase_purpose">
                                            <el-radio-group
                                                v-model="userRequire.purchase_purpose.value"
                                            >
                                                <el-radio
                                                    :label="purchase.value"
                                                    v-for="(purchase, index) in purchaseList"
                                                    :key="'purchase-' + index"
                                                >{{purchase.name}}</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td class="swith">
                                            <el-switch
                                                v-if="userRequire.purchase_purpose"
                                                v-model="userRequire.purchase_purpose.is_show"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33a1ff"
                                                inactive-color="#abb0b5"
                                                active-value="0"
                                                inactive-value="1"
                                            ></el-switch>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--楼盘价格-->
                <div class="edit-box" v-show="currentIndex==1">
                    <div class="edit-title">
                        <div class="step">2</div>
                        <div class="txt">第二步：请确认楼盘户型信息，并填写客户贷款信息</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[1].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content vodice-box">
                        <div class="hd">
                            楼盘语音解读
                            <span class="hint">最终将在资料包中将下列状态为展示的楼盘解读语音合为一条语音展示给客户</span>
                        </div>
                        <div class="bd">
                            <el-table
                                :header-cell-style="{background:'#F3F6F9',color:'#3E4A59',textAlign: 'center'}"
                                :data="voiceData"
                                :border="true"
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="project_name"
                                    class-name="cell-left"
                                    width="200"
                                    label="楼盘"
                                >
                                    <template slot-scope="scope">{{scope.row.project_name}}</template>
                                </el-table-column>
                                <el-table-column prop="url" label="试听">
                                    <template slot-scope="scope">
                                        <div
                                            class="audio-box"
                                            @click="playAudio(scope.row.url, scope.$index, scope.row.isPlay)"
                                        >
                                            <span
                                                :class="{'iconfont iconbofangx': !scope.row.isPlay, 'iconfont iconzantingx': scope.row.isPlay}"
                                            ></span>
                                            <span
                                                class="audio-name"
                                            >{{scope.row.url!=='' ? (scope.row.isPlay ? '点击暂停' : '点击播放') : '暂无语音'}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column width="120" label="设置展示">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-model="scope.row.voice_is_show"
                                            active-text="是"
                                            inactive-text="否"
                                            active-color="#33a1ff"
                                            inactive-color="#abb0b5"
                                            active-value="0"
                                            :disabled="scope.row.isDisabled"
                                            inactive-value="1"
                                            @change="upViocSta"
                                        ></el-switch>
                                        <el-button
                                            v-if="scope.row.traffic_type + '' === '2'"
                                            type="danger"
                                            @click="delTraffic(scope.row)"
                                        >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <audio
                                ref="audio"
                                id="audio"
                                :src="audioUrl"
                                style="width: 100%;display: none;"
                                preload
                                controls
                                muted
                            ></audio>
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">
                            概览
                            <span
                                class="change-house"
                                @click="showDialog"
                                v-if="shareId == '' || !this.shareId"
                            >
                                <i class="iconfont iconexchange"></i>修改楼盘或户型
                            </span>
                            <span
                                class="hint"
                                v-if="shareId == '' || !this.shareId"
                            >点击可以增加或删除要分享给客户的楼盘或户型</span>
                        </div>
                        <div class="bd">
                            <div class="desc">首付及月供将根据上面填写的贷款信息进行计算</div>
                            <div class="info-wrap">
                                <div class="info">
                                    <span class="th">首付比例</span>
                                    <span class="td">
                                        <el-select v-model="loanObj.payFir">
                                            <el-option
                                                v-for="item in payList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                </div>
                                <div class="info">
                                    <span class="th">贷款年限</span>
                                    <span class="td">
                                        <el-select
                                            v-model="loanObj.loanYear"
                                            :disabled="isLoanEdit"
                                        >
                                            <el-option
                                                v-for="item in loanYearList"
                                                :key="item.id"
                                                :label="item.text"
                                                :value="item.id"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                </div>
                                <div class="info">
                                    <span class="th">贷款利率</span>
                                    <span class="td">
                                        <el-input
                                            :disabled="isLoanEdit"
                                            class="sele-unit"
                                            type="text"
                                            suffix-icon="el-icon-date"
                                            v-model.trim="loanObj.loanTex"
                                            @input="loanInput(loanObj.loanTex)"
                                        ></el-input>
                                    </span>
                                </div>
                            </div>
                            <div class="house-wrap">
                                <el-table
                                    :data="houseOverView"
                                    :span-method="objectSpanMethod"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        prop="project_name"
                                        min-width="110"
                                        label="楼盘名称"
                                    >
                                        <template slot-scope="scope">
                                            <div class="house-name">{{scope.row.project_name}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="district_name" min-width="80" label="区域">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.district_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" min-width="100" label="户型面积">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.name}} {{scope.row.square_metre}}m²</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="single_price"
                                        min-width="100"
                                        label="单价 万/m²"
                                    >
                                        <template slot-scope="scope">
                                            <span>{{scope.row.single_price}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="total_price"
                                        min-width="110"
                                        label="总价/万"
                                    >
                                        <template slot-scope="scope">
                                            <span>
                                                <span v-if="scope.row.house_status=='4'">
                                                    <el-input
                                                        v-model="scope.row.total_price"
                                                        oninput="value=value.replace(/[^0-9.]/g,'')"
                                                    ></el-input>
                                                    <div>|</div>
                                                    <el-input
                                                        v-model="scope.row.total_price_max"
                                                        oninput="value=value.replace(/[^0-9.]/g,'')"
                                                    ></el-input>
                                                </span>
                                                <span v-else>
                                                    <el-input
                                                        v-model="scope.row.total_price"
                                                        oninput="value=value.replace(/[^0-9.]/g,'')"
                                                    ></el-input>
                                                </span>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="110" label="销售状态">
                                        <template slot-scope="scope">
                                            <span>
                                                <el-select
                                                    v-model="scope.row.house_status"
                                                    placeholder="状态"
                                                >
                                                    <el-option
                                                        v-for="it in salesStatus"
                                                        :key="it.value"
                                                        :label="it.name"
                                                        :value="it.value+''"
                                                    ></el-option>
                                                </el-select>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column min-width="77" label="户型图">
                                        <template slot-scope="scope">
                                            <div class="show-cont-pic">
                                                <span
                                                    class="pic-up-file"
                                                    :id="scope.row.picId"
                                                >上传户型图</span>
                                                <span
                                                    v-if="scope.row.isPic"
                                                    class="iconfont iconicon_chosen"
                                                ></span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--周边价格-->
                <div class="edit-box" v-show="currentIndex==2">
                    <div class="edit-title">
                        <div class="step">3</div>
                        <div class="txt">第三步：请确认楼盘周边的二手房及拿地价格信息</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[2].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">周边价格</div>
                        <div class="bd around-price">
                            <div class="desc">
                                <span class="th">编辑更新时间</span>
                                <span class="td">
                                    <el-date-picker
                                        v-model="updataTime"
                                        type="date"
                                        format="yyyy 年 MM 月 dd 日"
                                        placeholder="选择日期"
                                    ></el-date-picker>
                                </span>
                            </div>
                            <div class="desc">此处为展示给客户的周边数据更新时间，您可以自行配置</div>
                            <div class="house-wrap">
                                <el-table :data="rimData" style="width: 100%">
                                    <el-table-column
                                        prop="project_name"
                                        min-width="36%"
                                        label="楼盘名称"
                                    >
                                        <template slot-scope="scope">
                                            <div class="house-name">{{scope.row.project_name}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="landPrice"
                                        min-width="32%"
                                        label="最新周边地价元/m²"
                                    >
                                        <template slot-scope="scope">
                                            <span>
                                                <el-input
                                                    v-model="scope.row.landPrice"
                                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                                ></el-input>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="secondPrice"
                                        min-width="32%"
                                        label="周边二手房价格元/m²"
                                    >
                                        <template slot-scope="scope">
                                            <span>
                                                <el-input
                                                    v-model="scope.row.secondPrice"
                                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                                ></el-input>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <div slot="append" class="tail">
                                        <div class="set-show">设置展示</div>
                                        <div class="set-show">
                                            <el-switch
                                                v-model="rimObj.rimLand"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33A1FF"
                                                inactive-color="#ABB0B5"
                                            ></el-switch>
                                        </div>
                                        <div class="set-show">
                                            <el-switch
                                                v-model="rimObj.rimSecond"
                                                active-text="是"
                                                inactive-text="否"
                                                active-color="#33A1FF"
                                                inactive-color="#ABB0B5"
                                            ></el-switch>
                                        </div>
                                    </div>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--通勤路线-->
                <div class="edit-box" v-show="currentIndex==3">
                    <div class="edit-title">
                        <div class="step">4</div>
                        <div class="txt">第四步：填写目的地后，我们将在地图给客户展示路线及时间</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[3].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">
                            通勤路线
                            <el-button
                                :class="{'add-address-btn': (addressArr ? addressArr.length <= 1 : true), 'add-address-forbid': !(addressArr ? addressArr.length <= 1 : true)}"
                                @click="addEndAdr"
                                type="success"
                            >＋新增目的地</el-button>
                        </div>
                        <div class="bd commut-wrap">
                            <div class="item-box">
                                <div class="end-address-wrap">
                                    <div class="end-address-box">
                                        <div class="end-address-num">1</div>
                                        <div class="end-address-tit">目的地</div>
                                    </div>
                                    <div class="end-address-input">
                                        <el-input
                                            v-model="addressObj.address"
                                            placeholder="请输入目的地"
                                            id="searchHou"
                                            ref="commuInput"
                                            @blur="commuBlur"
                                        ></el-input>
                                    </div>
                                    <el-table
                                        v-loading="firstLoading"
                                        element-loading-text="正在加载通勤时长，请稍等"
                                        :header-cell-style="{background:'#f3f6f9',color:'#3e4a59',textAlign: 'center'}"
                                        :data="addressTableFir"
                                    >
                                        <el-table-column
                                            prop="start_address"
                                            label="起始地"
                                            min-width="100"
                                        >
                                            <template slot-scope="scope">
                                                <div
                                                    class="color-orange"
                                                >{{scope.row.start_address}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="drive_time"
                                            label="自驾通勤时长"
                                            min-width="100"
                                        >
                                            <template slot-scope="scope">
                                                <div class="scope-input-box">
                                                    <number-input
                                                        reg="number"
                                                        v-model="scope.row.drive_time"
                                                    ></number-input>
                                                    <span class="input-unit">分钟</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="公共交通通勤时长">
                                            <el-table-column
                                                prop="bus_transit_time"
                                                label="公交/地铁/火车时长"
                                                min-width="100"
                                            >
                                                <template slot="header">
                                                    <div class="header-name">公交/地铁/火车时长</div>
                                                </template>
                                                <template slot-scope="scope">
                                                    <div class="scope-input-box">
                                                        <number-input
                                                            reg="number"
                                                            v-model="scope.row.bus_transit_time"
                                                        ></number-input>
                                                        <span class="input-unit">分钟</span>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="bus_walk_time" min-width="100">
                                                <template slot="header" slot-scope="scope">
                                                    <div class="header-name">
                                                        <el-checkbox v-model="isWalkCheckFir">步行时长</el-checkbox>
                                                    </div>
                                                </template>
                                                <template slot-scope="scope">
                                                    <div class="scope-input-box">
                                                        <number-input
                                                            reg="number"
                                                            v-model="scope.row.bus_walk_time"
                                                        ></number-input>
                                                        <span class="input-unit">分钟</span>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="item-box" v-if="addressArr && addressArr.length > 1">
                                <div class="end-address-wrap">
                                    <div class="end-address-box">
                                        <div class="end-address-num">2</div>
                                        <div class="end-address-tit">目的地</div>
                                    </div>
                                    <div class="end-address-btn">
                                        <el-button
                                            class="del-address-btn"
                                            @click="delEndAdr"
                                            type="danger"
                                        >删除</el-button>
                                    </div>
                                    <div class="end-address-input">
                                        <el-input
                                            v-model="addressObjSen.address"
                                            placeholder="请输入目的地"
                                            id="searchHouSen"
                                            ref="commuInputSen"
                                            @blur="commuBlurSen"
                                        ></el-input>
                                    </div>
                                    <el-table
                                        v-loading="secondLoading"
                                        element-loading-text="正在加载通勤时长，请稍等"
                                        :header-cell-style="{background:'#f3f6f9',color:'#3e4a59',textAlign: 'center'}"
                                        :data="addressTableSec"
                                    >
                                        <el-table-column
                                            prop="start_address"
                                            label="起始地"
                                            min-width="100"
                                        >
                                            <template slot-scope="scope">
                                                <div
                                                    class="color-orange"
                                                >{{scope.row.start_address}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="drive_time"
                                            label="自驾通勤时长"
                                            min-width="100"
                                        >
                                            <template slot-scope="scope">
                                                <div class="scope-input-box">
                                                    <number-input
                                                        reg="number"
                                                        v-model="scope.row.drive_time"
                                                    ></number-input>
                                                    <span class="input-unit">分钟</span>
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column class="small-header" label="公共交通通勤时长">
                                            <el-table-column
                                                prop="bus_transit_time"
                                                label="公交/地铁/火车时长"
                                                min-width="100"
                                            >
                                                <template slot="header">
                                                    <div class="header-name">公交/地铁/火车时长</div>
                                                </template>
                                                <template slot-scope="scope">
                                                    <div class="scope-input-box">
                                                        <number-input
                                                            reg="number"
                                                            v-model="scope.row.bus_transit_time"
                                                        ></number-input>
                                                        <span class="input-unit">分钟</span>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="bus_walk_time" min-width="100">
                                                <template slot="header" slot-scope="scope">
                                                    <div class="header-name">
                                                        <el-checkbox v-model="isWalkCheckSen">步行时长</el-checkbox>
                                                    </div>
                                                </template>
                                                <template slot-scope="scope">
                                                    <div class="scope-input-box">
                                                        <number-input
                                                            reg="number"
                                                            v-model="scope.row.bus_walk_time"
                                                        ></number-input>
                                                        <span class="input-unit">分钟</span>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--周边交通-->
                <div class="edit-box" v-show="currentIndex==4">
                    <div class="edit-title">
                        <div class="step">5</div>
                        <div class="txt">第五步：请确认各楼盘周边的公交站及地铁站信息</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[4].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">
                            周边交通
                            <span class="hint">小程序中每个楼盘最多只能展示 5 条交通站点</span>
                        </div>
                        <div class="bd">
                            <div class="house-wrap circum-wrap">
                                <el-table :data="trafficData" style="width: 100%">
                                    <el-table-column
                                        prop="project_name"
                                        min-width="20%"
                                        label="楼盘名称"
                                    >
                                        <template slot-scope="scope">
                                            <div>
                                                <div class="house-name">{{scope.row.project_name}}</div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="trip" min-width="45%" label="地铁站或公交站">
                                        <template slot-scope="scope">
                                            <div>
                                                <div
                                                    class="trip-bus-type address"
                                                    v-for="(item, index) in scope.row.traffic_data"
                                                    :key="index"
                                                >
                                                    <div v-if="item.traffic_type == 1">
                                                        <span
                                                            v-if="item.traffic_category == 1"
                                                        >{{transName(item.traffic_category)}}： 距 {{item.traffic_name}} {{item.station_name}}公交站直线</span>
                                                        <!--traffic_category==2 为地铁-->
                                                        <span
                                                            v-if="item.traffic_category == 2"
                                                        >{{transName(item.traffic_category)}}： 距 {{item.traffic_name}} {{item.station_name}}站直线</span>
                                                    </div>
                                                    <div v-if="item.traffic_type == 2">
                                                        <span class="select-wrap">
                                                            <el-select
                                                                v-model="item.traffic_category"
                                                                placeholder="类型"
                                                            >
                                                                <el-option
                                                                    v-for="it in tripList"
                                                                    :key="it.type"
                                                                    :label="it.text"
                                                                    :value="it.type"
                                                                ></el-option>
                                                            </el-select>
                                                        </span>
                                                        距
                                                        <el-input
                                                            v-model="item.traffic_name"
                                                            placeholder="路线"
                                                            v-if="item.traffic_category==2"
                                                        ></el-input>
                                                        <el-input
                                                            v-model="item.station_name"
                                                            placeholder="站点"
                                                        ></el-input>直线
                                                    </div>
                                                </div>
                                                <div class="trip-bus-type addPoint newPoint">
                                                    <span
                                                        class="new-point"
                                                        @click="checkContent(scope.row)"
                                                    >
                                                        <i class="iconfont iconadded"></i>
                                                        新增站点
                                                    </span>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="traffic_data" min-width="20%" label="距离">
                                        <template slot-scope="scope">
                                            <div>
                                                <div
                                                    class="trip-bus-type"
                                                    v-for="(item, index) in scope.row.traffic_data"
                                                    :key="index"
                                                >
                                                    <el-input
                                                        v-model="item.distance"
                                                        oninput="value=value.replace(/[^0-9.]/g,'')"
                                                    ></el-input>m
                                                </div>
                                                <div class="trip-bus-type addPoint"></div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="month" min-width="15%" label="设置展示">
                                        <template slot-scope="scope">
                                            <div>
                                                <div
                                                    class="trip-bus-type"
                                                    v-for="(item, index) in scope.row.traffic_data"
                                                    :key="index"
                                                >
                                                    <!--traffic_type 1为系统 2为自定义-->
                                                    <el-switch
                                                        v-if="item.traffic_type == 1"
                                                        v-model="item.is_show"
                                                        :active-value="0"
                                                        :inactive-value="1"
                                                        active-text="是"
                                                        inactive-text="否"
                                                        active-color="#33A1FF"
                                                        inactive-color="#ABB0B5"
                                                        @change="swichChange(scope.row,item)"
                                                    ></el-switch>
                                                    <span
                                                        class="delete"
                                                        v-else
                                                        @click="delItem(scope.row.project_id, index, scope.row)"
                                                    >删除</span>
                                                </div>
                                                <div class="trip-bus-type addPoint"></div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <!--综述-->
                <div class="edit-box" v-show="currentIndex==5">
                    <div class="edit-title">
                        <div class="step">6</div>
                        <div class="txt">第六步：请对各楼盘及户型进行简要描述，并打分</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="!(swiperArr[5].isOk)"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content">
                        <div class="hd">综述</div>
                        <div class="bd summarize">
                            <div class="project-container">
                                <div
                                    class="project-wrap"
                                    v-for="(itemPro, index) in summaryArr"
                                    :key="index"
                                >
                                    <span
                                        :class="{'status finished':itemPro.project.proSta==true,'status':itemPro.project.proSta==false}"
                                    ></span>
                                    <div class="pro-title">{{itemPro.project.projectName}}</div>
                                    <div class="hint required">请填写楼盘概述（必填）</div>
                                    <div
                                        class="pro-area area-txt"
                                        :class="{'wraning': itemPro.project.summary.trim()==''}"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model.trim="itemPro.project.summary"
                                            placeholder="在这里输入对该楼盘的描述"
                                        ></el-input>
                                    </div>
                                    <div class="rate-temp">
                                        <div class="info-each">
                                            <span class="th hou-name">咨询师点评模板：</span>
                                            <span
                                                class="see-more"
                                                @click="seeDetail(itemPro.project.reviewUrl)"
                                            >查看更多></span>
                                        </div>
                                        <div class="tmp-wrap">
                                            <div
                                                class="temp-card"
                                                v-for="(opt, index) in itemPro.project.projectReviewArr"
                                                :key="index"
                                            >
                                                <div class="name">
                                                    咨询师-{{opt.employee_name}}
                                                    <span
                                                        class="licks"
                                                    >{{opt.like_show}}个赞</span>
                                                </div>
                                                <div class="txt-con">
                                                    <div class="txt">{{opt.review}}</div>
                                                </div>
                                                <div
                                                    class="copy-btn shadow-box"
                                                    v-clipboard:copy="opt.review"
                                                    v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError"
                                                >一键复制</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hint">请至少填写一个户型的介绍</div>
                                    <ul class="house-info-wrap">
                                        <li
                                            class="house-box"
                                            v-for="(houseOne, ind) in itemPro.house"
                                            :key="ind"
                                        >
                                            <div class="info top">
                                                <span class="item">
                                                    <span class="name">{{houseOne.houseName}}</span>
                                                    {{houseOne.squareMetre}}m²
                                                </span>
                                                <span
                                                    class="item"
                                                    :class="{'wraning': houseOne.star==''}"
                                                >
                                                    <span class="th">推荐星级：</span>
                                                    <span class="td">
                                                        <el-rate
                                                            v-model="houseOne.star"
                                                            :allow-half="true"
                                                            :colors="['#FF5C47', '#FF5C47', '#FF5C47']"
                                                            @change="compModleState"
                                                        ></el-rate>
                                                    </span>
                                                </span>
                                                <span
                                                    :class="{'tag-desc': houseOne.state == false,'tag-desc success': houseOne.state == true}"
                                                >{{houseOne.state==true?'已完成':'未完成'}}</span>
                                            </div>
                                            <div
                                                class="info"
                                                :class="{'wraning': (houseOne.summary ? houseOne.summary.trim()=='' : true)}"
                                            >
                                                <div class="area-txt">
                                                    <el-input
                                                        type="textarea"
                                                        v-model.trim="houseOne.summary"
                                                        placeholder="参考描述：1. 户型方正，空间利用率高 2. 复式空间，宽敞舒适 3. 功能分区明确，起居休息互不打扰"
                                                        @input="compModleState"
                                                    ></el-input>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--个人资料-->
                <div class="edit-box" v-show="currentIndex==6">
                    <div class="edit-title" v-if="lastModuleBox">
                        <div class="step">7</div>
                        <div class="txt">第七步：请确认并编辑需要展示给客户的个人资料</div>
                        <div class="header-step-status">
                            <div class="header-line"></div>
                            <img
                                src="../../../static/images/sreachTool/step_unSuccess.png"
                                v-if="swiperArr.length>6 ? !(swiperArr[6].isOk) : false"
                            />
                            <img src="../../../static/images/sreachTool/step_success.png" v-else />
                        </div>
                    </div>
                    <div class="edit-content" v-if="lastModuleBox">
                        <div class="bd user-info-box">
                            <div class="center-body-right">
                                <div class="body-bd-box">
                                    <div class="body-bd-box-hd">微信二维码</div>
                                    <div class="body-bd-box-bd">
                                        <div class="code-img-box">
                                            <img
                                                :src="employeeInfo.wx_qrcode ? signs.host + '' + employeeInfo.wx_qrcode : qaCodeDefault"
                                            />
                                        </div>
                                        <div id="uploadCode" class="code-btn">上传或替换</div>
                                    </div>
                                </div>
                            </div>
                            <div class="center-body-left">
                                <div class="body-hd">咨询师标签</div>
                                <div class="body-bd">
                                    <div class="tag-info-box">
                                        <div class="add-input">
                                            <el-button plain @click="addEmTag">+ 添加</el-button>
                                            <div class="add-label">
                                                <el-input
                                                    v-model="cusTagInput"
                                                    placeholder="或输入你想自定义的标签，然后点击添加"
                                                ></el-input>
                                            </div>
                                        </div>
                                        <ul class="custom-box">
                                            <li
                                                v-for="(emTag, emTagIndex) in employeeInfo.tag"
                                                :key="'emTagIndex-' + emTagIndex"
                                            >
                                                <div class="custom-item">
                                                    <span class="custom-item-name">{{emTag}}</span>
                                                    <span
                                                        class="iconfont iconicon_guanbi"
                                                        @click="deleteCusLabel(emTagIndex, emTag)"
                                                    ></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="center-body-cont">
                                <div class="body-hd body-bd-inner-hd">我的买房问答</div>
                                <div class="body-bd">
                                    <div class="body-qa-box">
                                        <el-scrollbar>
                                            <div class="body-qa-header">
                                                <div class="qa-header-search">
                                                    <div
                                                        class="search-th"
                                                        v-if="defaultQaNum ? defaultQaNum>1 : false"
                                                    >请选择两个要展示在个人页面的问答：</div>
                                                    <div
                                                        class="search-th"
                                                        v-else-if="defaultQaNum ? defaultQaNum==1 : false"
                                                    >您只有一个问答：</div>
                                                    <div class="search-th" v-else>您当前无问答，此模块无需选择：</div>
                                                    <div class="search-chosen">
                                                        已选择
                                                        <span>{{qaSelectedList ? qaSelectedList.length : 0}}</span> 个
                                                    </div>
                                                    <div class="search-td">
                                                        <div
                                                            class="search-td-btn"
                                                            @click="searchQa"
                                                        >搜索</div>
                                                        <div class="search-input-box">
                                                            <el-input
                                                                v-model="houseNameInput"
                                                                placeholder="输入问题进行搜索"
                                                                :clearable="true"
                                                                @clear="clearInput"
                                                            ></el-input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="qa-header-default">
                                                    <ul class="header-default-box">
                                                        <li
                                                            :class="{'chosen-item': qaSele.selected == 0}"
                                                            v-for="(qaSele, index) in qaListSele"
                                                            :key="'qaSele-' + index"
                                                        >
                                                            <el-popover
                                                                placement="top"
                                                                popper-class="popper-custom"
                                                                width="260"
                                                                trigger="hover"
                                                            >
                                                                <div v-html="qaSele.answer"></div>
                                                                <div
                                                                    class="default-item"
                                                                    slot="reference"
                                                                    @click="choseItem(qaSele)"
                                                                >
                                                                    <div class="item-line">
                                                                        <span
                                                                            class="iconfont iconsuccess_all"
                                                                        ></span>
                                                                    </div>
                                                                    <div class="item-info-cont">
                                                                        <p
                                                                            class="info-cont-title"
                                                                        >{{qaSele.question}}</p>
                                                                        <p class="info-cont-tip">
                                                                            <span
                                                                                class="tip-left"
                                                                            >ID：{{qaSele.order_id}}</span>
                                                                            <span
                                                                                class="tip-right"
                                                                            >{{qaSele.questioner_nickname}}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </el-popover>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="body-qa-main">
                                                <div class="qa-main-cont">
                                                    <ul class="header-default-box">
                                                        <li
                                                            :class="{'chosen-item': qa.selected == 0}"
                                                            v-for="(qa, index) in qaList"
                                                            :key="'qa' + index"
                                                        >
                                                            <el-popover
                                                                placement="top"
                                                                popper-class="popper-custom"
                                                                width="260"
                                                                trigger="hover"
                                                            >
                                                                <div v-html="qa.answer"></div>
                                                                <div
                                                                    class="default-item"
                                                                    slot="reference"
                                                                    @click="choseItem(qa)"
                                                                >
                                                                    <div class="item-line">
                                                                        <span
                                                                            class="iconfont iconsuccess_all"
                                                                        ></span>
                                                                    </div>
                                                                    <div class="item-info-cont">
                                                                        <p
                                                                            class="info-cont-title"
                                                                        >{{qa.question}}</p>
                                                                        <p class="info-cont-tip">
                                                                            <span
                                                                                class="tip-left"
                                                                            >ID：{{qa.order_id}}</span>
                                                                            <span
                                                                                class="tip-right"
                                                                            >{{qa.questioner_nickname}}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </el-popover>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </el-scrollbar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--上一步下一步按钮-->
            <div class="step-btn-area">
                <div class="step-area">
                    <span
                        :class="{'step-btn unactive': currentIndex === 0, 'step-btn': !(currentIndex === 0)}"
                        @click="stepToStep(0)"
                    >{{btnObj.preBtn}}</span>
                    <span
                        :class="{'step-btn unactive': (currentIndex === this.swiperArr.length-1 && !shareBtn), 'step-btn': !(currentIndex === this.swiperArr.length-1 && !shareBtn)}"
                        @click="stepToStep(1)"
                    >{{btnObj.nextBtn}}</span>
                </div>
            </div>
        </div>
        <!--左侧步骤条-->
        <div class="left-wrapper option">
            <div class="left-title">编辑目录</div>
            <div class="scrollWrap swiper-class" ref="scrollWrap">
                <div class="shop_box" ref="shopBox">
                    <ul class="content" ref="scrollUl">
                        <!--状态：左侧未完成和未完成，右侧未是否选中-->
                        <li
                            v-for="(menu, index) in swiperArr"
                            ref="menuList"
                            :key="index"
                            :class="{'active':menu.isOk}"
                            @click="selectContent(index, menu)"
                        >
                            <img
                                class="step-ok"
                                src="../../../static/images/sreachTool/icon_step_ok.png"
                                v-if="menu.isOk"
                            />
                            <div
                                :class="{'step-cont step-cont-active': currentIndex===index, 'step-cont': currentIndex !== index}"
                            >
                                <div
                                    :class="{'step-box step-box-active': currentIndex===index, 'step-box': currentIndex !== index}"
                                >
                                    {{menu.name}}
                                    <span class="step-require" v-if="menu.isRequired">*</span>
                                </div>
                            </div>
                        </li>
                        <li class="last-li"></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--分享结果页-->
        <div class="share-success-box" v-if="shareFlag">
            <div class="center-header">
                <div class="header-step">
                    <span class="iconfont iconsuccess_all"></span>
                </div>
                <div class="header-step-dis">您已完成编辑，可在右侧区域预览您的编辑效果</div>
                <div class="header-step-status">
                    <div class="header-line"></div>
                    <img src="../../../static/images/sreachTool/step_unSuccess.png" />
                </div>
            </div>
            <div class="share-body">
                <div class="share-method-box">
                    <div class="share-box-hd">
                        <h3>选择分享方式</h3>
                    </div>
                    <div class="share-box-bd">
                        <div class="share-method">
                            <el-radio v-model="shareMethod" label="1">短信分享</el-radio>
                            <el-radio v-model="shareMethod" label="2">微信分享</el-radio>
                        </div>
                        <div class="wx-message-method-box" v-if="shareMethod === '1'">
                            <div class="wx-message">
                                资料将通过短信发送给：
                                <span class="bind-wx-name">{{userMobile}}</span>
                            </div>
                            <div class="wx-message">
                                <div class="th">添加发送手机号：</div>
                                <div class="td">
                                    <el-input
                                        v-model="phoneInput"
                                        maxlength="12"
                                        placeholder
                                    ></el-input>
                                </div>
                            </div>
                            <div class="method-tip">
                                <i class="iconfont iconupload_fail"></i>注释：微信分享的小程序，客户的打开率高50倍哟~
                            </div>
                        </div>
                        <div class="wx-message-method-box" v-else>
                            <div
                                class="wx-message"
                                v-if="userWechat ? userWechat.length > 0 : false"
                            >
                                该订单绑定的微信名称为：
                                <span>{{userWechat.join('、')}}</span>
                                <span
                                    class="bind-wx"
                                    v-if="userWechat.length < 5"
                                    @click="bindWx"
                                >点击绑定微信</span>
                            </div>
                            <div class="wx-message" v-else>
                                该订单暂未绑定微信
                                <span class="bind-wx" @click="bindWx">点击绑定微信</span>
                            </div>
                            <div class="method-tip">
                                <i class="iconfont iconupload_fail"></i>请将资料通过微信发送给绑定客户，即可完成发送资料的任务
                            </div>
                        </div>
                    </div>
                </div>
                <div class="share-code-box" v-if="shareMethod === '2'">
                    <img :src="codeUrl" />
                </div>
            </div>
            <div class="share-btn-area">
                <el-button class="update-btn" type="primary" @click="updateShare">再次编辑</el-button>
                <el-button
                    class="send-immediately"
                    type="primary"
                    @click="phoneSend"
                    v-if="shareMethod === '1'"
                >立即发送</el-button>
                <el-button
                    class="send-article"
                    @click="phoneSend(1)"
                    type="primary"
                    v-if="articleFlag == 'true' && shareMethod === '1'"
                >提交并发送购房知识</el-button>
                <el-button
                class="send-article"
                @click="submitArticle"
                type="primary"
                v-if="articleFlag == 'true' && shareMethod !== '1'">提交并发送购房知识</el-button>
            </div>
        </div>
        <!--右侧预览区-->
        <div class="preview-wrapper option right-box-pre">
            <div class="preview-inner">
                <div class="fixed-header">
                    <div class="share-header-box">
                        <span class="mini-preview">小程序预览</span>
                        实时展示左侧的编辑信息
                        <span
                            class="share"
                            :class="{'disable-btn':!shareBtn || !isReq}"
                            @click="moreShare"
                        >分享</span>
                    </div>
                    <div class="user-info-box">
                        <div class="user-info-pic">
                            <img :src="employeeInfo.avatar" />
                            <img class="pic-icon" src="../../../static/images/sreachTool/pic_v.png" />
                        </div>
                        <div class="user-info-op">
                            <span class="iconfont iconphone_icon"></span>
                            <span class="iconfont iconqa_code"></span>
                            <span class="iconfont iconshare_icon"></span>
                        </div>
                        <div class="user-info-cont">
                            <p
                                class="user-info-name"
                            >{{employeeInfo.id!='' ? employeeInfo.employee_name : ''}}</p>
                            <p class="user-info-phone">{{employeeInfo.mobile}}</p>
                        </div>
                    </div>
                </div>
                <div class="preview-content">
                    <!--需求-->
                    <div id="0" ref="menuList">
                        <div
                            class="scroll-box module-box need-box"
                            :class="{'curren-scroll-box': (currentIndex == 0 && !shareFlag)}"
                        >
                            <div class="has-bg">
                                <div class="hd">您的购房需求</div>
                                <div class="bd user-need">
                                    <ul class="tag-wrap">
                                        <li
                                            v-if="totalPrice.is_show == 0 && ((totalPrice.value_min !== '' && totalPrice.value_min !== null) || (totalPrice.value_max !== '' && totalPrice.value_max !== null))"
                                        >
                                            <div class="tag-desc">
                                                总价{{totalPrice.value_min}}
                                                <span
                                                    v-if="(totalPrice.value_min !== '' && totalPrice.value_min !== null) && (totalPrice.value_max !== '' && totalPrice.value_max !== null)"
                                                >-</span>
                                                {{totalPrice.value_max}}万
                                            </div>
                                        </li>
                                        <li
                                            v-if="firstPrice.is_show == 0 && ((firstPrice.value_min !== '' && firstPrice.value_min !== null) || (firstPrice.value_max !== '' && firstPrice.value_max !== null))"
                                        >
                                            <div class="tag-desc">
                                                首付{{firstPrice.value_min}}
                                                <span
                                                    v-if="(firstPrice.value_min !== '' && firstPrice.value_min !== null) && (firstPrice.value_max !== '' && firstPrice.value_max !== null)"
                                                >-</span>
                                                {{firstPrice.value_max}}万
                                            </div>
                                        </li>
                                        <li
                                            v-if="acreage.is_show == 0 && ((acreage.value_min !== '' && acreage.value_min !== null) || (acreage.value_max !== '' && acreage.value_max !== null))"
                                        >
                                            <div class="tag-desc">
                                                {{acreage.value_min}}
                                                <span
                                                    v-if="(acreage.value_min !== '' && acreage.value_min !== null) && (acreage.value_max !== '' && acreage.value_max !== null)"
                                                >-</span>
                                                {{acreage.value_max}}㎡
                                            </div>
                                        </li>
                                        <li
                                            v-if="userRequire.project_type ? userRequire.project_type.is_show == 0 : false"
                                        >
                                            <div class="tag-desc" v-if="typeName">{{typeName}}</div>
                                        </li>
                                        <li
                                            v-if="userRequire.qualifications ? userRequire.qualifications.is_show == 0 : false"
                                        >
                                            <div class="tag-desc" v-if="buyQualifi">{{buyQualifi}}</div>
                                        </li>
                                        <li
                                            v-if="userRequire.house_type ? userRequire.house_type.is_show == 0 : false"
                                        >
                                            <div
                                                class="tag-desc"
                                                v-for="(doorItem, index) in doorType"
                                                :key="'doorItem-' + index"
                                            >{{doorItem}}</div>
                                        </li>
                                        <li
                                            v-if="userRequire.purchase_purpose ? userRequire.purchase_purpose.is_show == 0 : false"
                                        >
                                            <div
                                                class="tag-desc"
                                                v-if="purchasePurpose"
                                            >{{purchasePurpose}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="client-desc right-body-title">
                                <span class="desc-info">
                                    {{userInfo.user_realname ? userInfo.user_realname : '您好'}}，根据您的需求，给您推荐
                                    <span
                                        v-for="(item, index) in houseAddress"
                                        :key="index"
                                    >{{item.district_name}}区的【{{item.project_name}}】、</span>
                                    这{{transNum(houseAddress.length)}}个楼盘：
                                </span>
                            </div>
                        </div>
                    </div>
                    <!--概览-->
                    <div id="1" ref="menuList">
                        <div
                            class="scroll-box module-box house-tab img-con"
                            :class="{'curren-scroll-box': (currentIndex == 1 && !shareFlag)}"
                        >
                            <div class="cur-read" v-if="isShowVioc">
                                <span class="desc-info-th">咨询师解读：</span>
                                <span class="desc-info">
                                    <img src="../../../static/images/sreachTool/audio_pic.png" />
                                </span>
                                <div class="sha-box"></div>
                            </div>
                            <div class="overview-wrap">
                                <div class="hd">楼盘概述</div>
                                <div class="bd overview">
                                    <div class="desc-info">
                                        首付{{loanObj.payFir}}%
                                        <span
                                            v-if="!isLoanEdit"
                                        >贷款{{loanObj.loanYear}}年</span>
                                        <span v-if="!isLoanEdit">年贷款利率{{loanObj.loanTex}}%</span>：
                                    </div>
                                    <el-table
                                        :row-class-name="rowTable"
                                        ref="tagwrap"
                                        border
                                        :data="houseOverView"
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            min-width="81"
                                            fixed
                                            prop="project_name"
                                            label="楼盘名称"
                                        >
                                            <template slot-scope="scope">
                                                <div class="house-name">{{scope.row.project_name}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            min-width="54"
                                            fixed
                                            prop="district_name"
                                            label="区域"
                                        >
                                            <template slot-scope="scope">
                                                <div>{{scope.row.district_name}}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            fixed
                                            label="户型面积"
                                            min-width="76"
                                        >
                                            <template slot-scope="scope">
                                                <span>{{scope.row.name}}</span>
                                                <div>{{scope.row.square_metre}}m²</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="single_price"
                                            label="单价万/m²"
                                            min-width="65"
                                        >
                                            <template slot-scope="scope">
                                                <span>{{scope.row.single_price}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column min-width="60" label="首付万">
                                            <template slot-scope="scope">
                                                <span>
                                                    <!--计算首付 总价*首付百分比 -->
                                                    {{comOnePoint(parseFloat(scope.row.total_price*parseInt(loanObj.payFir)/parseInt(100)))}}{{scope.row.total_price_max!=scope.row.total_price && scope.row.house_status==4 ? '-'+comOnePoint(parseFloat(scope.row.total_price_max*parseInt(loanObj.payFir)/parseInt(100))) : ''}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            v-if="!isLoanEdit"
                                            prop="month"
                                            min-width="70"
                                            label="月供元"
                                        >
                                            <template slot-scope="scope">
                                                <span>
                                                    <!--计算月供  参数 总价 首付-->
                                                    {{compMonth(parseFloat(scope.row.total_price), parseFloat(scope.row.total_price_max), parseFloat(scope.row.total_price)*(parseFloat(loanObj.payFir)/100).toFixed(1),parseFloat(loanObj.loanYear), scope.row.house_status)}}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="total_price"
                                            min-width="60"
                                            label="总价万"
                                        >
                                            <template slot-scope="scope">
                                                <span>
                                                    <span
                                                        v-if="scope.row.house_status==4 && scope.row.total_price!=scope.row.total_price_max"
                                                    >{{scope.row.total_price}} - {{scope.row.total_price_max}}</span>
                                                    <span v-else>{{scope.row.total_price}}</span>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="house_status"
                                            min-width="60"
                                            label="销售状态"
                                        >
                                            <template slot-scope="scope">
                                                <span
                                                    :class="{'no-sall':scope.row.house_status==4,'sall-out':scope.row.house_status==3,'sall-ing':scope.row.house_status==2}"
                                                >{{choseStatu(scope.row.house_status)}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="annotation">注：楼盘价格仅供参考，具体价格以售楼处为准</div>
                                </div>
                            </div>
                            <div class="hd house-title">
                                <span class="name">户型图：</span>
                            </div>
                            <div class="swiper-cont">
                                <div class="swiper-container">
                                    <swiper
                                        :options="swiperOption"
                                        ref="mySwiper"
                                        v-if="houseOverView.length>0"
                                    >
                                        <swiper-slide
                                            class="describe-banner"
                                            v-for="(img, imgIndex) in houseOverView"
                                            :key="'img-' + imgIndex"
                                        >
                                            <div class="swiper-card">
                                                <div class="card-pic">
                                                    <img :src="showImg(img.apartment_pic)" />
                                                </div>
                                                <div class="house-desc">
                                                    <span
                                                        class="pro"
                                                    >{{img.project_name}} {{img.name}} {{img.square_metre}}m²</span>
                                                </div>
                                            </div>
                                        </swiper-slide>
                                        <swiper-slide
                                            class="describe-banner"
                                            v-if="houseOverView.length === 0"
                                        >
                                            <div class="swiper-card">
                                                <div class="card-pic">
                                                    <img
                                                        src="../../../static/images/sreachTool/door_take.png"
                                                    />
                                                </div>
                                            </div>
                                        </swiper-slide>
                                    </swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--周边价格-->
                    <div id="2" ref="menuList">
                        <div
                            class="scroll-box module-box house-tab rim-tab"
                            :class="{'curren-scroll-box': (currentIndex == 2 && !shareFlag)}"
                        >
                            <div class="hd">
                                周边价格
                                <div class="up-time">更新时间：{{matchDate}}</div>
                            </div>
                            <div class="bd">
                                <el-table
                                    v-if="rimObj.rimLand==true || rimObj.rimSecond==true"
                                    :data="rimData"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        prop="project_name"
                                        min-width="70"
                                        label="楼盘名称"
                                    >
                                        <template slot-scope="scope">
                                            <div class="house-name">{{scope.row.project_name}}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        v-if="rimObj.rimLand==true"
                                        prop="landPrice"
                                        min-width="55"
                                        label="最新周边地价元/m²"
                                    ></el-table-column>
                                    <el-table-column
                                        v-if="rimObj.rimSecond==true"
                                        prop="secondPrice"
                                        min-width="60"
                                        label="周边二手房价格元/m²"
                                    ></el-table-column>
                                </el-table>
                                <div class="hint-txt" v-else>您当前尚未设置展示价格，当前楼盘的周边价格模块将不会展示</div>
                            </div>
                        </div>
                    </div>
                    <!--通勤路线-->
                    <div id="3" ref="menuList">
                        <div
                            class="scroll-box module-box"
                            :class="{'curren-scroll-box': (currentIndex === 3 && !shareFlag)}"
                        >
                            <div class="hd">
                                通勤路线
                                <div class="map-detail">点击地图可查看详情</div>
                            </div>
                            <div class="bd commut-path">
                                <div class="tab-map-box">
                                    <div class="tab-map-item" @click="changeWay('drive')">
                                        <div class="item-pic">
                                            <img
                                                v-if="currenMap != 'drive'"
                                                src="../../../static/images/sreachTool/icon_commu.png"
                                            />
                                            <img
                                                v-if="currenMap == 'drive'"
                                                src="../../../static/images/sreachTool/icon_commu_active.png"
                                            />
                                        </div>
                                        <p
                                            :class="{'item-tit item-tit-active': currenMap == 'drive', 'item-tit': currenMap != 'drive'}"
                                        >自驾</p>
                                    </div>
                                    <div class="tab-map-item" @click="changeWay('car')">
                                        <div class="item-pic">
                                            <img
                                                v-if="currenMap != 'car'"
                                                src="../../../static/images/sreachTool/transit_icon_default.png"
                                            />
                                            <img
                                                v-if="currenMap == 'car'"
                                                src="../../../static/images/sreachTool/transit_icon_active.png"
                                            />
                                        </div>
                                        <p
                                            :class="{'item-tit item-tit-active': currenMap == 'car', 'item-tit': currenMap != 'car'}"
                                        >公交</p>
                                    </div>
                                </div>
                                <div class="tab-menu">
                                    <div
                                        class="map-box"
                                        id="previewMap"
                                        :class="{'dispear-box': !firAddress}"
                                    ></div>
                                    <div
                                        class="map-box"
                                        id="previewMapSec"
                                        :class="{'dispear-box': firAddress}"
                                    ></div>
                                    <div class="trip-tab" v-show="firAddress">
                                        <div class="tab-wrap">
                                            <span
                                                :class="currAddress==0 ? 'active tab-name':'tab-name'"
                                                @click="changeAddress(0)"
                                            >{{addressObj.address ? addressObj.address : '?'}}</span>
                                            <span
                                                v-if="addressArr && addressArr.length > 1"
                                                :class="currAddress==1 ? 'active tab-name right-tab':'tab-name'"
                                                @click="changeAddress(1)"
                                            >{{addressObjSen.address? addressObjSen.address : '?'}}</span>
                                        </div>
                                        <div class="trip-wrap">
                                            <!--0 为自驾-->
                                            <ul
                                                class="lines"
                                                v-if="currenMap == 'drive' && addressTableFir.length>0"
                                            >
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">自驾：</span>
                                                        <span class="time-wrap">
                                                            <span
                                                                class="time"
                                                            >{{ addressTableFir[index] ? ((addressTableFir[index].drive_time && addressObj.address && setCommuFlag) ? addressTableFir[index].drive_time : '') : ''}} 分钟</span>左右
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} > {{(addressObj.address && setCommuFlag) ? addressObj.address : ''}}</span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                            <ul
                                                class="lines"
                                                v-else-if="currenMap == 'car' && addressTableFir.length>0"
                                            >
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">公交/地铁：</span>
                                                        <span class="time-wrap">
                                                            <span v-if="isWalkCheckFir">
                                                                <span
                                                                    class="time"
                                                                >{{(addressTableFir[index] && addressObj.address && setCommuFlag) ? (parseInt(addressTableFir[index].bus_transit_time ? addressTableFir[index].bus_transit_time : 0) + parseInt(addressTableFir[index].bus_walk_time ? addressTableFir[index].bus_walk_time : 0)) : ''}} 分钟</span>左右
                                                            </span>
                                                            <span v-else>
                                                                <span
                                                                    class="time"
                                                                >{{(addressTableFir[index] && addressObj.address && setCommuFlag && addressTableFir[index].bus_transit_time) ? parseInt(addressTableFir[index].bus_transit_time) : ''}} 分钟</span>左右
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} > {{(addressObj.address && setCommuFlag) ? addressObj.address : ''}}</span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>

                                            <ul class="lines" v-else-if="currenMap == 'drive'">
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">自驾：</span>
                                                        <span class="time-wrap">
                                                            <span class="time"></span>分钟
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} ></span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                            <ul class="lines" v-else-if="currenMap == 'car'">
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">公交/地铁：</span>
                                                        <span class="time-wrap">
                                                            <span class="time"></span>分钟
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} ></span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="trip-tab" v-show="!firAddress">
                                        <div class="tab-wrap">
                                            <span
                                                :class="currAddress==0 ? 'active tab-name':'tab-name'"
                                                @click="changeAddress(0)"
                                            >{{addressObj.address ?addressObj.address : '?'}}</span>
                                            <span
                                                v-if="addressArr && addressArr.length > 1"
                                                :class="currAddress==1 ? 'active tab-name right-tab':'tab-name'"
                                                @click="changeAddress(1)"
                                            >{{addressObjSen.address ? addressObjSen.address : '?'}}</span>
                                        </div>
                                        <div class="trip-wrap">
                                            <!--0 为自驾-->
                                            <ul
                                                class="lines"
                                                v-if="currenMap == 'drive' && addressTableSec.length>0"
                                            >
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">自驾：</span>
                                                        <span class="time-wrap">
                                                            <span
                                                                class="time"
                                                            >{{ addressTableSec[index] ? ((addressTableSec[index].drive_time && addressObjSen.address && setCommuFlagSen) ? addressTableSec[index].drive_time : '') : ''}} 分钟</span>左右
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} > {{(addressObjSen.address && setCommuFlagSen) ? addressObjSen.address : ''}}</span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                            <ul
                                                class="lines"
                                                v-else-if="currenMap == 'car' && addressTableSec.length>0"
                                            >
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">公交/地铁：</span>
                                                        <span class="time-wrap">
                                                            <span v-if="isWalkCheckSen">
                                                                <span
                                                                    class="time"
                                                                >{{(addressTableSec[index] && addressObjSen.address && setCommuFlagSen) ? (parseInt(addressTableSec[index].bus_transit_time ? addressTableSec[index].bus_transit_time : 0) + parseInt(addressTableSec[index].bus_walk_time ? addressTableSec[index].bus_walk_time : 0)) : ''}} 分钟</span>左右
                                                            </span>
                                                            <span v-else>
                                                                <span
                                                                    class="time"
                                                                >{{(addressTableSec[index] && addressObjSen.address && setCommuFlagSen && addressTableSec[index].bus_transit_time) ? parseInt(addressTableSec[index].bus_transit_time) : ''}} 分钟</span>左右
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} > {{(addressObjSen.address && setCommuFlagSen) ? addressObjSen.address : ''}}</span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>

                                            <ul class="lines" v-else-if="currenMap == 'drive'">
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">自驾：</span>
                                                        <span class="time-wrap">
                                                            <span class="time"></span>分钟
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} ></span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                            <ul class="lines" v-else-if="currenMap == 'car'">
                                                <li
                                                    :class="'box box'+index"
                                                    v-for="(house,index) in houseAddressArr"
                                                    :key="index"
                                                >
                                                    <div class="item">
                                                        <span class="name">公交/地铁：</span>
                                                        <span class="time-wrap">
                                                            <span class="time"></span>分钟
                                                        </span>
                                                    </div>
                                                    <div class="item">
                                                        <span class="name address">地址：</span>
                                                        <span
                                                            class="time-wrap"
                                                        >{{house.project_name}} ></span>
                                                    </div>
                                                    <span class="comu-line"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--周边交通-->
                    <div id="4" ref="menuList">
                        <div
                            class="scroll-box module-box house-tab around-trr"
                            :class="{'curren-scroll-box': (currentIndex === 4 && !shareFlag)}"
                        >
                            <div class="hd">周边交通</div>
                            <div class="bd traffic-wrap" v-if="trafficNum>0">
                                <el-table :data="trafficDataRig" style="width: 100%">
                                    <el-table-column width="80" label="楼盘名称">
                                        <template
                                            slot-scope="scope"
                                            v-if="scope.row.traffic_data.length>0"
                                        >
                                            <span
                                                :class="scope.row.isShowPro==false ? 'house-name dont-show' : 'house-name'"
                                            >{{scope.row.project_name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="traffic_data" label="地铁站或公交站">
                                        <template
                                            slot-scope="scope"
                                            v-if="scope.row.traffic_data.length>0"
                                        >
                                            <!--<div class="trip-line" v-for="(item, index) in scope.row.traffic_data" :key="index" > v-if="item.is_show==0" -->
                                            <div
                                                class="trip-line"
                                                v-for="(item, index) in scope.row.traffic_data"
                                                :key="index"
                                            >
                                                <span v-if="item.is_show==0">
                                                    <span v-if="item.traffic_type==2">
                                                        <!--公交-->
                                                        <span v-if="item.traffic_category == 1">
                                                            <span
                                                                class="trip-type"
                                                            >{{transName(item.traffic_category)}}站：</span>
                                                            <span
                                                                class="trip-way"
                                                            >距{{item.traffic_name}}{{item.station_name}}公交站直线{{item.distance}}米</span>
                                                        </span>
                                                        <!--地铁-->
                                                        <span v-if="item.traffic_category == 2">
                                                            <span
                                                                class="trip-type"
                                                            >{{transName(item.traffic_category)}}站：</span>
                                                            <span
                                                                class="trip-way"
                                                            >距{{item.traffic_name}}地铁站{{item.station_name}}站直线{{item.distance}}米</span>
                                                        </span>
                                                    </span>
                                                    <span v-else>
                                                        <!--公交-->
                                                        <span v-if="item.traffic_category == 1">
                                                            <span
                                                                class="trip-type"
                                                            >{{transName(item.traffic_category)}}站：</span>
                                                            <span
                                                                class="trip-way"
                                                            >距{{item.traffic_name}}{{item.station_name}}公交站直线{{item.distance}}米</span>
                                                        </span>
                                                        <!--地铁-->
                                                        <span v-if="item.traffic_category == 2">
                                                            <span
                                                                class="trip-type"
                                                            >{{transName(item.traffic_category)}}站：</span>
                                                            <span
                                                                class="trip-way"
                                                            >距{{item.traffic_name}}地铁站{{item.station_name}}站直线{{item.distance}}米</span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!--综述-->
                    <div id="5" ref="menuList">
                        <div
                            class="scroll-box module-box"
                            :class="{'curren-scroll-box': (currentIndex === 5 && !shareFlag)}"
                        >
                            <div class="hd">综述</div>
                            <div class="bd sum-up">
                                <div
                                    class="single-house"
                                    v-for="(item, index) in summaryArr"
                                    :key="index"
                                >
                                    <div class="project-name">{{item.project.projectName}}</div>
                                    <div class="project-desc">{{item.project.summary}}</div>
                                    <div
                                        class="item-house"
                                        v-for="(itemHou, index) in item.house"
                                        :key="index"
                                    >
                                        <div>
                                            <span class="house-name">{{itemHou.houseName}}</span>
                                            <span class="area">{{itemHou.squareMetre}}平</span>
                                        </div>
                                        <div class="rate">
                                            <span class="name">推荐星级：</span>
                                            <span class="content">
                                                <el-rate
                                                    v-model="itemHou.star"
                                                    disabled
                                                    text-color="#FFCF2B"
                                                ></el-rate>
                                            </span>
                                        </div>
                                        <div
                                            class="evaluate"
                                            v-if="itemHou.summary!=''"
                                        >{{itemHou.summary}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--个人资料-->
                    <div id="6" ref="menuList" v-if="lastModuleBox">
                        <div
                            class="scroll-box module-box counse-container"
                            :class="{'curren-scroll-box': (currentIndex === 6 && !shareFlag)}"
                        >
                            <div class="bd">
                                <div class="counselor-box">
                                    <div class="img-warp">
                                        <img
                                            class="shadow"
                                            src="../../../static/images/sreachTool/cur-shadow.png"
                                        />
                                        <img :src="employeeInfo.avatar" />
                                        <div class="desc">
                                            <div class="left">
                                                <div
                                                    class="coun-name"
                                                >{{employeeInfo.employee_name}}</div>
                                                <div
                                                    class="graduation-school"
                                                >毕业于{{employeeInfo.academy}}</div>
                                            </div>
                                            <div class="right">戳我咨询</div>
                                        </div>
                                    </div>
                                    <ul class="serve">
                                        <li>
                                            <div class="num">
                                                {{employeeInfo.see_num}}
                                                <span>次</span>
                                            </div>
                                            <div class="text">免费带看</div>
                                        </li>
                                        <span class="line"></span>
                                        <li>
                                            <div class="num">
                                                {{employeeInfo.order_num}}
                                                <span>人</span>
                                            </div>
                                            <div class="text">服务客户</div>
                                        </li>
                                        <span class="line"></span>
                                        <li>
                                            <div class="num good" v-if="employeeInfo.high_rate">
                                                {{(employeeInfo.high_rate+'').split('%')[0]}}
                                                <span>%</span>
                                            </div>
                                            <div class="text">客户满意度</div>
                                        </li>
                                    </ul>
                                    <div class="tag-warp">
                                        <ul>
                                            <li
                                                class="item"
                                                v-for="(tag,index) in employeeInfo.tag"
                                                :key="index"
                                            >{{tag}}</li>
                                        </ul>
                                        <p>{{employeeInfo.introduce}}</p>
                                    </div>
                                </div>
                                <div class="sha-box"></div>
                                <div class="question-box">
                                    <div class="hd">我的买房问答</div>
                                    <div class="bd buy-house">
                                        <ul>
                                            <li v-for="(ques,index) in qaSelectedList" :key="index">
                                                <div v-if="ques.selected==0">
                                                    <div class="title">{{ques.question}}</div>
                                                    <div class="desc">
                                                        <span>{{ques.questioner_nickname}}</span>
                                                        <span
                                                            v-if="ques.total_price_max!='' || ques.total_price_min!=''"
                                                        >
                                                            {{ques.total_price_min}}
                                                            <span
                                                                v-if="ques.total_price_max!=='' && ques.total_price_max!==ques.total_price_min"
                                                            >-{{ques.total_price_max}}</span>预算
                                                        </span>
                                                        <span>{{ques.purchase_purpose}}</span>
                                                        <span class="time">{{ques.create_datetime}}</span>
                                                    </div>
                                                    <div class="content">
                                                        <span></span>
                                                        <div v-html="ques.answer"></div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="sha-box"></div>
                                <div class="remark-box" v-if="employeeInfo.comment">
                                    <div class="hd">用户点评</div>
                                    <div class="bd">
                                        <div class="user-info">
                                            <div class="avatar" v-if="employeeInfo.comment.img">
                                                <img :src="employeeInfo.comment.img" />
                                            </div>
                                            <ul class="desc" v-if="employeeInfo.comment">
                                                <li class="name">{{employeeInfo.comment.user_name}}</li>
                                                <li v-if="employeeInfo.comment.datetime">
                                                    <div
                                                        class="th"
                                                    >{{employeeInfo.comment.type=='1' ? '成交时间：' : '带看时间：'}}</div>
                                                    <div
                                                        class="td"
                                                    >{{employeeInfo.comment.datetime}}</div>
                                                </li>
                                                <li
                                                    v-if="employeeInfo.comment.employee_grade && employeeInfo.comment.type!='1'"
                                                >
                                                    <div class="th">推荐星级：</div>
                                                    <div class="td">
                                                        <el-rate
                                                            v-model="employeeInfo.comment.employee_grade"
                                                            disabled
                                                            :allow-half="true"
                                                            text-color="#FFCF2B"
                                                        ></el-rate>
                                                    </div>
                                                </li>
                                                <li v-if="employeeInfo.comment.type!='1'">
                                                    <ul v-if="employeeInfo.comment.comment_labels">
                                                        <li
                                                            v-for="(tag,index) in employeeInfo.comment.comment_labels"
                                                            :key="index"
                                                        >{{tag}}</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <p>{{employeeInfo.comment.comment}}</p>
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <div class="left-btn">分享名片</div>
                                    <div class="right-btn">联系咨询师</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="replenish-height" ref="replenish"></div>
                </div>
            </div>
        </div>
        <!--变更楼盘户型弹窗-->
        <el-dialog
            :visible.sync="dialogVisible"
            class="dialog-wrap"
            :close-on-click-modal="false"
            @close="closeHandle"
        >
            <div slot="title" class="dialog-header">
                修改楼盘或户型
                <span class="iconfont iconclose_dialog" @click="dialogVisible = false"></span>
            </div>
            <div class="dialog-body">
                <div class="top-con">
                    <div class="add-house">
                        <div class="name">新增楼盘</div>
                        <div class="opt search-house">
                            <img src="../../../static/images/sreachTool/search.png" alt="搜索楼盘" />
                            <el-autocomplete
                                :disabled="!projectState"
                                v-model="buildName"
                                :fetch-suggestions="searchHouse"
                                :placeholder="houseHolder"
                                @select="affirmHouse"
                            ></el-autocomplete>
                        </div>
                    </div>
                </div>
                <div class="right-con">
                    <ul class="list">
                        <li v-for="(item, index) in affirmHouseArr" :key="index">
                            <div class="title-wrap">
                                <span class="circle">
                                    <el-checkbox
                                        v-model="affirmHouseArr[index].state"
                                        @input="changeProState(item, index)"
                                        @change="changeProState(item, index)"
                                    ></el-checkbox>
                                </span>
                                <span class="house-name">{{index+1}}、{{item.project_name}}</span>
                                <span class="delete" @click="removeHouseType(item, index)">删除</span>
                                <span
                                    class="hand-add-point"
                                    @click="addCusHouse(item, index)"
                                    v-if="item.customHouse.length<5"
                                >
                                    <i class="iconfont iconadded"></i>
                                    手动新增户型
                                </span>
                                <span class="check-house">
                                    <el-select
                                        v-model="item.houseName"
                                        placeholder="选择添加户型"
                                        @change="typeChange(item,index,item.houseName)"
                                        @focus="getHouseType(item,index)"
                                    >
                                        <el-option
                                            v-for="(item,index) in item.houseTypes"
                                            :key="index"
                                            :label="item.text"
                                            :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </span>
                            </div>
                            <ul class="type-wrap clearfix">
                                <li
                                    class="hou-item"
                                    :class="{'hous-custom': it.apartment_type==2}"
                                    v-for="(it, ind) in item.houseType"
                                    :key="it.id"
                                >
                                    <!-- 系统 -->
                                    <div v-if="it.apartment_type==1">
                                        <div class="txt">{{it.text}}</div>
                                        <img
                                            src="../../../static/images/sreachTool/delete-icon.png"
                                            @click="removeHou(item,ind,it.id,it.apartment_type)"
                                            alt
                                        />
                                    </div>
                                </li>
                                <li
                                    class="hou-item"
                                    :class="{'hous-custom': it.apartment_type==2}"
                                    v-for="(it, ind) in item.customHouse"
                                    :key="it.id"
                                >
                                    <!-- 自定义 -->
                                    <div v-if="it.apartment_type==2">
                                        <div class="custom-wrap">
                                            <span
                                                class="status"
                                                @click="changeHouseStatus(item.project_id, it.id)"
                                                :class="{'finished': it.status}"
                                            ></span>
                                            <div class="opt-item">
                                                <div class="th">居室</div>
                                                <div class="td" v-if="cusHouseTypeList">
                                                    <el-select
                                                        v-model="it.room"
                                                        placeholder="户型"
                                                        @change="iptChangeRes()"
                                                    >
                                                        <el-option
                                                            v-for="it in cusHouseTypeList"
                                                            :key="it.value"
                                                            :label="it.name"
                                                            :value="it.value+''"
                                                        ></el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="opt-item">
                                                <div class="th">户型</div>
                                                <div class="td">
                                                    <div class="el-ipt house-na">
                                                        <input
                                                            v-model="it.name"
                                                            placeholder="户型名"
                                                            @input="iptChange"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="opt-item area">
                                                <div class="th">面积</div>
                                                <div class="td">
                                                    <div class="el-ipt">
                                                        <input
                                                            v-model="it.square_metre"
                                                            @input="iptChange"
                                                            oninput.stop.native="value=value.replace(/[^0-9.]/g,'')"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="opt-item">
                                                <div class="th">状态</div>
                                                <div class="td" v-if="salesStatus">
                                                    <el-select
                                                        v-model="it.house_status"
                                                        placeholder="状态"
                                                        @change="iptChangeRes()"
                                                    >
                                                        <el-option
                                                            v-for="it in salesStatus"
                                                            :key="it.value"
                                                            :label="it.name"
                                                            :value="it.value+''"
                                                        ></el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                        </div>
                                        <span
                                            class="delete"
                                            @click="removeHou(item,ind,it.id,it.apartment_type)"
                                        >删除</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="cancle" @click="cancelDialog" :disabled="!cancleStatus">取消</el-button>
                <el-button
                    class="affrim"
                    type="primary"
                    @click="submitBtn"
                    :disabled="!shareStatus"
                >确认</el-button>
            </div>
        </el-dialog>
        <!-- 微信绑定弹窗 -->
        <el-dialog
            title="客户微信绑定信息"
            :visible.sync="bindWechatDialogShow"
            custom-class="wx-bind-dialog"
            center
            :show-close="false"
        >
            <div class="wechat-dialog-con">
                <div class="dialog-con-tit">请添加客户微信号码：</div>
                <ul class="dialog-input-list">
                    <li v-for="(item, index) in wechatVals" :key="index">
                        <div class="th">客户微信</div>
                        <div class="tf">
                            <el-button
                                @click="delWechatItem(index)"
                                type="text"
                                :class="{'is-del-hide': wechatVals.length == 1}"
                            >删除</el-button>
                        </div>
                        <div class="td">
                            <search-radio-select
                                v-model="item.id"
                                :chosenList="wechatVals"
                                :apiInfo="wxApiInfo"
                                @getOption="getOption"
                                :isAppend="true"
                            ></search-radio-select>
                        </div>
                    </li>
                </ul>
                <div class="add-input-item">
                    <el-button @click="addWechatItem" type="text">+新增</el-button>
                    <span :class="{'beyond-limit-msg':beyondLimitHide}">（ 绑定次数超限 ）</span>
                </div>
                <ul class="dialog-upload-ul">
                    <li>
                        <div class="th">
                            <span class="iconfont iconupload_fail"></span> 绑定微信时若找不到客户微信请点击
                        </div>
                        <div class="td upload-wx" @click="uploadWxInfo">上传微信数据</div>
                    </li>
                </ul>
                <span
                    :class="{'error-msg':true,'is-wechat-error-hide':isMsgErrorHide}"
                >{{wechatErrorMsg}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancleWechatBind">取 消</el-button>
                <el-button type="primary" @click="bindWechat">绑 定</el-button>
            </span>
        </el-dialog>
        <!-- 微信上传弹窗 -->
        <el-dialog
            title="上传微信数据提示"
            :visible.sync="uploadWxShow"
            custom-class="wx-upload-dialog"
            center
            :show-close="false"
        >
            <div class="wechat-dialog-con">
                <div class="wechat-dialog-tit">请打开自研手机的推送消息，打开后即可绑定客户微信了~</div>
                <div class="wechat-dialog-tip">
                    <span class="iconfont iconupload_fail"></span> 您也可以打开【咨询师APP】的【订单详情】点击【上传微信数据】手动上传，上传有2分钟的延迟请耐心等待
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="uploadWxShow = false">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/*eslint-disable */
import { NumberInput } from '@/components'
import BScroll from 'better-scroll'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import { Popover } from 'element-ui'
Vue.use(Popover)
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
import PubSub from 'pubsub-js'
import defultImg from '../../../static/images/sreachTool/door_take.png'
import startOne from '../../../static/images/sreachTool/start-one.png'
import startTwo from '../../../static/images/sreachTool/start-two.png'
import startThree from '../../../static/images/sreachTool/start-three.png'
import startFour from '../../../static/images/sreachTool/start-four.png'
import startFive from '../../../static/images/sreachTool/start-five.png'
import startSix from '../../../static/images/sreachTool/start-six.png'
import startSeven from '../../../static/images/sreachTool/start-seven.png'
import startEight from '../../../static/images/sreachTool/start-eight.png'
import startNine from '../../../static/images/sreachTool/start-nine.png'
import startTen from '../../../static/images/sreachTool/start-ten.png'
import end from '../../../static/images/sreachTool/end-one.png'
import codeDefault from '../../../static/images/sreachTool/qa_code_default.png'
import { CommonMethods } from '@/assets/Util'
window.mOxie = window.moxie = require('../../../static/js/moxie.js')
require('../../../static/js/plupload.dev')
import { SearchRadioSelect } from './components'
import api from '@/api/searchToolsApi/searchToolShare'
import CommonFun from '@/utils/common'

export default {
    name: 'MoreHouseShare',
    data() {
        return {
            // 城市id数组
            cityIds: [],
            // 城市名数组
            cityNames: [],
            // 自定义户型
            cusHouseTypeList: [],
            // 选中的微信联系人对象数组
            wxChosenList: [],
            // 发送短信重复提交标识
            sendMsgRepeatFlag: true,
            // 绑定微信联系人重复标识
            bindWxRepeatFlag: true,
            // 上传微信成功弹窗
            uploadWxShow: false,
            // 上传微信重复提交标识
            uploadWxRepeatFlag: true,
            // 客户微信默认值
            wechatVals: [
                {
                    id: ''
                }
            ],
            // 绑定次数超限默认隐藏
            beyondLimitHide: true,
            // 标识删除按钮是否隐藏
            isDelHide: true,
            // 客户微信绑定错误提示信息
            wechatErrorMsg: '',
            // 客户微信绑定错误提示默认隐藏
            isMsgErrorHide: true,
            // 客户手机号
            userMobile: '',
            // 分享方式 1短信 2微信
            shareMethod: '2',
            // 绑定的微信号列表，用于展示
            userWechat: ['aaa', 'bbb'],
            // 微信绑定弹窗显示标识
            bindWechatDialogShow: false,
            // 微信接口请求信息
            wxApiInfo: {},
            // 手机号输入
            phoneInput: '',
            isReq: true,
            // 弹窗loading图
            isLoading: true,
            // 目的地加载
            firstLoading: false,
            // 目的地2加载
            secondLoading: false,
            // 目的地1校验
            addressFirState: false,
            // 目的地2校验
            addressSecState: false,
            // 通勤地址数组
            addressArr: [],
            // 步行时长选择
            isWalkCheckFir: true,
            // 步行时长选择
            isWalkCheckSen: true,
            // 目的地1的通勤数据
            addressTableFir: [],
            // 目的地2的通勤数据
            addressTableSec: [],
            isReq: true,
            isLoading: false, // 弹窗loading图
            initUpload: true, // 初始化上传组件 
            defaultQaNum: 2, // 默认问答需要选中几个
            qaCodeDefault: codeDefault,
            audioUrl: '', // 音频链接
            pointCounts: [],// 线路的点
            lastModuleBox: true, // 个人资料是否展示
            cancleStatus: false, // 弹窗中取消按钮是否可点击
            currAddress: 0, // 当前选中第一个 
            currenMap: 'drive', // 通勤默认选中自驾，drive为自驾，car为公交
            firAddress: true, // 第一个通勤地址
            isShowVioc: true, // 解读模块是否展示
            signs: {},
            checkQa: false, // 选中问答
            curQrcode: false, // 咨询师二维码
            curStatu: false, // 咨询师标签
            qaList: [], // 咨询师问答list
            upCodeFile: '', // 上传的二维码url
            chosenItemIndex: 0, // 问题选中项
            houseNameInput: '', // 输入楼盘名称搜索问答
            qaListSele: [], // 被选中的问答
            qaSelectedList: [], // 被选中的问题数组
            cusTagInput: '', // 咨询师自定义标签输入框
            customInput: '', // 自定义标签输入框
            star: 4.5, // 用户点评评分
            userRequire: {}, // 用户需求
            totalPrice: {},
            firstPrice: {},
            acreage: {},
            decorateList: [], // 装修情况
            typeList: [], // 业态
            salesStatus: [], //销售状态
            qualificationList: [], // 购房资质
            purchaseList: [], // 购房目的
            houseTypeList: [], // 户型
            updataTime: '',
            currenUpId: 0, // 当前正在上传图片的插件id
            uploader: [], // 上传插件实例
            voiceData: [],
            setCommuFlag: false, // 是否点击了通勤下拉
            setCommuFlagSen: false,
            isFirst: true,// 第一次渲染
            paramArr: [],// 初始化数据参数
            trackMessages: '', // 埋点信息
            backendApi: '',
            markBase: [],// 地图标注信息
            codeUrl: '',// 小程序预览二维码
            trafficNum: 0, // 周边交通展示个数
            shareFlag: false, // 分享标志
            shareBtn: true, // 是否可以分享
            btnObj: {
                preBtn: '上一步',
                nextBtn: '下一步'
            }, // 操作按钮对象
            userInfo: {},// 用户信息
            houseHolder: '输入楼盘名搜索', //楼盘提示文案
            projectState: true, // 搜索楼盘禁止点击
            affirmHouseArr: [], // 选中楼盘
            affirmHouseArrBase: [], // 选中楼盘备份
            buildName: '', // 搜索楼盘名
            shareStatus: false, // 弹窗确认可不可点击
            dialogVisible: false, // 默认不展示弹窗
            employeeInfo: {}, // 咨询师信息
            tripList: [
                {
                    type: '1',
                    text: '公交'
                },
                {
                    type: '2',
                    text: '地铁'
                }
            ],
            summaryArr: [], // 综述数据
            rimObj: {
                rimLand: true, // 是否展示周边地价
                rimSecond: true, // 是否展示周边二手房
            },
            houseAddress: [], // 多少个楼盘
            ac: {},
            acSecon: {},
            mapPreview: {},
            mapPreviewSecon: {},
            commutAddress: '', // 通勤目的地
            commutAddressSen: '',
            payList: [
                {
                    value: 10,
                    label: '10%'
                }, {
                    value: 15,
                    label: '15%'
                }, {
                    value: 20,
                    label: '20%'
                }, {
                    value: 25,
                    label: '25%'
                }, {
                    value: 30,
                    label: '30%'
                }, {
                    value: 35,
                    label: '35%'
                }, {
                    value: 40,
                    label: '40%'
                }, {
                    value: 45,
                    label: '45%'
                }, {
                    value: 50,
                    label: '50%'
                }, {
                    value: 55,
                    label: '55%'
                }, {
                    value: 60,
                    label: '60%'
                }, {
                    value: 65,
                    label: '65%'
                }, {
                    value: 70,
                    label: '70%'
                }, {
                    value: 75,
                    label: '75%'
                }, {
                    value: 80,
                    label: '80%'
                }, {
                    value: 85,
                    label: '85%'
                }, {
                    value: 90,
                    label: '90%'
                }, {
                    value: 95,
                    label: '95%'
                }, {
                    value: 100,
                    label: '100%'
                }
            ], // 首付比例列表
            loanObj: {
                payFir: 30, // 首付比例
                loanYear: 30, // 贷款年限
                loanTex: '4.9', // 贷款利率
            },
            loanYearList: [], // 贷款年限列表
            spanOneArr: [], // 概览中表格合并
            trafficData: [], // 周边交通
            trafficDataRig: [], // 周边交通右侧
            rimData: [],  // 周边价格
            houseOverView: [], // 楼盘价格概览数据
            nowScrollHe: '', // 滚动高度
            listHeight: [],
            swiperIndex: 0,
            swiperArr: [
                {
                    name: '1. 客户需求',
                    isOk: false,
                    isRequired: false
                },
                {
                    name: '2. 楼盘价格',
                    isOk: false,
                    isRequired: true
                },
                {
                    name: '3. 周边价格',
                    isOk: false,
                    isRequired: false
                },
                {
                    name: '4. 通勤路线',
                    isOk: true,
                    isRequired: false
                },
                {
                    name: '5. 周边交通',
                    isOk: false,
                    isRequired: true
                },
                {
                    name: '6. 楼盘总述',
                    isOk: false,
                    isRequired: true
                },
                {
                    name: '7. 个人资料',
                    isOk: false,
                    isRequired: true
                }
            ], // swiper数组
            shareId: '', // 分享id 再次编辑时使用
            carInfoArr: [], // 多个楼盘驾车信息
            carInfo: {}, // 驾车信息
            busInfoArr: [],// 多个公交信息
            busInfo: {}, // 公交信息
            busInfoArrSen: [],
            carInfoArrSen: [],
            marker: {
                // 标识
                origin: {
                    lng: "", // 起始位置经度
                    lat: "" // 起始位置维度
                },
                destination: {
                    lng: "", // 结束位置经度
                    lat: "" // 结束位置维度
                }
            },
            markerSen: {
                // 标识
                origin: {
                    lng: "", // 起始位置经度
                    lat: "" // 起始位置维度
                },
                destination: {
                    lng: "", // 结束位置经度
                    lat: "" // 结束位置维度
                }
            },

            overLayId: '', // 所清除的覆盖物标识
            markStart: '', // 起点图标
            markEnd: '', // 终点图标
            labelEnd: '', // 终点覆盖物
            label: '', // 起点覆盖物
            houseAddressArr: [], // 楼盘信息
            houseInfo: {},
            cityId: '',//城市id
            cityName: '', // 当前城市名称
            isEdit: false, // url上有分享id
            addressObj: {
                address: '',
                lat: '',
                lng: ''
            }, // 通勤地址
            addressObjSen: {
                address: '',
                lat: '',
                lng: ''
            }, // 通勤地址2
            isLoanEdit: false, // 首付比例为100时贷款年限和贷款利率不可编辑
            currentSwiper: 0, // swiper当前索引
            swiperOption: {
                direction: "horizontal",
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 15,
                loopAdditionalSlides: 100,
                on: {
                    slideChangeTransitionEnd: () => {
                        let swiper = this.$refs.mySwiper.swiper
                        // 不满一屏的轮播，activeIndex是不准的，最后一个和倒数第二个的索引是相同的，需要借助isEnd参数来判断
                        if (swiper.isEnd) {
                            this.currentSwiper = swiper.slides.length - 1
                        } else {
                            this.currentSwiper = swiper.activeIndex
                        }
                    }
                }
            },
            auidoPlayer: ''
        }
    },
    created() {
        // 路由参数
        this.query = this.$route.query;
        // 如果路由有分享id
        if (this.query.share_id) {
            this.shareId = this.query.share_id;
            this.isEdit = true;
        }
        // 订单id
        this.orderId = this.query.order_id;
        // 获取城市id
        this.cityId = this.query.city_id;
        this.cityIds = this.cityId.split(',');
        // 是否展示文章按钮
        this.articleFlag = this.query.share_article;

        let proArr = JSON.parse(localStorage.getItem("projectInfo"))
        this.getData(proArr)
        this.getSign()
    },
    mounted() {
        this.$nextTick(() => {
            // 创建audio
            this.auidoPlayer = document.getElementById('audio')
            this.auidoPlayer.addEventListener('ended', () => {
                this.voiceData.forEach((item) => {
                    item.isPlay = false
                })
            }, false)

            // 右侧滚动
            let scrollBox = document.getElementsByClassName('preview-content')[0]
            scrollBox.addEventListener('scroll', this.highThottle(this.menus, this, 100, 50))
            // 给最后一模块添加高度
            this.$refs.replenish.style.height = document.documentElement.clientHeight + 'px'
            this.getScreen()
            // 获取城市匹配当前市
            this.getCity()
            // 请求埋点数据
            this.getUser()

            // 匹配贷款年限和首付比例
            this.loanMatch(this.cityId)
            // 动态写年限
            for (let i = 1; i <= 30; i++) {
                let obj = {
                    id: i,
                    text: i + '年'
                }
                this.loanYearList.push(obj)
            }
            // 动态写比例


            // 图片加载不出来
            document.addEventListener('error', function (e) {
                var elem = e.target
                if (elem.tagName.toLowerCase() === 'img') {
                    elem.src = defultImg
                    elem.error = null
                }
            }, true)
        })

    },
    methods: {
        // 点击上传微信
        async uploadWxInfo() {
            if (this.uploadWxRepeatFlag) {
                this.uploadWxRepeatFlag = false;
                try {
                    let result = await api.uploadWxMsg();
                    let { data } = result;
                    if (data.code === 0) {
                        this.uploadWxShow = true;
                        // 恢复重复提交标识
                        this.uploadWxRepeatFlag = true;
                    } else {
                        // 恢复重复提交标识
                        this.uploadWxRepeatFlag = true;
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } catch (error) {
                    // 恢复重复提交标识
                    this.uploadWxRepeatFlag = true;
                    console.log(error);
                }
            }
        },
        /**
         * 获取联想下拉框选中的下拉对象
         * @param {Object} para 选中的下拉对象
         */
        getOption(para) {
            this.wxChosenList.push(para);
        },
        /**
         * 删除客户微信
         * @param {string} index 删除索引
         */
        delWechatItem(index) {
            this.wechatVals.splice(index, 1);
            // 超过绑定次数提示隐藏
            if (!this.beyondLimitHide) {
                this.beyondLimitHide = true;
            }
        },
        // 新增绑定微信
        addWechatItem() {
            let bindedNameLength = Array.isArray(this.userWechat) ? this.userWechat.length : 0;
            if (this.wechatVals.length + bindedNameLength < 5) {
                // 新增一条
                let wechatItem = { id: '' };
                this.wechatVals.push(wechatItem);
            } else {
                // 超过绑定次数提示显示
                this.beyondLimitHide = false;
            }
        },
        // 取消微信绑定
        cancleWechatBind() {
            // 关闭弹窗
            this.bindWechatDialogShow = false;
            // 清空错误提示并隐藏
            this.wechatErrorMsg = "";
            this.isMsgErrorHide = true;
        },
        // 点击绑定按钮验证
        async bindWechat() {
            if (this.bindWxRepeatFlag) {
                this.bindWxRepeatFlag = false;
                try {
                    let isEmptyArr = this.wechatVals.filter((v) => {
                        return !(v.id);
                    });
                    // 全部都不填，校验不通过，任意填一项，校验通过
                    if (isEmptyArr.length === this.wechatVals.length) {
                        // 恢复重复提交标识
                        this.bindWxRepeatFlag = true;
                        this.$message({
                            message: '请填写客户微信',
                            type: 'error'
                        });
                        return;
                    }
                    let order_id = this.$route.query.order_id;
                    let wxNum = [];
                    let len = this.wechatVals.length;
                    for (let i = 0; i < len; i++) {
                        if (this.wechatVals[i].id) {
                            wxNum.push(this.wechatVals[i].id)
                        }
                    }
                    let result = await api.addWxContact(order_id, wxNum, '7');
                    let { data } = result;
                    if (data.code === 0) {
                        // 关闭弹窗
                        this.bindWechatDialogShow = false;
                        // 合并弹窗外已经存好的微信联系人
                        this.wxChosenList.map((item) => {
                            this.userWechat.push(item.text);
                        });
                        //   
                        this.wechatVals = [{ id: '' }]
                        // 恢复重复提交标识
                        this.bindWxRepeatFlag = true;
                    } else {
                        // 恢复重复提交标识
                        this.bindWxRepeatFlag = true;
                    }
                } catch (error) {
                    // 恢复重复提交标识
                    this.bindWxRepeatFlag = true;
                    console.log(error);
                }
            }
        },
        // 绑定微信
        bindWx() {
            this.bindWechatDialogShow = true;
            let wxIDs = [];
            this.wechatVals.map((item) => {
                wxIDs.push(item.id);
            });
            this.wxApiInfo = {
                api: '/backend-api/bk-map/weixin-get-employee-contact',
                params: {
                    order_id: this.orderId,
                    exclude: wxIDs,
                    q: ''
                }
            };
        },
        /**
         * 立即发送按钮以及发送购房知识
         * @param {Object} para 是否发送购房知识，如果是1则发送购房知识
         */
        async phoneSend(para) {
            if (this.sendMsgRepeatFlag) {
                this.sendMsgRepeatFlag = false;
                // 如果手机号输入了
                if (this.phoneInput && this.phoneInput !== 0) {
                    let result = CommonFun.verifyTelNum(this.phoneInput);
                    if (!result) {
                        // 恢复重复提交标识
                        this.sendMsgRepeatFlag = true;
                        this.$message({
                            message: '手机号格式错误',
                            type: 'error'
                        });
                        return;
                    }
                }
                try {
                    // share_type--[1单楼盘 2从楼盘 3文章]
                    let params = {
                        order_id: this.orderId,
                        share_id: this.shareId,
                        user_mobile: this.phoneInput,
                        share_type: 2
                    };
                    let result = await api.sendMsg(params);
                    let { data } = result;
                    if (data.code === 0) {
                        // 恢复重复提交标识
                        this.sendMsgRepeatFlag = true;
                        this.$message({
                            message: '短信发送成功',
                            type: 'success'
                        });
                        // 发送购房知识并且当前tab为短信分享
                        if (para === 1 && this.shareMethod === '1') {
                            this.submitArticle();
                        }
                    } else {
                        // 恢复重复提交标识
                        this.sendMsgRepeatFlag = true;
                    }
                } catch (error) {
                    // 恢复重复提交标识
                    this.sendMsgRepeatFlag = true;
                    console.log(error);
                }
            }
        },
        // 发送购房知识
        submitArticle() {
            let cyNames = this.cityNames.join(',');
            this.$router.push({
                path: '/housePurchaseKnowledge',
                query: {
                    city_id: this.cityId,
                    order_id: this.orderId,
                    city_name: cyNames
                }
            })
        },
        /**
         * 修改自定义户型状态
         * 参数
         * projectId  楼盘id
         * houseId  户型id
         */
        changeHouseStatus(projectId, houseId) {
            this.affirmHouseArr.forEach((projectItem, index) => {
                if (projectItem.project_id == projectId) {
                    let arr = []
                    arr = projectItem.customHouse.map((house, indexs) => {
                        if (house.id == houseId) {
                            house.status = !house.status
                        }
                        return house;
                    })
                    this.$set(projectItem, 'customHouse', arr)
                    this.$set(this.affirmHouseArr, index, projectItem)
                }
            })
            this.dialogVerify()
        },
        // 通勤地址2校验
        commutTwoVerify() {
            // 地址为必填
            if (this.addressObjSen.address != '' && this.addressArr.length > 1) {
                let num = 0;
                this.addressTableSec.forEach((item, index) => {
                    if (this.isWalkCheckSen) {
                        if (item && item.drive_time != '' && item.bus_transit_time != '' && item.bus_walk_time != '') {
                            num++;
                        }
                    } else {
                        if (item && item.drive_time != '' && item.bus_transit_time != '') {
                            num++;
                        }
                    }
                })
                if (num == this.addressTableSec.length && num > 0) {
                    this.addressSecState = true;
                } else {
                    this.addressSecState = false;
                }
            } else if (this.addressObjSen.address == '' && this.addressArr.length == 1) {
                this.addressSecState = true;
            } else {
                this.addressSecState = true;
            }
            if (this.addressFirState && this.addressSecState) {
                this.swiperArr[3].isOk = true;
            } else {
                this.swiperArr[3].isOk = false;
            }
        },
        // 通勤目的地1校验
        commutVerify() {
            // 地址为必填
            if (this.addressObj.address !== '') {
                let num = 0;
                this.addressTableFir.forEach((item, index) => {
                    if (this.isWalkCheckFir) {
                        if (item && item.drive_time != '' && item.bus_transit_time != '' && item.bus_walk_time != '') {
                            num++;
                        }
                    } else {
                        if (item && item.drive_time != '' && item.bus_transit_time != '') {
                            num++;
                        }
                    }
                })
                if (num == this.addressTableFir.length && num > 0) {
                    this.addressFirState = true;
                } else {
                    this.addressFirState = false;
                }
            } else {
                this.addressFirState = true;
            }
            if (this.addressFirState && this.addressSecState) {
                this.swiperArr[3].isOk = true;
            } else {
                this.swiperArr[3].isOk = false;
            }
        },
        /*
        *  按照某个字段去重
        *  arr二维数组、name需要以该字段去重
        *  return 去重后的数组
        * */
        unique(arr, name) {
            var hash = {};
            return arr.reduce(function (item, next) {
                hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                return item;
            }, []);
        },
        // 删除第二个目的地
        delEndAdr() {
            if (this.addressArr.length > 1 && this.addressArr[1].address !== '') {
                let params = {
                    type: 21,
                    commute_lat: this.addressObjSen.lat,
                    commute_lng: this.addressObjSen.lng,
                    share_id: this.shareId,
                    order_id: this.orderId
                };
                this.axios.post('/backend-api/bk-map/perform-tasks', params)
                    .then(({ data }) => {
                        if (data.code === 0) {
                            this.addressArr.splice(1, 1)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                this.addressArr.splice(1, 1);
            }
            // 清空已经填写地址
            this.addressObjSen = {
                address: '',
                lat: '',
                lng: ''
            };
            // 右侧预览地图自动选择到第一个目的地
            this.firAddress = true;
            this.currAddress = 0;
            // 画上线
            this.$nextTick(() => {
                this.lineTraffic();
            });
            this.getCommuInfoSec();
        },
        // 添加目的地
        addEndAdr() {
            if (this.addressArr.length > 1) {
                return;
            };
            if (this.addressArr.length <= 1) {
                let obj = {
                    address: '',
                    lng: '',
                    lat: ''
                };
                this.addressArr.push(obj);
                this.$nextTick(() => {
                    // 初始化input框
                    this.setSearchSec()
                });
            }
            this.commutTwoVerify();
        },
        // 贷款利率input事件
        loanInput(para) {
            this.loanObj.loanTex = para.replace(/[^\d.]/g, '')
            this.loanObj.loanTex = this.loanObj.loanTex.replace(/\.{2,}/g, '')
            this.loanObj.loanTex = this.loanObj.loanTex.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
            this.loanObj.loanTex = this.loanObj.loanTex.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        },
        // 根据城市配置首付和贷款年限
        loanMatch(para) {
            if (para.toString() === '20000001') {
                // 上海默认首付比例是35%--20000001，天津默认贷款年限是25--20000019
                if (this.loanObj.payFir === null) {
                    this.loanObj.payFir = 35
                }
                if (this.loanObj.loanYear === null) {
                    this.loanObj.loanYear = 30
                }
            } else if (para.toString() === '20000019') {
                if (this.loanObj.loanYear === null) {
                    this.loanObj.loanYear = 25
                }
                if (this.loanObj.payFir === null) {
                    this.loanObj.payFir = 30
                }
            } else {
                if (this.loanObj.payFir === null) {
                    this.loanObj.payFir = 30
                }
                if (this.loanObj.loanYear === null) {
                    this.loanObj.loanYear = 30
                }
            }
        },
        // 更新数据
        iptChangeRes() {
            this.affirmHouseArr.forEach((project, index) => {
                this.$set(this.affirmHouseArr, index, project)
            })
            this.dialogVerify()
        },
        iptChange() {
            this.dialogVerify()
        },
        // 清空搜索问答框
        clearInput() {
            this.searchQa()
        },
        // 点击播放语音
        playAudio(para, index, isPlay) {
            if (para == '') {
                return
            }
            this.voiceData.forEach((item) => {
                item.isPlay = false
            })
            if (isPlay) {
                this.voiceData[index].isPlay = false
            } else {
                this.voiceData[index].isPlay = true
            }
            var play = ''
            this.audioUrl = para
            // this.auidoPlayer.load()
            setTimeout(() => {
                if (para) {
                    if (this.auidoPlayer.paused) {
                        // 暂停中
                        this.auidoPlayer.play()
                    } else {
                        // 播放中
                        this.auidoPlayer.pause()
                    }
                }
            }, 100)
        },
        // 自驾和公交切换
        changeWay(para) {
            this.currenMap = para
            this.$nextTick(() => {
                this.lineTraffic()
            })
            this.pointCounts = []
        },
        // 切换地址
        changeAddress(para) {
            // 切换为第一个地址
            this.currAddress = para
            if (para == 0) {
                this.firAddress = true
            } else {
                this.firAddress = false
            }
            this.$nextTick(() => {
                this.lineTraffic()
            })
            if (this.addressObjSen.address == '') {
                this.mapPreviewSecon.centerAndZoom(this.cityName, 11)
            }
            if (this.addressObj.address == '') {
                this.mapPreview.centerAndZoom(this.cityName, 11)
            }
        },
        upViocSta() {
            let num = 0
            this.voiceData.forEach((voice) => {
                // 不展示
                if (voice.voice_is_show == 1) {
                    num++
                } else {
                    num--
                }
            })
            if (num == this.voiceData.length) {
                this.isShowVioc = false
            } else {
                this.isShowVioc = true
            }
            setTimeout(() => {
                this._calculateHeight()
            })
        },
        // 选择问题
        choseItem(para) {
            // 至多能选择1或2条
            let itemIndex = this.qaSelectedList ? this.qaSelectedList.length : 0
            if (itemIndex < this.defaultQaNum && para.selected == 1) {
                para.selected = 0
                // 实时记录选中值
                this.qaSelectedList.push(para)
                // 重新计算右侧各个模块高度
                setTimeout(() => {
                    this._calculateHeight()
                })
            } else if (para.selected == 0) {
                para.selected = 1
                // 删除已经选中的问题
                let finIndex = this.qaSelectedList.findIndex((item) => {
                    return item.answer_id == para.answer_id
                })
                if (finIndex != -1) {
                    this.qaSelectedList.splice(finIndex, 1)
                }
                // 重新计算右侧各个模块高度
                setTimeout(() => {
                    this._calculateHeight()
                })
            }
        },
        // 楼盘名称搜索问答
        searchQa() {
            let awId = this.qaSelectedList.map((qa) => {
                return qa.answer_id
            })
            this.qaSelectedList = []
            let params = {
                keywords: this.houseNameInput,
                page: 1,
                page_size: 50,
                selected: awId
            }
            this.axios.post('/backend-api/bk-map/qa-list', params)
                .then(({ data }) => {
                    if (data.code === 0) {
                        let resData = data.data
                        if (Array.isArray(resData)) {
                            if (resData.length == 1) {
                                this.qaListSele = resData
                                this.qaList = []
                                this.qaListSele.forEach((que, index) => {
                                    if (que.selected == 0) {
                                        this.qaSelectedList.push(que)
                                    }
                                })
                            }
                            if (resData.length >= 2) {
                                this.qaListSele = resData.slice(0, 2)
                                this.qaList = resData.slice(2, resData.length)
                                this.qaListSele.forEach((que, index) => {
                                    if (que.selected == 0) {
                                        this.qaSelectedList.push(que)
                                    }
                                })
                            }
                            if (resData.length == 0) {
                                this.qaListSele = []
                                this.qaList = []
                            }
                        } else {
                            this.qaListSele = []
                            this.qaList = []
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // 概览展示销售状态
        choseStatu(para) {
            let text = ''
            this.salesStatus.forEach((item) => {
                if (item.value == para) {
                    text = item.name
                }
            })
            return text
        },
        rowTable(row) {
            if (row.rowIndex == this.currentSwiper) {
                return 'curren-row'
            }
        },
        // 删除咨询师标签
        deleteCusLabel(paraIndex, para) {
            this.employeeInfo.tag.splice(paraIndex, 1)
        },
        // 添加自定义咨询师标签
        addEmTag() {
            let cusStr = this.cusTagInput + ''
            if (cusStr.trim()) {
                // 添加到自定义标签数组
                this.employeeInfo.tag.push(cusStr)
                // 清空input框
                this.cusTagInput = ''
                // 重新计算右侧各个模块高度
                setTimeout(() => {
                    this._calculateHeight()
                })
            }
        },
        /**
         * 修改楼盘选中状态
         * @param {object} para 当前楼盘
         * @param {number} index 当前楼盘索引
         */
        changeProState(para, index) {
            let num = 0
            this.affirmHouseArr.forEach((house) => {
                if (house.state) {
                    num++
                    house.number = num
                }
            })
            if (num == 10 && !para.state) {
                return
            }
            let obj = para
            obj.state = !obj.state
            this.$set(this.affirmHouseArr, index, obj)
            this.dialogVerify()
        },
        // 户型图展示
        showImg(para) {
            let imgUrl
            if (para) {
                imgUrl = this.signs.host + para
            } else {
                imgUrl = defultImg
            }

            return imgUrl
        },
        // 点击添加范围或者是取消范围
        changeArea(para, paraMax) {
            para.isMore = !para.isMore
            this.$set(para, paraMax, '')
        },
        // 判断是添加范围还是取消范围
        checkarea(para) {
            let res = '添加范围'
            if (para) {
                res = '取消范围'
            }
            return res
        },
        // 只能输入正整数限制
        intagerInput(para, paraName, paraType) {
            this.userRequire[paraName][paraType] = para.replace(/[^\d]/g, '')
            this.userRequire[paraName][paraType] = this.userRequire[paraName][paraType].replace(/^0+/g, '')
        },
        // 通用项
        getScreen() {
            let postData = {
                type: 19,
                city_id: this.cityIds[0],
                order_id: this.orderId
            }
            this.axios.post('/backend-api/bk-map/perform-tasks', postData)
                .then((res) => {
                    if (res.data.code == 0) {
                        let resData = res.data.data
                        // 销售状态
                        this.salesStatus = resData ? resData.project_status : []
                        // 装修情况
                        this.decorateList = resData ? resData.decorate : []
                        // 业态
                        this.typeList = resData ? resData.require_project_type : []
                        // 购房资质
                        this.qualificationList = resData ? resData.qualifications : []
                        // 户型
                        this.houseTypeList = resData ? resData.house_type : []
                        // 自定义户型
                        this.cusHouseTypeList = resData ? resData.room_type : []
                        // 购房目的
                        this.purchaseList = resData ? resData.purchase_purpose : []
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        closeHandle() {
            // 更新备份数组
            this.affirmHouseArr = this.deepCopy(this.affirmHouseArrBase)
        },
        deepCopy(obj) {
            var result = Array.isArray(obj) ? [] : {}
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        result[key] = this.deepCopy(obj[key])
                    } else {
                        result[key] = obj[key]
                    }
                }
            }
            return result
        },
        // 判断是否展示满意度
        checkRate(para) {
            if (para) {
                let rate = para.split('%')[0]
                if (parseFloat(rate) > 95) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        // 请求埋点数据
        getUser() {
            let params = {
                order_id: this.$route.query.order_id
            }
            this.axios.post('/backend-api/bk-map/get-user-require', params)
                .then((res) => {
                    if (res.data.code === 0) {
                        let Data = res.data.data
                        this.backendApi = Data.www_backend_api
                        this.trackMessages = Data.track_common_property
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // 获取当前城市名
        getCity() {
            let params = {
                type: 2 // type2请求市
            }
            this.axios.get('/backend-api/select2/select2/get-province-dropdown-list2', { params: params })
                .then((res) => {
                    let result = res.data
                    if (result.code === 0) {
                        let base = result.data;
                        console.log(base);
                        let cityName = [];
                        this.cityIds.forEach((cityId, idInd) => {
                            let arr = base.filter((item) => {
                                return item.id == cityId
                            });
                            if (arr.length > 0) {
                                cityName.push(arr[0].text);
                            }
                        })
                        this.cityNames = cityName;
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // 打开弹窗
        showDialog() {
            this.dialogVisible = true
            // 埋点
            CommonMethods.setTrack('4169', this.trackMessages, {}, this.backendApi)
        },
        // 重新编辑
        updateShare() {
            this.isReq = true
            // 去掉分享结果
            this.shareFlag = false
            this.selectContent(0)
            let arr = JSON.parse(localStorage.getItem("moreHouseInfo"))
            this.getData(arr)
            // 埋点
            CommonMethods.setTrack('4168', this.trackMessages, {}, this.backendApi)
        },
        // 分享
        moreShare() {
            if (!this.shareBtn) {
                return
            }
            if (!this.isReq) {
                return
            }
            if (this.isReq) {
                this.isReq = false
            }

            // 埋点
            CommonMethods.setTrack('4163', this.trackMessages, {}, this.backendApi)
            // 组装概览数据
            let overViewBase = []
            this.houseOverView.map((item) => {
                let obj = {
                    id: item.id,
                    name: item.name,
                    project_id: item.project_id,
                    square_metre: item.square_metre,
                    total_price: item.total_price * 10000,
                    total_price_max: item.total_price_max * 10000,
                    apartment_type: item.apartment_type,
                    apartment_pic: item.apartment_pic,
                    house_status: item.house_status
                }
                overViewBase.push(obj)
            })
            // 组装周边价格
            let rimDataBase = []
            this.rimData.map((item) => {
                let obj = {
                    project_id: item.project_id,
                    landPrice: item.landPrice,
                    landShow: item.landShow,
                    secondPrice: item.secondPrice,
                    secondShow: item.secondShow
                }
                if (this.rimObj.rimLand == true && this.rimObj.rimSecond != true) { // 展示周边地价
                    obj.landShow = 0
                    obj.secondShow = 1
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand != true) { // 展示周边二手房
                    obj.landShow = 1
                    obj.secondShow = 0
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand == true) {  // 都展示
                    obj.landShow = 0
                    obj.secondShow = 0
                } else {
                    obj.landShow = 1
                    obj.secondShow = 1
                }
                if (this.updataTime) {
                    obj.price_update_datetime = Number(this.updataTime) / 1000
                } else {
                    obj.price_update_datetime = 0
                }
                rimDataBase.push(obj)
            })
            // 组装通勤时间
            let cumTimeBase = []
            this.houseAddressArr.forEach((item, index) => {
                let obj = {}
                if (this.busInfoArr.length > 0) {
                    this.busInfoArr.forEach((bus, ind) => {
                        if (index == ind) {
                            obj.bus_time = this.addressObj.address != '' ? (this.busInfoArr[index].duration ? this.busInfoArr[index].duration : 0) : 0
                            obj.project_id = item.project_id
                        }
                    })
                } else {
                    obj.bus_time = 0
                    obj.project_id = item.project_id
                }
                if (this.carInfoArr.length > 0) {
                    this.carInfoArr.forEach((bus, ind) => {
                        if (index == ind) {
                            obj.project_id = item.project_id
                        }
                    })
                } else {
                    obj.project_id = item.project_id
                }
                if (this.addressTableFir.length > 0) {
                    this.addressTableFir.forEach((add, ind) => {
                        if (item.sort == add.sort_id) {
                            obj.bus_duration = this.addressTableFir[index] && this.addressTableFir[index].bus_duration ? this.addressTableFir[index].bus_duration : 0;
                            obj.bus_transit_time = this.addressTableFir[index] && this.addressTableFir[index].bus_transit_time ? this.addressTableFir[index].bus_transit_time : 0;
                            obj.bus_walk_time = this.addressTableFir[index] && this.addressTableFir[index].bus_walk_time ? this.addressTableFir[index].bus_walk_time : 0;
                            obj.drive_time = this.addressTableFir[index] && this.addressTableFir[index].drive_time ? this.addressTableFir[index].drive_time : 0;
                            obj.is_walk_show = this.isWalkCheckFir ? '0' : '1';
                            obj.start_address = this.addressTableFir[index] ? this.addressTableFir[index].start_address : '';
                            obj.start_lat = this.addressTableFir[index] ? this.addressTableFir[index].start_lat : '';
                            obj.start_lng = this.addressTableFir[index] ? this.addressTableFir[index].start_lng : '';
                        }
                    })
                }
                obj.address = this.addressObj.address
                obj.lat = this.addressObj.lat
                obj.lng = this.addressObj.lng
                if (obj.address && obj.lat && obj.lng) {
                    cumTimeBase.push(obj)
                }
            })
            let cumTimeBaseSen = []
            this.houseAddressArr.forEach((item, index) => {
                let obj = {}
                if (this.busInfoArrSen.length > 0) {
                    this.busInfoArrSen.forEach((bus, ind) => {
                        if (index == ind) {
                            obj.bus_time = this.addressObjSen.address != '' ? (this.busInfoArrSen[index].duration ? this.busInfoArrSen[index].duration : 0) : 0
                            obj.project_id = item.project_id
                        }
                    })
                } else {
                    obj.bus_time = 0
                    obj.project_id = item.project_id
                }
                if (this.carInfoArrSen.length > 0) {
                    this.carInfoArrSen.forEach((bus, ind) => {
                        if (index == ind) {
                            obj.project_id = item.project_id
                        }
                    })
                } else {
                    obj.project_id = item.project_id
                }
                if (this.addressTableSec.length > 0) {
                    this.addressTableSec.forEach((add, ind) => {
                        if (item.sort == add.sort_id) {
                            obj.bus_duration = this.addressTableSec[index] && this.addressTableSec[index].bus_duration ? this.addressTableSec[index].bus_duration : 0;
                            obj.bus_transit_time = this.addressTableSec[index] && this.addressTableSec[index].bus_transit_time ? this.addressTableSec[index].bus_transit_time : 0;
                            obj.bus_walk_time = this.addressTableSec[index] && this.addressTableSec[index].bus_walk_time ? this.addressTableSec[index].bus_walk_time : 0;
                            obj.drive_time = this.addressTableSec[index] && this.addressTableSec[index].drive_time ? this.addressTableSec[index].drive_time : 0;
                            obj.is_walk_show = this.isWalkCheckSen ? '0' : '1';
                            obj.start_address = this.addressTableSec[index] ? this.addressTableSec[index].start_address : '';
                            obj.start_lat = this.addressTableSec[index] ? this.addressTableSec[index].start_lat : '';
                            obj.start_lng = this.addressTableSec[index] ? this.addressTableSec[index].start_lng : '';
                        }
                    })
                }
                obj.address = this.addressObjSen.address
                obj.lat = this.addressObjSen.lat
                obj.lng = this.addressObjSen.lng
                if (obj.address && obj.lat && obj.lng) {
                    cumTimeBaseSen.push(obj)
                }
            })
            // 组装周边交通数据
            let trafficDataBase = []
            this.trafficData.map((item) => {
                item.traffic_data.forEach((it) => {
                    let obj = {
                        project_id: it.project_id,
                        station_name: it.station_name,
                        traffic_name: it.traffic_name,
                        traffic_category: it.traffic_category,
                        distance: it.distance,
                        is_show: it.is_show,
                        traffic_type: it.traffic_type,
                        traffic_id: it.traffic_id
                    }
                    trafficDataBase.push(obj)
                })
            })
            // 组装综述
            var sumBase = []
            this.summaryArr.map((item) => {
                item.house.forEach((it) => {
                    let obj = {
                        summary: item.project.summary,
                        project_id: it.projectId,
                        house_type: it.houseType,
                        apartment_type: it.apartmentType,
                        house_summary: it.summary,
                        star: it.star
                    }
                    sumBase.push(obj)
                })
            })
            // 咨询师信息
            let answers = []
            this.qaSelectedList.forEach((qu) => {
                answers.push(qu.answer_id)
            })
            let employeeMess = {
                tags: this.employeeInfo.tag,
                wx_qrcode: this.employeeInfo.wx_qrcode,
                answer_id: answers
            }

            let cumSum = cumTimeBaseSen.concat(cumTimeBase)

            // 参数
            var params = {
                share_id: this.shareId,
                order_id: this.$route.query.order_id,
                type: '6',
                lending_rate: this.loanObj.loanTex,
                loan_term: this.loanObj.loanYear,
                down_payments: this.loanObj.payFir,
                overView: overViewBase,
                peripheryPrice: rimDataBase,
                commuting_time: cumSum,
                peripheralTraffic: trafficDataBase,
                summary: sumBase,
                user_require: this.userRequire,
                employee: employeeMess,
                voiceInfo: this.voiceData
            }

            this.axios.post('/backend-api/bk-map/perform-tasks', params)
                .then((res) => {
                    let result = res.data
                    if (result.code === 0) {
                        this.codeUrl = result.data.url
                        this.shareId = result.data.share_id
                        this.userMobile = res.data.data.user_mobile;
                        this.userWechat = res.data.data.user_wechat;
                        // 分享结果
                        this.shareFlag = true
                        localStorage.setItem("moreHouseInfo", JSON.stringify(this.paramArr))
                        this.initUpload = false
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        // 综述校验
        compModleState() {
            this.summaryArr.forEach((item, index) => {
                var num = 0
                item.house.forEach((house, ind) => {
                    if (house.summary != '' && house.star != 0) {
                        house.state = true
                        num++
                    } else {
                        house.state = false
                    }
                })
                if (num > 0 && item.project.summary.trim() != '') {
                    item.project.proSta = true
                } else {
                    item.project.proSta = false
                }
            })
        },
        // 查看更多
        seeDetail(para) {
            window.open(para, '_blank');
        },

        // 二维码上传组件
        codeUpload() {
            let that = this
            // 定义 plupload 对象
            function setUploadParam(up, filename, ret) {
                let fileName = ''
                if (filename && typeof filename == 'string') {
                    fileName = CommonMethods.trimAll(filename)
                }
                let keyName = that.signs.dir + moment().format('X') + CommonMethods.random_string(6) + fileName
                let newMultipartParams = {
                    key: keyName,
                    policy: that.signs.policy,
                    OSSAccessKeyId: that.signs.accessid,
                    success_action_status: 200, // 默认是 204
                    signature: that.signs.signature
                }
                up.setOption({
                    'url': that.signs.host,
                    'multipart_params': newMultipartParams
                })
                up.start()
                return keyName
            }
            let codeUploader = new plupload.Uploader({
                multi_selection: false, // 禁止多文件上传
                browse_button: 'uploadCode', // 触发文件上传的按钮 id（传入的参数）
                url: that.signs.host, // 服务器的地址，与提供的阿里云的地址一致
                flash_swf_url: '../../../static/js/moxie.swf',
                filters: {
                    mime_types: [
                        {
                            title: 'Image files',
                            extensions: 'jpg,png,jpeg' // 允许上传的文件类型
                        }
                    ],
                    prevent_duplicates: true // 不允许上传重复文件
                },
                init: {
                    // 文件添加到上传队列后
                    FilesAdded: function (up, files) {
                        setUploadParam(up, files[0].name, false)
                    },
                    FileUploaded: function (up, file, info) {
                        // file 里可以得到压缩率
                        if (info.status === 200) {
                        } else if (info.status === 203) {
                            alert('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response)
                        } else {
                            alert(info.respose)
                        }
                    },
                    BeforeUpload: function (up, file) {
                        that.upCodeFile = '/' + setUploadParam(up, file.name, true)
                    },
                    UploadComplete: function (up, file) {
                        // 上传成功后
                        that.employeeInfo.wx_qrcode = that.upCodeFile
                    },
                    // 错误信息
                    Error: function (up, err) {
                        if (err.code === -600) {
                            alert('图片大小不能超过' + maxSize)
                        } else if (err.code === -601) {
                            alert('文件类型不正确')
                        } else if (err.code === -602) {
                            alert('已上传过')
                        } else {
                            alert(err)
                        }
                    }
                }
            })
            codeUploader.init()
        },
        // 点击上一步下一步
        stepToStep(para) {
            if (para === 0 && this.swiperIndex > 0) {
                // 点击上一步
                this.selectContent(parseInt(this.swiperIndex) - 1)
                // 埋点
                CommonMethods.setTrack('4158', this.trackMessages, {}, this.backendApi)
            } else if (para === 1) {
                if (this.swiperIndex === this.swiperArr.length - 1 && this.shareBtn) {
                    // 开始分享
                    this.moreShare()
                } else if (this.swiperIndex < this.swiperArr.length - 1) {
                    this.selectContent(parseInt(this.swiperIndex) + 1)
                }
                // 埋点
                CommonMethods.setTrack('4159', this.trackMessages, {}, this.backendApi)
            }
        },
        // 添加户型
        addCusHouse(para, index) {
            let obj = {
                id: moment().format('X') + parseInt(Math.random() * 1000),
                project_id: para.project_id,
                type: 2, // type为2时为自定义添加的
                custom_type: true, // 不是系统中的自定义 手动刚添加的自定义
                name: '',// 户型名称
                square_metre: '', // 平米数
                apartment_type: '2', // 自定义添加
                status: true, // 是否选中
                room: '', // 户型
                house_status: '' // 销售状态
            }
            let base = this.affirmHouseArr[index]
            base.customHouse.push(obj)
            this.$set(this.affirmHouseArr, index, base)
            // 更新确认按钮状态
            this.shareStatus = false
        },
        // 删除户型时
        removeHou(para, curIndex, curId, type) {
            if (type == 1) {
                this.affirmHouseArr.forEach((item, ind) => {
                    if (item.project_id == para.project_id) {
                        this.affirmHouseArr[ind].houseType.forEach((ele) => {
                            if (ele.id == curId) {
                                this.affirmHouseArr[ind].houseType.splice(curIndex, 1)
                                let house = this.affirmHouseArr[ind]
                                this.$set(this.affirmHouseArr, ind, house)
                            }
                        })
                    }
                })
            }
            if (type == 2) {
                this.affirmHouseArr.forEach((item, ind) => {
                    if (item.project_id == para.project_id) {
                        this.affirmHouseArr[ind].customHouse.forEach((ele) => {
                            if (ele.id == curId) {
                                this.affirmHouseArr[ind].customHouse.splice(curIndex, 1)
                                let cus = this.affirmHouseArr[ind]
                                this.$set(this.affirmHouseArr, ind, cus)
                            }
                        })
                    }
                })
            }
            this.dialogVerify()
        },
        /**
         * 点击户型时
         * @param {object} curObj 当前户型
         * @param {number} index 当前户型索引
         * @param {string} curId 户型id
         */
        typeChange(curObj, index, curId) {
            this.affirmHouseArr.forEach((item) => {
                item.houseTypes.forEach((hou) => {
                    if (hou.id == curId) {
                        if (hou.apartment_type == 1) {
                            item.houseType.push(hou)
                        } else {
                            item.customHouse.push(hou)
                        }
                    }
                })
            })
            this.dialogVerify()
            curObj.houseName = ''
            this.getHouseType(curObj, index)
        },
        // 获取楼盘户型
        getHouseType(para, index) {
            // 清空户型数据
            this.affirmHouseArr[index].houseTypes = []
            // 系统 type为1
            let sys = []
            // 自定义 type 2
            let custom = []
            para.houseType.forEach((item, ind) => {
                if (item.apartment_type == 1 && item.type == 1) {
                    let obj = {
                        id: item.id
                    }
                    sys.push(obj)
                }
                if (item.apartment_type == 2 && item.type == 1) {
                    let obj = {
                        id: item.id
                    }
                    custom.push(obj)
                }
            })
            para.customHouse.forEach((item, ind) => {
                if (item.apartment_type == 2 || item.type == 1) {
                    let obj = {
                        id: item.id
                    }
                    custom.push(obj)
                }
            })

            let params = {
                type: '8',
                project_id: para.project_id,
                order_id: this.$route.query.order_id,
                system_apartment: sys,
                customize_apartment: custom
            }
            this.axios.post('/backend-api/bk-map/perform-tasks', params)
                .then((res) => {
                    let result = res.data
                    if (result.code === 0) {
                        let arr = result.data
                        let sum = []
                        arr.forEach((item, ind) => {
                            let obj = {
                                id: item.id,
                                name: item.name,
                                apartment_type: item.apartment_type,
                                type: '1', // 系统户型
                                text: item.name + ' ' + item.house_type_num + ' ' + item.square_metre + 'm²',
                                square_metre: item.square_metre
                            }
                            sum.push(obj)
                        })
                        this.affirmHouseArr[index].houseTypes = sum
                        let hou = this.affirmHouseArr[index]

                        this.$set(this.affirmHouseArr, index, hou)
                    }
                })
        },
        // 删除当前楼盘
        removeHouseType(para, index) {
            this.affirmHouseArr.forEach((house, ind) => {
                if (house.project_id == para.project_id) {
                    // this.affirmHouseArr[ind].state = false

                    this.affirmHouseArr.splice(ind, 1)
                }
            })
            this.dialogVerify()
        },
        // 选中楼盘
        affirmHouse(val) {
            let baseArr = {
                houseName: '', // 绑定选中值用
                customHouse: [], // 自定义户型
                houseTypes: [], // 户型下拉使用
                houseType: [], // 当前选中户型
                project_name: val.name,
                state: true
            }
            var flag = true
            this.affirmHouseArr.forEach((pro) => {
                if (pro.project_id == val.project_id) {
                    flag = false
                }
            })
            if (flag) {
                let obj = Object.assign({}, val, baseArr)
                this.affirmHouseArr.push(obj)
                let num = 0;
                this.affirmHouseArr.forEach(item => {
                    if (item.state) {
                        num++;
                        item.number = num;
                    }
                })
                this.buildName = ''
                this.dialogVerify()
                // 更新确认按钮状态
                this.shareStatus = false
            } else {
                this.buildName = ''
            }
        },
        // 搜索楼盘
        searchHouse(val, cb) {
            let that = this
            if (val) {
                // 隐藏历史记录模块
                var list = [{}]
                let params = {
                    projectName: val,
                    cityId: this.cityId,
                    order_id: this.$route.query.order_id
                }
                this.axios.get('/backend-api/select2/select2/get-projects', { params: params })
                    .then((res) => {
                        let result = res.data
                        if (result.code === 0) {
                            // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                            for (let i of result.data) {
                                i.value = i.name // 将想要展示的数据作为value
                            }
                            list = result.data
                            cb(list)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                cb([])
            }
        },
        // 关闭弹窗
        cancelDialog() {
            this.dialogVisible = false
        },
        // 弹窗点击确定 请求数据
        submitBtn() {
            this.houseOverView = []
            let custom = []
            let system = []
            this.affirmHouseArr.forEach((item, index) => {
                if (item.state) {
                    item.customHouse.forEach((it, ind) => {
                        let obj = {
                            project_id: item.project_id,
                            sign: it.id,
                            apartment_name: it.name,
                            square_metre: it.square_metre,
                            room_type: it.room,
                            house_status: it.house_status
                        }
                        if (it.type == 2 && it.status) {
                            custom.push(obj)
                        }
                        if (it.type == 1) {
                            let obj = {
                                projectId: item.project_id,
                                houseType: it.id,
                                apartmentType: it.apartment_type
                            }
                            system.push(obj)
                        }
                    })
                    item.houseType.forEach((it, ind) => {
                        let obj = {
                            projectId: item.project_id,
                            houseType: it.id,
                            apartmentType: it.apartment_type
                        }
                        system.push(obj)
                    })
                }
            })
            if (custom.length > 0) {
                let params = {
                    type: 7,
                    order_id: this.$route.query.order_id,
                    apartment_data: custom
                }
                // 先把手动新增的户型 添加一遍 返回值之后和过滤出来的系统已选的户型合并
                this.axios.post('/backend-api/bk-map/perform-tasks', params)
                    .then((res) => {
                        let result = res.data
                        if (result.code === 0) {
                            this.affirmHouseArr.forEach((pro) => {
                                result.data.forEach((item) => {
                                    if (item.projectId == pro.project_id) {
                                        pro.customHouse.forEach((type) => {
                                            if (type.id == item.sign) {
                                                type.type = 1
                                                type.id = item.houseType
                                                type.apartment_type = 2
                                            }
                                        })
                                    }
                                })
                            })
                            let sum = result.data.map((item) => {
                                let obj = {
                                    houseType: item.houseType,
                                    apartmentType: item.apartmentType,
                                    projectId: item.projectId
                                }
                                return obj
                            })
                            this.paramArr = system.concat(sum)
                        }
                    }).then(() => {
                        this.getData(this.paramArr)
                        this.dialogVisible = false
                    })
            } else {
                this.paramArr = system
                this.getData(system)
                this.dialogVisible = false
            }
            this.affirmHouseArrBase = this.deepCopy(this.affirmHouseArr)
        },
        // 给地图画线工具切换
        lineTraffic() {
            this.markBase.forEach((info) => {
                // 清空画的上个路线
                this.mapPreview.removeOverlay(info.overLayId)
                this.mapPreview.removeOverlay(info.markStart)
                this.mapPreview.removeOverlay(info.markEnd)
                this.mapPreview.removeOverlay(info.label)
                this.mapPreview.removeOverlay(info.labelEnd)

                this.mapPreviewSecon.removeOverlay(info.overLayId)
                this.mapPreviewSecon.removeOverlay(info.markStart)
                this.mapPreviewSecon.removeOverlay(info.markEnd)
                this.mapPreviewSecon.removeOverlay(info.label)
                this.mapPreviewSecon.removeOverlay(info.labelEnd)
            })
            if (this.currenMap == 'drive') {
                // 驾车画线
                if (this.firAddress) {
                    this.carInfoArr.forEach((carInfo, index) => {
                        if (carInfo && carInfo.driveRoute && carInfo.driveRoute.length > 0) {
                            let routeData = carInfo.driveRoute
                            let start = routeData[0].path.split(';')[0].split(',')
                            let endArr = routeData[routeData.length - 1].path.split(';')
                            let end = endArr[endArr.length - 1].split(',')
                            this.marker.origin.lng = start[0] - 0
                            this.marker.origin.lat = start[1] - 0
                            this.marker.destination.lng = end[0] - 0
                            this.marker.destination.lat = end[1] - 0
                            if (routeData.length > 0) {
                                this.mPath({ startEnd: this.marker, pointsArr: routeData }, index, true, carInfo.sort, 'mapPreview')
                            } else {
                                this.mPath({ startEnd: this.marker, pointsArr: routeData }, index, false, carInfo.sort, 'mapPreview')
                            }
                        }
                    })
                } else {
                    this.carInfoArrSen.forEach((carInfo, index) => {
                        if (carInfo && carInfo.driveRoute && carInfo.driveRoute.length > 0) {
                            let routeData = carInfo.driveRoute
                            let start = routeData[0].path.split(';')[0].split(',')
                            let endArr = routeData[routeData.length - 1].path.split(';')
                            let end = endArr[endArr.length - 1].split(',')
                            this.markerSen.origin.lng = start[0] - 0
                            this.markerSen.origin.lat = start[1] - 0
                            this.markerSen.destination.lng = end[0] - 0
                            this.markerSen.destination.lat = end[1] - 0
                            if (routeData.length > 0) {
                                this.mPath({ startEnd: this.markerSen, pointsArr: routeData }, index, true, carInfo.sort, 'mapPreviewSecon')
                            } else {
                                this.mPath({ startEnd: this.markerSen, pointsArr: routeData }, index, false, carInfo.sort, 'mapPreviewSecon')
                            }
                        }
                    })
                }
            } else if (this.currenMap == 'car') {
                // 公交画线
                if (this.firAddress) {
                    this.busInfoArr.forEach((busInfo, index) => {
                        if (busInfo && busInfo.driveRoute && busInfo.driveRoute.length > 0) {
                            let routeData = busInfo.driveRoute
                            let start = routeData[0].path.split(';')[0].split(',')
                            let endArr = routeData[routeData.length - 1].path.split(';')
                            let end = endArr[endArr.length - 1].split(',')
                            this.marker.origin.lng = start[0] - 0
                            this.marker.origin.lat = start[1] - 0
                            this.marker.destination.lng = end[0] - 0
                            this.marker.destination.lat = end[1] - 0
                            if (routeData.length > 0) {
                                this.mPath({ startEnd: this.marker, pointsArr: routeData }, index, true, busInfo.sort, 'mapPreview')
                            } else {
                                this.mPath({ startEnd: this.marker, pointsArr: routeData }, index, false, busInfo.sort, 'mapPreview')
                            }
                        }
                    })
                } else {
                    this.busInfoArrSen.forEach((busInfo, index) => {
                        if (busInfo && busInfo.driveRoute && busInfo.driveRoute.length > 0) {
                            let routeData = busInfo.driveRoute
                            let start = routeData[0].path.split(';')[0].split(',')
                            let endArr = routeData[routeData.length - 1].path.split(';')
                            let end = endArr[endArr.length - 1].split(',')
                            this.markerSen.origin.lng = start[0] - 0
                            this.markerSen.origin.lat = start[1] - 0
                            this.markerSen.destination.lng = end[0] - 0
                            this.markerSen.destination.lat = end[1] - 0
                            if (routeData.length > 0) {
                                this.mPath({ startEnd: this.markerSen, pointsArr: routeData }, index, true, busInfo.sort, 'mapPreviewSecon')
                            } else {
                                this.mPath({ startEnd: this.markerSen, pointsArr: routeData }, index, false, busInfo.sort, 'mapPreviewSecon')
                            }
                        }
                    })
                }
            }
        },
        // 转换公交文字
        transName(para) {
            let txt = ''
            if (para == 1) {
                txt = '公交'
            } else {
                txt = '地铁'
            }
            return txt
        },
        transNum(para) {
            if (para == 1) {
                return '一'
            }
            if (para == 2) {
                return '两'
            }
            if (para == 3) {
                return '三'
            }
            if (para == 4) {
                return '四'
            }
            if (para == 5) {
                return '五'
            }
            if (para == 6) {
                return '六'
            }
            if (para == 7) {
                return '七'
            }
            if (para == 8) {
                return '八'
            }
            if (para == 9) {
                return '九'
            }
            if (para == 10) {
                return '十'
            }
        },
        // 计算价格
        disposePrice(arr) {
            let baseArr = []
            arr.forEach((item, index) => {
                let price = parseFloat(item.square_metre) > 0 ? parseFloat(item.square_metre) : 1
                let sing
                if (item.house_status == '4' && item.total_price != item.total_price_max != '') {
                    sing = parseFloat(item.total_price / price / 10000) + '-' + parseFloat(item.total_price_max / price / 10000).toFixed(2)
                } else if (item.house_status == '4' && item.total_price != '' || item.house_status != '4') {
                    sing = parseFloat(item.total_price / price / 10000).toFixed(2)
                }

                let obj = {
                    apartment_type: item.apartment_type,
                    id: item.id,
                    name: item.name,
                    project_id: item.project_id,
                    project_name: item.project_name,
                    square_metre: item.square_metre,
                    total_price: item.total_price == '' ? '' : parseFloat(item.total_price / 10000),
                    single_price: sing,
                    total_price_max: item.total_price_max == '' ? '' : parseFloat(item.total_price_max / 10000),
                    district_name: item.district_name,
                    house_status: item.house_status,
                    apartment_pic: item.apartment_pic
                }
                baseArr.push(obj)
            })
            return baseArr
        },
        // 周边价格中 周边/二手房房价是否展示
        disposeRimPrice() {
            let a = 0,
                b = 0
            this.rimData.forEach((item, index) => {
                if (item.landShow == 1) { // 有一个不展示的 就设置为不展示
                    a++
                }
                if (item.secondShow == 1) {
                    b++
                }
            })
            if (a > 0) {
                this.rimObj.rimLand = false
            }
            if (b > 0) {
                this.rimObj.rimSecond = false
            }
            // 如果模块不显示 高度会变 重新计算
            setTimeout(() => {
                this._calculateHeight()
            })
        },
        // 初始化页面
        getData(arr) {
            this.isLoading = true
            this.spanOneArr = []
            var params = {
                order_id: this.$route.query.order_id,
                type: '5',
                share_id: this.shareId
            }
            if (this.shareId == '') {
                params.project_data = arr
            }
            this.axios.post('/backend-api/bk-map/perform-tasks', params)
                .then((res) => {
                    let result = res.data
                    if (result.code === 0) {
                        let Data = result.data
                        // 客户需求
                        this.userRequire = Data.user_require
                        // 用户数据
                        this.userInfo = Data.userInfo
                        // 楼盘信息
                        this.houseAddress = Data.districtArr
                        // 用户信息
                        this.employeeInfo = Data.employeeInfo
                        // 概览数据
                        this.houseOverView = this.disposePrice(Data.overView)
                        // 周边价格
                        this.rimData = Data.peripheryPrice
                        // 通勤路线
                        this.houseAddressArr = Data.commuterLine.project_addr
                        // 语音
                        this.voiceData = Data.voiceInfo
                        // 设置为否的数量
                        var sum = ''
                        this.voiceData.forEach((voice) => {
                            voice.isPlay = false
                            if (!voice.url) {
                                voice.isDisabled = true
                                voice.voice_is_show = '1'
                                sum++
                            } else {
                                voice.isDisabled = false
                            }
                        })
                        if (sum == this.voiceData.length) {
                            this.isShowVioc = false
                        }
                        if (Data.employeeInfo.id && Data.employeeInfo.id != '') {
                            this.lastModuleBox = true
                            // 个人资料状态
                            if (Data.employeeInfo && Data.employeeInfo.tag && Data.employeeInfo.tag.length > 0) {
                                this.curStatu = true
                            }
                            if (Data.employeeInfo && Data.employeeInfo.wx_qrcode != '') {
                                this.curQrcode = true
                            }
                        } else if (Data.employeeInfo.id == '') {
                            this.lastModuleBox = false
                            this.swiperArr.splice(6, 1)
                        }
                        let time = (Data.peripheryPrice && Data.peripheryPrice.length > 0) ? Data.peripheryPrice[0].price_update_datetime : ''
                        this.updataTime = new Date(time * 1000)

                        // 周边交通
                        this.trafficData = Data.peripheralTraffic
                        // 综述
                        this.summaryArr = Data.summaryArr
                        // 通勤地址
                        this.addressArr = Data.commuterLine.work_addr
                        // 需求地址
                        if (Data.commuterLine.work_addr.length > 0) {
                            this.addressObj = Data.commuterLine.work_addr[0]
                            this.commutAddress = Data.commuterLine.work_addr[0].address
                            if (Data.commuterLine.work_addr[0].address !== '') {
                                this.setCommuFlag = true
                            }
                            if (this.addressObjSen.address != '') {
                                this.addressObjSen = {
                                    address: "",
                                    lat: "",
                                    lng: ""
                                };
                            }
                        }
                        if (Data.commuterLine.work_addr.length > 1) {
                            this.addressObjSen = Data.commuterLine.work_addr[1]
                            this.commutAddressSen = Data.commuterLine.work_addr[1].address
                            if (Data.commuterLine.work_addr[0].address !== '') {
                                this.setCommuFlagSen = true
                            }
                        }
                        // 个人资料模块
                        let qaList = this.employeeInfo.qa ? this.employeeInfo.qa : []
                        if (qaList == 'undifined') {
                            qaList = []
                        }
                        if (qaList.length > 0) {
                            // 记录当前人应该选择几个问答
                            if (qaList.length > 1) {
                                this.defaultQaNum = 2
                            } else {
                                this.defaultQaNum = 1
                            }
                            let qaListSele = qaList.filter(item => item.selected == 0)
                            // 如果超过两个，则只取前两个
                            if (qaListSele.length > 2) {
                                this.qaListSele = qaListSele.slice(0, 2)
                                this.chosenItemIndex = 2
                            } else {
                                this.qaListSele = qaListSele
                                this.chosenItemIndex = qaListSele.length
                            }
                            this.qaSelectedList = JSON.parse(JSON.stringify(this.qaListSele))
                            this.qaList = qaList.filter(item => item.selected != 0)
                        } else {
                            this.defaultQaNum = 0
                        }
                        // 首付比例 ==============  看是否需要转换
                        if (Data.loanInfo.down_payments != '') {
                            this.loanObj.payFir = parseInt(Data.loanInfo.down_payments)
                        }
                        if (Data.loanInfo.lending_rate != '') {
                            this.loanObj.loanTex = Data.loanInfo.lending_rate
                        }
                        if (Data.loanInfo.loan_term != '') {
                            this.loanObj.loanYear = parseInt(Data.loanInfo.loan_term)
                        }
                        // 弹窗数据
                        this.affirmHouseArr = Data.popData
                        let num = 0
                        this.affirmHouseArr.forEach((item, index) => {
                            item.houseName = ''
                            item.houseTypes = []  // 户型下拉
                            item.state = true;

                            if (item.state) {
                                num++
                                item.number = num
                            }
                            var typeOne = []
                            var typeTwo = []
                            item.houseType.forEach((hosue, inde) => {
                                if (hosue.apartment_type == 1) {
                                    hosue.text = hosue.name + ' ' + hosue.house_type_num + ' ' + hosue.square_metre + 'm²'
                                    hosue.type = hosue.apartment_type ? hosue.apartment_type : '1'
                                    typeOne.push(hosue)
                                }
                                if (hosue.apartment_type == 2) {
                                    hosue.status = true
                                    hosue.text = hosue.name + ' ' + hosue.house_type_num + ' ' + hosue.square_metre + 'm²'
                                    hosue.type = hosue.apartment_type ? hosue.apartment_type : '1'
                                    typeTwo.push(hosue)
                                }
                            })
                            item.houseType = typeOne
                            item.customHouse = typeTwo
                        })
                        this.affirmHouseArrBase = this.deepCopy(this.affirmHouseArr)
                        if (this.affirmHouseArr.length > 0) {
                            //  取消按钮是否可点 
                            this.cancleStatus = true
                        }

                        // 用户需求，判断是否展示范围值
                        // 总价
                        this.totalPrice = this.userRequire.total_price
                        this.firstPrice = this.userRequire.first_price
                        this.acreage = this.userRequire.acreage
                        this.$set(this.totalPrice, 'isMore', true)
                        this.$set(this.firstPrice, 'isMore', true)
                        this.$set(this.acreage, 'isMore', true)
                        if (this.totalPrice.value_max !== '' && this.totalPrice.value_max !== null && this.totalPrice.value_min !== '' && this.totalPrice.value_min !== null && (this.totalPrice.value_max != this.totalPrice.value_min)) {
                            // 判断最大值和最小值都有值并且不是null
                            this.totalPrice.isMore = true
                        } else {
                            this.totalPrice.isMore = false
                            // 不显示范围，最大值置空
                            this.totalPrice.value_max = ''
                        }
                        // 首付
                        if (this.firstPrice.value_max !== '' && this.firstPrice.value_max !== null && this.firstPrice.value_min !== '' && this.firstPrice.value_min !== null && (this.firstPrice.value_max != this.firstPrice.value_min)) {
                            // 判断最大值和最小值都有值并且不是null
                            this.firstPrice.isMore = true
                        } else {
                            this.firstPrice.isMore = false
                            // 不显示范围，最大值置空
                            this.firstPrice.value_max = ''
                        }
                        // 面积
                        if (this.acreage.value_max !== '' && this.acreage.value_max !== null && this.acreage.value_min !== '' && this.acreage.value_min !== null && (this.acreage.value_max != this.acreage.value_min)) {
                            // 判断最大值和最小值都有值并且不是null
                            this.acreage.isMore = true
                        } else {
                            this.acreage.isMore = false
                            // 不显示范围，最大值置空
                            this.acreage.value_max = ''
                        }
                    } else {
                        this.isLoading = false
                    }
                    var arr = []
                    this.affirmHouseArr.forEach((item, index) => {
                        if (item.state == true) {
                            arr.push(item)
                        }
                    })
                    // 弹窗校验
                    this.dialogVerify()
                }).then(() => {
                    this.editPerInfo()
                    try {
                        // 实例化地图
                        this.initMap()
                        this.initMapSecon()
                    } catch (e) {
                        console.log(e)
                    }
                    if (this.initUpload) {
                        // 实例化二维码上传
                        this.codeUpload()
                    }
                    if (this.initUpload) {
                        // 动态实例化上传图片插件
                        for (let i = 0; i < this.houseOverView.length; i++) {
                            this.houseOverView[i].picId = moment().format('X') + parseInt(Math.random() * 1000)
                            this.houseOverView[i].isPic = false
                            setTimeout(() => {
                                this.initPlupload(this.houseOverView[i].picId, i)
                            })
                        }
                    }
                    // 遍历数据添加标识
                    this.compModleState()
                    // 表格
                    this.eachTableData()
                    // 周边价格
                    this.disposeRimPrice()
                    // 初始化滚动
                    this._initScroll()
                    let imgWrap = document.getElementsByClassName('right-box-pre')[0]
                    let imgs = imgWrap.getElementsByTagName('img')

                    this.$nextTick(() => {
                        // 计算滚动高度列表
                        this._calculateHeight()
                    })
                    this.isLoading = false
                    this.isFirst = false
                })
                .catch((err) => {
                    console.log(err)
                    this.isLoading = false
                })
        },
        editPerInfo() {
            if (!this.lastModuleBox) {
                return
            }
            // 大于1条
            if (this.defaultQaNum > 1) {
                this.checkQa = this.qaSelectedList.length > 1 ? true : false
            } else if (this.defaultQaNum == 1) {  // 等于1条
                this.checkQa = this.qaSelectedList.length == 1 ? true : false
            } else {
                this.checkQa = true
            }
            if (this.checkQa && this.curQrcode && this.curStatu) {
                this.swiperArr[6].isOk = true
            } else {
                this.swiperArr[6].isOk = false
            }
        },
        // 请求oss上传设置参数
        getSign() {
            let params = {
                cate: 'sop_web'
            }
            this.axios.post('/backend-api/bk-api-upload/get-upload-sign', params).then((res) => {
                if (res.data.code === 0) {
                    this.signs = res.data.data
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 初始化上传插件
        initPlupload(id, picIndex) {
            // http://comjia-1.oss-cn-beijing.aliyuncs.com/sop_web/icon-@2x.png
            let that = this
            var maxSize = '2mb'
            // 定义 plupload 对象
            function setUploadParam(up, filename, ret) {
                let fileName = ''
                if (filename && typeof filename == 'string') {
                    fileName = CommonMethods.trimAll(filename)
                }
                let keyName = that.signs.dir + moment().format('X') + CommonMethods.random_string(6) + fileName
                let newMultipartParams = {
                    key: keyName,
                    policy: that.signs.policy,
                    OSSAccessKeyId: that.signs.accessid,
                    success_action_status: 200, // 默认是 204
                    signature: that.signs.signature
                }
                up.setOption({
                    'url': that.signs.host,
                    'multipart_params': newMultipartParams
                })
                up.start()
                return keyName
            }
            that.uploader[picIndex] = new plupload.Uploader({
                mulit_selection: false, // 禁止多文件上传
                browse_button: id, // 触发文件上传的按钮 id（传入的参数）
                url: that.signs.host, // 服务器的地址，与提供的阿里云的地址一致
                flash_swf_url: '../../../static/js/moxie.swf',
                filters: {
                    mime_types: [
                        {
                            title: 'Image files',
                            extensions: 'jpg,png,jpeg' // 允许上传的文件类型
                        }
                    ],
                    max_file_size: maxSize, // 允许上传的最大尺寸
                    prevent_duplicates: true // 不允许上传重复文件
                },
                init: {
                    // 文件添加到上传队列后
                    FilesAdded: function (up, files) {
                        for (let i = 0; i < that.uploader.length; i++) {
                            if (up.id === that.uploader[i].id) {
                                that.currenUpId = i
                                break
                            }
                        }
                        setUploadParam(up, files[0].name, false)
                    },
                    FileUploaded: function (up, file, info) {
                        // file 里可以得到压缩率
                        if (info.status === 200) {
                        } else if (info.status === 203) {
                            alert('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response)
                        } else {
                            alert(info.respose)
                        }
                    },
                    BeforeUpload: function (up, file) {
                        that.upFile = setUploadParam(up, file.name, true)
                    },
                    UploadComplete: function (up, file) {
                        // 上传成功后，匹配户型，赋值图片路径
                        that.houseOverView[that.currenUpId].apartment_pic = '/' + that.upFile
                        that.houseOverView[that.currenUpId].isPic = true
                        // 埋点
                        CommonMethods.setTrack('4165', that.trackMessages, {}, that.backendApi)
                    },
                    // 错误信息
                    Error: function (up, err) {
                        if (err.code === -600) {
                            alert('图片大小不能超过' + maxSize)
                        } else if (err.code === -601) {
                            alert('文件类型不正确')
                        } else if (err.code === -602) {
                            alert('已上传过')
                        } else {
                            alert(err)
                        }
                    }
                }
            })
            that.uploader[picIndex].init()
        },
        // 周边交通删除
        delItem(proId, indexes, para) {
            this.trafficData.forEach((item, index) => {
                // 匹配当前楼盘
                if (item.project_id == proId) {
                    // 请求接口删除数据库中的数据
                    let params = {
                        type: 11,
                        traffic_id: item.traffic_data[indexes].traffic_id,
                        project_id: proId,
                        order_id: this.$route.query.order_id,
                        share_id: this.shareId
                    }
                    this.axios.post('/backend-api/bk-map/perform-tasks', params)
                        .then((res) => {
                            if (res.data.code === 0) {
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    // 删除当前行
                    item.traffic_data.splice(indexes, 1)
                }
            })
        },
        checkContent(para) {
            let openNum = 0
            para.traffic_data.forEach((traffic) => {
                if (traffic.is_show == 0) {
                    openNum++
                }
            })
            if (openNum == 5) {
                this.$message({
                    message: '小程序中每个楼盘最多只能展示 5 条交通站点',
                    duration: 1000,
                    type: 'warning'
                })
                return
            }
            // 展示少于5时点击才能添加
            let projectId = para.project_id
            this.trafficData.forEach((item, index) => {
                if (item.project_id == projectId) {
                    let obj = {
                        distance: '',
                        is_show: 0,
                        project_id: item.project_id,
                        station_name: '',
                        traffic_category: '2',
                        traffic_id: 0,
                        traffic_name: "",
                        traffic_type: 2,
                    }
                    item.traffic_data.push(obj)
                }
            })
            // 埋点
            CommonMethods.setTrack('4167', this.trackMessages, {}, this.backendApi)
        },
        // 初始化地图
        initMap() {
            this.mapPreview = {}
            // 预览的地图
            this.mapPreview = new BMap.Map('previewMap')
            this.mapPreview.centerAndZoom(this.cityName, 11)
            // 初始化input框
            this.setSearch()
            // 默认请求通勤
            this.getCommuInfo()
        },
        // 初始化第二个地图
        initMapSecon() {
            // 根据城市名字获取中心点
            this.mapPreviewSecon = new BMap.Map('previewMapSec')
            this.mapPreviewSecon.centerAndZoom(this.cityName, 11)
            if (this.addressArr.length > 1) {
                // 初始化input框
                this.setSearchSec()
            }
            // 默认请求通勤
            this.getCommuInfoSec()
        },
        // 初始化百度搜索输入框
        setSearchSec() {
            let that = this
            if (JSON.stringify(this.acSecon) != '{}') {
                this.acSecon.dispose()
            }
            // 建立一个自动完成的对象
            this.acSecon = new BMap.Autocomplete({ input: 'searchHouSen', location: that.cityNames[0] })
            if (this.addressObjSen.address) {
                this.acSecon.setInputValue(this.addressObjSen.address);
            }
            let myValue
            // 鼠标点击下拉列表后的事件
            this.acSecon.addEventListener('onconfirm', (e) => {
                if (e && e.preventDefault) {
                    e.preventDefault()
                } else {
                    let _value = e.item.value
                    myValue = _value.province + _value.city + _value.district + _value.street + _value.business
                    this.$refs.commuInputSen.blur()
                    // 点击了通勤下拉
                    this.setCommuFlagSen = true
                    that.setPlaceSen(myValue)
                }
            })
        },
        // 初始化百度搜索输入框
        setSearch() {
            let that = this
            if (JSON.stringify(this.ac) != '{}') {
                this.ac.dispose()
            }
            // 建立一个自动完成的对象
            this.ac = new BMap.Autocomplete({ input: 'searchHou', location: that.cityNames[0] })
            if (this.addressObj.address) {
                this.ac.setInputValue(this.addressObj.address);
            }
            let myValue
            // 鼠标点击下拉列表后的事件
            this.ac.addEventListener('onconfirm', (e) => {
                if (e && e.preventDefault) {
                    e.preventDefault()
                } else {
                    let _value = e.item.value
                    myValue = _value.province + _value.city + _value.district + _value.street + _value.business
                    this.$refs.commuInput.blur()
                    // 点击了通勤下拉
                    this.setCommuFlag = true
                    that.setPlace(myValue)
                }
            })
        },
        // 通勤搜索
        getCommuInfo() {
            this.firstLoading = true;
            this.carInfoArr = [];
            this.busInfoArr = [];
            this.addressTableFir = [];
            // 需要终点经纬度
            var startPoint = [];
            if (this.addressObj.lng != '' && this.addressObj.lat != '' && this.houseAddressArr.length > 0) {
                this.houseAddressArr.forEach((houseInfo, index) => {
                    houseInfo.sort = index + 1;
                    let params = {
                        project_id: houseInfo.project_id,
                        share_id: this.shareId,
                        commute_lng: this.addressObj.lng,
                        commute_lat: this.addressObj.lat,
                        sort_id: index + 1
                    };
                    this.axios.post('/backend-api/bk-map/get-commute-info', params)
                        .then((res) => {
                            if (res.data.code === 0) {
                                var result = res.data.data;
                                if (JSON.stringify(result.car) == '{}') {
                                    this.carInfoArr.push({
                                        sort: result.sort_id
                                    })
                                } else {
                                    let obj = result.car;
                                    obj.sort = result.sort_id;
                                    this.carInfoArr.push(obj);
                                }
                                if (JSON.stringify(result.bus) == '{}') {
                                    this.busInfoArr.push({
                                        sort: result.sort_id
                                    })
                                } else {
                                    let buss = result.bus;
                                    buss.bus_transit_time = result.bus_transit_time;
                                    buss.bus_walk_time = result.bus_walk_time;
                                    buss.bus_duration = result.bus_duration;
                                    buss.sort = result.sort_id;
                                    this.busInfoArr.push(buss);
                                }
                                this.addressTableFir.push(result);

                                this.carInfoArr = this.carInfoArr.sort(compare('sort'));
                                this.busInfoArr = this.busInfoArr.sort(compare('sort'));
                                this.addressTableFir = this.addressTableFir.sort(compare('sort_id'));
                                if (this.addressTableFir && this.addressTableFir.length > 0) {
                                    this.isWalkCheckFir = this.addressTableFir[0].is_walk_show == '0' ? true : false
                                }
                            } else {
                                this.firstLoading = false;
                            }
                        }).then(() => {
                            // 开始画线，默认画自驾
                            if (this.carInfoArr.length > 0) {
                                this.lineTraffic();
                            }
                            this.addressTableFir = this.unique(this.addressTableFir, 'sort_id')
                            this.addressTableFir.forEach((item, index) => {
                                this.houseAddressArr.forEach((house, ind) => {
                                    if (item.sort_id == house.sort) {
                                        item.start_address = house.project_name;
                                    }
                                })
                            })
                            setTimeout(() => {
                                this._calculateHeight();
                            })
                        })
                        .catch((err) => {
                            this.firstLoading = false;
                            console.log(err)
                        })
                })
            } else {

                var that = this;
                this.addressTableFir = this.houseAddressArr.map((project, index) => {
                    project.sort = index + 1;
                    let obj = {};
                    obj.start_address = project.project_name;
                    obj.bus_transit_time = '';
                    obj.bus_walk_time = '';
                    obj.drive_time = '';
                    obj.bus_duration = '';
                    obj.sort_id = index + 1;
                    that.carInfoArr.push({
                        sort: index + 1
                    })
                    that.busInfoArr.push({
                        sort: index + 1
                    })
                    return obj;
                })
                that.carInfoArr = that.carInfoArr.sort(compare('sort'));
                that.busInfoArr = that.busInfoArr.sort(compare('sort'));
                that.addressTableFir = that.addressTableFir.sort(compare('sort_id'));
                that.addressTableFir = that.unique(that.addressTableFir, 'sort_id');
                this.addressTableFir.forEach((item, index) => {
                    this.houseAddressArr.forEach((house, ind) => {
                        if (item.sort_id == house.sort) {
                            item.start_address = house.project_name;
                        }
                    })
                })

                // 开始画线，默认画自驾
                if (that.carInfoArr.length > 0) {
                    that.lineTraffic();
                }
                setTimeout(() => {
                    that._calculateHeight();
                })
            }

            // 根据id排序 从小到大 确保每次数据能按照顺序执行
            function compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            }
        },
        // 通勤搜索
        getCommuInfoSec() {
            this.secondLoading = true;
            this.carInfoArrSen = [];
            this.busInfoArrSen = [];
            this.addressTableSec = [];
            var startPointSen = [];
            var flag = false;
            if (this.addressObjSen.lng != '' && this.addressObjSen.lat != '' && this.houseAddressArr.length > 0) {
                // 需要终点经纬度
                this.houseAddressArr.forEach((houseInfo, index) => {
                    houseInfo.sort = index + 1
                    let params = {
                        project_id: houseInfo.project_id,
                        share_id: this.shareId,
                        commute_lng: this.addressObjSen.lng,
                        commute_lat: this.addressObjSen.lat,
                        sort_id: index + 1
                    };
                    this.axios.post('/backend-api/bk-map/get-commute-info', params)
                        .then((res) => {
                            if (res.data.code === 0) {
                                var result = res.data.data;
                                if (JSON.stringify(result.car) == '{}') {
                                    this.carInfoArrSen.push({
                                        sort: result.sort_id
                                    })
                                } else {
                                    let obj = result.car;
                                    obj.sort = result.sort_id;
                                    this.carInfoArrSen.push(obj);
                                }
                                if (JSON.stringify(result.bus) == '{}') {
                                    this.busInfoArrSen.push({
                                        sort: result.sort_id
                                    })
                                } else {
                                    let buss = result.bus;
                                    buss.bus_transit_time = result.bus_transit_time;
                                    buss.bus_walk_time = result.bus_walk_time;
                                    buss.bus_duration = result.bus_duration;
                                    buss.sort = result.sort_id;
                                    this.busInfoArrSen.push(buss);
                                }
                                this.addressTableSec.push(result);

                                this.carInfoArrSen = this.carInfoArrSen.sort(compare('sort'));
                                this.busInfoArrSen = this.busInfoArrSen.sort(compare('sort'));
                                this.addressTableSec = this.addressTableSec.sort(compare('sort_id'));
                                if (this.addressTableSec && this.addressTableSec.length > 0) {
                                    this.isWalkCheckSen = this.addressTableSec[0].is_walk_show == '0' ? true : false;
                                }
                            }
                        }).then(() => {
                            this.addressTableSec = this.unique(this.addressTableSec, 'sort_id')
                            this.addressTableSec.forEach((item, index) => {
                                this.houseAddressArr.forEach((house, ind) => {
                                    if (item.sort_id == house.sort) {
                                        item.start_address = house.project_name;
                                    }
                                })
                            })
                            // 开始画线，默认画自驾
                            if (this.carInfoArrSen.length > 0) {
                                this.lineTraffic();
                            }
                            setTimeout(() => {
                                this._calculateHeight();
                            })
                        })
                        .catch((err) => {
                            this.secondLoading = false;
                            console.log(err)
                        })
                })
            }
            else {
                var that = this;
                var commuObjSen;
                let arr = [];
                this.addressTableSec = this.houseAddressArr.map((project, index) => {
                    project.sort = index + 1;
                    let obj = {}
                    obj.start_address = project.project_name;
                    obj.bus_transit_time = '';
                    obj.bus_walk_time = '';
                    obj.drive_time = '';
                    obj.bus_duration = '';
                    obj.sort_id = index + 1
                    that.carInfoArrSen.push({
                        sort: index + 1
                    })
                    that.busInfoArrSen.push({
                        sort: index + 1
                    })
                    return obj;
                })
                that.carInfoArrSen = that.carInfoArrSen.sort(compare('sort'));
                that.busInfoArrSen = that.busInfoArrSen.sort(compare('sort'));
                that.addressTableSec = that.addressTableSec.sort(compare('sort_id'));
                that.addressTableSec = that.unique(that.addressTableSec, 'sort_id');
                this.addressTableSec.forEach((item, index) => {
                    this.houseAddressArr.forEach((house, ind) => {
                        if (item.sort_id == house.sort) {
                            item.start_address = house.project_name;
                        }
                    })
                })
                // 开始画线，默认画自驾
                if (that.carInfoArrSen.length > 0) {
                    that.lineTraffic();
                }
                setTimeout(() => {
                    that._calculateHeight();
                })
            }
            /**
             * 排序函数 传入参数为排序的字段
             * return 从小到大的排序
             */
            function compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            }
        },
        // 匹配经纬度
        setPlaceSen(para) {
            let _this = this
            function myFun() {
                if (local.getResults().getPoi(0)) {
                    let pp = local.getResults().getPoi(0).point
                    _this.addressObjSen.address = para
                    _this.addressObjSen.lat = pp.lat
                    _this.addressObjSen.lng = pp.lng
                    // 计算通勤地址
                    _this.getCommuInfoSec()
                } else {
                    _this.addressObjSen = {
                        address: "",
                        lat: "",
                        lng: ""
                    };
                    _this.$message({
                        showClose: true,
                        message: '请输入其他地址',
                        type: 'warning',
                        duration: 5000
                    });
                    // 计算通勤地址
                    _this.getCommuInfoSec();
                }
            }
            let local = new BMap.LocalSearch(this.mapPreviewSecon, {
                onSearchComplete: myFun
            })
            local.search(para)
        },
        // 匹配经纬度
        setPlace(para) {
            let _this = this
            function myFun() {
                if (local.getResults().getPoi(0)) {
                    let pp = local.getResults().getPoi(0).point
                    _this.addressObj.address = para
                    _this.addressObj.lat = pp.lat
                    _this.addressObj.lng = pp.lng
                    // 计算通勤地址
                    _this.getCommuInfo()
                } else {
                    _this.addressObj = {
                        address: "",
                        lat: "",
                        lng: ""
                    };
                    _this.$message({
                        showClose: true,
                        message: '请输入其他地址',
                        type: 'warning',
                        duration: 5000
                    });
                    // 计算通勤地址
                    _this.getCommuInfo()
                }
            }
            let local = new BMap.LocalSearch(this.mapPreview, {
                onSearchComplete: myFun
            })
            local.search(para)
        },
        // 公交/地铁回显 开始
        //test 北京市天安门 经度：lng:116.38, 纬度：lat:39.9   北京市东城区 lng: 116.42, lat:39.93
        mPath(para, index, flag, sort, type) {
            var contents
            var icon = {}
            var lineColor = ''
            if (index == 0) { // 第一条 蓝色  #47B3E3
                icon = {
                    start: new BMap.Icon(startOne, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#47B3E3'
            } else if (index == 1) {  // 第二条 绿色 #0AD487
                icon = {
                    start: new BMap.Icon(startTwo, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#0AD487'
            } else if (index == 2) { // 第三条   #5DAAF8
                icon = {
                    start: new BMap.Icon(startThree, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#5DAAF8'
            } else if (index == 3) { // 第四条 #378EB5
                icon = {
                    start: new BMap.Icon(startFour, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#378EB5'
            } else if (index == 4) { // 第五条 #08CED9 
                icon = {
                    start: new BMap.Icon(startFive, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#08CED9'
            } else if (index == 5) { // 第六条 #A3DBE1
                icon = {
                    start: new BMap.Icon(startSix, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#A3DBE1'
            } else if (index == 6) { // 第七条 #E09230
                icon = {
                    start: new BMap.Icon(startSeven, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#E09230'
            } else if (index == 7) { // 第八条 #FFA62A 
                icon = {
                    start: new BMap.Icon(startEight, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#FFA62A'
            } else if (index == 8) { // 第九条 #E3CF47
                icon = {
                    start: new BMap.Icon(startNine, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#E3CF47'
            } else if (index == 9) { // 第十条 #FF5C47 
                icon = {
                    start: new BMap.Icon(startTen, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#FF5C47'
            } else {
                icon = {
                    start: new BMap.Icon(startOne, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0),
                        imageSize: new BMap.Size(22, 34)
                    }),
                    end: new BMap.Icon(end, new BMap.Size(40, 40), {
                        imageOffset: new BMap.Size(10, 0), // 图片偏移。
                        imageSize: new BMap.Size(22, 34)
                    })
                }
                lineColor = '#33a1ff'
            }
            let point = {
                start: new BMap.Point(
                    para.startEnd.origin.lng,
                    para.startEnd.origin.lat
                ),
                end: new BMap.Point(
                    para.startEnd.destination.lng,
                    para.startEnd.destination.lat
                )
            }
            let points = para.pointsArr
            let allPathArr = [];
            let allPath = '';
            for (let i = 0; i < points.length; i++) {
                allPathArr.push(points[i].path)
            }
            allPath = allPathArr.join(';')
            let viewPortArr = allPath.split(';')
            let finalArr = []
            for (let k = 0; k < viewPortArr.length; k++) {
                let small = viewPortArr[k].split(',')
                let smallLng = small[0] - 0
                let smallLat = small[1] - 0
                let pointL = new BMap.Point(smallLng, smallLat)
                finalArr.push(pointL)
                this.pointCounts.push(pointL)
            }
            this.markStart = new BMap.Marker(point.start, {
                enableMassClear: false,
                icon: icon.start
            })
            let houseName = ''
            for (let i = 0; i < this.houseAddressArr.length; i++) {
                if (this.houseAddressArr[i].sort === sort) {
                    houseName = this.houseAddressArr[i].project_name
                }
            }
            var content = ''
            for (let i = 0; i < this.houseAddressArr.length; i++) {
                if (this.houseAddressArr[i].sort == sort) {
                    houseName = this.houseAddressArr[i].project_name
                }
            }

            content = `
      <div class="bmap-label-dot">${houseName}</div>
      `
            this.label = new BMap.Label(content, {
                position: point.start,
                offset: new BMap.Size(0, -35),
                enableMassClear: false
            })
            this.label.setStyle({
                border: 'none',
                transform: 'translate(-50%, -50%)',
                padding: '4px 5px',
                color: '#fff',
                borderRadius: '2px',
                backgroundColor: lineColor
            })
            this.markEnd = new BMap.Marker(point.end, {
                enableMassClear: false,
                icon: icon.end
            })

            if (type == 'mapPreview') {
                contents = `
        <div class="bmap-label-dot">${this.addressObj.address ? this.addressObj.address : '?'}</div>
        `
            } else if (type == 'mapPreviewSecon') {
                contents = `
        <div class="bmap-label-dot">${this.addressObjSen.address ? this.addressObjSen.address : '?'}</div>
        `
            }
            this.labelEnd = new BMap.Label(contents, {
                position: point.end,
                offset: new BMap.Size(0, -40),
                enableMassClear: false
            })
            this.labelEnd.setStyle({
                border: 'none',
                backgroundColor: '#ff5c47',
                padding: '4px 5px',
                color: '#fff',
                borderRadius: '2px',
                transform: 'translate(-50%, -50%)'
            })
            this.overLayId = new BMap.Polyline(finalArr, {
                strokeColor: lineColor,
                strokeWeight: 4,
                strokeOpacity: 1,
                strokeStyle: 'solid',
                enableMassClear: false
            })
            if (type == 'mapPreview') {
                this.mapPreview.centerAndZoom(point.start, 10)
                this.mapPreview.setViewport(this.pointCounts)
                this.mapPreview.addOverlay(this.overLayId)
                this.mapPreview.addOverlay(this.markStart)
                this.mapPreview.addOverlay(this.label)

                if (index !== '' && flag == true) {  // 只添加一次终点
                    this.mapPreview.addOverlay(this.markEnd)
                    this.mapPreview.addOverlay(this.labelEnd)
                }
            }
            if (type == 'mapPreviewSecon') {
                this.mapPreviewSecon.centerAndZoom(point.start, 10)
                this.mapPreviewSecon.setViewport(finalArr)
                this.mapPreviewSecon.addOverlay(this.overLayId)
                this.mapPreviewSecon.addOverlay(this.markStart)
                this.mapPreviewSecon.addOverlay(this.label)

                if (index !== '' && flag == true) {  // 只添加一次终点
                    this.mapPreviewSecon.addOverlay(this.markEnd)
                    this.mapPreviewSecon.addOverlay(this.labelEnd)
                }
            }
            let obj = {
                overLayId: this.overLayId,
                markStart: this.markStart,
                markEnd: this.markEnd,
                label: this.label,
                labelEnd: this.labelEnd
            }
            this.markBase.push(obj)
        },
        // 计算首付小数点
        comOnePoint(para) {
            var str = para
            var reg = /.*\..*/
            if (reg.test(str)) {
                return str.toFixed(1)
            } else {
                return str
            }
        },
        // 计算月供
        compMonth(sum, maxsum, first, year, status) {
            let tex = parseFloat(this.loanObj.loanTex)
            if (window.isNaN(sum)) {
                return ''
            }
            // 待售状态
            if (window.isNaN(maxsum) && status == '4') {
                return ''
            }
            if (this.loanObj.loanTex != '' && tex > 0 && status == '4' && sum != maxsum) {
                let A = tex / 100 / 12
                let n = year * 12
                let num = Math.pow(1 + A, n) / (Math.pow(1 + A, n) - 1)
                let monthNum = Math.round((sum - first) * A * num * 10000)
                let monthNumMax = Math.round((maxsum - first) * A * num * 10000)
                // （总价-首付）*A*((1+A)^n/((1+A)^n-1))
                let nums = monthNum + '-' + monthNumMax
                return nums
            } else if (this.loanObj.loanTex != '' && tex > 0) {
                let A = tex / 100 / 12
                let n = year * 12
                let num = Math.pow(1 + A, n) / (Math.pow(1 + A, n) - 1)
                let monthNum = Math.round((sum - first) * A * num * 10000)
                // （总价-首付）*A*((1+A)^n/((1+A)^n-1))
                return monthNum
            } else {
                return ''
            }
        },
        // 计算概览需合并行数
        eachTableData() {
            let concatOne = 0;
            this.houseOverView.forEach((item, index) => {
                if (index == 0) {
                    this.spanOneArr.push(1)
                } else {
                    if (item.project_id == this.houseOverView[index - 1].project_id) { //第一列需合并相同楼盘的判断条件
                        this.spanOneArr[concatOne] += 1
                        this.spanOneArr.push(0)
                    } else {
                        this.spanOneArr.push(1)
                        concatOne = index
                    }
                }
            })
        },
        // 合并表格列
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                let row = this.spanOneArr[rowIndex]
                let col = row > 0 ? 1 : 0;
                return {
                    rowspan: row,
                    colspan: col
                }
            }
        },
        // 改变交通站点展示
        swichChange(val, curr) {
            let openNum = 0
            val.traffic_data.forEach((traffic) => {
                if (traffic.is_show == 0) {
                    openNum++
                }
            })
            if (openNum > 5) {
                curr ? (curr.is_show = 1) : ''
                this.$message({
                    message: '小程序中每个楼盘最多只能展示 5 条交通站点',
                    duration: 1000,
                    type: 'warning'
                })
            }
            this.editRight()
            // 重新计算高度
            setTimeout(() => {
                this._calculateHeight()
            })
        },
        // 处理右侧数据
        editRight() {
            this.trafficDataRig = this.trafficData.map((proTra) => {
                // 分2个数组一个公交一个地铁  先分类在排序
                let bus = []
                let metor = []
                proTra.traffic_data.forEach((item) => {
                    // 公交
                    if (item.traffic_category == 1 && item.is_show == 0) {
                        bus.push(item)
                    }
                    // 地铁
                    if (item.traffic_category == 2 && item.is_show == 0) {
                        metor.push(item)
                    }
                })
                // 距离排序 从小到大
                function compare(property) {
                    return function (a, b) {
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
                }
                metor = metor.sort(compare('distance'))
                bus = bus.sort(compare('distance'))
                let trafficData = [...metor, ...bus]
                let obj = {
                    isShowPro: proTra.isShowPro,
                    project_id: proTra.project_id,
                    project_name: proTra.project_name,
                    traffic_data: trafficData
                }
                return obj
            })
        },
        // 滚动初始化
        _initScroll() {
            if (!this.shopBoxScroll) {
                this.shopBoxScroll = new BScroll(this.$refs.shopBox, {
                    // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
                    click: true,
                    scrollX: true,
                    eventPassthrough: 'vertical',
                    probeType: 3
                })
            } else {
                this.shopBoxScroll.refresh()
            }
        },
        // 判断图片是否加载成功
        imgloads(imgs, callback, sizes) { // 判断图片是否已加载完毕
            let isover = false // true加载完毕，false还有未加载的
            let add = 0 // 循环当前次数
            let size = sizes
            let jdtime = setInterval(function () {
                isover = true
                add++
                for (let i = 0; i < imgs.length; i++) {
                    if (!imgs[i].complete) { // 还有没加载的图片
                        isover = false
                    }
                }
                if (isover || add >= size) { // 加载完成，or超时
                    clearInterval(jdtime)
                    callback()
                }
            }, 50)
        },
        // 动态获取高度
        _calculateHeight() {
            // 清空高度数组
            this.listHeight = []
            let height = 0;
            this.listHeight.push(height)
            let divObjs = document.getElementsByClassName('scroll-box')
            for (let i = 0; i < divObjs.length; i++) {
                let item = divObjs[i]
                height += parseInt(item.clientHeight + 10)
                // height += parseInt(item.clientHeight)
                this.listHeight.push(height)
            }
        },
        // 滚动事件
        menus() {
            let swiperClass = document.getElementsByClassName('scrollWrap')[0]
            let swiperContent = document.getElementsByClassName('swiper-class')[0].scrollHeight
            // 获取div 距离顶部高度
            // 获取页面滚动高度
            let scrollBox = document.getElementsByClassName('preview-content')[0]
            let swiperClass_offsetTop = swiperClass.offsetTop
            // let titleBox = document.getElementsByClassName('right-body-title')[0]
            // 减去上面介绍高度
            let scrollTop = scrollBox.scrollTop || document.body.scrollTop
            this.nowScrollHe = scrollTop
        },
        // 函数节流
        highThottle(fn, content, musttime, time) {
            var start = new Date()
            var musttime = musttime || 5000
            return function () {
                var args = arguments
                clearTimeout(fn.timer)
                var end = new Date()
                if (end - start > musttime) {
                    start = new Date()
                    clearTimeout(fn.timer)
                    fn.apply(content, args)
                } else {
                    fn.timer = setTimeout(function () {
                        start = new Date()
                        fn.apply(content, args)
                    }, time || 200)
                }
            }
        },
        // 获取样式（兼容）
        getStyle(element, attr) {
            if (element.currentStyle) {
                return element.currentStyle[attr]
            } else {
                return window.getComputedStyle(element, null)[attr]
            }
        },
        // 点击步骤条
        selectContent(paraIndex, para) {
            // 如果是左侧导航点击，para有值
            if (para) {
                // 埋点
                CommonMethods.setTrack('4160', this.trackMessages, {}, this.backendApi)
            }
            this.swiperIndex = paraIndex
            let swiperClass = document.getElementsByClassName('fixed-header')[0].clientHeight
            let jump = document.getElementById(paraIndex)
            let scrollBox = document.getElementsByClassName('preview-content')[0]
            let distance = scrollBox.scrollTop || document.body.scrollTop
            // 减去padding值
            let total = jump.offsetTop - swiperClass
            let step = total / 50
            if (total > distance) {
                smoothDown()
            } else {
                let newTotal = distance - total
                step = newTotal / 50
                smoothUp()
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step
                    // document.body.scrollTop = distance
                    scrollBox.scrollTop = distance
                    setTimeout(smoothDown, 10)
                } else {
                    // document.body.scrollTop = total
                    scrollBox.scrollTop = total
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step
                    // document.body.scrollTop = distance
                    scrollBox.scrollTop = distance
                    setTimeout(smoothUp, 10)
                } else {
                    // document.body.scrollTop = total
                    scrollBox.scrollTop = total
                }
            }
        },
        onError: function (e) {
            console.log(e)
        },
        onCopy: function (e) {
            this.$message({
                showClose: true,
                message: '已复制到剪切板',
                type: 'success'
            })
        },
        // 通勤输入框失去焦点
        commuBlur() {
            if (!this.setCommuFlag) {
                this.addressObj.lng = ''
                this.addressObj.lat = ''
            } else {
                this.setCommuFlag = false
            }
        },
        commuBlurSen() {
            if (!this.setCommuFlagSen) {
                this.addressObjSen.lng = ''
                this.addressObjSen.lat = ''
            } else {
                this.setCommuFlagSen = false
            }
        },
        // 弹窗校验
        dialogVerify() {
            let that = this
            let num = 0
            // 更新确认按钮状态
            this.shareStatus = false
            let proChec = 0
            this.affirmHouseArr.forEach((item, index) => {
                if (item.state == true) {
                    num++;
                    item.number = num;

                    let hasChec = 0
                    let checkCustom = 0
                    if (item.houseType.length > 0) {
                        item.houseType.forEach((it, ind) => {
                            hasChec++
                        })
                    }
                    item.customHouse.forEach((it, ind) => {
                        if (it.status) {
                            checkCustom++
                            if (it.square_metre != '' && it.name != '') {
                                hasChec++
                            }
                        }
                    })
                    if (hasChec == (item.houseType.length + checkCustom) && (item.houseType.length + checkCustom) > 0) {
                        proChec++
                    }
                }
            })
            // 每个楼盘都有选中值 并且选中值中手动添加的数据不为空
            if (proChec == num && num > 0) {
                this.shareStatus = true
            }
            if (num == 10) {
                this.projectState = false
                this.houseHolder = '最多添加十个楼盘'
            } else {
                this.projectState = true
                this.houseHolder = '输入楼盘名搜索'
            }
        }
    },
    computed: {
        // 显示时间
        matchDate() {
            let time
            if (this.updataTime) {
                time = moment(this.updataTime).format('YYYY-MM-DD')
            } else {
                time = ''
            }
            return time
        },
        // 业态名称
        typeName() {
            let resul = ''
            let projectType = this.userRequire ? this.userRequire.project_type.value : ''
            for (let i = 0; i < this.typeList.length; i++) {
                if (this.typeList[i].value == projectType) {
                    resul = this.typeList[i].name
                    break
                }
            }
            return resul
        },
        // 购房资质
        buyQualifi() {
            let resul = ''
            let qualificationType = this.userRequire ? this.userRequire.qualifications.value : ''
            for (let i = 0; i < this.qualificationList.length; i++) {
                if (this.qualificationList[i].value == qualificationType) {
                    resul = this.qualificationList[i].name
                    break
                }
            }
            return resul
        },
        // 购房目的
        purchasePurpose() {
            let resul = ''
            let purchaseType = this.userRequire ? this.userRequire.purchase_purpose.value : ''
            for (let i = 0; i < this.purchaseList.length; i++) {
                if (this.purchaseList[i].value == purchaseType) {
                    resul = this.purchaseList[i].name
                    break
                }
            }
            return resul
        },
        // 户型
        doorType() {
            let resul = []
            let doorType = Array.isArray(this.userRequire.house_type.value) ? this.userRequire.house_type.value : []
            for (let i = 0; i < doorType.length; i++) {
                let isHas = this.houseTypeList.findIndex((item) => {
                    return item.value == doorType[i]
                })
                if (isHas !== -1) {
                    resul.push(this.houseTypeList[isHas].name)
                }
            }
            return resul
        },
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        // 实时获取当前步骤
        currentIndex() {
            if (this.nowScrollHe < 0) {
                // this.swiperIndex = 0
                return 0
            } else {
                if (this.nowScrollHe > this.listHeight[this.listHeight.length - 1]) {
                    // this.swiperIndex = this.listHeight.length - 2
                    return this.listHeight.length - 2
                } else {
                    for (let i = 0; i < this.listHeight.length; i++) {
                        let height1 = this.listHeight[i]
                        let height2 = this.listHeight[i + 1]
                        if (!height2 || (this.nowScrollHe >= height1 && this.nowScrollHe < height2)) {
                            return i
                        }
                    }
                    // this.swiperIndex = 0
                    return 0
                }
            }
        },
    },
    watch: {
        // 通勤目的地1步行标识
        isWalkCheckFir: {
            handler: function (val, oldval) {
                this.commutVerify();
            },
            deep: true
        },
        // 目的地1表格数据
        addressTableFir: {
            handler: function (val, oldval) {
                this.commutVerify();
                if (this.houseAddressArr.length === val.length) {
                    this.firstLoading = false;
                }
            },
            deep: true
        },
        // 目的地2步行切换
        isWalkCheckSen: {
            handler: function (val, oldval) {
                this.commutTwoVerify();
            },
            deep: true
        },
        // 目的地2的表格数据
        addressTableSec: {
            handler: function (val, oldval) {
                this.commutTwoVerify();
                if (this.houseAddressArr.length === val.length) {
                    this.secondLoading = false;
                }
            },
            deep: true
        },
        currentIndex: {
            handler: function (val, oldval) {
                this.swiperIndex = this.currentIndex
                // 是否是最后一步
                if (this.currentIndex === (this.swiperArr.length - 1)) {
                    this.btnObj.nextBtn = '分享'
                } else {
                    this.btnObj.nextBtn = '下一步'
                }
            },
            deep: true
        },
        // 客户需求
        userRequire: {
            handler: function (val, oldval) {
                var sum = this.userRequire
                let opt = 0
                let successOpt = 0
                for (var i in sum) {
                    if (sum[i].is_show == 0) {
                        opt++
                        if (i == 'total_price' || i == 'first_price' || i == 'acreage') {
                            if (sum[i].isMore) {
                                if (sum[i].value_max != '' && sum[i].value_min != '') {
                                    successOpt++
                                }
                            } else {
                                if (sum[i].value_min != '') {
                                    successOpt++
                                }
                            }
                        } else if (sum[i].value != '') {
                            successOpt++
                        }
                    }
                }
                if (opt == successOpt) {
                    this.swiperArr[0].isOk = true
                } else {
                    this.swiperArr[0].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        backendApi: {
            handler: function (val, oldval) {
                this.backendApi = val
            },
            deep: true
        },
        setCommuFlag: {
            handler: function (val, oldval) {
                if (!this.setCommuFlag) {
                    this.addressObj.lat = ''
                    this.addressObj.lng = ''
                    this.addressObj.address = ''
                    this.getCommuInfo()
                }
            },
            deep: true
        },
        setCommuFlagSen: {
            handler: function (val, oldval) {
                if (!this.setCommuFlagSen) {
                    this.addressObjSen.lat = ''
                    this.addressObjSen.lng = ''
                    this.addressObjSen.address = ''
                    this.getCommuInfoSec()
                }
            },
            deep: true
        },
        // 通勤地址
        commutAddress: {
            handler: function (val, oldval) {
                if (val == '') {
                    this.addressObj.lng = ''
                    this.addressObj.lat = ''
                    this.addressObj.address = ''
                    if (this.carInfoArr.length > 0) {
                        this.lineTraffic(0)
                    }
                    // 计算通勤
                    this.getCommuInfo()
                }
            },
            deep: true
        },
        commutAddressSen: {
            handler: function (val, oldval) {
                if (val == '') {
                    this.addressObjSen.lng = ''
                    this.addressObjSen.lat = ''
                    this.addressObjSen.address = ''
                    if (this.carInfoArrSen.length > 0) {
                        this.lineTraffic(0)
                    }
                    // 计算通勤
                    this.getCommuInfoSec()
                }
            },
            deep: true
        },
        // 监听周边交通 第五步
        trafficData: {
            handler: function (val, oldval) {
                let num = 0
                let sum = 0
                this.trafficData.forEach((item, index) => {
                    if (item.traffic_data.length > 0) {
                        let Proj = 0
                        item.traffic_data.forEach((traf, ind) => {
                            if (traf.traffic_type == 2) {
                                Proj++
                                sum++
                            } else {
                                if (traf.is_show == 0) {
                                    sum++
                                    Proj++
                                }
                            }

                            // 如果是自定义的 判断是公交还是地铁  公交只判断1个字段 地铁判断2个字段
                            if (traf.traffic_type == 2) {
                                if (traf.traffic_category == 1 && traf.station_name != '' && traf.distance !== '') { // 公交只判断站点和距离
                                    num++
                                } else {
                                    if (traf.station_name != '' && traf.traffic_name != '' && traf.distance !== '') { // 地铁判断 路线、站点、距离
                                        num++
                                    }
                                }
                            }
                            // 系统的
                            if (traf.traffic_type == 1) {
                                if (traf.is_show == 0 && traf.distance !== '') {
                                    num++
                                }
                            }
                        })
                        if (Proj > 0) {
                            item.isShowPro = true
                        } else {
                            item.isShowPro = false
                        }
                    } else {
                        item.isShowPro = false
                    }
                })
                if (sum == num) {
                    this.swiperArr[4].isOk = true
                } else {
                    this.swiperArr[4].isOk = false
                }
                this.trafficNum = sum
                this.editRight()
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听综述  第六步
        summaryArr: {
            handler: function (val, oldval) {
                this.compModleState()
                var flag = 0
                this.summaryArr.forEach((item, index) => {
                    if (item.project.proSta == true) {
                        flag++
                    }
                })
                if (flag == this.summaryArr.length) {
                    this.swiperArr[5].isOk = true
                } else {
                    this.swiperArr[5].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听每一步是否符合分享操作
        swiperArr: {
            handler: function (val, oldval) {
                let shareFlag = true
                for (let i = 0; i < this.swiperArr.length; i++) {
                    if (!this.swiperArr[i].isOk) {
                        shareFlag = false
                        break
                    }
                }
                setTimeout(() => {
                    if (shareFlag) {
                        this.shareBtn = true
                    } else {
                        this.shareBtn = false
                    }
                })
            },
            deep: true
        },
        // 监听城市id
        cityInfo: {
            handler: function (val, oldval) {
                // 获取城市id
                this.cityName = this.cityInfo.cityName ? this.cityInfo.cityName : '北京'
            },
            deep: true
        },

        // 实时监听楼盘价格 第二步
        houseOverView: {
            handler: function (val, oldval) {
                let num = 0
                let min, max
                this.houseOverView.forEach((item, index) => {
                    let price = parseFloat(item.square_metre) > 0 ? parseFloat(item.square_metre) : 1
                    // 计算单价 总价最大值和最小值不相等 状态为待售
                    if (item.total_price != item.total_price_max && item.house_status == '4') {
                        min = item.total_price == '' ? '' : parseFloat(item.total_price / price).toFixed(2)
                        max = item.total_price_max == '' ? '' : parseFloat(item.total_price_max / price).toFixed(2)
                        item.single_price = min + '-' + max
                    } else if (item.house_status != '4') {
                        item.single_price = item.total_price == '' ? '' : parseFloat(item.total_price / price).toFixed(2)
                    }
                    // 如果状态是待售  判断价格是区间的
                    if (item.house_status == '4') {
                        if (item.single_price !== '' && item.total_price !== '' && item.total_price_max !== '') {
                            num++
                        } else {
                            num--
                        }
                    } else {
                        if (item.single_price !== '' && item.total_price !== '' && item.house_status != '') {
                            num++
                        } else {
                            num--
                        }
                    }
                })

                if (this.houseOverView.length === num && this.loanObj.loanTex != '') {
                    // 给左侧步骤条切换状态
                    this.swiperArr[1].isOk = true
                } else {
                    this.swiperArr[1].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听利率 第二步
        loanObj: {
            handler: function (val, oldval) {
                // 首付百分百时 贷款年限和贷款利率不可点击
                if (val.payFir == 100) {
                    this.isLoanEdit = true
                } else {
                    this.isLoanEdit = false
                }
                let num = 0
                this.houseOverView.forEach((item, index) => {
                    if (item.single_price !== '' && item.total_price !== '') {
                        num++
                    } else {
                        num--
                    }
                })
                if (this.houseOverView.length == num && this.loanObj.loanTex != '') {
                    // 给左侧步骤条切换状态
                    this.swiperArr[1].isOk = true
                } else {
                    this.swiperArr[1].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听周边价格开关 第三步
        rimObj: {
            handler: function (val, oldval) {
                let numL = 0
                let numS = 0
                let sum = 0
                this.rimData.forEach((item, index) => {
                    if (item.landPrice !== '' && item.secondPrice !== '') {
                        sum++
                    }
                    if (item.landPrice !== '') {
                        numL++
                    }
                    if (item.secondPrice !== '') {
                        numS++
                    }
                })
                if (this.rimObj.rimSecond != true && this.rimObj.rimLand != true) {
                    this.swiperArr[2].isOk = true
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand == true) {
                    if (sum == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand != true) {  // 展示周边二手房
                    if (numS == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else if (this.rimObj.rimLand == true && this.rimObj.rimSecond != true) {  // 展示周边地价
                    if (numL == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else {
                    this.swiperArr[2].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听周边价格 第三步
        rimData: {
            handler: function (val, oldval) {
                let numL = 0
                let numS = 0
                let sum = 0
                this.rimData.forEach((item, index) => {
                    if (item.landPrice !== '' && item.secondPrice !== '') {
                        sum++
                    }
                    if (item.landPrice !== '') {
                        numL++
                    }
                    if (item.secondPrice !== '') {
                        numS++
                    }
                })
                if (this.rimObj.rimSecond != true && this.rimObj.rimLand != true) {
                    this.swiperArr[2].isOk = true
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand == true) {
                    if (sum == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else if (this.rimObj.rimSecond == true && this.rimObj.rimLand != true) {  // 展示周边二手房
                    if (numS == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else if (this.rimObj.rimLand == true && this.rimObj.rimSecond != true) {  // 展示周边地价
                    if (numL == this.rimData.length) {
                        this.swiperArr[2].isOk = true
                    } else {
                        this.swiperArr[2].isOk = false
                    }
                } else {
                    this.swiperArr[2].isOk = false
                }
                setTimeout(() => {
                    this._calculateHeight()
                })
            },
            deep: true
        },
        // 监听个人资料
        employeeInfo: {
            handler: function (val, oldval) {
                // 个人资料状态
                if (this.employeeInfo.tag && this.employeeInfo.tag.length > 0) {
                    this.curStatu = true
                } else {
                    this.curStatu = false
                }
                if (this.employeeInfo.wx_qrcode != '') {
                    this.curQrcode = true
                } else {
                    this.curQrcode = false
                }
                this.editPerInfo()
            },
            deep: true
        },
        qaList: {
            handler: function (val, oldval) {
                this.editPerInfo()
            },
            deep: true
        },
        qaListSele: {
            handler: function (val, oldval) {
                this.editPerInfo()
            },
            deep: true
        },
        qaSelectedList: {
            handler: function (val, oldval) {
                this.editPerInfo()
            },
            deep: true
        }
    },
    components: { BScroll, swiper, swiperSlide, NumberInput, SearchRadioSelect }
}
</script>

<style src='swiper/dist/css/swiper.css'></style>

<style scoped lang="less">
/*客户微信绑定信息*/
/deep/.wx-bind-dialog {
    border-radius: 8px;
    width: 430px;
    .el-dialog__header {
        font-weight: bold;
        padding-top: 30px;
    }
    .el-select {
        width: 100%;
    }
    .el-dialog__body {
        padding: 25px 30px 30px;
        min-height: 240px;
    }
}
/deep/.wx-upload-dialog {
    border-radius: 8px;
    width: 430px;
    .el-dialog__header {
        font-weight: bold;
        padding-top: 30px;
    }
}
.wechat-dialog-con {
    position: relative;
    .wechat-dialog-tit {
        font-size: 14px;
        color: #3e4254;
        line-height: 20px;
        font-weight: bold;
    }
    .wechat-dialog-tip {
        color: #ff5c47;
        font-size: 12px;
        line-height: 18px;
        margin-top: 20px;
        .iconupload_fail {
            font-size: 12px;
            margin-right: 6px;
        }
    }
    .error-msg {
        color: #ff5c47;
        position: absolute;
        bottom: -16px;
        left: 0;
        &.is-wechat-error-hide {
            display: none;
        }
    }
    .dialog-con-tit {
        font-size: 14px;
        color: #3e4254;
        margin-bottom: 20px;
        font-weight: bolder;
    }
    .dialog-input-list {
        text-align: center;
        /deep/.el-input {
            height: 30px;
            .el-input__inner {
                height: 30px;
                line-height: 30px;
                border-radius: 0;
                padding: 0 8px;
            }
        }
        li {
            position: relative;
            margin-bottom: 10px;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        .th {
            text-align: left;
            line-height: 30px;
            width: 70px;
            position: absolute;
            top: 0px;
            left: 0px;
        }
        .td {
            overflow: hidden;
            margin: 0 33px 0 70px;
        }
        .tf {
            float: right;
            .el-button {
                color: #ff5c47;
                font-size: 12px;
                padding: 0;
                line-height: 30px;
            }
            .is-del-hide {
                display: none;
            }
        }
    }
    .add-input-item {
        padding-left: 73px;
        font-size: 12px;
        /deep/.el-button {
            font-size: 12px;
            color: #0ad487;
            padding: 10px 10px;
        }
        .beyond-limit-msg {
            display: none;
        }
    }
    .dialog-upload-ul {
        line-height: 17px;
        font-size: 12px;
        overflow: hidden;
        .th {
            float: left;
            color: #ff5c47;
            margin-right: 20px;
        }
        .td {
            line-height: 17px;
            float: left;
        }
        .upload-wx {
            cursor: pointer;
            color: #33a1ff;
        }
        .iconupload_fail {
            font-size: 12px;
            margin-right: 6px;
        }
    }
}
/*上传微信数据提示*/
.upload-dialog-con {
    .upload-dialog-tit {
        color: #3e4254;
        font-size: 14px;
        font-weight: bolder;
        margin-bottom: 20px;
    }
    .upload-dialog-des {
        color: #ff5c47;
        font-size: 12px;
        line-height: 18px;
        .iconupload_fail {
            font-size: 12px;
        }
    }
}
.more-share-box {
    height: 100%;
    min-width: 800px;
    background-color: #fff;
    overflow-y: hidden;
    > .option {
        float: left;
    }
    /deep/.el-table {
        .el-table__body tr.hover-row > td {
            background-color: transparent !important;
        }
    }
    .dialog-wrap {
        /deep/.el-dialog {
            width: 496px;
            border-radius: 8px;
            .dialog-header{
                position: relative;
                .iconclose_dialog{
                    position: absolute;
                    left: 0;
                    top: -10px;
                }
            }
            .el-dialog__headerbtn{
                display: none;
            }
            .el-dialog__header {
                padding: 30px 20px 0px;
                text-align: center;
                font-size: 18px;
                color: #3e4254;
            }
            .el-dialog__body {
                font-size: 12px;
                overflow: hidden;
                padding: 30px 30px 20px;
                .el-input__icon {
                    line-height: 30px;
                }
                .dialog-body {
                    overflow: hidden;
                    .top-con {
                        overflow: hidden;
                        margin-bottom: 20px;
                        .add-house {
                            float: left;
                            .name {
                                color: #333;
                                margin-right: 4px;
                            }
                        }
                    }
                    .right-con {
                        float: left;
                    }
                    .list {
                        width: calc(100% + 17px);
                        height: 335px;
                        overflow-y: scroll;
                        padding-left: 28px;
                        scrollbar-color: transparent transparent;
                        scrollbar-track-color: transparent;
                        -ms-scrollbar-track-color: transparent;
                        -wibkit-scrollbar-track-color: transparent;
                    }
                }
            }
            .el-dialog__footer {
                padding-top: 0px;
            }
            .dialog-footer {
                width: 280px;
                margin: auto;
                .el-button {
                    width: 130px;
                    font-size: 16px;
                    text-align: center;
                    border-radius: 4px;
                    border: none;
                    &.cancle {
                        color: #77808a;
                        background: #e6e6e6;
                    }
                    &.affrim {
                        color: #fff;
                        background: #33a1ff;
                    }
                }
            }
            .add-house {
                overflow: hidden;
                .name {
                    float: left;
                    line-height: 40px;
                }
                .search-house {
                    float: right;
                    position: relative;
                    width: 381px;
                    img {
                        position: absolute;
                        left: 10px;
                        top: 12px;
                        width: 14px;
                        height: 14px;
                        z-index: 3;
                    }
                    .el-input__inner {
                        padding-left: 30px;
                    }
                    .el-autocomplete {
                        width: 100%;
                    }
                }
            }
            .list {
                > li {
                    .title-wrap {
                        height: 32px;
                        line-height: 32px;
                        margin-bottom: 14px;
                        margin-right: 47px;
                        position: relative;
                        .circle {
                            display: inline-block;
                            position: absolute;
                            left: -28px;
                            top: 0px;
                        }
                        > span {
                            display: inline-block;
                            float: left;
                        }
                        .house-name {
                            margin-right: 5px;
                            font-size: 14px;
                            color: #3e4254;
                            font-weight: bold;
                            width: 130px;
                            height: 32px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .delete {
                            color: #ff5c47;
                            cursor: pointer;
                        }
                        .check-house {
                            float: right;
                            width: 100px;
                            .el-select {
                                .el-input--suffix {
                                    .el-input__inner {
                                        padding-right: 18px;
                                        font-size: 12px;
                                    }
                                }
                                .el-input {
                                    .el-select__caret {
                                        width: 15px;
                                    }
                                }
                            }
                        }
                        .hand-add-point {
                            float: right;
                            margin-left: 10px;
                            padding: 0 5px;
                            border: 1px solid #0ad487;
                            border-radius: 2px;
                            color: #0ad487;
                            cursor: pointer;
                            height: 30px;
                            line-height: 30px;
                            i {
                                font-size: 12px;
                            }
                        }
                    }
                    .type-wrap {
                        .hou-item {
                            float: left;
                            height: 22px;
                            line-height: 22px;
                            border: 1px solid #e6e6e6;
                            border-radius: 2px;
                            font-size: 12px;
                            color: #3e4254;
                            box-sizing: border-box;
                            width: 190px;
                            padding: 0 10px;
                            margin-right: 10px;
                            margin-bottom: 14px;
                            &.hous-custom {
                                float: left !important;
                                background-color: #fff;
                                height: 94px;
                                line-height: 32px;
                                width: 100%;
                                padding: 0;
                                > div {
                                    display: inline-block;
                                    overflow: hidden;
                                }
                                .el-ipt {
                                    float: left;
                                    margin-right: 6px;
                                    width: 52px;
                                    &.house-na {
                                        width: 80px;
                                        margin-right: 3px;
                                    }
                                    > input {
                                        width: 100%;
                                        height: 30px;
                                        box-sizing: border-box;
                                        padding: 0 5px;
                                        border: 1px solid #ddd;
                                        background-color: #fff;
                                    }
                                }
                                .delete {
                                    color: #ff5c47;
                                    cursor: pointer;
                                    margin-left: 3px;
                                    margin-top: 30px;
                                    float: right;
                                }
                            }
                            &:nth-of-type(even) {
                                margin-right: 0;
                            }
                            > span {
                                background-color: #fff;
                            }
                            .txt {
                                text-align: left;
                                white-space: nowrap;
                                overflow: hidden;
                                width: 140px;
                                text-overflow: ellipsis;
                                display: inline-block;
                            }
                            img {
                                width: 12px;
                                height: 12px;
                                float: right;
                                position: relative;
                                top: 4px;
                            }
                        }
                        .hous-custom {
                            border: none;
                            padding: 0;
                            margin-bottom: 14px;
                            .custom-wrap {
                                position: relative;
                                overflow: hidden;
                                background: #f4f5f9;
                                border-radius: 4px;
                                box-sizing: border-box;
                                padding: 10px 42px 10px 24px;
                                float: left;
                                width: 380px;
                                input::-webkit-input-placeholder {
                                    color: #aaa;
                                }
                            }
                            .opt-item {
                                width: 130px;
                                float: left;
                                margin-right: 50px;
                                &:nth-of-type(1),
                                &:nth-of-type(2) {
                                    margin-bottom: 8px;
                                }
                                &.area {
                                    position: relative;
                                    &::before {
                                        content: 'm²';
                                        position: absolute;
                                        right: -18px;
                                    }
                                }
                                &:nth-of-type(even) {
                                    margin-right: 0;
                                }
                                .th {
                                    float: left;
                                    margin-right: 6px;
                                }
                                .td {
                                    overflow: hidden;
                                    .el-ipt {
                                        width: 100px;
                                    }
                                }
                            }
                            .status {
                                position: absolute;
                                right: 0;
                                top: 0;
                                width: 28px;
                                height: 28px;
                                display: inline-block;
                                background-image: url(../../../static/images/sreachTool/not-finish.png);
                                -webkit-background-size: 100%;
                                background-size: 100%;
                                &.finished {
                                    background-image: url(../../../static/images/sreachTool/finished.png);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .edit-wrapper {
        width: 100%;
        height: 100%;
        .center-content {
            margin-left: 215px;
            margin-right: 350px;
            height: 100%;
            overflow-y: auto;
            .edit-box {
                color: #333;
                .edit-title {
                    padding-top: 50px;
                    padding-left: 40px;
                    margin-bottom: 30px;
                    font-size: 16px;
                    .txt {
                        float: left;
                        margin-right: 10px;
                    }
                    .step {
                        float: left;
                        font-size: 16px;
                        line-height: 20px;
                        text-align: center;
                        color: #fff;
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        background-image: url(../../../static/images/sreachTool/edit-title-bg.png);
                        -webkit-background-size: 100%;
                        background-size: 100%;
                    }
                    .header-step-status {
                        position: relative;
                        overflow: hidden;
                        height: 22px;
                    }
                    .header-line {
                        position: relative;
                        width: 98%;
                        margin-top: 10px;
                        margin-left: 5px;
                        height: 0;
                        border-bottom: 1px solid #ff5c47;
                    }
                    .header-step-status > img {
                        position: absolute;
                        left: 0;
                        top: 4px;
                        width: 12px;
                        height: 12px;
                    }
                }
                .edit-content {
                    padding: 0 50px 76px;
                    .wraning {
                        border: 2px dashed #ff5c47 !important;
                    }
                    /deep/.el-table {
                        .cell-left {
                            font-size: 12px;
                            color: #77808a;
                        }
                    }
                    .hd {
                        margin-bottom: 20px;
                        font-size: 18px;
                        font-weight: bold;
                        color: #3e4254;
                        .change-house {
                            cursor: pointer;
                            margin-left: 20px;
                            display: inline-block;
                            padding: 5px 10px;
                            background: #3da6ff;
                            border-radius: 2px;
                            color: #fff;
                            font-size: 14px;
                            font-weight: 500;
                            > i {
                                font-size: 14px;
                                margin-right: 2px;
                            }
                        }
                        .hint {
                            margin-left: 10px;
                            font-size: 12px;
                            color: #3e4a59;
                            font-weight: normal;
                        }
                        .add-address-btn {
                            margin-left: 20px;
                            font-size: 14px;
                            color: #fff;
                            background: #0ad487;
                            border-radius: 2px;
                            border-color: #0ad487;
                            padding: 9px 10px;
                        }
                        .add-address-forbid {
                            cursor: not-allowed;
                            margin-left: 20px;
                            font-size: 14px;
                            color: #fff;
                            opacity: 0.3;
                            background: #abb0b5;
                            border-color: #abb0b5;
                            border-radius: 2px;
                            padding: 9px 10px;
                        }
                    }
                    .bd {
                        .desc {
                            font-size: 14px;
                            color: #333333;
                            padding-bottom: 20px;
                        }
                        &.around-price {
                            .desc {
                                font-size: 14px;
                                color: #333333;
                                padding-bottom: 20px;
                                .td {
                                    /deep/.el-date-editor {
                                        width: 150px;
                                        .el-input__inner {
                                            height: 30px;
                                            line-height: 30px;
                                            font-size: 12px;
                                            color: #333;
                                            padding: 0 6px 0 30px;
                                            border-radius: 0;
                                        }
                                        .el-icon-date {
                                            line-height: 30px;
                                            width: 14px;
                                        }
                                        .el-icon-circle-close {
                                            line-height: 30px;
                                            display: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    /*语音播放*/
                    .audio-box {
                        height: 28px;
                        line-height: 27px;
                        & > span {
                            color: #33a1ff;
                            vertical-align: middle;
                        }
                        .iconfont {
                            font-size: 26px;
                            cursor: pointer;
                        }
                        .audio-name {
                            font-size: 12px;
                            color: #33a1ff;
                            font-weight: bold;
                            margin-left: 5px;
                        }
                    }
                    .tag-info-box {
                        margin-bottom: 18px;
                        .add-input {
                            margin-top: 20px;
                        }
                    }
                    .user-info-box {
                        margin-top: 30px;
                        padding: 0 40px;
                        .body-hd {
                            font-size: 18px;
                            color: #3e4254;
                            line-height: 25px;
                            font-weight: bold;
                        }
                        .center-body-right {
                            float: right;
                            width: 218px;
                            background-color: #f4f6f9;
                            border-radius: 2px;
                            padding: 0 16px 6px 16px;
                            box-sizing: border-box;
                            margin-left: 21px;
                            .body-bd-box-hd {
                                margin: 6px 0 16px 6px;
                            }
                            .body-bd-box-bd {
                                overflow: hidden;
                            }
                            .code-img-box {
                                float: left;
                                width: 80px;
                                height: 80px;
                                margin-left: 10px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .code-btn {
                                margin-left: 6px;
                                overflow: hidden;
                                display: inline-block;
                                margin-top: 20px;
                                padding: 5px 10px;
                                box-sizing: border-box;
                                font-size: 14px;
                                color: #fff;
                                line-height: 20px;
                                background: #0ad487;
                                border-radius: 2px;
                                cursor: pointer;
                            }
                        }
                        .center-body-left {
                            overflow: hidden;
                        }
                        .body-qa-box {
                            position: relative;
                            background: #f4f5f9;
                            border-radius: 4px;
                            height: 395px;
                            /deep/.el-scrollbar {
                                height: 100%;
                                position: static;
                                .el-scrollbar__wrap {
                                    overflow-x: hidden;
                                }
                            }
                            .body-qa-header {
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 3;
                                width: 100%;
                                height: 174px;
                                background: #fff;
                                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                                .qa-header-search {
                                    height: 62px;
                                    border-bottom: 1px solid #f3f6f9;
                                    line-height: 62px;
                                    font-size: 12px;
                                    color: #333;
                                    padding: 0 19px;
                                    box-sizing: border-box;
                                    .search-th {
                                        float: left;
                                        margin-right: 10px;
                                    }
                                    .search-chosen {
                                        float: right;
                                        font-size: 14px;
                                        color: #3e4a59;
                                        margin-left: 10px;
                                        span {
                                            color: #33a1ff;
                                        }
                                    }
                                    .search-td {
                                        overflow: hidden;
                                        .search-td-btn {
                                            float: right;
                                            background-color: #33a1ff;
                                            color: #fff;
                                            height: 30px;
                                            line-height: 30px;
                                            margin: 15px 0 0 10px;
                                            border-radius: 2px;
                                            padding: 0 10px;
                                            font-size: 14px;
                                            font-weight: bold;
                                            cursor: pointer;
                                        }
                                        .search-input-box {
                                            overflow: hidden;
                                        }
                                    }
                                }
                                .qa-header-default {
                                    height: 112px;
                                    padding: 7px 19px 10px;
                                    box-sizing: border-box;
                                }
                            }
                            .header-default-box {
                                overflow: hidden;
                                & > li {
                                    float: left;
                                    width: 47%;
                                    margin-right: 16px;
                                    .default-item {
                                        height: 94px;
                                        background: #fff;
                                        border: 1px solid #f3f6f9;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        .item-line {
                                            position: relative;
                                            float: left;
                                            margin-right: 10px;
                                            width: 10px;
                                            height: 100%;
                                            border-radius: 4px 0 0 4px;
                                            background-color: #a9bacf;
                                            border-top: 1px solid #a9bacf;
                                            .iconsuccess_all {
                                                position: absolute;
                                                top: 50%;
                                                left: -1px;
                                                transform: translate(0, -50%)
                                                    scale(0.83, 0.83);
                                                color: #fff;
                                                font-size: 12px;
                                                font-weight: bold;
                                            }
                                        }
                                        .item-info-cont {
                                            overflow: hidden;
                                            padding: 8px 10px 10px 0;
                                            box-sizing: border-box;
                                            .info-cont-title {
                                                overflow: hidden;
                                                height: 48px;
                                                text-overflow: ellipsis;
                                                display: -webkit-box;
                                                -webkit-box-orient: vertical;
                                                -webkit-line-clamp: 2;
                                                font-size: 14px;
                                                color: #3e4254;
                                                line-height: 24px;
                                                font-weight: bold;
                                                margin-bottom: 8px;
                                            }
                                            .info-cont-tip {
                                                overflow: hidden;
                                                .tip-left {
                                                    float: left;
                                                    font-size: 14px;
                                                    color: #abb0b5;
                                                    line-height: 20px;
                                                }
                                                .tip-right {
                                                    float: right;
                                                    font-size: 14px;
                                                    color: #abb0b5;
                                                    line-height: 20px;
                                                    margin-right: 10px;
                                                }
                                            }
                                        }
                                    }
                                    &:nth-child(even) {
                                        float: right;
                                        margin-right: 0;
                                    }
                                    &.chosen-item {
                                        .default-item {
                                            .item-line {
                                                background-color: #33a1ff;
                                                border-top: 1px solid #33a1ff;
                                            }
                                        }
                                    }
                                }
                            }
                            .body-qa-main {
                                padding-top: 184px;
                                box-sizing: border-box;
                                height: 100%;
                                overflow-y: auto;
                                .qa-main-cont {
                                    padding: 0 19px 0;
                                    box-sizing: border-box;
                                    .header-default-box {
                                        & > li {
                                            margin-bottom: 10px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .house-need {
                        overflow-x: auto;
                        > .table {
                            width: 100%;
                            .title {
                                min-width: 200px;
                            }
                            .con {
                                min-width: 300px;
                                /deep/.el-radio-group {
                                    .el-radio {
                                        font-weight: normal;
                                    }
                                    .el-radio__label {
                                        font-size: 12px !important;
                                        color: #3e4a59;
                                    }
                                }
                                /deep/.el-checkbox-group {
                                    .el-checkbox {
                                        font-weight: normal;
                                    }
                                    .el-checkbox__label {
                                        font-size: 12px;
                                        color: #3e4a59;
                                    }
                                }
                                > div {
                                    float: left;
                                }
                                .line {
                                    float: left;
                                    height: 0;
                                    width: 6px;
                                    border-bottom: 1px solid #ccc;
                                    margin: 15px 10px 0 0;
                                }
                                .min-item,
                                .max-item {
                                    width: 85px;
                                    /deep/.el-input {
                                        width: 52px;
                                        float: left;
                                        .el-input__inner {
                                            height: 30px;
                                            line-height: 30px;
                                            font-size: 12px;
                                            color: #3e4a59;
                                            padding: 0 6px;
                                            box-sizing: border-box;
                                            border-radius: 0;
                                        }
                                    }
                                    .input-unit {
                                        float: left;
                                        font-size: 12px;
                                        color: #3e4a59;
                                        line-height: 30px;
                                        margin-left: 6px;
                                    }
                                }
                                .min-item {
                                    margin-right: 10px;
                                }
                                .unit-operate {
                                    float: left;
                                    margin-left: 22px;
                                    line-height: 30px;
                                    font-size: 12px;
                                    color: #33a1ff;
                                    cursor: pointer;
                                }
                            }
                            .swith {
                                min-width: 150px;
                                text-align: center;
                            }
                            > .head {
                                color: #3e4a59;
                                background-color: #f3f6f9;
                                border: 1px solid #f3f6f9;
                                th {
                                    font-size: 14px;
                                    height: 50px;
                                    text-align: left;
                                    box-sizing: border-box;
                                    padding: 10px 20px;
                                }
                            }
                            > .body {
                                color: #77808a;
                                border-left: 1px solid #f3f6f9;
                                td {
                                    box-sizing: border-box;
                                    padding: 10px 20px;
                                    height: 50px;
                                    word-wrap: break-word;
                                    word-break: break-all;
                                    border-right: 1px solid #f3f6f9;
                                    border-bottom: 1px solid #f3f6f9;
                                }
                            }
                        }
                    }
                    .info-wrap {
                        height: 32px;
                        line-height: 32px;
                        margin-bottom: 20px;
                        span {
                            display: inline-block;
                        }
                        .bd {
                            overflow: hidden;
                        }
                        .info {
                            width: 114px;
                            height: 30px;
                            float: left;
                            margin-right: 20px;
                            .td {
                                float: left;
                                width: 52px;
                                overflow: hidden;
                                /deep/.el-input__icon {
                                    font-size: 12px;
                                    height: 30px;
                                    line-height: 30px;
                                    width: 12px;
                                }
                                /deep/.el-input__inner {
                                    height: 30px !important;
                                    line-height: 30px;
                                    font-size: 12px;
                                    padding: 0 4px;
                                    border-radius: 0;
                                }
                                /deep/.el-input__suffix {
                                    right: 3px;
                                }
                            }
                            .sele-unit {
                                /deep/.el-input__suffix-inner {
                                    display: none;
                                    /*value=value.replace(/[^0-9.]/g,'')*/
                                }
                                /deep/.el-input__suffix:after {
                                    content: '%';
                                    position: absolute;
                                    right: 0;
                                    font-size: 12px;
                                    line-height: 30px;
                                }
                            }
                            .th {
                                float: left;
                                font-size: 14px;
                                line-height: 30px;
                                margin-right: 6px;
                            }
                        }
                    }
                    .house-wrap {
                        /deep/.el-table {
                            border: none;
                            border-left: 1px solid #f3f6f9;
                            .show-cont-pic {
                                color: #33a1ff;
                                font-size: 12px;
                                .pic-up-file {
                                    cursor: pointer;
                                }
                            }
                            .show-cont-pic .iconicon_chosen {
                                font-size: 12px;
                                color: #0ad487;
                                margin-left: 6px;
                                vertical-align: middle;
                            }
                            th {
                                border-right: 1px solid #f3f6f9;
                                background-color: #f3f6f9;
                                color: #3e4a59;
                            }
                            .cell {
                                text-align: center;
                                padding: 0 5px !important;
                            }
                            .el-table__body-wrapper {
                                td {
                                    padding: 10px 0;
                                    border-right: 1px solid #f3f6f9;
                                }
                            }
                            .el-input {
                                width: 90px;
                                .el-input__inner {
                                    height: 30px;
                                    line-height: 30px;
                                    border-radius: 0;
                                    padding: 0 5px;
                                }
                            }
                            .el-select {
                                .el-input__icon {
                                    height: 30px;
                                    line-height: 30px;
                                }
                            }
                            .trip-bus-type {
                                border-bottom: 1px solid #ffff00;
                                .select-wrap {
                                    display: inline-block;
                                    width: 75px;
                                    /deep/.el-input {
                                        width: 100%;
                                    }
                                }
                                &.address {
                                    text-align: left;
                                    padding: 0 10px;
                                }
                                .delete {
                                    cursor: default;
                                    color: #fff;
                                    font-size: 14px;
                                    padding: 3px 10px;
                                    background: #ff5c47;
                                    border-radius: 2px;
                                }
                            }
                        }
                        .house-name {
                            color: #fa5f35;
                            text-align: left;
                            box-sizing: border-box;
                            padding: 0 5px;
                        }
                        .tail {
                            background-color: #f3f6f9;
                            height: 48px;
                            line-height: 48px;
                            .set-show {
                                float: left;
                                text-align: center;
                                &:first-child {
                                    font-weight: bold;
                                    width: 36%;
                                }
                                &:nth-child(2) {
                                    width: 32%;
                                }
                                &:last-child {
                                    width: 32%;
                                }
                            }
                        }
                    }
                    .circum-wrap {
                        /deep/.el-table {
                            border-right: 1px solid #f3f6f9;
                            .el-table__body-wrapper {
                                td {
                                    padding: 0 !important;
                                    .cell {
                                        padding: 0;
                                    }
                                }
                            }
                            .trip-bus-type {
                                border-bottom: 1px solid #f3f6f9;
                                height: 50px;
                                line-height: 50px;
                                text-align: center;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                border-left: 1px solid #f3f6f9;
                                &:last-child {
                                    border-bottom: none;
                                }
                                &.addPoint {
                                    height: 50px;
                                    line-height: 50px;
                                    text-align: left;
                                    border-left: none;
                                    .new-point {
                                        cursor: pointer;
                                        font-size: 14px;
                                        color: #fff;
                                        background: #0ad487;
                                        border-radius: 2px;
                                        padding: 7px 10px;
                                        margin-left: 10px;
                                        i {
                                            font-size: 12px;
                                            margin-right: 2px;
                                        }
                                    }
                                }
                                &.newPoint {
                                    border-left: 1px solid #f3f6f9;
                                }
                            }
                            .el-table__body tr.hover-row > td {
                                background-color: #fff !important;
                            }
                            .el-table__body-wrapper td {
                                border-right: none;
                            }
                        }
                    }
                    .commut-wrap {
                        .item-box {
                            margin-bottom: 20px;
                            font-size: 16px;
                            color: #3e4254;
                            position: relative;
                            line-height: 22px;
                            padding-left: 10px;
                            &:last-child {
                                .end-address-wrap {
                                    margin-bottom: 30px;
                                }
                            }
                            .header-name {
                                white-space: normal;
                                line-height: 16px;
                                font-size: 12px;
                                vertical-align: middle;
                                padding: 0;
                                /deep/.el-checkbox__label {
                                    font-size: 12px;
                                    line-height: 16px;
                                }
                            }
                            .title {
                                display: inline-block;
                                position: absolute;
                                left: 0;
                                top: 1px;
                                height: 18px;
                                width: 4px;
                                background: #ff5c47;
                                border-radius: 2px;
                            }
                            /deep/.el-input {
                                margin-bottom: 20px;
                            }
                        }

                        .color-orange {
                            color: #fa5f35;
                        }
                        .scope-input-box {
                            overflow: hidden;
                            .number-input-box {
                                float: left;
                            }
                            /deep/.el-input {
                                float: left;
                                width: 52px;
                                margin-bottom: 0;
                                .el-input__inner {
                                    height: 30px;
                                    line-height: 30px;
                                    width: 52px;
                                    font-size: 12px;
                                    padding: 0 6px;
                                    border-radius: 0;
                                    color: #3e4a59;
                                    border-color: #ccc;
                                }
                            }
                            /deep/.el-textarea {
                                .el-textarea__inner {
                                    font-size: 12px;
                                    padding: 6px;
                                    color: #3e4a59;
                                }
                            }
                            .input-unit {
                                overflow: hidden;
                                font-size: 12px;
                                color: #3e4a59;
                                margin-left: 3px;
                                line-height: 30px;
                            }
                        }
                        .end-address-wrap {
                            margin-bottom: 30px;
                            .end-address-btn {
                                float: right;
                                margin-left: 20px;
                                margin-top: 8px;
                                .del-address-btn{
                                    display: block;
                                    font-size: 12px;
                                    width: 44px;
                                    line-height: 20px;
                                    height: 22px;
                                    background: #FF5C47;
                                    border-radius: 2px;
                                    box-sizing: border-box;
                                    padding: 0;
                                }
                            }
                            .end-address-box {
                                float: left;
                                width: 80px;
                                margin-top: 8px;
                                .end-address-num {
                                    float: left;
                                    width: 20px;
                                    height: 16px;
                                    background: url('../../../static/images/sreachTool/bg-num.png');
                                    background-size: 100%;
                                    color: #fff;
                                    font-size: 13px;
                                    line-height: 16px;
                                    text-indent: 4px;
                                    font-weight: bold;
                                    margin: 3px 2px 0 0;
                                }
                                .end-address-tit {
                                    overflow: hidden;
                                    font-size: 16px;
                                    color: #3e4254;
                                    line-height: 22px;
                                }
                            }
                            .end-address-input {
                                overflow: hidden;
                                /deep/.el-input__inner {
                                    height: 38px;
                                    line-height: 38px;
                                    border: 1px solid #ccc;
                                }
                            }
                        }
                    }
                    .summarize {
                        .project-container {
                            position: relative;
                            border-radius: 4px;
                            .project-wrap {
                                position: relative;
                                padding: 20px;
                                color: #333;
                                font-size: 14px;
                                background-color: #f4f5f9;
                                margin-bottom: 20px;
                                border-radius: 4px;
                                .status {
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                    width: 49px;
                                    height: 49px;
                                    display: inline-block;
                                    background-image: url(../../../static/images/sreachTool/not-finish.png);
                                    -webkit-background-size: 100%;
                                    background-size: 100%;
                                    &.finished {
                                        background-image: url(../../../static/images/sreachTool/finished.png);
                                    }
                                }
                                .pro-title {
                                    color: #3e4a59;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-bottom: 14px;
                                }
                                .hint {
                                    margin-bottom: 12px;
                                    &.required {
                                        &:after {
                                            content: '*';
                                            font-size: 16px;
                                            color: #ff5c47;
                                            top: 4px;
                                            position: relative;
                                        }
                                    }
                                }
                                .pro-area {
                                    margin-bottom: 20px;
                                    /deep/.el-textarea__inner {
                                        height: 120px;
                                    }
                                    &.area-txt {
                                        height: 120px;
                                    }
                                }
                                /deep/.el-textarea__inner {
                                    resize: none;
                                    border: none;
                                    border-radius: 4px;
                                }
                                .house-info-wrap {
                                    .house-box {
                                        background-color: #fff;
                                        margin-bottom: 20px;
                                        border-radius: 4px;
                                        &:last-child {
                                            margin-bottom: 0;
                                        }
                                        .info {
                                            /deep/.el-textarea__inner {
                                                height: 90px;
                                            }
                                            &.top {
                                                height: 40px;
                                                line-height: 40px;
                                                padding: 10px 20px 10px;
                                            }
                                            &:last-child {
                                                border-top: 1px solid #f3f6f9;
                                            }
                                            > span {
                                                display: inline-block;
                                            }
                                            .item {
                                                &:first-child {
                                                    margin-right: 30px;
                                                }
                                                &.wraning {
                                                    box-sizing: border-box;
                                                    padding: 0 5px 0 10px;
                                                }
                                                .th {
                                                    margin-right: 10px;
                                                }
                                                .td {
                                                    display: inline-block;
                                                    position: relative;
                                                    top: -2px;
                                                }
                                                .name {
                                                    color: #3e4254;
                                                    font-weight: bold;
                                                    margin-right: 20px;
                                                }
                                            }
                                            .tag-desc {
                                                float: right;
                                                color: #77808a;
                                                &.success {
                                                    color: #0ad487;
                                                }
                                            }
                                        }
                                    }
                                }
                                .rate-temp {
                                    margin-bottom: 20px;
                                    .info-each {
                                        margin-bottom: 12px;
                                        position: relative;
                                        .see-more {
                                            position: absolute;
                                            top: 3px;
                                            right: 10px;
                                            cursor: pointer;
                                        }
                                    }
                                    .tmp-wrap {
                                        overflow: hidden;
                                        .temp-card {
                                            font-size: 14px;
                                            width: 40%;
                                            padding: 20px;
                                            background-color: #fff;
                                            float: left;
                                            border-radius: 4px;
                                            &:nth-child(2) {
                                                float: right;
                                            }
                                            .name {
                                                margin-bottom: 12px;
                                                .licks {
                                                    float: right;
                                                    color: #abb0b5;
                                                }
                                            }
                                            .copy-btn {
                                                cursor: default;
                                                float: right;
                                                display: inline-block;
                                                font-size: 16px;
                                                padding: 4px 10px;
                                                color: #fff;
                                                background: #3da6ff;
                                                box-shadow: 0 2px 4px 0
                                                    rgba(51, 161, 255, 0.3);
                                                border-radius: 2px;
                                            }
                                            .txt-con {
                                                height: 78px;
                                                overflow: hidden;
                                                margin-bottom: 20px;
                                                .txt {
                                                    height: 100%;
                                                    overflow-y: auto;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .vodice-box {
                    padding-bottom: 30px;
                }
            }
        }
    }
    .preview-wrapper {
        width: 350px;
        height: 100%;
        margin-left: -350px;
        background-color: #f6f6f6;
        box-shadow: 0 0 20px 0 rgba(152, 152, 152, 0.1);
        #previewMap {
            width: 100%;
            height: 170px;
        }
        #previewMapSec {
            width: 100%;
            position: absolute !important;
            top: 0;
            left: 0;
        }
        .preview-inner {
            padding-top: 106px;
            height: 100%;
            box-sizing: border-box;
        }
        .fixed-header {
            position: fixed;
            top: 0;
            right: 0;
            width: 350px;
            height: 106px;
            line-height: 56px;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
            font-size: 12px;
            color: #77808a;
            background-color: #fff;
            z-index: 5;
            .share-header-box {
                span {
                    display: inline-block;
                    font-size: 16px;
                    color: #fff;
                    &.mini-preview {
                        background: #ff5c47;
                        border-radius: 0 100px 100px 0;
                        padding-left: 20px;
                        padding-right: 10px;
                        height: 26px;
                        line-height: 26px;
                    }
                    &.share {
                        cursor: pointer;
                        position: absolute;
                        top: 14px;
                        right: 20px;
                        background: #3da6ff;
                        box-shadow: 0 2px 4px 0 rgba(51, 161, 255, 0.3);
                        border-radius: 2px;
                        line-height: 30px;
                        height: 28px;
                        padding: 0 10px;
                    }
                    &.disable-btn {
                        background-color: rgba(171, 176, 181, 0.3);
                        cursor: not-allowed;
                        box-shadow: 0 2px 4px 0 rgba(51, 161, 255, 0.3);
                        border-radius: 2px;
                    }
                }
            }
            /*置顶咨询师信息*/
            .user-info-box {
                height: 50px;
                padding: 5px 20px 0;
                box-sizing: border-box;
                border-top: 1px solid #f3f6f9;
                .user-info-pic {
                    position: relative;
                    float: left;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    & > img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                    .pic-icon {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        z-index: 2;
                        width: 12px;
                        height: 12px;
                    }
                }
                .user-info-op {
                    float: right;
                    font-size: 0;
                    height: 45px;
                    line-height: 40px;
                    box-sizing: border-box;
                    .iconfont {
                        font-size: 20px;
                        margin-right: 20px;
                        &:last-of-type {
                            margin-right: 0;
                        }
                        &.iconphone_icon {
                            color: #ff5c47;
                        }
                    }
                }
                .user-info-cont {
                    overflow: hidden;
                    padding-left: 6px;
                    box-sizing: border-box;
                    .user-info-name {
                        font-size: 16px;
                        color: #3e4a59;
                        line-height: 22px;
                        margin-bottom: 2px;
                    }
                    .user-info-phone {
                        font-size: 12px;
                        color: #77808a;
                        line-height: 17px;
                    }
                }
            }
        }
        .preview-content {
            height: 100%;
            overflow-y: auto;
            > div {
                background-color: #fff;
                > div {
                    margin-bottom: 10px;
                }
                .curren-scroll-box {
                    background-color: rgba(255, 92, 71, 0.05);
                    border: 1px dashed #ff5c47;
                }
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .client-desc {
                padding: 20px;
                padding-top: 10px;
                .desc-info {
                    display: block;
                    font-size: 14px;
                    color: #3e4a59;
                    margin-bottom: 16px;
                    &:first-child {
                        font-weight: bold;
                    }
                    img {
                        width: 100%;
                        height: 74px;
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            .house-tab {
                .swiper-cont {
                    .swiper-container {
                        .swiper-wrapper {
                            .swiper-slide {
                                width: 260px;
                                img {
                                    width: 100%;
                                    height: 170px;
                                }
                                .swiper-card {
                                    position: relative;
                                    border-radius: 4px;
                                    overflow: hidden;
                                    .house-desc {
                                        position: absolute;
                                        bottom: 0;
                                        height: 30px;
                                        width: 100%;
                                        opacity: 0.7;
                                        background: #4a4a4a;
                                        color: #fff;
                                        font-size: 14px;
                                        line-height: 30px;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        > span {
                                            padding: 0 10px;
                                        }
                                    }
                                }
                            }
                            .swiper-slide-prev {
                                height: 144px;
                                margin-top: 13px;
                                img {
                                    height: 144px;
                                }
                            }
                            .swiper-slide-active {
                                width: 260px;
                            }
                            .swiper-slide-next {
                                height: 144px;
                                margin-top: 13px;
                                img {
                                    height: 144px;
                                }
                            }
                        }
                    }
                }
                .overview {
                    /deep/.el-table {
                        border: none;
                        border-left: 1px solid #f3f6f9;
                        .sall-out {
                            color: #a1b1c6;
                        }
                        .sall-ing {
                            color: #0ad487;
                        }
                        .no-sall {
                            color: #47b3e3;
                        }
                    }
                }
                .traffic-wrap {
                    /deep/.el-table {
                        th {
                            > .cell {
                                text-align: left;
                                padding-left: 10px;
                                padding-right: 10px;
                            }
                        }
                        td {
                            padding: 0;
                            border-right: 1px solid #f3f6f9;
                            &:last-child {
                                border-right: none;
                            }
                            .house-name {
                                display: inline-block;
                                padding: 10px 5px;
                            }
                        }
                    }
                }
                /deep/.el-table {
                    font-size: 12px;
                    color: #3e4a59;
                    border: 1px solid #f3f6f9;
                    border-bottom: none;
                    th {
                        background-color: #f3f6f9;
                        color: #3e4a59;
                        > .cell {
                            text-align: center;
                            padding-left: 3px;
                            padding-right: 3px;
                        }
                    }
                    td {
                        > .cell {
                            text-align: center;
                            .house-name {
                                color: #fa5f35;
                                text-align: left;
                            }
                        }
                    }
                }
            }
            .img-con {
                padding: 0 0 24px !important;
                .cur-read {
                    padding: 24px 0 0;
                    margin-top: 0;
                    margin-bottom: 0;
                    .desc-info-th {
                        margin-left: 20px;
                        font-size: 16px;
                        color: #3e4a59;
                        margin-bottom: 20px;
                        font-weight: bold;
                        position: relative;
                        &::after {
                            content: '';
                            position: absolute;
                            bottom: 2px;
                            left: 0;
                            height: 4px;
                            width: 100%;
                            background-color: #fa5f35;
                            opacity: 0.3;
                        }
                    }
                    .desc-info {
                        display: block;
                        padding: 20px 20px 24px;
                        height: 74px;
                        border-radius: 4px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .sha-box {
                        background-color: #f6f6f6;
                        height: 10px;
                    }
                }
                .overview-wrap {
                    padding: 0 20px;
                    padding-top: 24px;
                    /deep/.el-table {
                        .curren-row {
                            background: #e3f6fe;
                            box-shadow: 0 2px 4px 0 rgba(187, 187, 187, 0.2);
                            td {
                                border-right: none;
                            }
                        }
                    }
                    .annotation {
                        font-size: 12px;
                        text-align: right;
                        margin-top: 10px;
                    }
                }
                .house-title {
                    padding-top: 24px;
                    .name {
                        font-size: 16px;
                        margin-bottom: 20px;
                        margin-left: 20px;
                        position: relative;
                        &::after {
                            content: '';
                            position: absolute;
                            bottom: 2px;
                            left: 0;
                            height: 4px;
                            width: 100%;
                            background-color: #fa5f35;
                            opacity: 0.3;
                        }
                    }
                }
            }
            .rim-tab {
                /deep/.el-table {
                    border: none;
                    border-left: 1px solid #f3f6f9;
                    th {
                        > .cell {
                            padding-left: 12px;
                            padding-right: 12px;
                        }
                    }
                    td {
                        border-right: 1px solid #f3f6f9;
                    }
                }
                .up-time {
                    font-weight: normal;
                    opacity: 0.45;
                    font-size: 14px;
                    color: #3e4a59;
                    float: right;
                    line-height: 26px;
                }
            }
            .module-box {
                padding: 24px 20px;
                border: 1px solid #fff;
                .hd {
                    font-size: 18px;
                    font-weight: bold;
                    color: #3e4254;
                    margin-bottom: 20px;
                    .map-detail {
                        float: right;
                        margin-right: 5px;
                        font-size: 14px;
                        color: #abb0b5;
                        line-height: 25px;
                        &::after {
                            content: '\e64a';
                            font-family: 'iconfont';
                            font-size: 12px;
                            font-weight: bold;
                            -webkit-font-smoothing: antialiased;
                            -moz-osx-font-smoothing: grayscale;
                            margin-left: 5px;
                        }
                    }
                    .hint {
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .bd {
                    font-size: 16px;
                    color: #3e4a59;
                    line-height: 16px;
                    .hint-txt {
                        font-size: 14px;
                        line-height: 18px;
                    }
                    .desc-info {
                        margin-bottom: 20px;
                    }
                    .single-house {
                        font-size: 14px;
                        color: #3e4a59;
                        text-align: justify;
                        line-height: 22px;
                        padding: 14px;
                        margin-bottom: 10px;
                        background: #f3f6f9;
                        background-image: url(../../../static/images/sreachTool/base-img.png);
                        -webkit-background-size: 100%;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        border-radius: 4px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .project-name {
                            font-size: 16px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .project-desc {
                            margin-bottom: 14px;
                        }
                        .item-house {
                            padding: 10px;
                            background-color: #fff;
                            margin-bottom: 14px;
                            border-radius: 4px;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            > div {
                                margin-bottom: 10px;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                            .house-name {
                                font-size: 16px;
                            }
                            .area {
                                margin-left: 10px;
                            }
                            .rate {
                                height: 20px;
                                line-height: 20px;
                                > span {
                                    display: inline-block;
                                    float: left;
                                }
                                .name {
                                    color: #77808a;
                                }
                            }
                        }
                    }
                    .cell {
                        .trip-line {
                            padding-bottom: 7px;
                            &:first-child {
                                padding-top: 12px;
                            }
                            &:last-child {
                                padding-bottom: 12px;
                            }
                        }
                    }
                    .trip-line {
                        overflow: hidden;
                        font-size: 12px;
                        line-height: 14px;
                        color: #77808a;
                        > span {
                            display: inline-block;
                            float: left;
                        }
                        .trip-type {
                            width: 50px;
                            float: left;
                        }
                        .trip-way {
                            float: left;
                            max-width: 140px;
                            text-align: justify;
                        }
                    }
                }
                .user-need {
                    .tag-wrap {
                        overflow: hidden;
                        .tag-desc {
                            float: left;
                            margin: 0 10px 10px 0;
                            background: #e3f6fe;
                            border-radius: 4px;
                            line-height: 12px;
                            padding: 7px 8px;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            font-size: 12px;
                            color: #47b3e3;
                        }
                    }
                }
                .commut-path {
                    border-radius: 4px;
                    position: relative;
                    .trip-tab {
                        padding: 16px 0 0;
                        .tab-wrap {
                            margin-bottom: 16px;
                            height: 30px;
                            .tab-name {
                                cursor: pointer;
                                padding: 7px 18px;
                                background: #f3f6f9;
                                border-radius: 15px;
                                float: left;
                                width: 105px;
                                height: 16px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                text-align: center;
                                &.right-tab {
                                    float: right;
                                }
                                &.active {
                                    background-image: linear-gradient(
                                        -93deg,
                                        #45c0f6 6%,
                                        #30b0e9 97%
                                    );
                                    box-shadow: 0 2px 4px 0
                                        rgba(71, 179, 227, 0.3);
                                    color: #fff;
                                }
                            }
                        }
                        .trip-wrap {
                            .box {
                                padding-bottom: 15px;
                                border-bottom: 1px solid #f3f6f9;
                                margin-bottom: 15px;
                                position: relative;
                                .comu-line {
                                    display: inline-block;
                                    height: 10px;
                                    width: 1px;
                                    background-color: #f3f6f9;
                                    position: absolute;
                                    top: 17px;
                                    left: 3px;
                                }
                                &:last-child {
                                    padding-bottom: 15px;
                                    margin-bottom: 0;
                                    border-bottom: 0;
                                }
                                .item {
                                    position: relative;
                                    font-size: 14px;
                                    line-height: 22px;
                                    overflow: hidden;
                                    &::after {
                                        content: '';
                                        display: inline-block;
                                        position: absolute;
                                        left: 0;
                                        top: 7px;
                                        width: 8px;
                                        height: 8px;
                                        border-radius: 50%;
                                        background: #fa5f35;
                                    }
                                    > span {
                                        display: block;
                                    }
                                    .name {
                                        color: #77808a;
                                        margin-right: 5px;
                                        margin-left: 15px;
                                        float: left;
                                    }
                                    .time {
                                        color: #47b3e3;
                                    }
                                    .time-wrap {
                                        overflow: hidden;
                                        zoom: 1;
                                    }
                                }
                                &.box0 {
                                    .item {
                                        &:first-child::after {
                                            background: #47b3e3;
                                        }
                                    }
                                }
                                &.box1 {
                                    .item {
                                        &:first-child::after {
                                            background: #0ad487;
                                        }
                                    }
                                }
                                &.box2 {
                                    .item {
                                        &:first-child::after {
                                            background: #5daaf8;
                                        }
                                    }
                                }
                                &.box3 {
                                    .item {
                                        &:first-child::after {
                                            background: #378eb5;
                                        }
                                    }
                                }
                                &.box4 {
                                    .item {
                                        &:first-child::after {
                                            background: #08ced9;
                                        }
                                    }
                                }
                                &.box5 {
                                    .item {
                                        &:first-child::after {
                                            background: #a3dbe1;
                                        }
                                    }
                                }
                                &.box6 {
                                    .item {
                                        &:first-child::after {
                                            background: #e09230;
                                        }
                                    }
                                }
                                &.box7 {
                                    .item {
                                        &:first-child::after {
                                            background: #ffa62a;
                                        }
                                    }
                                }
                                &.box8 {
                                    .item {
                                        &:first-child::after {
                                            background: #e3cf47;
                                        }
                                    }
                                }
                                &.box9 {
                                    .item {
                                        &:first-child::after {
                                            background: #ff5c47;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .tab-menu {
                        .map-box {
                            height: 170px;
                        }
                        .dispear-box {
                            z-index: -10 !important;
                            opacity: 0;
                        }
                    }
                    .tab-map-box {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        background: rgba(255, 255, 255, 0.9);
                        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
                        border-radius: 4.59px;
                        z-index: 3;
                        padding: 5px 1px 3px;
                        box-sizing: border-box;
                        .tab-map-item {
                            cursor: pointer;
                            &:last-of-type {
                                margin-bottom: 0;
                            }
                            &:first-child {
                                padding-bottom: 1px;
                                margin-bottom: 4px;
                                &:after {
                                    background: #f3f6f9;
                                    content: '';
                                    position: absolute;
                                    bottom: 0;
                                    left: 5px;
                                    width: 14px;
                                    height: 1px;
                                }
                            }
                            .item-pic {
                                width: 14px;
                                height: 14px;
                                margin: 0 auto;
                                & > img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .item-tit {
                                font-size: 12px;
                                color: #3e4254;
                                text-align: center;
                                transform: scale(0.7, 0.7);
                            }
                            .item-tit-active {
                                color: #47b3e3;
                            }
                        }
                    }
                }
            }
            .need-box {
                padding: 0;
                &.curren-scroll-box {
                    border: none;
                    background-color: #fff;
                    border: 1px border transparent;
                    .has-bg {
                        padding: 24px 20px 0;
                        background-color: rgba(255, 92, 71, 0.05);
                        border: 1px dashed #ff5c47;
                    }
                }
                .has-bg {
                    padding: 24px 20px 0;
                    border: 1px border transparent;
                }
            }
            .counse-container {
                background-color: #f6f6f6;
                padding: 0;
                .bd {
                    > div {
                        background-color: #fff;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                    .sha-box {
                        height: 10px;
                        background: #f6f6f6;
                    }
                }
                &.curren-scroll-box {
                    background-color: transparent;
                    > .bd {
                        background-color: #fff;
                        > div {
                            background-color: rgba(
                                255,
                                92,
                                71,
                                0.05
                            ) !important;
                            .serve {
                                background-color: #fff;
                            }
                        }
                        .sha-box {
                            height: 10px;
                            background: #f6f6f6 !important;
                        }
                    }
                }
                .counselor-box {
                    .img-warp {
                        width: 100%;
                        height: 210px;
                        position: relative;
                        .shadow {
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        .desc {
                            position: absolute;
                            bottom: 12px;
                            width: 100%;
                            color: #fff;
                        }
                        .left {
                            float: left;
                            padding-top: 5px;
                            margin-left: 20px;
                            width: 185px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            .coun-name {
                                font-size: 22px;
                                margin-bottom: 5px;
                                font-weight: bold;
                            }
                            .graduation-school {
                                font-size: 14px;
                            }
                        }
                        .right {
                            float: right;
                            font-size: 16px;
                            margin-right: 20px;
                            padding: 12px 20px;
                            background-image: linear-gradient(
                                93deg,
                                #45c0f6 6%,
                                #30b0e9 97%
                            );
                            border-radius: 20px;
                        }
                    }
                    .serve {
                        display: -webkit-box;
                        display: -moz-box;
                        display: -ms-flexbox;
                        display: -webkit-flex;
                        display: flex;
                        justify-content: space-around;
                        height: 75px;
                        align-items: center;
                        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
                        padding: 0 10px;
                        position: relative;
                        padding-top: 3px;
                        .line {
                            height: 20px;
                            width: 1px;
                            background-color: #f4f6f9;
                        }
                        > li {
                            .num {
                                font-size: 26px;
                                color: #3e4a59;
                                font-weight: bold;
                                margin-bottom: 10px;
                                span {
                                    font-size: 16px;
                                    font-weight: normal;
                                }
                                &.good {
                                    color: #fa5f35;
                                }
                            }
                            .text {
                                color: #77808a;
                                font-size: 16px;
                            }
                        }
                    }
                    .tag-warp {
                        padding: 14px 20px 24px;
                        ul {
                            margin-bottom: 10px;
                            overflow: hidden;
                            .item {
                                font-size: 12px;
                                float: left;
                                padding: 0 5px;
                                color: #47b3e3;
                                border: 1px solid #47b3e3;
                                border-radius: 2px;
                                margin-right: 6px;
                                margin-bottom: 6px;
                            }
                        }
                        p {
                            font-size: 14px;
                            line-height: 24px;
                        }
                    }
                }
                .question-box,
                .remark-box {
                    padding: 24px 20px;
                    .buy-house {
                        ul {
                            li {
                                margin-bottom: 20px;
                                color: #3e4a59;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .title {
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-bottom: 10px;
                                }
                                .desc {
                                    margin-bottom: 15px;
                                    font-size: 12px;
                                    color: #77808a;
                                    overflow: hidden;
                                    > span {
                                        float: left;
                                        margin-right: 10px;
                                    }
                                    .time {
                                        float: right;
                                    }
                                }
                                .content {
                                    font-size: 14px;
                                    background: #f3f6f9;
                                    border-radius: 8px;
                                    box-sizing: border-box;
                                    padding: 12px;
                                    position: relative;
                                    /deep/img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                    span {
                                        position: absolute;
                                        display: inline-block;
                                        top: -7px;
                                        width: 0;
                                        left: 20px;
                                        height: 0;
                                        border-left: 10px solid transparent;
                                        border-right: 10px solid transparent;
                                        border-bottom: 10px solid #f3f6f9;
                                    }
                                }
                            }
                        }
                    }
                }
                .remark-box {
                    margin-bottom: 0 !important;
                    .user-info {
                        overflow: hidden;
                        margin-bottom: 12px;
                        background-color: transparent;
                        .avatar {
                            width: 75px;
                            height: 95px;
                            border-radius: 5px;
                            overflow: hidden;
                            float: left;
                            margin-right: 5px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .desc {
                            float: left;
                            > li {
                                color: #77808a;
                                font-size: 12px;
                                margin-bottom: 6px;
                                position: relative;
                                overflow: hidden;
                                line-height: 20px;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .th {
                                    float: left;
                                }
                                .td {
                                    overflow: hidden;
                                    zoom: 1;
                                }
                                > ul {
                                    li {
                                        color: #fa5f35;
                                        background: #fff4f1;
                                        border-radius: 2px;
                                        font-size: 12px;
                                        line-height: 18px;
                                        padding: 0 5px;
                                        display: inline-block;
                                        margin-right: 5px;
                                    }
                                }
                            }
                            .name {
                                font-size: 16px;
                                line-height: 18px;
                                color: #3e4a59;
                                font-weight: bold;
                            }
                        }
                    }
                    p {
                        font-size: 14px;
                        color: #3e4a59;
                        line-height: 24px;
                    }
                }
                .btn-area {
                    box-sizing: border-box;
                    padding: 15px 20px;
                    display: -webkit-box;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    justify-content: space-between;
                    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.06);
                    background-color: #fff;
                    font-size: 14px;
                    color: #ffffff;
                    > div {
                        width: 48%;
                        line-height: 42px;
                        border-radius: 4px;
                        text-align: center;
                    }
                    .left-btn {
                        background-image: linear-gradient(
                            -131deg,
                            #58cff9 0%,
                            #47b3e3 100%
                        );
                    }
                    .right-btn {
                        background-image: linear-gradient(
                            -137deg,
                            #ff8e56 0%,
                            #fa5f35 100%
                        );
                    }
                }
            }
            .replenish-height {
                height: 400px;
            }
        }
    }
    .left-wrapper {
        margin-left: -100%;
        width: 213px;
        height: 100%;
        border-right: 2px dashed #e6e6e6;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .share-success-box {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        right: 351px;
        padding-left: 351px;
        box-sizing: border-box;
        z-index: 3;
        .center-header {
            padding-left: 0;
            margin-left: 30%;
            margin-top: 50px;
            .iconsuccess_all {
                font-size: 15px;
                font-weight: bold;
            }
        }
        .share-body {
            margin-top: 30px;
            padding-left: 30%;
            box-sizing: border-box;
            /*2019.9.4修改*/
            .share-method-box {
                margin-bottom: 20px;
                .share-box-hd {
                    margin-bottom: 20px;
                    h3 {
                        font-size: 18px;
                        color: #3e4254;
                        line-height: 25px;
                    }
                }
                .share-box-bd {
                    .share-method {
                        margin-bottom: 30px;
                        /deep/.el-radio {
                            color: #3e4a59;
                            line-height: 16px;
                            font-weight: normal;
                        }
                    }
                    .wx-message-method-box {
                        font-size: 14px;
                        color: #3e4254;
                        line-height: 20px;
                        .wx-message {
                            margin-bottom: 10px;
                            padding-right: 20px;
                            box-sizing: border-box;
                            .bind-wx {
                                font-size: 14px;
                                color: #33a1ff;
                                margin-left: 20px;
                                cursor: pointer;
                            }
                            .th {
                                float: left;
                                width: auto;
                                line-height: 30px;
                            }
                            .td {
                                overflow: hidden;
                                margin-left: 6px;
                                /deep/.el-input {
                                    width: 260px;
                                    height: 30px;
                                    .el-input__inner {
                                        height: 30px;
                                        line-height: 30px;
                                        padding: 0 8px;
                                        border-radius: 0;
                                    }
                                }
                            }
                        }
                        .method-tip {
                            font-size: 12px;
                            color: #ff5c47;
                            line-height: 17px;
                            .iconupload_fail {
                                margin-right: 6px;
                                color: #ff5c47;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            .share-code-box {
                margin: 40px 0 0 82px;
                width: 218px;
                height: 218px;
                & > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .header-step {
            float: left;
            width: 20px;
            height: 20px;
            background: url('../../../static/images/sreachTool/step_bg.png');
            background-size: 100%;
            color: #fff;
            line-height: 20px;
            text-align: center;
        }
        .header-step-dis {
            float: left;
            font-size: 16px;
            color: #333;
            line-height: 22px;
            margin: 0 10px;
        }
        .header-step-status {
            position: relative;
            overflow: hidden;
            height: 22px;
        }
        .header-line {
            position: relative;
            float: right;
            width: 98%;
            margin-top: 10px;
            height: 0;
            border-bottom: 1px solid #ff5c47;
        }
        .header-step-status > img {
            position: absolute;
            left: 0;
            top: 4px;
            width: 12px;
            height: 12px;
        }
    }
}
.share-btn-area {
    padding-top: 40px;
    box-sizing: border-box;
    margin-left: 22%;
    width: 586px;
    display: flex;
    justify-content: center;
    button {
        padding: 11px 34px;
        border-radius: 4px;
        margin-right: 20px;
        &:last-of-type {
            margin-right: 0;
        }
        &.update-btn {
            background: #33a1ff;
            box-shadow: 0 2px 4px 0 rgba(51, 161, 255, 0.3);
        }
        &.send-article {
            background: #0ad487;
            border-color: #0ad487;
            box-shadow: 0 2px 4px 0 rgba(51, 161, 255, 0.3);
        }
        &.send-immediately {
            background: #ff8800;
            border-color: #ff8800;
            box-shadow: 0 2px 4px 0 rgba(255, 136, 0, 0.3);
        }
    }
}
.left-title {
    width: 169px;
    height: 53px;
    line-height: 53px;
    text-align: center;
    margin-top: 30px;
    background: #33a1ff;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    border-radius: 0px 100px 100px 0px;
}
.swiper-class {
    position: relative;
    margin-left: 40px;
}
.shop_box {
    width: 100%;
    white-space: nowrap;
}
.shop_box .content {
    font-size: 0;
    padding: 0;
}
.showLi {
    background-color: #48b3e2 !important;
    color: #fff !important;
}
.shop_box .content > li {
    position: relative;
    height: 61px;
    font-size: 14px;
    text-align: center;
    border-left: 2px dashed #e6e6e6;
}
.shop_box .content > li.last-li:before {
    background-color: #fff;
    border: 1px solid #33a1ff;
    width: 9px;
    height: 9px;
}
.shop_box .content > li.active {
    border-color: #33a1ff;
}
.shop_box .content > li:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -7px;
    bottom: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #e6e6e6;
}
.shop_box .content > li.last-li:before {
    background-color: #fff;
    border: 1px solid #33a1ff;
}
.shop_box .content > li .step-ok {
    position: absolute;
    left: -7px;
    bottom: 0;
    width: 12px;
    height: 12px;
}
.content > li .step-cont {
    position: relative;
    margin-left: 14px;
    color: #3e4254;
}
.content > li .step-cont-active:after {
    content: '';
    position: absolute;
    right: -2px;
    top: 38px;
    width: 0;
    border-width: 15px;
    border-style: solid;
    border-color: transparent #e6e6e6 transparent transparent; /* transparent 设置边框颜色透明 */
}
.content > li .step-box {
    position: absolute;
    left: 0;
    top: 30px;
    width: 103px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    text-indent: 10px;
    font-size: 14px;
    cursor: pointer;
}
.content > li .step-box-active {
    position: absolute;
    left: 0;
    top: 30px;
    width: 103px;
    height: 50px;
    background-color: #fafafa;
    line-height: 50px;
    text-align: left;
    text-indent: 10px;
    color: #33a1ff;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
}
.content > li .step-box-active:before {
    content: '';
    position: absolute;
    left: -12px;
    top: 18px;
    width: 0;
    border-width: 6px;
    border-style: solid;
    border-color: transparent #fafafa transparent transparent;
}
.step-require {
    font-size: 12px;
    color: #fa5f35;
}
.step-btn-area {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    .step-area {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
        border-radius: 21px;
        width: 130px;
        height: 40px;
        line-height: 34px;
        font-size: 14px;
        font-weight: bold;
        background-color: #fff;
        overflow: hidden;
        padding: 3px 0;
        box-sizing: border-box;
        display: flex;
        cursor: pointer;
        .step-btn {
            flex: 1;
            font-size: 14px;
            color: #3e4254;
            text-align: center;
            &:first-of-type {
                border-right: 1px dashed #e6e6e6;
            }
            &:hover {
                color: #33a1ff;
            }
        }
        .unactive {
            color: #abb0b5;
            cursor: not-allowed;
            &:hover {
                color: #abb0b5;
            }
        }
    }
}
</style>
<style scoped>
audio:focus {
    outline: none;
}
.body-bd-box-hd {
    position: relative;
    font-size: 16px;
    color: #3e4254;
    line-height: 22px;
    text-indent: 4px;
    margin: 10px 0 20px 6px;
}
.body-bd-box-bd >>> .el-input__inner,
.body-bd-box-bd >>> .el-input {
    border-radius: 2px;
}
.body-bd-box-hd:before {
    content: '';
    position: absolute;
    top: 2px;
    left: -6px;
    background: #ff5c47;
    border-radius: 2px;
    width: 4px;
    height: 18px;
}
.add-input >>> .el-button {
    float: right;
    margin-left: 10px;
    border-radius: 2px;
    font-size: 14px;
    color: #3e4254;
    line-height: 20px;
    padding: 9px 10px;
    font-weight: normal;
}
.add-input .add-label {
    overflow: hidden;
}
.add-label >>> .el-input__inner {
    border-radius: 2px;
    padding: 0 10px;
}
.lable-box-title {
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
}
.custom-box {
    overflow: hidden;
    margin-top: 20px;
}
.custom-box > li {
    float: left;
    margin: 0 12px 12px 0;
}
.add-input {
    margin-top: 28px;
}
.custom-box .custom-item {
    padding: 7px 10px;
    background: #33a1ff;
    border-radius: 14px;
    color: #fff;
    overflow: hidden;
    font-size: 0;
}
.custom-item .custom-item-name {
    font-size: 14px;
    line-height: 14px;
}
.custom-item .iconicon_guanbi {
    font-size: 12px;
    margin-left: 5px;
    cursor: pointer;
}
.custom-item .iconicon_chosen {
    font-size: 12px;
    margin-left: 5px;
    color: #abb0b5;
}
.check-house >>> .el-input__inner {
    padding-left: 5px;
    height: 30px;
    line-height: 30px;
    border-radius: 0;
}
.hou-item.hous-custom >>> .el-input__inner {
    padding: 0 5px;
    border-radius: 0;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
}
.edit-content .el-switch {
    height: 22px;
    line-height: 22px;
}
.edit-content .el-switch >>> .el-switch__core {
    height: 22px !important;
    line-height: 22px !important;
    width: 46px !important;
    border-radius: 15px !important;
}
.edit-content .el-switch >>> .el-switch__label--left {
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
}
.edit-content .el-switch >>> .el-switch__label--right {
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
}
.edit-content .el-switch >>> .el-switch__label--right.is-active {
    z-index: 1111;
    color: #fff !important;
}
.edit-content .el-switch >>> .el-switch__label--left.is-active {
    z-index: 1111;
    color: #fff !important;
}
.edit-content .el-switch >>> .el-switch__core:after {
    top: 2px;
}
.circum-wrap .trip-bus-type .el-select >>> .el-input__icon {
    height: 30px;
    line-height: 30px;
}
.more-share-box
    .edit-wrapper
    .center-content
    .edit-box
    .edit-content
    .house-wrap
    .el-table
    .trip-bus-type
    .select-wrap
    >>> .el-input {
    width: 100%;
}
</style>
<style>
.anchorBL {
    display: none;
}
</style>
