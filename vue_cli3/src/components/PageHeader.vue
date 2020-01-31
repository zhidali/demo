<!-- 头部导航 -->
<template>
  <div class="jl-header-warper">
    <div class="jl-header">
      <div class="jl-header-left">
        <a :href="this.logoninfo.menuUrl" @click="addPoint(logoninfo.track_id)">
          <img src="../assets/images/logo.png" alt="" class="jl-respoinsive">
        </a><span class="jl-icon-text">欢迎登录侃家网业务管理系统</span>
      </div>
      <div class="jl-header-right">
        <div class="jl-user-content">
          <span class="iconicon iconfont jl-username-icon">
            <ul class="jl-selectdwon" v-if="userinfo.length">
              <li v-for="(list, index) in userinfo" :key="index" @click="addPoint(list.track_id)">
                <a :href="list.menuUrl">{{list.menuName}}</a>
              </li>
            </ul>
          </span>
          <span class="jl-username">{{this.username.employeeName}}</span>
          <span
                class="jl-userroles-wrap"
                v-if="roleList.length > 1">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="changeRole">
                    <el-submenu index="1">
                        <template slot="title">{{this.username.roleName}}</template>
                        <el-menu-item
                            v-for="(elm,index) in roleList"
                            :key="index"
                            :index="elm.key">
                            {{elm.value}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
          </span>
          <a class="jl-quit" :href="quit.menuUrl">{{quit.menuName}}</a>
          <a class="jl-date-nopad jl-datework" @click="addPoint(daywork.track_id)" :href="daywork.menuUrl">{{daywork.menuName}}</a>
          <a class="iconfont icon-header iconinformatiom" :href="message.menuUrl" :title="message.menuName" @click="addPoint(message.track_id)">
            <i class="jl-info" v-if="message.num">{{message.num}}</i></a>
          <a class="iconfont icon-header iconicon-todo2" :href="needToDo.menuUrl" :title="needToDo.menuName" @click="addPoint(needToDo.track_id)">
            <i class="jl-info jl-info-note" v-if="needToDo.num">{{needToDo.num}}</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commonFun } from '../assets/js/utils/utils'
import {trackAxios} from '@/assets/js/http/axios'
import {mapState} from 'vuex'
import apiObj from "@/api/commonApi";
export default {
  name: 'pageHeader',
  data () {
    return {
      username: '', // 用户名
      userinfo: [], // 用户下拉菜单
      quit: {}, // 退出用户
      logoninfo: {}, // logo
      daywork: {}, // 日程
      message: {}, // 消息
      needToDo: {}, // 待办事项
      // 角色列表
      roleList: [],
      // 角色信息
      roleInfo: {
          role: '',
          jobs: ''
      }
    }
  },
  created () {
    this.getheaderInfo();
    this.getRoleList();
  },
  computed: {
    ...mapState(['trackInfos'])
  },
  methods: {
    getheaderInfo () {
      this.axios.post('/backend-api/api-user/header').then(res => {
        if (res.data.code === 0) {
          let resdata = res.data.data
          this.username = resdata.userInfo
          this.userinfo = resdata.personInfo
          this.quit = resdata.logout
          this.daywork = resdata.schedule
          this.logoninfo = resdata.logo
          this.message = resdata.message
          this.needToDo = resdata.needToDo
          let roleInfo = {
            role: res.data.data.userInfo.role,
            jobs: res.data.data.userInfo.cityName
          }
          this.roleInfo = roleInfo
          this.$store.dispatch('get_employee_name', roleInfo)
          this.$store.dispatch('get_uid', res.data.data.userInfo.uid)
          this.$store.dispatch('get_role', res.data.data.userInfo.role)
        }
      })
    },
    // 获取角色列表
    async getRoleList() {
        let {data} = await apiObj.getRoleList({});
        if (data.code === 0) {
            // 将角色列表数据方式 vuex state 的 roleList;
            this.$store.dispatch('get_role_list', data.data.data || []);
            this.roleList = data.data.data || [];
        }
    },
    /**
     * @description: 切换角色
     * @param {string} key角色权限
     * @return:
     */
    async changeRole(key) {
        if (key === this.roleInfo.role) {
            return;
        }
        let newRole = key;
        let {data} = await apiObj.switchRole({role_name: newRole});
        if (data.code === 0) {
            this.roleInfo.role = newRole;
            // 改变vuex state 中 employeeName
            this.$store.dispatch('get_employee_name', this.roleInfo);
            // 改变vuex state 中的 role
            this.$store.dispatch('get_role', newRole);
            window.location.href = data.data.url;
        }
    },
    // 添加埋点
    addPoint (trackid) {
      let maiInfo = {
        screen_height: commonFun.ScreenHeight(),
        screen_width: commonFun.ScreenWidth(),
        device_type: commonFun.getDevice().device,
        os: commonFun.getOS().os,
        os_version: commonFun.getOS().os_version,
        browser: commonFun.getBrowse().browser,
        browser_version: commonFun.getBrowse().browser_version
      }
      let trackAll = Object.assign({}, maiInfo, this.trackInfos)
      let trackData = {
        track_id: trackid,
        extrack_arr: {ini_params: trackAll}
      }
      trackAxios.post('/send-data/index', trackData).then(res => {
        if (res.data.code === 0) {
        }
      })
    }
  }
}

</script>
<style scoped>
.jl-header-warper{
  background-color: #fff;
}
.jl-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  height: 60px;
}
.jl-header-left .jl-icon-text{
  font-size: 15px;
  line-height: 60px;
  margin-left: 10px;
  color: #888;
}
.icon-header{
  font-size: 20px;
  color: #8a9aad;
  margin-left: 12px;
  vertical-align: middle;
  text-decoration: none;
}
.jl-header-left a{
  display:inline-block;
}
.jl-username:after{
  content: "";
  position: absolute;
  top: 1px;
  right: -3px;
  height: 15px;
  width: 2px;
  background-color: #7a8897;
}
.jl-header-left .jl-respoinsive{
  vertical-align: middle;
  width: 102px;
}
.jl-username,.jl-quit,.jl-datework{
  font-size: 14px;
  color: #7a8897;
  position: relative;
  top: 6px;
  padding: 0 10px;
  cursor: pointer;
}
.jl-date-nopad{
  padding-left: 0;
  padding-right: 0;
}

.jl-user-content {
  position: relative;
  font-size: 0;
  display: inline-block;
}
.jl-user-content .jl-username-icon{
  cursor: pointer;
  vertical-align: middle;
  font-size: 0;
}
.jl-user-content .iconicon{
  font-size: 32px;
  color: #cddae5;
}
.jl-selectdwon{
  width: 160px;
  position: absolute;
  top: 42px;
  left: -61px;
  background-color: #1662b3;
  z-index: 100;
  font-size: 14px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  display: none;
}
.jl-selectdwon::after{
  display: block;
  content: '';
  height: 0;
  width: 0;
  overflow: hidden;
  border: solid 8px #1662b3;
  border-left: solid 8px transparent;
  border-right: solid 8px transparent;
  border-top: solid 8px transparent;
  position: absolute;
  left: 70px;
  top: -16px;
}
.jl-selectdwon li a{
  height: 38px;
  line-height: 38px;
  text-align: center;
  display: block;
  color: #fff;
}
.jl-info{
  position: absolute;
  right: 43px;
  top: -5px;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  width: 17px;
  height: 17px;
  line-height: 16px;
  border-radius: 50%;
  background: #f83d56;
  font-style: normal;
}
.jl-info-note{
  right: 12px;
  background-color: #ff781e;
}
.jl-username-icon:hover .jl-selectdwon{
  display: block;
}
.jl-userroles-list{
    width: 160px;
    position: absolute;
    top: 42px;
    left: -61px;
    background-color: #1662b3;
    z-index: 100;
    font-size: 14px;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
    display: none;
}
.jl-userroles-wrap{
    display: inline-block;
    vertical-align: middle;
    padding-top: 5px;
}
</style>
