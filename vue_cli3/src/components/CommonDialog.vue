<template>
  <div class="con-dialog-wrap">
    <!--楼盘任务未完成-->
    <el-dialog
      title="提示！"
      :visible.sync="houseStu"
      width="30%">
      <div class="content">
        <p class="txt">楼盘学习任务未完成，已经停上户，请联系咨询主管，进行补考!</p>
      </div>
      <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="houseStu=false" class="single">我知道了，马上去学习</el-button>
      </div>
    </el-dialog>
    <!--外勤核实-->
    <el-dialog
      title="外勤核实！"
      :visible.sync="workOut"
      width="30%">
      <div class="content" style="height: 40px;">
        <p class="txt">{{outStu}}</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="workOut=false" class="default-btn double-btn">暂不处理</el-button>
        <el-button type="primary" @click="goTask(workOutUrl, 1)" class="double-btn">前往核对外勤出勤</el-button>
      </div>
    </el-dialog>
    <!--发布任务提醒-->
    <el-dialog
      title="提示！"
      :visible.sync="taskWarn"
      width="30%">
      <div class="content">
        <p class="tlt"><span class="iconfont icongantanhao-yuankuang"></span>发布任务提醒！</p>
        <p class="txt">{{taskCounName}}本周没有楼盘学习任务，请前往添加楼盘学习任务</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="noNessAdd" class="default-btn double-btn">不用添加</el-button>
        <el-button type="primary" @click="goTask(taskWarnUrl, 2)" class="double-btn">前往添加</el-button>
      </div>
    </el-dialog>
    <!--成绩录入提醒-->
    <el-dialog
      title="提示！"
      :visible.sync="taskGrade"
      width="30%">
      <div class="content">
        <p class="tlt"><span class="iconfont icongantanhao-yuankuang"></span>成绩录入提醒！</p>
        <p class="txt">存在楼盘学习成绩未录入，请及时安排考试或者讲盘并录入成绩</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="taskGrade=false" class="default-btn double-btn">暂时有事，等会录入</el-button>
        <el-button type="primary" @click="goTask(taskGradeUrl, 3)" class="double-btn">前往录入</el-button>
      </div>
    </el-dialog>
    <!--滴滴个人手机号-->
    <el-dialog
      title="提示！"
      :visible.sync="privatePhone"
      width="30%">
      <div class="content">
        <p class="txt">请您到右上角个人设置里，填写您的：个人(私人)手机号！填写后，就不会出现该提示信息了！</p>
      </div>
    </el-dialog>
    <!--滴滴企业手机号-->
    <el-dialog
      title="提示！"
      :visible.sync="commonPhone"
      width="30%">
      <div class="content">
        <p class="txt">请您到右上角个人设置里，填写您的：企业用车手机号！填写后，就不会出现该提示信息了！</p>
      </div>
    </el-dialog>
    <!--新订单提醒-->
    <el-dialog
      :visible.sync="orderConfirm.orderRemind"
      width="30%">
      <div slot="title" class="order-remind">
        <span>新订单提醒</span>
      </div>
      <div class="content">
        <ul class="s-query">
          <li class="auto"><div class="th">分配时间：</div><div class="td">{{orderConfirm.allowTime}}</div></li>
          <li class="auto"><div class="th">失效时间：</div><div class="td">{{orderConfirm.failTime}}</div></li>
          <li class="auto"><div class="th required">确认订单：</div>
            <div class="td">
              <el-radio-group v-model="orderConfirm.isCheckOrder">
                <el-radio :label="1">确认订单</el-radio>
                <el-radio :label="2">放弃订单</el-radio>
              </el-radio-group>
            </div>
          </li>
          <li class="auto" v-if="orderConfirm.isCheckOrder===2"><div class="th">放弃原因：</div>
            <div class="td">
              <el-select v-model="orderConfirm.reasonVal" placeholder="请选择">
                <el-option
                  v-for="item in orderConfirm.options"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="auto" v-if="orderConfirm.isCheckOrder===2" ref="giveRemark"><div class="th">备注：</div><div class="td"><el-input type="textarea" v-model="orderConfirm.remark"></el-input></div></li>
        </ul>
        <p class="note">注释：如在短时间内接到多个订单，属于爆单现象，请及时联系咨询经理解决！</p>
      </div>
      <div slot="footer" class="affrim-sub">
        <el-button type="primary" @click="submitOrderRemind()" >确认</el-button>
      </div>
    </el-dialog>
    <!--私人微信未填写、待分组好友提醒、待绑定客户提醒-->
	<el-dialog
	title="提示！"
	:visible.sync="wxWriteVisible"
	custom-class="wx-write-dialog"
	width="30%">
		<div class="content">
			<p class="txt">请完善私人微信填写，填写完成后系统将不再提示～</p>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="default" @click="wxWriteVisible=false" class="default-btn">暂时有事，等会去</el-button>
			<el-button type="primary" @click="goTask(writeWxUrl)">好的，去处理</el-button>
		</div>
	</el-dialog>
    <!--微信好友管理任务弹窗（待绑定和待分组）-->
	<el-dialog
	title="提示！"
	:visible.sync="wxIsTaskVisible"
	custom-class="wx-write-dialog"
	width="30%">
		<div class="content">
            <p
                class="txt"
                v-if="wxTaskNoGroupNum !== 0">
                待分组好友： {{wxTaskNoGroupNum}} 个
            </p>
            <p
                class="txt"
                v-if="wxTaskNoBindNum !== 0">
                待绑定好友：{{wxTaskNoBindNum}} 个
            </p>
			<p class="txt">请及时前往好友管理页面处理，有未完成的任务时系统会一直提示你哦～</p>
		</div>
		<div
            slot="footer"
            class="dialog-footer">
			<el-button type="default"
                @click="wxIsTaskVisible=false"
                class="default-btn">
                暂时有事，等会去
            </el-button>
			<el-button
                type="primary"
                @click="goTask(wxIsTaskUrl)">
                好的，去处理
            </el-button>
		</div>
	</el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {CommonMethods} from '../assets/Util'
import {trackAxios} from '../assets/axios'
export default {
  data () {
    return {
		// 微信填写弹窗
		wxWriteVisible: false,
		// 去填写微信号的url
		writeWxUrl: '',
        // 微信好友管理（待绑定/待分组）
        wxIsTaskVisible: false,
        // 去微信管理页面URL
        wxIsTaskUrl: '',
        // 微信好友中未分组人数
        wxTaskNoGroupNum: 0,
        // 微信好友中未绑定人数
        wxTaskNoBindNum: 0,
		orderConfirm: {
			affirm: '', // 确认
			order_id: '', // 订单id
			allowTime: '', // 分配时间
			failTime: '', // 失效时间
			remark: '', // 备注
			reasonVal: '', // 放弃订单原因
			options: [], // 放弃订单的原因
			isCheckOrder: 1, // 默认选确认订单
			orderRemind: false// 新订单提醒
		},
		houseStu: false, // 楼盘学习未完成弹出
		outStu: '', // 外勤学习文字
		workOut: false, // 核对外勤
		workOutUrl: '', // 核对外勤地址
		taskWarn: false, // 发布任务提醒
		taskWarnUrl: '', // 添加任务链接
		taskCounName: '', // 咨询师名称
		noAddTrackId: '', // 不用添加按钮的track_id
		addTrackId: '', // 去添加按钮的track_id
		taskGrade: false, // 成绩录入
		taskGradeName: '', // 成绩录入咨询师名称
		taskGradeUrl: '', // 成绩录入链接
		privatePhone: false, // 私人手机号
		commonPhone: false // 企业用车手机号
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDialogData()
    })
  },
  methods: {
    noNessAdd () {
      this.taskWarn = false
      // 不用添加按钮 埋点
      this.selectMenu(1)
    },
    //  埋点事件
    selectMenu (index) {
      var trackId
      // 组装埋点数据
      let moreInfo = {
        screen_height: CommonMethods.ScreenHeight(),
        screen_width: CommonMethods.ScreenWidth(),
        device_type: CommonMethods.getDevice().device,
        os: CommonMethods.getOS().os,
        os_version: CommonMethods.getOS().os_version,
        browser: CommonMethods.getBrowse().browser,
        browser_version: CommonMethods.getBrowse().browser_version
      }
      if (index === 2) {
        trackId = this.addTrackId
      } else {
        trackId = this.noAddTrackId
      }
      let trackAll = Object.assign({}, moreInfo, this.trackInfos)
      let trackData = {
        extrack_arr: {ini_params: trackAll},
        track_id: trackId
      }
      // 请求埋点接口
      trackAxios.post('/send-data/index', trackData).then((res) => {
        if (res.data.code === 0) {
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    //  跳转页面
    goTask (para, diff) {
		if (diff === 1) {
			//  外勤核实
			this.axios.post('/backend-api/api-user/task-popup-click')
			.then((res) => {
				if (res.data.code === 0) {
				window.location.href = para
				}
			})
		} else if (diff === 2) {
			// 发布任务
			// 点击 添加任务埋点
			this.selectMenu(2)
			this.axios.post('/backend-api/api-user/task-no-add-task')
			.then((res) => {
				if (res.data.code === 0) {
				window.location.href = para
				}
			})
		} else if (diff === 3) {
			// 成绩录入
			this.axios.post('/backend-api/api-user/task-set-input')
			.then((res) => {
				if (res.data.code === 0) {
				window.location.href = para
				}
			})
		} else {
			window.location.href = para
		}
		// 关闭弹窗
		this.houseStu = false;
		this.workOut = false;
		this.taskWarn = false;
		this.privatePhone = false;
		this.commonPhone = false;
		this.taskGrade = false;
		this.wxWriteVisible = false;
    },
    // 请求接口数据
    getDialogData () {
    // 发送ajax请求  来判断展示哪个弹窗
      this.axios.get('/backend-api/api-user/pop')
        .then((res) => {
            if (res.data.code === 0) {
                let resData = res.data.data
                // 个人手机号 和 企业手机号
                this.privatePhone = this.parseBool(resData.bind_mobile.is_show)
                this.commonPhone = this.parseBool(resData.bind_didi_mobile.is_show)
                // 外勤弹窗
                this.workOut = this.parseBool(resData.legwork.is_show)
                this.outStu = resData.legwork.popup_legwork_confirm_data
                this.workOutUrl = resData.legwork.legwork_confirm_url
                // 楼盘学习任务未完成弹窗
                this.houseStu = this.parseBool(resData.study_undo.is_show)
                // 发布任务
                this.taskWarn = this.parseBool(resData.publish_task.is_show)
                this.taskWarnUrl = resData.publish_task.task_url
                this.taskCounName = resData.publish_task.no_study_task_arr
                this.noAddTrackId = resData.publish_task.data_track_click_not_add
                this.addTrackId = resData.publish_task.data_track_click_add
                // 成绩未录入  测试中
                this.taskGrade = this.parseBool(resData.performance_undo.is_show)
                this.taskGradeName = resData.performance_undo.result_input_task_arr
                this.taskGradeUrl = resData.performance_undo.tr_employee_url
                // 订单流转确认
                this.orderConfirm.orderRemind = this.parseBool(resData.order_confirm.is_show)
                this.orderConfirm.allowTime = resData.order_confirm.distribute_datetime
                this.orderConfirm.failTime = resData.order_confirm.deadline_datetime
                this.orderConfirm.options = resData.order_confirm.drop_reason
                this.orderConfirm.order_id = resData.order_confirm.order_id
                this.orderConfirm.affirm = resData.order_confirm.order_detail_url
                // 填写私人微信号
                this.wxWriteVisible = this.parseBool(resData.no_personal_wechat.is_show);
                this.writeWxUrl = resData.no_personal_wechat.confirm_url;
                // 微信好友管理任务（待绑定/待分组）
                this.wxTaskNoGroupNum = (resData.wechat_task && resData.wechat_task.no_group) || 0;
                this.wxTaskNoBindNum = (resData.wechat_task && resData.wechat_task.no_bind) || 0;
                this.wxIsTaskVisible = this.parseBool(resData.wechat_task.is_show);
                this.wxIsTaskUrl = resData.wechat_task.confirm_url;
            }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 提交扭转弹窗
    submitOrderRemind () {
      // 提交前参数校验
      if (this.orderConfirm.isCheckOrder === 2) {
        if (this.orderConfirm.reasonVal === '') {
          this.$message({
            message: '请选择放弃原因',
            type: null,
            duration: 1000
          })
          return false
        }
        if (this.orderConfirm.reasonVal === 5) {
          if (CommonMethods.trim(this.orderConfirm.remark).length === 0) {
            this.$message({
              message: '请填写备注内容',
              type: null,
              duration: 1000
            })
            return false
          }
          if (CommonMethods.trim(this.orderConfirm.remark).length > 20) {
            this.$message({
              message: '备注最多20字',
              type: null,
              duration: 1000
            })
            return false
          }
        }
      }
      let params = {
        order_id: this.orderConfirm.order_id,
        is_confirm: this.orderConfirm.isCheckOrder,
        cause_type: this.orderConfirm.reasonVal,
        cause_remarks: this.orderConfirm.remark
      }
      // 请求订单分配确认接口
      this.axios.post('/backend-api/api-user/confirm-distribute', params)
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.msg,
              type: null,
              duration: 1000
            })
            let resData = res.data.data
            if (resData.is_show === 0) {
              this.orderConfirm.order_id = resData.order_id
              this.orderConfirm.affirm = resData.order_detail_url
              window.location.href = this.orderConfirm.affirm + '&order_id=' + this.orderConfirm.order_id
            } else {
              this.orderConfirm.orderRemind = this.parseBool(resData.is_show)
              this.orderConfirm.allowTime = resData.distribute_datetime
              this.orderConfirm.failTime = resData.deadline_datetime
              this.orderConfirm.options = resData.drop_reason
              this.orderConfirm.order_id = resData.order_id
              this.orderConfirm.affirm = resData.order_detail_url
              this.orderConfirm.isCheckOrder = resData.is_drop
            }
          } else {
            if (res.data.code === 2) {
              this.$message({
                message: res.data.msg,
                type: null,
                duration: 1000
              })
            } else {
              this.$confirm(res.data.msg, '确认信息', {
                confirmButtonText: '确认',
                cancelButtonText: '取消'
              })
                .then(() => {
                  let resData = res.data.data
                  if (resData.is_show === 0) {
                    this.orderConfirm.affirm = resData.order_detail_url
                    this.orderConfirm.order_id = resData.order_id
                    window.location.href = this.orderConfirm.affirm + '&order_id=' + this.orderConfirm.order_id
                  } else {
                    this.orderConfirm.orderRemind = this.parseBool(resData.is_show)
                    this.orderConfirm.allowTime = resData.distribute_datetime
                    this.orderConfirm.failTime = resData.deadline_datetime
                    this.orderConfirm.options = resData.drop_reason
                    this.orderConfirm.order_id = resData.order_id
                    this.orderConfirm.affirm = resData.order_detail_url
                    this.orderConfirm.isCheckOrder = resData.is_drop
                  }
                })
                .catch(() => {
                  this.orderConfirm.orderRemind = false
                })
            }
          }
        })
        .catch((err) => {
          console.log(err)
          window.location.href = this.orderConfirm.affirm + '&order_id=' + this.orderConfirm.order_id
        })
    },
    parseBool (para) {
      if (para === 1) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapState(['trackInfos'])
  }
}
</script>
<style scoped>
.con-dialog-wrap .el-dialog__footer .double-btn:first-child{
  float: left;
}
.con-dialog-wrap .el-dialog__footer .double-btn:last-child{
  float: right;
}
.con-dialog-wrap .double-btn{
  width: 47%;
}
.con-dialog-wrap .content>.tlt{
  text-align: center;
  padding-bottom: 20px;
}
.con-dialog-wrap .content>.txt{
  color: #666;
  font-size: 18px;
}
.con-dialog-wrap .content>p>span{
  margin-right: 10px;
  font-size: 20px;
  color: #2e9ae1;
}
.con-dialog-wrap .affrim-sub{
  text-align: center;
}
.con-dialog-wrap .el-radio{
  margin-right: 15px;
}
.con-dialog-wrap .note{
  color: #ff0000;
}
</style>
<style>
.con-dialog-wrap .el-dialog__header{
  border-bottom: 1px solid #eaeaea;
  padding: 20px;
}
.con-dialog-wrap .el-dialog__header .el-dialog__title,.con-dialog-wrap .content>.tlt,.con-dialog-wrap .el-dialog__header .order-remind{
  font-size: 22px;
  color: #333;
}
.con-dialog-wrap .el-dialog__body{
  font-size: 16px;
}
.con-dialog-wrap .single{
  width: 100%;
}
.con-dialog-wrap .el-dialog{
  border-radius: 8px;
}
.con-dialog-wrap .el-dialog__footer{
  overflow: hidden;
}
.con-dialog-wrap .el-dialog__footer .dialog-footer span{
  font-size: 18px;
}
.con-dialog-wrap .wx-write-dialog .el-dialog__footer{
	text-align: center;
}
.con-dialog-wrap .wx-write-dialog .el-dialog__footer .dialog-footer span{
	font-size: 14px;
}
.con-dialog-wrap .wx-write-dialog .dialog-footer .el-button--default{
  background-color: #fff;
  color: #606266;
}
.con-dialog-wrap .wx-write-dialog .dialog-footer .el-button{
  height: auto;
  width: auto;
  padding: 12px 20px;
}
</style>
