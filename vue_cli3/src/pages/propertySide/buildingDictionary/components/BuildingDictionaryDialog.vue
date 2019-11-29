<template>
  <div class="wrap-box">
    <!--触发弹窗按钮 始-->
    <div class="button-wrap" slot="dialog-btn">
      <el-button-group>
        <el-button type="primary" @click="dialogVisibleNoTask=true">无任务通知</el-button>
        <el-button type="primary" @click="dialogVisibleSaveWarn=true">保存提醒</el-button>
        <el-button type="primary" @click="dialogVisibleRemoveAbnormal=true">移除异常</el-button>
        <el-button type="primary" @click="dialogVisibleChangeBalcony=true">更换楼座图</el-button>
      </el-button-group>
    </div>
    <!--触发弹窗按钮 止-->
    <div class="dialog-wrap">
      <!--展示弹窗 始-->
      <el-dialog
        :visible.sync="dialogVisibleNoTask"
        :title.sync="dialogTitleNoTask"
        width="30%"
        center
      >
        <div class="dialog-content">
          <p class="content-tex no-task-tex">{{dialogContentNoTask}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="single" @click="skipToTaskList">点击前往任务列表页</el-button>
        </div>
      </el-dialog>
      <!--展示弹窗 止-->
      <!--保存提醒 始-->
      <el-dialog
        :visible.sync="dialogVisibleSaveWarn"
        :title.sync="dialogTitleSaveWarn"
        width="30%"
        :center=true
      >
        <div class="dialog-content">
          <p class="content-tex save-warn-tex">{{dialogContentSaveWarn}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">不保存进行跳转</el-button>
          <el-button type="primary" @click="skipToSave">保存进行跳转</el-button>
        </div>
      </el-dialog>
      <!--保存提醒 止-->
      <!--移除异常提示 始-->
      <el-dialog
        :visible.sync="dialogVisibleRemoveAbnormal"
        :title.sync="dialogTitleRemoveAbnormal"
        width="30%"
        :center=true
      >
        <div class="dialog-content">
          <p class="content-tex remove-abnormal-tex">{{dialogContentRemoveAbnormal}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog"  class="single">知道了！</el-button>
        </div>
      </el-dialog>
      <!--移除异常提示 止-->
      <!--更换楼座图提示 始-->
      <el-dialog
        :visible.sync="dialogVisibleChangeBalcony"
        :title.sync="dialogTitleChangeBalcony"
        width="30%"
        :center=true
      >
        <div class="dialog-content">
          <p class="content-tex change-balcony-tex">{{dialogContentChangeBalcony}}</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">不更换</el-button>
          <el-button type="primary" @click="changeBalcony">更换</el-button>
        </div>
      </el-dialog>
      <!--更换楼座图提示 止-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'BuildingDictionaryDialog',
  data () {
    return {
      // 弹窗初始显隐状态
      dialogVisibleNoTask: false,
      dialogVisibleSaveWarn: false,
      dialogVisibleRemoveAbnormal: false,
      dialogVisibleChangeBalcony: false,
      // 弹窗标题信息
      dialogTitleNoTask: '无任务通知',
      dialogTitleSaveWarn: '保存提醒',
      dialogTitleRemoveAbnormal: '移除异常提示',
      dialogTitleChangeBalcony: '更换楼座图提醒',
      // 弹窗内容信息
      dialogContentNoTask: '当前已经无相关任务，请返回到任务列表进行查看',
      dialogContentSaveWarn: '该页面信息已经被编辑了，是否保存当前内容！',
      dialogContentRemoveAbnormal: '啊哦！全部都被移除咯！好像没有什么可操作的啦，请在下方先点击去匹配下户型，再刷新页面进行操作',
      dialogContentChangeBalcony: '原图中存在楼座图信息，更换楼座图后，原打点信息将消失！请确定是否更换'
    }
  },
  props: {
  },
  methods: {
    // 点击关闭弹窗
    closeDialog () {
      this.dialogVisibleNoTask = false
      this.dialogVisibleSaveWarn = false
      this.dialogVisibleRemoveAbnormal = false
      this.dialogVisibleChangeBalcony = false
    },
    // 点击前往任务列表页
    skipToTaskList () {
      this.$router.push({path: '/taskList'})
    },
    // 点击保存跳转
    skipToSave () {
      this.$router.push({path: '/saveSkip'})
    },
    // 点击更换
    changeBalcony () {
      this.$router.push({path: '/changeBalcony'})
    }
  },
  components: {},
  beforeMount () {},
  mounted () {},
  watch: {},
  computed: {}
}
</script>
<!--弹窗公共样式 始-->
<style lang="less" scoped>
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #eaeaea;
    padding: 20px;
  }
  .el-dialog {
    margin-top: 30vh !important;
    .content-tex {
      font-size: 18px;
      color: #666666;
    }
    .single {
      width: 100%;
    }
  }
  /*解决打包后样式覆盖*/
  /deep/ .dialog-footer .el-button{
    padding: 10px 30px;
    height: 38px;
    width: auto;
  }
  /deep/ .dialog-footer .el-button--default {
    background-color: #fff;
    &:link{
      background-color: #fff;
      color: #77808a;
      border: 1px solid #e6e6e6;
    }
    &:visited{
      background-color: #fff;
      color: #77808a;
      border: 1px solid #e6e6e6;
    }
    &:hover{
      background-color: #ecf5ff;
      color: #409eff;
      border: 1px solid #c6e2ff;
    }
    &:active{
      background-color: #ecf5ff;
      color: #409eff;
      border: 1px solid #c6e2ff;
    }
  }
</style>
<!--弹窗公共样式 止-->
