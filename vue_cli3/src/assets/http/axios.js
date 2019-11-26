/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
// 响应时间
axios.defaults.timeout = 60000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 配置接口地址
var dataUrl = window.location.host

let environment = process.env.NODE_ENV
if (environment === 'production') {
    // 根据环境来设置baseUrl   api_url
    axios.defaults.baseURL = '//' + dataUrl
} else {
    // 根据实际情况修改
    axios.defaults.baseURL = ''
}

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    console.log('错误的传参', 'fail')
    return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(response => {

    return response
}, error => {

})

export {
    axios
}