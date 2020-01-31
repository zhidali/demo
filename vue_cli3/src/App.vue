<template>
    <div id="app">
        <router-view />
        <el-dialog
            title="提示"
            :visible.sync="netTimeOut"
            :close-on-click-modal="modalClose"
            :show-close="modalClose"
            width="30%"
        >
            <span>当前网络开小差了，请刷新重试~</span>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="close">取 消</el-button>
                <el-button
                    type="primary"
                    @click="fresh"
                >确 定</el-button>
            </span>
        </el-dialog>
        <CommonDialog />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CommonDialog from './components/CommonDialog.vue';
    export default {
        name: 'App',
        data() {
            return {
                modalClose: false
            };
        },
        mounted() {
            // 请求公共埋点接口
            this.$store.dispatch('getTrackCommon');
        },
        components: { CommonDialog },
        computed: {
            ...mapState({
                netTimeOut: state => state.netTimeOut
            })
        },
        methods: {
            close() {
                this.$store.dispatch('net_timeout', false);
            },
            fresh() {
                // 刷新页面
                window.location.reload();
            }
        }
    };
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
}
.tangram-suggestion-main {
    z-index: 99;
}
</style>
