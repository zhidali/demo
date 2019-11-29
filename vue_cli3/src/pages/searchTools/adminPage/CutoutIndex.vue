<template>
    <div class="couout-container">
        <!-- 遮罩层 -->
        <!-- <div class="add-shadow"></div> -->
        <div class="left-wrap">
            <Map/>
        </div>
        <div class="right-wrap">
            <!-- 右侧操作栏 -->
        </div>
    </div>
</template>
<script>
    import Map from './CutoutBMap'
    export default {
        name: 'cutout-index',
        data() {
            return {};
        },
        components: {
            Map
        }
    };
</script>

<style lang="less" scoped>
.couout-container {
    height: 100%;
    .add-shadow {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 66;
    }
    .left-wrap{
        float: left;
        background: blue;
        height: 100%;
        width: calc(100% - 350px);
    }
    .right-wrap{
        height: 100%;
        width: 350px;
        background: #fff;
        overflow: hidden;
    }
}
</style>