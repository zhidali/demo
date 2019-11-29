import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store'
// axios.defaults.withCredentials = true
// 响应时间
axios.defaults.timeout = 60000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 新建一个axios请求，可用于上传图片等请求，需要时可以将instance输出
var instance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {'Content-Type': 'multipart/form-data'}
})
// 新建埋点请求
let trackAxios = axios.create({
  baseURL: '',
  timeout: 5000
})
trackAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// post请求参数序列化
trackAxios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('错误的传参', 'fail')
  return Promise.reject(error)
})
// 新建超时请求
let TimeAxios = axios.create({
  baseURL: '',
  timeout: 10000
})
TimeAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// post请求参数序列化
TimeAxios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('错误的传参', 'fail')
  return Promise.reject(error)
})
// 配置接口地址
var dataUrl = window.location.host
/* if (dataUrl !== 'backend.julive.com') {
  dataUrl = 'testbackendapi.comjia.com'
} */
let environment = process.env.NODE_ENV
if (environment === 'production') {
// 根据环境来设置baseUrl   api_url
  axios.defaults.baseURL = '//' + dataUrl
  // 设置baseURL
  trackAxios.defaults.baseURL = ''
} else {
  // 根据实际情况修改
  axios.defaults.baseURL = ''
  // 设置baseURL
  trackAxios.defaults.baseURL = ''
}

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } /* else if (config.method === 'get') {
    config.params = {
      redirect_url: window.location.href.split('#')[1],
      ...config.params
    }
  } */
  return config
}, (error) => {
  console.log('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(response => {
  if (response.data.code === 1107) {
    // 未登录
    if (response.data.data.type === 1) {
      router.push({path: '/login', query: {errorInfo: 'login'}})
    } else if (response.data.data.type === 2) {
      let currentUrl = window.location.pathname + '' + window.location.search
      window.location.href = response.data.data.url + '&redirect_url=' + encodeURI(currentUrl)
    }
  } else if (response.data.code === 1118 && response.data.code === 20001) {
    // 安全密码校验和vpn验证
    window.location.href = response.data.data.url
  } else if (response.data.code === 1012) {
    alert(response.data.msg)
  } else if (response.data.code === 1014 || response.data.code === 1015) {
    // 没有权限进入系统,1014为菜单为空，1015为未知角色
    router.push({path: '/noPermissions'})
  } else if (response.data.code === 0) {
  } else {
    // router.push({path: '/errorDev', query: {errMsg: response.data.errMsg}})
  }
  return response
}, error => {
  // Do something with response error
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    store.dispatch('net_timeout', true)
  } else {
    store.dispatch('net_timeout', false)
    console.warn('axios response error')
    return Promise.reject(error)
  }
})

export {axios, trackAxios, TimeAxios, instance}
