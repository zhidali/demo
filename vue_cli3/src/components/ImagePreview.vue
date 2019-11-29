<!--
    /**
     * @file 二次封装图片预览功能
     * @param {boolean} showViewer 是否开启预览
     * @param {Array} urlList 预览图片地址
     * @author  XieBin
     * @date 2019.10.31
     */
 -->
<template>
    <div>
        <el-image-viewer 
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="urlList" />
    </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
    props: {
        // 是否开启预览
        showViewer: {
            type: Boolean,
            default: false
        },
        // 预览图片地址
        urlList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: { ElImageViewer },
    mounted() {
        // 调用关闭预览方法
       this.closePhoto();
    },
    methods: {
        // 点击关闭按钮关闭预览
        closeViewer() {
            this.$emit('closeViewer', false);
        },
        // 点击model关闭预览
        closePhoto() {
            let el = document.querySelector('.el-image-viewer__mask');
            el.onclick = () => {
                this.$emit('closeViewer', false);
            }
        }
    }
}
</script>

<style>

</style>