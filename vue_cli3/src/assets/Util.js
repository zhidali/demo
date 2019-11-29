/* 公共方法 */
import {axios, trackAxios} from '@/assets/axios'
import store from '../store'
const Cookie = {
  setCookie: (key, val) => {
    let cdata = key + '=' + val
    let d = new Date()
    d.setHours(d.getHours() + 1)
    cdata += '; expires=' + d.toGMTString()
    document.cookie = cdata
  },
  getCookie: (key) => {
    let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    if (arr === document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  delCookie: (key) => {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = Cookie.getCookie(key)
    if (cval != null) {
      document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
}
const CommonMethods = {
  // 去掉首尾空格
  trim: (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  // 去所有空格
  trimAll: (str) => {
    return str.replace(/\s+/g, '')
  },
  // 生成随机字符串
  random_string: (lens) => {
    let len = lens || 32
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    let maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  // 函数节流
  highThottle: (fn, content, musttime, time) => {
    let start = new Date()
    let musttimes = musttime || 5000
    return function () {
      let args = arguments
      clearTimeout(fn.timer)
      let end = new Date()
      if (end - start > musttimes) {
        start = new Date()
        clearTimeout(fn.timer)
        fn.apply(content, args)
      } else {
        fn.timer = setTimeout(function () {
          start = new Date()
          fn.apply(content, args)
        }, time || 200)
      }
    }
  },
  // 获取设备
  getDevice: () => {
    let agent = navigator.userAgent.toLowerCase()
    if (/windows/.test(agent)) {
      return 'windows pc'
    } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
      return 'iphone'
    } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
      return 'ipad'
    } else if (/android/.test(agent) && /mobile/.test(agent)) {
      return 'android'
    } else if (/linux/.test(agent)) {
      return 'linux pc'
    } else if (/mac/.test(agent)) {
      return 'mac'
    } else {
      return 'other'
    }
  },
  // 获取操作系统版本
  getOS: () => {
    let sUserAgent = navigator.userAgent
    let isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows')
    let isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
    if (isMac) return 'Mac'
    let isUnix = (navigator.platform === 'X11') && !isWin && !isMac
    if (isUnix) return 'Unix'
    let isLinux = (String(navigator.platform).indexOf('Linux') > -1)
    if (isLinux) return 'Linux'
    if (isWin) {
      let isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
      if (isWin2K) return {os: 'windows', os_version: '2000'}
      let isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
      if (isWinXP) return {os: 'windows', os_version: 'XP'}
      let isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
      if (isWin2003) return {os: 'windows', os_version: '2003'}
      let isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
      if (isWinVista) return {os: 'windows', os_version: 'Vista'}
      let isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
      if (isWin7) return {os: 'windows', os_version: '7'}
      let isWin10 = sUserAgent.indexOf('Windows NT 10') > -1 || sUserAgent.indexOf('Windows 10') > -1
      if (isWin10) return {os: 'windows', os_version: '10'}
    }
    return {os: 'other', os_version: ''}
  },
  // 获得屏幕宽度
  ScreenWidth: () => {
    return window.screen.width
  },
  // 获得屏幕高度
  ScreenHeight: () => {
    return window.screen.height
  },
  // 获得浏览器
  getBrowse: () => {
    let agent = navigator.userAgent.toLowerCase()
    let browser = { browser: 'unknown', browser_version: '0' }
    if (/(qqbrowser|ubrowser)\D+(\d[\d.]*)/.test(agent)) {
      // qq浏览器,UC浏览器
      browser.browser = RegExp.$1
      browser.browser_version = RegExp.$2
    } else if (/se[\s\.a-zA-Z\d]+metasr/.test(agent)) {
      browser.browser = 'sougou'
      browser.browser_version = '0'
    } else if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(agent)) {
      browser.browser = RegExp.$1
      browser.browser_version = RegExp.$2
    } else if (/version\D+(\d[\d.]*).*safari/.test(agent)) {
      // safari
      browser.browser = 'safari'
      browser.browser_version = RegExp.$2
    }
    return browser
  },
  /**
   * 验证是否是数字、或者是否是数字字符串
   *
   * @param 需要校验的参数
   * @return {Boolean} 是否是字符串结果
   */
  matchFigure: (para) => {
    let reg = /^[0-9]*$/
    if (!para || !reg.test(para)) {
      return false
    } else {
      return true
    }
  },
  /*
   * 公共埋点方法---找房工具使用（无顶部导航，只能同用户需求里面获取埋点信息）
   * params（埋点ID，埋点基本信息（接口下发参数），扩展字段（根据不同埋点的一些特殊字段），埋点请求api地址）
  * */
  setTrack: (trackId, trackInfo, paraObj, backendApi) => {
    // 组装埋点数据
    // paraObj:扩展参数、trackId:track_id、trackInfo:接口下发的基础参数
    let moreInfo = {
      screen_height: CommonMethods.ScreenHeight(),
      screen_width: CommonMethods.ScreenWidth(),
      device_type: CommonMethods.getDevice().device,
      os: CommonMethods.getOS().os,
      os_version: CommonMethods.getOS().os_version,
      browser: CommonMethods.getBrowse().browser,
      browser_version: CommonMethods.getBrowse().browser_version
    }
    let trackAll = Object.assign({}, moreInfo, trackInfo)
    let ex = {ini_params: trackAll}
    let trackExtr = ex
    if (paraObj) {
      trackExtr = Object.assign({}, paraObj, ex)
    }
    let trackData = {
      extrack_arr: trackExtr,
      track_id: trackId
    }
    // 请求埋点接口
    trackAxios.post(backendApi + '/send-data/index', trackData).then((res) => {
      if (res.data.code === 0) {
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  /*
   * 公共埋点方法---有顶部导航的埋点方法，通用埋点信息从导航api获取
   * params（埋点ID，扩展字段（根据不同埋点的一些特殊字段))
  * */
  setTrackMenu: (trackId, paraObj) => {
    // 组装埋点数据
    // paraObj:扩展参数、trackId:track_id、trackInfo:接口下发的基础参数
    let moreInfo = {
      screen_height: CommonMethods.ScreenHeight(),
      screen_width: CommonMethods.ScreenWidth(),
      device_type: CommonMethods.getDevice().device,
      os: CommonMethods.getOS().os,
      os_version: CommonMethods.getOS().os_version,
      browser: CommonMethods.getBrowse().browser,
      browser_version: CommonMethods.getBrowse().browser_version
    }
    let trackAll = Object.assign({}, moreInfo, store.state.trackMessages)
    let ex = {ini_params: trackAll}
    let trackExtr = ex
    if (paraObj) {
      trackExtr = Object.assign({}, paraObj, ex)
    }
    let trackData = {
      extrack_arr: trackExtr,
      track_id: trackId
    }
    // 请求埋点接口
    trackAxios.post(store.state.backendApi, trackData).then((res) => {
      if (res.data.code === 0) {
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  // 深度克隆对象
  cloneObj: (obj) => {
    let newObj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (window.JSON) {
      newObj = JSON.stringify(obj)
      newObj = JSON.parse(newObj) // 还原
    } else { // 如果不支持以上方法
      for (var i in obj) {
        newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i]
      }
    }
    return newObj
  },
  /**
   * base64图片转为blob
   * @param {string} base 参数描述 base64串
   * return blob对象
   */
  base64ToBlob(base) {
    let parts = base.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}
export {
  CommonMethods,
  Cookie
}
