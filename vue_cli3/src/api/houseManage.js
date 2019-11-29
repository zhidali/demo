import {axios} from '@/assets/axios'

const landCityUrl = '/backend-api/bd-creis/city-list' // 获取土地信息和成交数据城市下拉
const creisLoginUrl = '/backend-api/bd-creis/login' // 中指数据登录
const crawlLogUrl = '/backend-api/bd-creis/get-log' // 获取最近一次抓取日志


// 获取城市信息接口，参数type 城市类型（1.地块城市下拉， 2.成交数据城市下拉）
export const getLandCity = (type) => axios.get(landCityUrl, {params: {type}})

// 中指数据登录接口 参数options:{land_city_ids,deal_city_ids,username,password}四个参数
export const loginCreis = (options) => axios.post(creisLoginUrl, options)

// 获取爬取日志 参数logId为log id
export const getCrawlLog = (logId) => axios.get(crawlLogUrl, {params: {id: logId}})

