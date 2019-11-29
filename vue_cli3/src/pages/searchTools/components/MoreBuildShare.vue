<template>
  <transition name="sliderLeft">
  <div class="build-wrap" v-show="isShow">
    <div class="header-wrap">
      <span class="close-cue" @click="editPop(1)"></span>
      <span class="title">楼盘对比</span>
      <div class="edit-con">
        <span class="preview" @click="submitMess(0)">预览</span>
        <span class="share" @click="submitMess(1)">分享</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-detail">
        <div class="client-info shadow-box">
          分享给 {{client.name}} {{client.phone}} 订单ID：{{orderId}}
        </div>
        <div class="detail-wrap">
          <div class="message-info info-box">
            <div class="hd">信息展示</div>
            <div class="bd">
              <span :class="item.state === true ? 'info-show active' : 'info-show'" v-for="(item, index) in infoShow" :key="index" @click="changeState(item)">{{item.text}}<i></i></span>
              <div class="hint">若在此处取消勾选，则将不会在分享给客户的小程序上展示该楼盘周边的相关价格</div>
            </div>
          </div>
          <div class="info-box sum-up">
            <div class="hd">综述（必填）</div>
            <div class="bd">
              <div class="house-wrap">
                <div class="house-detail" v-for="(item, index) in projectInfo" :key="index">
                  <div class="house-info">
                    <div class="info-each">
                      <span class="th hou-name">{{item.projectName}}</span>
                      <span class="td"><span>{{item.summary}}</span><span>{{item.acreage}}㎡</span></span>
                    </div>
                    <div class="info-each">
                      <span class="th">推荐星级：</span>
                      <span class="td"> <el-rate v-model="item.rate" :allow-half="true" :colors="['#FF5C47', '#FF5C47', '#FF5C47']"></el-rate> </span>
                    </div>
                    <div class="info-each">
                      <span class="th">对该楼盘及户型：</span>
                      <span class="td" v-if="moreHouType.indexOf(parseInt(item.projectId)) > -1">同一楼盘的不同户型，只需要填写其中一个户型的综述即可提交分享</span>
                    </div>
                    <div class="area-txt">
                      <el-input type="textarea" v-model.trim="item.projectSummary" placeholder="在这里输入对该楼盘的描述"></el-input>
                    </div>
                  </div>
                  <div class="rate-temp">
                    <div class="info-each">
                      <span class="th hou-name">咨询师点评模板：</span>
                    </div>
                    <div class="tmp-wrap">
                      <div class="temp-card" v-for="(opt, index) in item.projectReviewArr" :key="index">
                        <div class="name">咨询师-{{opt.employee_name}} <span class="licks">{{opt.like_show}}个赞</span></div>
                        <div class="txt-con">
                          <div class="txt">{{opt.review}}</div>
                        </div>
                        <div class="copy-btn shadow-box" v-clipboard:copy="opt.review" v-clipboard:success="onCopy" v-clipboard:error="onError">一键复制</div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="info-box first-pay">
            <div class="hd">首付情况（必填）</div>
            <div class="bd">
              <span class="info">
                <span class="th">首付比例</span>
                <span class="td">
                  <el-select v-model="payFir" placeholder="" @change="changeFilter">
                  <el-option
                    v-for="item in payList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </span>
              </span>
              <div class="info">
                <span class="th">贷款年限</span>
                <span class="td">
                  <el-select v-model="loanYear" placeholder="" @change="changeFilter">
                  <el-option
                    v-for="item in loanYearList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
                </span>
              </div>
              <div class="info">
                <span class="th">贷款利率</span>
                <span class="td">
                  <el-input
                    class="sele-unit" type="text" @change="changeFilter"
                    suffix-icon="el-icon-date"
                    v-model.trim="loanTex" oninput="value=value.replace(/[^0-9.]/g,'')">
                </el-input></span>
              </div>
            </div>
          </div>
          </div>
          <div class="info-box commut-point">
            <div class="hd">通勤地点（非必填）</div>
            <div class="bd">
              <span class="info">
                <span class="th">通勤地址</span>
                <span class="td">
                  <el-select v-model="province" placeholder="请选择" @change="changeAddress(0)">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
                </span>
              </span>
              <div class="info">
                <span class="th">-</span>
                <span class="td">
                  <el-select v-model="city" placeholder="请选择" @change="changeAddress(1)">
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
                </span>
              </div>
              <div class="info">
                <span class="th">-</span>
                <span class="td">
                <el-select v-model="district" placeholder="请选择" @change="changeAddress(2)">
                  <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
                </span>
              </div>
              <div class="info ipt-add">
                <span class="th"></span>
                <span class="td">
                <el-input type="text" @blur="changeAddress(6)"
                  v-model.trim="detailAddress">
               </el-input>
                </span>
              </div>
              <div id="mapContaner"> </div>
            </div>
          </div>
        </div>
      <el-dialog
        class="dialog-wrap"
        :visible.sync="dialogVisible"
        @close="closeHandle">
        <div id="qrcode" ref="qrcode"></div>
        <div class="code-hint">{{hintText}}</div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
  </transition>
</template>

<script>
/* eslint-disable */
import QRCode from 'qrcodejs2'
import BMap from 'BMap'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import PubSub from 'pubsub-js'
import {trackAxios} from '@/assets/axios'
import {CommonMethods} from '@/assets/Util'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false, // 弹窗默认不展示
      houseInfo: [], // 楼盘信息
      orderId: '', //订单id
      moreHouType: [], // 有多户型的楼盘id
      lng: '', // 经度
      lat: '', // 纬度
      projectInfo: [], // 楼盘信息
      infoShow: [], // 信息展示========================待处理
      detailAddress: '', // 输入框中的地址
      province: '', // 省
      provinceName: '', // 省名
      provinceList: [], // 省列表
      city: '', // 市
      cityName: '' , // 市名
      cityList: [], // 市列表
      district: '', // 区
      districtName: '', // 区名
      districtList: [], // 区列表
      payFir: 30, // 首付比例
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
        }
      ], // 首付比例列表
      loanYear: 30, // 贷款年限
      loanYearList: [
        {
          id: 1,
          text: '1年'
        },
        {
          id: 2,
          text: '2年'
        },
        {
          id: 3,
          text: '3年'
        },
        {
          id: 4,
          text: '4年'
        },
        {
          id: 5,
          text: '5年'
        },
        {
          id: 6,
          text: '6年'
        },
        {
          id: 7,
          text: '7年'
        },
        {
          id: 8,
          text: '8年'
        },
        {
          id: 9,
          text: '9年'
        },
        {
          id: 10,
          text: '10年'
        },
        {
          id: 11,
          text: '11年'
        },
        {
          id: 12,
          text: '12年'
        },
        {
          id: 13,
          text: '13年'
        },
        {
          id: 14,
          text: '14年'
        },
        {
          id: 15,
          text: '15年'
        },
        {
          id: 16,
          text: '17年'
        },
        {
          id: 18,
          text: '18年'
        },
        {
          id: 19,
          text: '19年'
        },
        {
          id: 20,
          text: '20年'
        },
        {
          id: 21,
          text: '21年'
        },
        {
          id: 22,
          text: '22年'
        },
        {
          id: 23,
          text: '23年'
        },
        {
          id: 24,
          text: '24年'
        },
        {
          id: 25,
          text: '25年'
        },
        {
          id: 26,
          text: '26年'
        },
        {
          id: 27,
          text: '27年'
        },
        {
          id: 28,
          text: '28年'
        },
        {
          id: 29,
          text: '29年'
        },
        {
          id: 30,
          text: '30年'
        }
      ], // 贷款年限列表
      loanTex: '4.9', // 贷款利率
      rate: null,
      client: {
        name: '',
        phone: '',
        orderId: ''
      },
      isShow: false,
      mapcon: {},
      hintText: '', // 弹窗中提示文案
      commuteAddress: '' // 通勤地点
    }
  },
  mounted () {
    this.orderId = this.$route.query.order_id
    // 接收地图组件传过来的值
    PubSub.subscribe('moreHouseInfo', (msg, data) => {
      this.isShow = true
      this.houseInfo = data
      this.getData()
    })
    // 初始化地图
    this.mapcon = new BMap.Map('mapContaner')
    this.mapcon.centerAndZoom(new BMap.Point(116.404, 39.915), 13)
  },
  methods: {
    // 弹窗关闭回调
    closeHandle () {
      document.getElementById('qrcode').innerHTML = ""
    },
    // 信息展示处理
    changeState (item) {
      item.state = !item.state
    },
    // 埋点公用方法
    track(id, obj) {
      let res = this.trackBase;
      if (obj) {
        res = Object.assign({}, obj, res);
      }
      let resData = {
        extrack_arr: res,
        track_id: id
      }
      // 请求埋点接口
      let url = this.$store.state.backendApi + '/send-data/index'
      trackAxios.post(url, resData);
    },
    // 预览及分享
    submitMess (type) {
      let shareType
      if (this.districtName != '' && this.cityName != '') {
        this.commuteAddress = this.cityName +'市'+ this.districtName +'区'+ this.detailAddress
      }else if (this.cityName != '') {
        this.commuteAddress = this.cityName +'市'+ this.districtName + this.detailAddress
      } else if (this.districtName != '') {
        this.commuteAddress = this.cityName + this.districtName +'区' + this.detailAddress
      } else {
        this.commuteAddress = this.cityName + this.districtName + this.detailAddress
      }
      // type 为0 是预览   1 是分享
      if (type == 0) {
        shareType = '1'
        this.hintText = '请打开并解锁你的工作手机，如果发现没有自动跳转至预览页面，请在微信中扫描此二维码打开预览'
        this.track('3918',{preview_type: '多楼盘'})
      }
      if (type == 1) {
        shareType = '2'
        this.hintText = '请解锁你的工作手机，如果发现没有自动跳转至微信联系人页面，请在微信中扫描此二维码打开页面并点击右上角的分享按钮手动进行分享'
        this.track('3917',{share_type	: '多楼盘'})
      }
      // 信息展示
      let infoS = []
      let show = this.infoShow
      show.forEach((item) => {
        if (item.state == true) {
          infoS.push(item.id)
        }
      })
      // 楼盘信息
      let projectData = this.projectInfo
      let arr = []
      projectData.forEach((item) => {
        let obj = {}
        obj.projectId = item.projectId
        obj.houseType = item.houseType
        obj.star = item.rate
        obj.content = item.projectSummary
        arr.push(obj)
      })
      // 处理校验
      // 描述不为空的数组id
      let moreHouse = []
      let isReturn = false
      /*arr.forEach((item) => {
        if (item.content != '') {
          moreHouse.push(item.projectId)
        }
      })
      arr.forEach((item) => {
        if (item.content == '') {
          // 如果当然描述为空的户型 不属于多楼盘 且没有填写内容 则提示
          if (moreHouse.indexOf(item.projectId) == -1) {
            this.$message({
              message: "请完善内容",
              type: "warning",
              duration: 1500
            })
            isReturn = true
            return false
          }
        }
      })
      if (isReturn == true) {
        return false
      }
      // 首付情况验证
      if (this.payFir == '' || this.loanYear == '' || this.loanTex == '' || parseFloat(this.loanTex) <= 0) {
        this.$message({
          message: "请完善内容",
          type: "warning",
          duration: 1500
        })
        return false
      }*/
      // 数据成功 打开弹窗
      this.dialogVisible = true
      let params = {
        order_id: this.orderId,
        type: '6',
        project_data: arr,
        down_payments: this.payFir,
        loan_term: this.loanYear,
        lending_rate: this.loanTex,
        commute_lng: this.lng,
        commute_lat: this.lat,
        commute_address: this.commuteAddress,
        info_show: infoS,
        share_type: shareType
      }
      this.axios.post('/backend-api/bk-map/perform-tasks', params)
        .then((res) => {
          let result = res.data
          if (result.code === 0) {
            document.getElementById('qrcode').innerHTML = ""
            this.$nextTick(() =>{
              // 生成二维码
              this.qrcode = new QRCode('qrcode', {
                text: result.data.url,
                width: 220,
                height: 220
              })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 多楼盘初始化数据
    getData () {
      let params = {
        order_id: this.orderId,
        type: 5,
        project_data: this.houseInfo
      }
      this.axios.post('/backend-api/bk-map/perform-tasks', params)
        .then((res) => {
          let result = res.data
          if (result.code === 0) {
            let Data = result.data
            // 信息展示
            this.infoShow = this.eachAddState(Data.infoShow)
            // 遍历  给每个对象添加rate字段
            this.projectInfo = this.eachAddRate(Data.projectInfo)
            this.moreHouType = this.duplicates(this.eachFilterPro(Data.projectInfo))
            // 首付比例 ==============  看是否需要转换
            if (Data.orderInfo.down_payments !== '') {
              this.payFir = Data.orderInfo.down_payments
            }
            if (Data.orderInfo.lending_rate !== '') {
              this.loanTex = Data.orderInfo.lending_rate
            }
            if (Data.orderInfo.loan_term !== '') {
              this.loanYear = Data.orderInfo.loan_term // ================= 年限 看是字符串还是数字
            }
            // 通勤相关
            this.province = Data.addressInfo.work_addr_province
            this.city = Data.addressInfo.work_addr_city
            this.district = Data.addressInfo.work_addr_district
            this.detailAddress = Data.addressInfo.work_addr
            // 用户信息
            this.client.name = Data.userInfo.user_realname
            this.client.phone = Data.userInfo.user_mobile
            this.client.orderId = Data.userInfo.user_id
            // 请求省市区数据
            this.getProvinceList()
          }
        }).then(() => {
        // 处理地图标注
        this.manageAddress()
      })
        .catch((err) => {
          console.log(err)
        })
    },
    eachFilterPro (arr) {
      let sum = []
      arr.forEach((item) => {
        sum.push(item.projectId)
      })
      return sum
    },
    duplicates(arr) {
      //声明两个数组，a数组用来存放结果，b数组用来存放arr中每个元素的个数
      var a = [],b = [];
      //遍历arr，如果以arr中元素为下标的的b元素已存在，则该b元素加1，否则设置为1
      for(let i = 0; i < arr.length; i++){
        if(!b[arr[i]]){
          b[arr[i]] = 1;
          continue;
        }
        b[arr[i]]++;
      }
      //遍历b数组，将其中元素值大于1的元素下标存入a数组中
      for(let i = 0; i < b.length; i++){
        if(b[i] > 1){
          a.push(i);
        }
      }
      return a;
    },
    eachAddState (arr) {
      arr.forEach((item) => {
        item.state = true
      })
      return arr
    },
    eachAddRate (arr) {
      arr.forEach((item) => {
        item.rate = 0
      })
      return arr
    },
    // 改变地址
    changeAddress (type) {
      // 0 1 2 省市区
      if (type === 0) {
        this.city = ''
        this.cityName = ''
        this.district = ''
        this.districtName = ''
        this.detailAddress = ''
      }
      if (type === 1) {
        this.district = ''
        this.districtName = ''
        this.detailAddress = ''
      }
      if (type === 2) {
        this.detailAddress = ''
      }
      // 输入框的地址  这里需要把地址解析为经纬度 去标注到地图上！
      if (type === 6) {
        this.manageAddress()
      }
      // 省市区 赋值
    },
    // 处理标点
    manageAddress () {
      // 将当前省市区id对应为文字
      this.contrastProvince(this.province)
      this.contrastCity(this.city)
      this.contrastDistrict(this.district)
      this.addSuffix()
      let that = this
      this.mapcon.enableScrollWheelZoom(); // 开启滚轮缩放
      var localSearch = new BMap.LocalSearch(this.mapcon);
      var keyword = this.commuteAddress
      localSearch.setSearchCompleteCallback(function(searchResult) {
        if (searchResult) {
          var poi = searchResult.getPoi(0)
          if (poi) {
            that.lng = poi.point.lng
            that.lat = poi.point.lat
            that.mapcon.centerAndZoom(poi.point, 13)
            var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)) // 创建标注，为要查询的地方对应的经纬度
            that.mapcon.clearOverlays()
            that.mapcon.addOverlay(marker)
          }
        }
      })
      localSearch.search(keyword)
      that.mapcon.addEventListener('zoomend', () => {
        let point = new BMap.Point(that.lng, that.lat)
        let marker = new BMap.Marker(point)
        this.mapcon.addOverlay(marker)
        this.mapcon.centerAndZoom(point)
        this.mapcon.panTo(point)
      })
    },
    editPop (type) {
      this.isShow = true
      if (type == 1) {
        this.isShow = false
        this.cityName = ''
        this.districtName = ''
        this.detailAddress = ''
      }
    },
    // 切换首付比例、年限或者利率
    changeFilter () {
      // console.log(this.payFir, this.loanYear, this.loanTex)
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
    addSuffix () {
      this.commuteAddress = this.cityName + this.districtName + this.detailAddress
    },
    // 获取省
    getProvinceList () {
      let params = {
        type: 1 // type1请求省
      }
      this.axios.get('/backend-api/select2/select2/get-province-dropdown-list2', {params: params})
        .then((res) => {
          let result = res.data
          if (result.code === 0) {
            this.provinceList = result.data
            setTimeout(() => {
              // 处理地图标注
              this.manageAddress()
            },500)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取市
    getCity (id) {
      let params = {
        type: 2, // type2 请求市
        city_id: id
      }
      this.axios.get('/backend-api/select2/select2/get-province-dropdown-list2', {params: params})
        .then((res) => {
          let result = res.data
          if (result.code === 0) {
            this.cityList = result.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取区 getDistrict
    getDistrict (id) {
      let params = {
        type: 3, // type3 请求区
        city_id: id
      }
      this.axios.get('/backend-api/select2/select2/get-province-dropdown-list2', {params: params})
        .then((res) => {
          let result = res.data
          if (result.code === 0) {
            this.districtList = result.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 对应省
    contrastProvince (id) {
      let list = this.provinceList
      let nameW = list.filter((item) => {
        return item.id == id
      })
      if (nameW.length > 0) {
        this.provinceName = nameW[0].text
      }
      this.addSuffix()
    },
    // 对应市
    contrastCity (id) {
      let list = this.cityList
      let nameW = list.filter((item) => {
        return item.id == id
      })
      if (nameW.length > 0) {
        this.cityName = nameW[0].text
      }
      this.addSuffix()
    },
    // 对应区
    contrastDistrict (id) {
      let list = this.districtList
      let nameW = list.filter((item) => {
        return item.id == id
      })
      if (nameW.length > 0) {
        this.districtName = nameW[0].text
      }
      this.addSuffix()
    },
  },
  components: {QRCode},
  computed: {
    moreInfo() {
      return {
        screen_height: CommonMethods.ScreenHeight(),
        screen_width: CommonMethods.ScreenWidth(),
        device_type: CommonMethods.getDevice().device,
        os: CommonMethods.getOS().os,
        os_version: CommonMethods.getOS().os_version,
        browser: CommonMethods.getBrowse().browser,
        browser_version: CommonMethods.getBrowse().browser_version
      };
    },
    ...mapState({
      trackBase(state) {
        return {
          ini_params: Object.assign({}, state.trackMessages, this.moreInfo)
        };
      }
    })
  },
  watch: {
    province: {
      deep: true,
      handler: function (val) {
        this.getCity(this.province)
        this.contrastProvince(this.province)
        this.addSuffix()
      }
    },
    city: {
      deep: true,
      handler: function (val) {
        this.getDistrict(this.city)
        this.contrastCity(this.city)
        this.addSuffix()
      }
    },
    district: {
      deep: true,
      handler: function (val) {
        this.contrastDistrict(this.district)
        this.addSuffix()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .sliderLeft-enter, .sliderLeft-leave-to{transform: translateX(100%);}
  .sliderLeft-enter-active, .sliderLeft-leave-active {transition: .2s cubic-bezier(0,0,1,1);}
  .build-wrap{
    width: 1000px;
    height: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    right:0;
    &::after{
      display: block;
      content: '';
      position: fixed;
      left: 0;
      right: 1000px;
      top: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
    >div{
      background-color: #fff;
      color: #333;
    }
    .shadow-box{
      box-shadow: 0 0 5px 0 rgba(69,69,83,0.10);
      border-radius: 4px;
    }
    .header-wrap{
      width: 960px;
      padding:13px 20px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
      height: 30px;
      text-align: center;
      font-size: 16px;
      position: fixed;
      z-index: 3;
      span{
        display: inline-block;
      }
      .close-cue{
        line-height: 30px;
        width: 16px;
        height: 16px;
        float: left;
        margin-top: 7px;
        -webkit-background-size: 100%;
        background-size: 100%;
        background-image: url(../../../../static/images/sreachTool/icon_close_side.png);
      }
      .title{
        text-align: center;
        font-weight: bold;
        line-height: 32px;
      }
      .edit-con{
        float: right;
        color: #fff;
        span{
          cursor: default;
          display: inline-block;
          padding: 4px 10px;
          border-radius: 2px;
          &.preview{
            background-color: #FF5C47;
            box-shadow: 0 2px 4px 0 rgba(255,92,71,0.30);
          }
          &.share{
            margin-left: 12px;
            background-color: #3DA6FF;
            box-shadow: 0 2px 4px 0 rgba(51,161,255,0.30);
          }
        }
      }
    }
    .content-wrap{
      height: 100%;
      /deep/.el-dialog__footer{
         text-align: center;
      }
    }
    .content-detail{
      height: 100%;
      overflow-y: auto;
      background-color: #fff;
      .detail-wrap{
        background-color: #f6f6f6;
        padding-bottom: 10px;
      }
      >div{
        background-color: #fff;
      }
      .client-info{
        padding:24px 20px;
        text-align: left;
        font-size: 16px;
        color: #3E4254;
        margin-top: 56px;
        border-bottom: 1px solid #eee;
      }
      .info-box{
        padding:0 20px 20px;
        background-color: #fff;
        margin-bottom: 10px;
        &:last-child{
          margin-bottom: 0;
        }
        .hd{
          height: 62px;
          line-height: 62px;
          font-size: 16px;
          color: #3E4254;
        }
      }
      .message-info{
        cursor: default;
        .info-show{
          display: inline-block;
          font-size: 14px;
          line-height: 28px;
          margin-right: 12px;
          border: 1px solid #E6E6E6;
          border-radius: 2px;
          padding-left: 5px;
          i{
            display: block;
            float: right;
            width: 16px;
            height: 16px;
            background-image: url(../../../../static/images/sreachTool/info_show_nocheck.png);
            -webkit-background-size: 100%;
            background-size: 100%;
          }
          &.active{
            border: 1px solid #33A1FF;
            i{
              background-image: url(../../../../static/images/sreachTool/info_show_check.png);
            }
          }
        }
        .hint{
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }
      }
      .sum-up{
        .house-wrap{
          background-color: #fff;
          .house-detail{
            padding: 20px;
            background: #F4F5F9;
            border-radius: 4px;
            .info-each{
              margin-bottom: 10px;
              font-size: 14px;
              span{
                display: inline-block;
              }
              .th{
                margin-right: 20px;
                &.hou-name{
                  color: #3E4254;
                }
              }
              .td{
                color: #77808A;
                span{
                  margin-right: 20px;
                }
              }
            }
            .area-txt{
              height: 160px;
              margin-bottom: 20px;
              /deep/ .el-textarea{
                height: 100%;
                .el-textarea__inner{
                  resize: none;
                  height: 100%;
                  border: 1px solid #fff;
                }
              }
            }
            .rate-temp{
              .info-each{
                margin-bottom: 12px;
              }
              .tmp-wrap{
                overflow: hidden;
                .temp-card{
                  font-size: 14px;
                  width: 400px;
                  padding: 20px;
                  background-color: #fff;
                  float: left;
                  border-radius: 4px;
                  &:first-child{
                    margin-right: 14px;
                  }
                  .name{
                    margin-bottom: 12px;
                    .licks{
                      float: right;
                      color: #ABB0B5;
                    }
                  }
                  .copy-btn{
                    cursor: default;
                    float: right;
                    display: inline-block;
                    font-size: 16px;
                    padding:4px 10px;
                    color: #fff;
                    background: #3DA6FF;
                    box-shadow: 0 2px 4px 0 rgba(51,161,255,0.30);
                  }
                  .txt-con{
                    height: 168px;
                    overflow: hidden;
                    margin-bottom: 20px;
                    .txt{
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
      .first-pay{
        span{
          display: inline-block;
        }
        .bd{
          overflow: hidden;
        }
        .info{
          width: 114px;
          height: 30px;
          float: left;
          margin-right: 20px;
          .td{
            float: left;
            width: 52px;
            overflow: hidden;
            /deep/.el-input__icon{
              font-size: 12px;
              line-height: 30px;
              width: 12px;
            }
            /deep/.el-input__inner{
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              padding: 0 4px;
              border-radius: 0;
            }
            /deep/.el-input__suffix{
              right: 3px;
            }
          }
          .sele-unit{
            /deep/.el-input__suffix-inner{
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
          .th{
            float: left;
            font-size: 12px;
            color: #333;
            line-height: 30px;
            margin-right: 6px;
          }
        }
      }
      .commut-point{
        #mapContaner{
          margin-top:20px;
          width: 960px;
          height: 400px;
        }
        .info{
          display: inline-block;
          overflow: hidden;
          line-height: 30px;
          margin-right: 3px;
        }
        .ipt-add {
          margin-left: 8px;
        }
        .th{
          float: left;
          margin-right: 6px;
        }
        .td{
          float: left;
          width: 82px;
          overflow: hidden;
          /deep/.el-input__icon{
            font-size: 12px;
            line-height: 30px;
            width: 12px;
          }
          /deep/.el-input__inner{
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            padding: 0 4px;
            border-radius: 0;
          }
          /deep/.el-input__suffix{
            right: 3px;
          }
        }
      }
    }
    #qrcode{
      display: inline-block;
      >img{
        margin:auto!important;
      }
    }
    .code-hint{
      margin-top: 20px;
      font-size: 14px;
      color: #ABB0B5;
    }
    .el-dialog__wrapper {
      /deep/.el-dialog {
        width: 406px;
        .el-dialog__body{
          padding: 30px 30px;
          text-align: center;
        }
        .el-dialog__footer{
          padding:0 30px 30px;
          text-align: center;
        }
        .el-button{
          width: 132px;
          color: #fff;
          background: #3DA6FF;
        }
      }
    }
  }
  /*滚动条样式*/
  .content-detail::-webkit-scrollbar ,.txt::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .content-detail::-webkit-scrollbar-thumb ,.txt::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: rgba(0,0,0,0.2);
  }
</style>
