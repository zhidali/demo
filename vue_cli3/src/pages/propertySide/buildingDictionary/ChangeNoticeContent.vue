<!--
    @name: 变更通知内容
    @description: 变更通知内容模块
    @author: 贺伟
    @date: 2019-11-14
-->
<template>
    <div class="notice-wrap">
        <div class="textarea">
            <el-input
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 18}"
                placeholder="请输入内容"
                v-model="noticeVal">
            </el-input>
            <div
                class="el-form-item__error"
                v-show="showMsg">
                最多可输入5000字
            </div>
        </div>
        <div class="notice-msg">
            <h5 class="title">注意事项：</h5>
            <span>1.系统会记录发布时间，但是信息的获取时间和信息的有效时间需要强调的一定要说明</span>
        </div>
        <div class="upload-wrap">
            <image-upload
                ref="uploadImg"
                upload-id="noticeUpload"/>
        </div>
    </div>
</template>

<script>
    import ImageUpload from './components/ImageUpload';
    export default {
        name: 'ChangeNoticeContent',
        components: {
            ImageUpload
        },
        data() {
            return {
                // 通知信息值
                noticeVal: ''
            }
        },
        computed: {
            // 是否展示超出5000提示框
            showMsg() {
                return this.noticeVal.trim().length > 5000;
            }
        },
        methods: {
            // 表单验证
            validForm() {
                return {
                    successful: this.noticeVal.trim().length > 0 && !this.showMsg,
                    formInfo: {
                        notify_content: this.noticeVal.trim(),
                        notify_imgs: this.$refs.uploadImg.getUrlList()
                    }
                };
            }
        }
    }
</script>

<style lang="less" scoped>
    .notice-wrap{
        padding-left: 20px;
        position: relative;
        &::before{
            content: '*';
            position: absolute;
            top: 0;
            left: 5px;
            z-index: 1;
            color: #ff0000;
        }
        .textarea{
            display: flex;
            position: relative;
            .required-icon{
                color: #ff0000;
                width: 20px;
            }
        }
        .notice-msg{
            margin-top: 10px;
            padding: 15px 0;
            >.title{
                font-size: 14px;
                line-height: 26px;
            }
        }
    }
</style>