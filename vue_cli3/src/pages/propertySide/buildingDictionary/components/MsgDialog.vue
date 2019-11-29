<!--
 * @author: hewei
 * @Date: 2019-09-28
 * @description：公共弹窗
 -->
<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisble"
        :width="width"
        :center="center"
        @close=close>
        <slot name="default"></slot>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"
                v-if="!$scopedSlots.footer"
                @click="dialogConfirm">确认</el-button>
            <slot name="footer"></slot>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: 'MsgDialog',
        data() {
            return {
                dialogVisble: this.dialogShow
            }
        },
        props: {
            width: {
                type: String,
                default: '30%'
            },
            dialogShow: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: '提示'
            }
        },
        watch: {
            dialogShow(newVal) {
                this.dialogVisble = newVal;
            }
        },
        methods: {
            // 点击确认按钮触发事件
            dialogConfirm() {
                this.$emit('confirm');
            },
            // 弹窗关闭事件
            close() {
                this.$emit('closeDialog');
            }
        },
    }
</script>

<style lang="less" scoped>

</style>