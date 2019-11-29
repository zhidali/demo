<!--
 * @author: zhengchao
 * @Date: 2019-10-23 10:00:00
 * @description: 服务管理员业务管理--投诉管理-新建投诉
 -->
<template>
    <div
        class="el-row"
        v-loading.fullscreen.lock="contentLoading">
        <el-col
            :span="24"
            class="content-main">
            <el-breadcrumb
                class="bread-crumb-box"
                separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/performance/complainList' }">投诉管理</el-breadcrumb-item>
                <el-breadcrumb-item>新建投诉</el-breadcrumb-item>
            </el-breadcrumb>
            <!--新建投诉展示区域-->
            <div class="v-box form-table-box box-relative">
                <div class="bd">
                    <div class="complain-form-wrap">
                        <p class="form-tit">举报内容：</p>
                        <el-form
                            ref="complainForm"
                            :model="complainData"
                            :rules="rules"
                            label-width="130px">
                            <el-form-item
                                label="举报途径："
                                prop="channel">
                                <el-select
                                    v-model="complainData.channel"
                                    placeholder="请选择举报途径"
                                    filterable
                                    class="box-width-100">
                                    <el-option
                                        v-for="item in complainChannels"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="标题："
                                prop="title">
                                <el-input
                                    v-model.trim="complainData.title"
                                    placeholder="请输入投诉标题"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="问题发生城市："
                                prop="cityId">
                                <el-select
                                    v-model="complainData.cityId"
                                    filterable
                                    placeholder="请输入城市"
                                    class="box-width-100">
                                    <el-option
                                        v-for="item in cityList"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="被举报员工："
                                prop="employeeName">
                                <el-input
                                    v-model.trim="complainData.employeeName"
                                    placeholder="请输入被举报员工"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="参与人："
                                prop="joiner">
                                <el-input
                                    v-model.trim="complainData.joiner"
                                    placeholder="请输入参与人"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="知情人："
                                prop="insider">
                                <el-input
                                    v-model.trim="complainData.insider"
                                    placeholder="请输入知情人"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="问题发生时间："
                                prop="dateTime">
                                <el-date-picker
                                    v-model="complainData.dateTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    format="yyyy-MM-dd"
                                    placeholder="请选择日期"
                                    style="width:100%">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item
                                label="问题详情描述："
                                prop="content">
                                <el-input
                                    type="textarea"
                                    v-model="complainData.content"
                                    placeholder="请输入问题的具体情况"
                                    maxlength="3000"
                                    :autosize="{ minRows: 2, maxRows: 10}"
                                    show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item
                                label="调查建议："
                                prop="investigationProposal">
                                <el-input
                                    type="textarea"
                                    v-model.trim="complainData.investigationProposal"
                                    placeholder="请输入调查建议"
                                    maxlength="300"
                                    :autosize="{ minRows: 2, maxRows: 10}"
                                    show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item
                                label="上传图片凭证："
                                prop="imgUrls">
                                <el-upload
                                    ref="imgUpload"
                                    action
                                    :accept="imgUploadData.fileTypeString"
                                    :http-request="imgUploadRequest"
                                    :show-file-list="false"
                                    multiple
                                    v-if="showImgUpbtn">
                                    <div class="img">
                                        <i class="el-icon-plus add_img"></i>
                                    </div>
                                </el-upload>
                            </el-form-item>
                            <div class="uploadlist-wrap">
                                <div
                                    class="updata-wrap"
                                    v-for="(elm,index) in showImgUrls"
                                    :key="'img'+index">
                                    <image-swiper-viewer
                                        :url="elm"
                                        :urlList="showImgUrls"
                                        :ids="index"></image-swiper-viewer>
                                    <div
                                        class="close"
                                        @click="delUpelm('img',index)"> X </div>
                                </div>
                            </div>
                            <el-form-item
                                label="上传音频凭证："
                                prop="soundUrls">
                                <el-upload
                                    ref="upload"
                                    :accept="audioUploadData.fileTypeString"
                                    action
                                    :http-request="fnUploadSoundRequest"
                                    :show-file-list="false"
                                    multiple
                                    v-if="showSoundUpbtn">
                                    <div class="sound">
                                        <i class="el-icon-plus add_img"></i>
                                    </div>
                                </el-upload>
                            </el-form-item>
                            <div class="uploadlist-wrap">
                                <div
                                    class="updata-wrap sound-wrap"
                                    v-for="(elm,index) in showSoundUrls"
                                    :key="'sound'+index">
                                    <audio
                                        :src="elm"
                                        controls="controls"></audio>
                                    <div
                                        class="close"
                                        @click="delUpelm('audio',index)"> X </div>
                                </div>
                            </div>
                            <p class="form-tit">举报人信息：</p>
                            <el-form-item
                                label="举报人姓名："
                                prop="name">
                                <el-input
                                    v-model.trim="complainData.name"
                                    placeholder="请输入举报人姓名"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="举报人手机："
                                prop="phone">
                                <el-input
                                    v-model.trim="complainData.phone"
                                    placeholder="联系方式至少选填一项"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="举报人邮箱："
                                prop="email">
                                <el-input
                                    v-model.trim="complainData.email"
                                    placeholder="联系方式至少选填一项"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="举报人qq："
                                prop="qq">
                                <el-input
                                    v-model.trim="complainData.qq"
                                    placeholder="联系方式至少选填一项"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="举报人微信："
                                prop="wechat">
                                <el-input
                                    v-model.trim="complainData.wechat"
                                    placeholder="联系方式至少选填一项"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="订单ID："
                                prop="orderId">
                                <el-input
                                    v-model.trim="complainData.orderId"
                                    placeholder="请输入订单ID"></el-input>
                            </el-form-item>
                            <p class="form-tit">处理结果：</p>
                            <el-form-item
                                label="请填写处理结果："
                                prop="handleResult">
                                <el-input
                                    type="textarea"
                                    v-model.trim="complainData.handleResult"
                                    placeholder="请输入处理结果"></el-input>
                            </el-form-item>

                        </el-form>
                    </div>
                    <div class="form-btn-wrap">
                        <el-button
                            type="primary"
                            @click="validSub"
                        >提交</el-button>
                    </div>
                </div>
            </div>
        </el-col>
        <el-dialog
            :visible.sync="dialogData.show"
            :title="dialogData.title"
            width="30%"
            :center="true">
            <div class="dialog-content">
                <p class="content-tex save-warn-tex">{{dialogData.cnt}}</p>
            </div>
            <div
                slot="footer"
                class="dialog-footer">
                <el-button
                    type="primary"
                    @click="closeDialog">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { ImageSwiperViewer } from '@/components';
    import performanceApi from '@/api/performanceApi/performance';
    import { getCity } from '@/api/commonApi';
    import { CommonMethods } from '@/assets/Util';
    import CommonFun from '@/utils/common';
    import { COMPLAIN_PROGRESS, COMPLAIN_CHANNELS } from './js/DataConfig';
    export default {
        name: 'PerformanceRiskList',
        data() {
            /**
             * @description: 验证手机号回调（elment-ui）
             * @param {object} rule 验证基本信息
             * @param {any} value 待验证的数据
             * @param {function} callback 验证后的回调函数
             * @return:
             */
            var verifyTelNum = (rule, value, callback) => {
                if (!CommonFun.verifyTelNum(value) && value !== '') {
                    return callback(new Error(''));
                }
                callback();
            };
            // 验证电子邮箱函数
            var verifyEmail = (rule, value, callback) => {
                if (!CommonFun.verifyEmail(value) && value !== '') {
                    return callback(new Error(''));
                }
                callback();
            };
            // 联系方式至少有一项
            var verifyLink = (rule, value, callback) => {
                let rules = ['phone', 'email', 'qq', 'wechat'];
                if (value !== '') {
                    if (!this.hasLink) {
                        // 输入框不为空 但是 四选一总判断值为false时 需要设置为true 并检查其他三项的验证情况
                        this.hasLink = true;
                        rules.forEach(val => {
                            if (rule.field != val) {
                                this.$refs.complainForm.validateField(val);
                            }
                        });
                    }
                    callback();
                } else {
                    // 输入框为空时 判读其他三项后确定 四选一总判断 的值
                    this.hasLink = false;
                    rules.forEach(val => {
                        if (this.complainData[val] !== '') {
                            this.hasLink = true;
                        }
                    });
                    if (!this.hasLink) {
                        return callback(new Error(''));
                    }
                    callback();
                }
            };
            // 图片判断
            var verifyImg = (rule, value, callback) => {
                if (value.length > 9) {
                    return callback(new Error(''));
                }
                callback();
            };
            // 音频判断
            var verifySound = (rule, value, callback) => {
                if (value.length > 10) {
                    return callback(new Error(''));
                }
                callback();
            };
            // 数字判断（订单号）
            var verifyNumber = (rule, value, callback) => {
                if (String(Number(value)) === 'NaN') {
                    return callback(new Error(''));
                }
                callback();
            };
            return {
                // 新增投诉的数据
                complainData: {
                    // 举报途径
                    channel: '',
                    // 投诉标题
                    title: '',
                    // 投诉城市id
                    cityId: '',
                    // 被投诉人姓名
                    employeeName: '',
                    // 被投诉参与者
                    joiner: '',
                    // 被投诉知情人
                    insider: '',
                    // 发生时间
                    dateTime: '',
                    // 投诉详情
                    content: '',
                    // 投诉建议
                    investigationProposal: '',
                    // 投诉人姓名
                    name: '',
                    // 投诉人联系方式
                    phone: '',
                    // 投诉人email
                    email: '',
                    // 投诉人qq
                    qq: '',
                    // 投诉人微信
                    wechat: '',
                    // 投诉对应的订单id
                    orderId: '',
                    // 投诉处理结果
                    handleResult: '',
                    // 投诉凭证-图片url数组
                    imgUrls: [],
                    // 投诉凭证-音频url数组
                    soundUrls: []
                },
                // 投诉凭证-图片url完整路径（预览）数组
                showImgUrls: [],
                // 投诉凭证-音频url完整路径（预览）数组
                showSoundUrls: [],
                // 联系方式四选一总判断
                hasLink: false,
                /**
                 * @description: 投诉相关表单的验证逻辑（elment-ui form）
                 * 'validate属性': [{
                 *      required: 是否必填 boolean,
                 *      message: '错误提示'，
                 *      min: 最小字符数 number,
                 *      max: 最大字符数 number，
                 *      validator: 验证函数 fn，
                 *      trigger: 验证的监听事件
                 * }]
                 */
                rules: {
                    channel: [{ required: true, message: '请选择举报途径' }],
                    title: [
                        { required: true, message: '请输入投诉标题' },
                        { min: 1, max: 20, message: '标题长度不能大于20个字' }],
                    cityId: [{ required: true, message: '请选择投诉发生的城市' }],
                    employeeName: [
                        { required: true, message: '请输入被举报员工' },
                        { min: 1, max: 20, message: '员工姓名不能大于20个字' }
                    ],
                    joiner: [{ min: 0, max: 20, message: '不能大于20个字' }],
                    insider: [{ min: 0, max: 20, message: '不能大于20个字' }],
                    dateTime: [{ required: true, message: '请选择问题发生时间' }],
                    content: [
                        { required: true, message: '请输入问题的详情描述' },
                        { min: 1, max: 3000, message: '不能大约3000字' }
                    ],
                    investigationProposal: [
                        { required: true, message: '请输入调查建议' },
                        { min: 1, max: 300, message: '不能大约300字' }
                    ],
                    name: [{ min: 0, max: 20, message: '举报人姓名不能大于20个字' }],
                    phone: [
                        { validator: verifyLink, message: '联系方式至少要填写一项', trigger: 'change' },
                        { validator: verifyTelNum, message: '请输入正确格式的手机号' }
                    ],
                    email: [
                        { validator: verifyLink, message: '联系方式至少要填写一项', trigger: 'change' },
                        { validator: verifyEmail, message: '请输入正确格式的email地址' }
                    ],
                    qq: [{ validator: verifyLink, message: '联系方式至少要填写一项', trigger: 'change' }],
                    wechat: [{ validator: verifyLink, message: '联系方式至少要填写一项', trigger: 'change' }],
                    handleResult: '',
                    imgUrls: [{ validator: verifyImg, message: '不能超过9张图' }],
                    soundUrls: [{ validator: verifySound, message: '不能超过10个音频' }],
                    orderId: [
                        { validator: verifyNumber, message: '需要输入为数字' },
                        { min: 1, max: 20, message: '订单号不能大于20个数字' }
                    ]
                },
                // 展示图片上传按钮
                showImgUpbtn: true,
                // 展示声音上传按钮
                showSoundUpbtn: true,
                // 页面加载loading
                contentLoading: false,
                // 城市数据
                cityList: [],
                // 处理进度
                progress: COMPLAIN_PROGRESS,
                // 举报途径
                complainChannels: COMPLAIN_CHANNELS,
                // 投诉弹窗内容
                dialogData: {
                    // 展示情况
                    show: false,
                    // 弹窗标题
                    title: '保存失败',
                    // 弹窗内容
                    cnt: '保存失败，请重试！'
                },
                // 图片上传设置参数
                imgUploadData: {
                    // 当前已上传的数量
                    uploadNumPrev: 0,
                    // 最大上传数
                    maxNum: 9,
                    // 上传文件的最大体积 单位:MB
                    maxSize: 5,
                    // 验证mime
                    fileTypeString: '.bmp,.jpg,.jpeg,.gif,.png'
                },
                // 音频上传设置参数 同imgUploadData
                audioUploadData: {
                    uploadNumPrev: 0,
                    maxNum: 10,
                    maxSize: 100,
                    fileTypeString: '.amr,.mp3,.wav,.mp4,.m4a'
                }
            };
        },
        components: {
            ImageSwiperViewer
        },
        created() {
            // 城市数据初始化
            try {
                this.getCityList();
            } catch (err) {
                console.log(err)
            }
        },
        methods: {
            // 获取城市下拉
            async getCityList() {
                let cityList = await getCity(1);
                let { data } = cityList;
                if (data.code === 0) {
                    // 去掉全国字段数据
                    data.data.splice(0, 1);
                    this.cityList = data.data;
                }
            },
            // 提交验证
            validSub() {
                this.$refs.complainForm.validate(valid => {
                    if (valid) {
                        this.subComplaint();
                    } else {
                        return false;
                    }
                });
            },
            /**
             * @description: 提交图片
             * @param {Object} elm 上传文件数据对象
             * @param {Object} elm.file 上传文件的对象
             * @param {string} elm.file.name 上传文件名称
             * @param {string} elm.file.size 上传文件大小
             * @return:
             */
            imgUploadRequest(elm) {
                if (!this.showImgUpbtn) {
                    return false;
                }
                this.imgUploadData.uploadNumPrev++;
                let { uploadNumPrev, maxNum, fileTypeString, maxSize } = this.imgUploadData;
                if (uploadNumPrev > maxNum) {
                    this.$message.error(`最多上传${maxNum}张图片!`);
                    this.imgUploadData.uploadNumPrev--;
                    this.showImgUpbtn = false;
                    return false;
                }
                const fileName = elm.file.name && elm.file.name.split('.') ? elm.file.name.split('.')[1] : '';
                const hasUptype = fileTypeString.indexOf(fileName.toLowerCase()) > 0;
                const isLimitSize = elm.file.size / 1024 / 1024 < maxSize;
                if (!hasUptype) {
                    this.$message.error(`上传图片凭证只能是图片格式!`);
                    this.imgUploadData.uploadNumPrev--;
                    return false;
                }
                if (!isLimitSize) {
                    this.$message.error(`上传图片凭证大小不能超过 ${maxSize}MB!`);
                    this.imgUploadData.uploadNumPrev--;
                    return false;
                }
                try {
                    this.ossUploadFile({ file: elm.file, needUrl: true }, 'complain').then(res => {
                        if (res && res.length !== 0) {
                            if (this.showImgUrls.length < maxNum) {
                                this.complainData.imgUrls.push(res[0]);
                                this.showImgUrls.push(res[1]);
                            } else {
                                this.showImgUpbtn = false;
                            }
                        } else {
                            this.imgUploadData.uploadNumPrev--;
                        }
                    });
                } catch (error) {
                    this.imgUploadData.uploadNumPrev--;
                    console.log(error);
                }
            },
            /**
             * @description: 提交音频
             * @param {Object} elm 上传文件数据对象
             * @param {Object} elm.file 上传文件的对象
             * @param {string} elm.file.name 上传文件名称
             * @param {string} elm.file.size 上传文件大小
             * @return:
             */
            fnUploadSoundRequest(elm) {
                if (!this.showSoundUpbtn) {
                    return false;
                }
                this.audioUploadData.uploadNumPrev++;
                let { uploadNumPrev, maxNum, fileTypeString, maxSize } = this.audioUploadData;
                if (uploadNumPrev > maxNum) {
                    this.$message.error(`最多上传${maxNum}个音频!`);
                    this.audioUploadData.uploadNumPrev--;
                    this.showSoundUpbtn = false;
                    return false;
                }
                const fileName = elm.file.name && elm.file.name.split('.') ? elm.file.name.split('.')[1] : '';
                const hasUptype = fileTypeString.indexOf(fileName.toLowerCase()) > 0;
                const isLimitSize = elm.file.size / 1024 / 1024 < maxSize;
                if (!hasUptype) {
                    this.$message.error(`上传音频凭证只能是音频格式!`);
                    this.audioUploadData.uploadNumPrev--;
                    return false;
                }
                if (!isLimitSize) {
                    this.$message.error(`上传音频凭证大小不能超过 ${maxSize}MB!`);
                    this.audioUploadData.uploadNumPrev--;
                    return false;
                }
                try {
                    this.ossUploadFile({ file: elm.file, needUrl: true }, 'complain').then(res => {
                        if (res && res.length !== 0) {
                            if (this.showSoundUrls.length < maxNum) {
                                this.complainData.soundUrls.push(res[0]);
                                this.showSoundUrls.push(res[1]);
                            } else {
                                this.showSoundUpbtn = false;
                            }
                        } else {
                            this.audioUploadData.uploadNumPrev--;
                        }
                    });
                } catch (error) {
                    this.audioUploadData.uploadNumPrev--;
                    console.log(error);
                }
            },
            // 提交新增的投诉
            async subComplaint() {
                let uploadData = this.complainData;
                let subData = {
                    complaint_channel: uploadData.channel,
                    title: uploadData.title,
                    city_id: uploadData.cityId,
                    employee_name: uploadData.employeeName,
                    participant: uploadData.joiner,
                    insider: uploadData.insider,
                    complaint_time: uploadData.dateTime,
                    content: uploadData.content,
                    investigation_proposal: uploadData.investigationProposal,
                    voucher_arr: {
                        img: uploadData.imgUrls,
                        audio: uploadData.soundUrls
                    },
                    customer_name: uploadData.name,
                    customer_mobile: uploadData.phone,
                    customer_email: uploadData.email,
                    customer_qq: uploadData.qq,
                    customer_wechat: uploadData.wechat,
                    order_id: uploadData.orderId,
                    handle_result: uploadData.handleResult
                };
                let { data } = await performanceApi.addComplaint(subData);
                if (data.code == 0) {
                    this.goback();
                } else {
                    this.dialogData.show = true;
                    this.dialogData.cnt = data.msg;
                }
            },
            // 返回
            goback() {
                this.$router.replace({ path: '/performance/complainList' });
            },
            /**
             * @description: 删除上传的文件
             * @param {string} type 删除的文件类型 'img' 'audio'
             * @param {number} index 删除数据的索引
             * @return:
             */
            delUpelm(type, index) {
                if (type == 'img') {
                    this.complainData.imgUrls.splice(index, 1);
                    this.showImgUrls.splice(index, 1);
                    this.imgUploadData.uploadNumPrev = this.showImgUrls.length;
                } else {
                    this.complainData.soundUrls.splice(index, 1);
                    this.showSoundUrls.splice(index, 1);
                    this.audioUploadData.uploadNumPrev = this.showSoundUrls.length;
                }
            },
            // 关闭弹窗
            closeDialog() {
                this.dialogData.show = false;
                this.dialogData.cnt = '';
            }
        },
        watch: {
            showImgUrls: function(val) {
                var curLimit = this.imgUploadData.maxNum - val.length;
                if (curLimit > 0) {
                    this.showImgUpbtn = true;
                } else {
                    this.showImgUpbtn = false;
                }
            },
            showSoundUrls: function(val) {
                var curLimit = this.audioUploadData.maxNum - val.length;
                if (curLimit > 0) {
                    this.showSoundUpbtn = true;
                } else {
                    this.showSoundUpbtn = false;
                }
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
.form-tip-box {
    color: #999;
}
.form-table-box .batch-btn-area {
    text-align: right;
    position: absolute;
    right: 20px;
    top: 10px;
}
.box-relative {
    position: relative;
}
.box-absolute {
    position: absolute;
}
.form-tit {
    font-size: 16px;
    font-weight: bold;
}
.form-btn-wrap {
    text-align: center;
}
.complain-form-wrap {
    width: 50%;
}
.box-width-100 {
    width: 100%;
}
.uploadlist-wrap {
    min-width: 800px;
    padding-left: 80px;
    box-sizing: border-box;
}
.updata-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    display: inline-block;
    margin-right: 10px;
}
.updata-wrap.sound-wrap {
    width: auto;
}
.updata-wrap .close {
    position: absolute;
    cursor: pointer;
    right: 2px;
    top: 2px;
    /* display: none; */
    background-color: #f56c6c;
    color: #fff;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    font-weight: bold;
    opacity: 0;
    transition: all 0.3s;
}
.updata-wrap:hover .close {
    opacity: 1;
}
</style>
